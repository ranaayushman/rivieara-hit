"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Scan, ChevronLeft, ChevronRight } from "lucide-react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { motion, useReducedMotion, Variants } from "framer-motion";

const fallbackImages = ["/gallery2.jpg", "/Gaming3.jpeg", "/gallery3.jpg", "/gallery4.jpg", "/gaming4.jpeg"];

/* ── Tactical Corner SVG ── */
function TacticalCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const rotate = { tl: 0, tr: 90, bl: -90, br: 180 }[position];
  const pos = {
    tl: { top: -1, left: -1 },
    tr: { top: -1, right: -1 },
    bl: { bottom: -1, left: -1 },
    br: { bottom: -1, right: -1 },
  }[position];
  return (
    <svg
      width="14" height="14" viewBox="0 0 14 14"
      className="absolute pointer-events-none z-30"
      style={{ ...pos, transform: `rotate(${rotate}deg)` }}
    >
      <path d="M0 0 L14 0 L14 2.5 L2.5 2.5 L2.5 14 L0 14 Z" fill="#FF204E" opacity="0.45" />
    </svg>
  );
}

/* ── Section embers ── */
function GalleryEmbers({ isLowPower }: { isLowPower: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const particles = useMemo(() => {
    const count = isLowPower ? 4 : 8;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: `${(i * 23 + 9) % 100}%`,
      y: `${(i * 19 + 7) % 90}%`,
      size: ((i * 3) % 2) + 1.5,
      opacity: ((i * 5) % 10 + 5) / 100,
      dur: 7 + ((i * 3) % 5),
      delay: (i * 0.5) % 3,
    }));
  }, [isLowPower]);

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[3]" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x, top: p.y,
            width: p.size, height: p.size,
            background: "radial-gradient(circle, #FF204E, rgba(169,16,50,0.15))",
            boxShadow: `0 0 ${p.size * 2}px rgba(255,32,78,0.2)`,
          }}
          animate={!isLowPower ? { y: [-3, 3, -3], opacity: [p.opacity, p.opacity * 2, p.opacity] } : {}}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Animation variants ── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/* ═══════════════════════════════════════════════
   GALLERY — SURVEILLANCE ARCHIVES
═══════════════════════════════════════════════ */
export default function Gallery() {
  const [images, setImages] = useState<string[]>(fallbackImages);
  const [current, setCurrent] = useState(0);

  const { isLowPower, isMounted } = usePerformanceMode();
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !shouldReduceMotion && !isLowPower;

  useEffect(() => {
    fetch("/api/public/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (data.albums && data.albums.length > 0) {
          const allImages: string[] = [];
          for (const album of data.albums) {
            for (const img of album.gallery_images || []) {
              allImages.push(img.image_url);
            }
          }
          if (allImages.length > 0) {
            setImages(allImages.length >= 5 ? allImages.slice(0, 5) : [...allImages, ...fallbackImages].slice(0, 5));
          }
        }
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  const navigate = useCallback((dir: number) => {
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  }, [images.length]);

  const getOffset = (index: number) => {
    const raw = index - current;
    const len = images.length;
    let offset = raw;
    if (offset > len / 2) offset -= len;
    if (offset < -len / 2) offset += len;
    return offset;
  };

  const getPosition = (offset: number) => {
    if (offset === 0) return { x: "-50%", y: "-50%", scale: 1, zIndex: 50, opacity: 1, rotateZ: 0 };
    if (offset === 1) return { x: "10%", y: "-65%", scale: 0.62, zIndex: 30, opacity: 0.6, rotateZ: 3 };
    if (offset === -1) return { x: "-110%", y: "-35%", scale: 0.58, zIndex: 20, opacity: 0.5, rotateZ: -4 };
    if (offset === 2) return { x: "-15%", y: "-15%", scale: 0.42, zIndex: 15, opacity: 0.35, rotateZ: -6 };
    if (offset === -2) return { x: "-85%", y: "-80%", scale: 0.38, zIndex: 10, opacity: 0.25, rotateZ: 6 };
    return { x: "-50%", y: "-50%", scale: 0, zIndex: 0, opacity: 0, rotateZ: 0 };
  };

  return (
    <section
      id="gallery"
      className="relative min-h-screen overflow-hidden py-24 sm:py-32 flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #050507 0%, #08080D 25%, #12070B 50%, #09090F 75%, #050507 100%)",
      }}
    >
      {/* ── BACKGROUND LAYERS ── */}

      {/* Top divider */}
      <div
        className="absolute inset-x-0 top-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.12), transparent)" }}
      />

      {/* Crimson haze */}
      <motion.div
        className="absolute top-[30%] left-[45%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(255,32,78,0.04) 0%, transparent 65%)" }}
        animate={shouldAnimate ? { scale: [1, 1.05, 1], opacity: [0.5, 0.75, 0.5] } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Tactical grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,32,78,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,32,78,0.2) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] z-0" />

      {/* Scanlines */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.01]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 60% at 50% 50%, transparent 30%, rgba(5,5,7,0.55) 100%)" }}
      />

      {/* Embers */}
      {isMounted && <GalleryEmbers isLowPower={isLowPower} />}

      {/* ═══ TITLE ═══ */}
      <motion.div
        className="relative z-30 text-center mb-12 md:mb-20 px-4 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-5">
          <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
          <p
            className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-bold"
            style={{ fontFamily: "var(--font-tactical)", color: "#FF204E", opacity: 0.7 }}
          >
            ◆ SURVEILLANCE LOG ◆
          </p>
          <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.02em] relative z-10"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span style={{ color: "#F5F5F5", textShadow: "0 0 35px rgba(255,32,78,0.1)" }}>
            THE{" "}
          </span>
          <span
            style={{
              background: "linear-gradient(135deg, #FF204E, #FF2E63, #FF4D6D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "var(--font-tactical)",
              filter: "drop-shadow(0 0 18px rgba(255,32,78,0.2))",
            }}
          >
            ARCHIVES
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-sm md:text-base max-w-md mx-auto"
          style={{ color: "rgba(245,245,245,0.4)", fontFamily: "var(--font-body)" }}
        >
          Recovered footage from previous operations.
        </motion.p>
      </motion.div>

      {/* ═══ FLOATING IMAGE FRAGMENTS ═══ */}
      <div className="relative z-30 w-full max-w-[1200px] h-[480px] sm:h-[560px] md:h-[640px] mx-auto flex items-center justify-center perspective-[2000px]">
        {images.map((img, index) => {
          const offset = getOffset(index);
          const isActive = offset === 0;
          const pos = getPosition(offset);

          return (
            <motion.div
              key={index}
              className="absolute top-1/2 left-1/2 w-[82%] sm:w-[58%] md:w-[46%] lg:w-[36%] aspect-[4/3] z-10"
              initial={false}
              animate={{
                x: pos.x,
                y: pos.y,
                scale: pos.scale,
                rotateZ: pos.rotateZ,
                opacity: pos.opacity,
                zIndex: pos.zIndex,
              }}
              transition={{
                duration: isLowPower ? 0.5 : 1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className={`relative w-full h-full rounded-sm cursor-pointer group transform-gpu overflow-hidden`}
                onClick={() => { if (!isActive) navigate(offset); }}
                style={{
                  border: isActive ? "1px solid rgba(255,32,78,0.25)" : "1px solid rgba(255,32,78,0.06)",
                  boxShadow: isActive
                    ? "0 25px 50px rgba(0,0,0,0.7), 0 0 25px rgba(255,32,78,0.06)"
                    : "0 15px 30px rgba(0,0,0,0.5)",
                  transition: "box-shadow 0.4s ease, border-color 0.4s ease",
                }}
              >
                {/* Tactical corners on active */}
                {isActive && (
                  <>
                    <TacticalCorner position="tl" />
                    <TacticalCorner position="tr" />
                    <TacticalCorner position="bl" />
                    <TacticalCorner position="br" />
                  </>
                )}

                {/* Active glow */}
                {isActive && (
                  <motion.div
                    className="absolute inset-[-15px] rounded-sm pointer-events-none z-0"
                    style={{ background: "radial-gradient(circle, rgba(255,32,78,0.04) 0%, transparent 60%)" }}
                    animate={shouldAnimate ? { opacity: [0.3, 0.7, 0.3] } : {}}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                {/* Top crimson line */}
                <div
                  className="absolute inset-x-0 top-0 h-px pointer-events-none z-20"
                  style={{
                    background: isActive
                      ? "linear-gradient(90deg, transparent, rgba(255,32,78,0.4), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(255,32,78,0.08), transparent)",
                  }}
                />

                {/* Image */}
                <div className="relative w-full h-full z-10">
                  <Image
                    src={img}
                    alt={`Archive Fragment ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 80vw, (max-width: 768px) 55vw, (max-width: 1024px) 42vw, 400px"
                    priority={isActive}
                  />

                  {/* Dark overlay */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background: isActive
                        ? "linear-gradient(to top, rgba(5,5,7,0.75) 0%, rgba(5,5,7,0.15) 40%, transparent 100%)"
                        : "linear-gradient(to top, rgba(5,5,7,0.85) 0%, rgba(5,5,7,0.35) 50%, rgba(5,5,7,0.2) 100%)",
                    }}
                  />

                  {/* Scanline on image */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0.05) 2px)",
                    }}
                  />
                </div>

                {/* Active badge */}
                {isActive && (
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-30">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[rgba(9,9,15,0.8)] backdrop-blur-sm border border-[rgba(255,32,78,0.15)]">
                      <Scan className="text-[#FF204E] w-3 h-3 opacity-60" />
                      <span
                        className="font-bold tracking-[0.25em] text-[8px] uppercase"
                        style={{ color: "rgba(245,245,245,0.5)", fontFamily: "var(--font-tactical)" }}
                      >
                        FILE {String(current + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span
                      className="text-[7px] tracking-[0.2em] uppercase"
                      style={{ color: "rgba(255,32,78,0.35)", fontFamily: "var(--font-tactical)" }}
                    >
                      RECOVERED
                    </span>
                  </div>
                )}

                {/* Bottom line */}
                <div
                  className="absolute inset-x-0 bottom-0 h-px pointer-events-none z-20"
                  style={{
                    background: isActive
                      ? "linear-gradient(90deg, transparent, rgba(255,32,78,0.2), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(255,32,78,0.05), transparent)",
                  }}
                />
              </div>
            </motion.div>
          );
        })}

        {/* Nav arrows */}
        <div className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 z-50">
          <button
            onClick={() => navigate(-1)}
            aria-label="Previous file"
            className="culling-nav-btn w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-sm group"
            style={{
              background: "rgba(9,9,15,0.7)",
              border: "1px solid rgba(255,32,78,0.12)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              transition: "all 0.3s ease",
            }}
          >
            <ChevronLeft size={16} className="text-[rgba(245,245,245,0.45)] group-hover:text-[#FF204E] transition-colors" />
          </button>
        </div>
        <div className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 z-50">
          <button
            onClick={() => navigate(1)}
            aria-label="Next file"
            className="culling-nav-btn w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-sm group"
            style={{
              background: "rgba(9,9,15,0.7)",
              border: "1px solid rgba(255,32,78,0.12)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              transition: "all 0.3s ease",
            }}
          >
            <ChevronRight size={16} className="text-[rgba(245,245,245,0.45)] group-hover:text-[#FF204E] transition-colors" />
          </button>
        </div>

        {/* Indicator dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to file ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === current ? 20 : 5,
                height: 5,
                borderRadius: 2,
                background: i === current ? "#FF204E" : "rgba(255,32,78,0.15)",
                boxShadow: i === current ? "0 0 6px rgba(255,32,78,0.35)" : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* ═══ CTA ═══ */}
      <motion.div
        className="relative z-40 mt-10 md:mt-16"
        initial={!shouldReduceMotion ? { opacity: 0, y: 16 } : {}}
        whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <Link
          href="/gallery"
          className="culling-btn-primary group relative inline-flex items-center gap-3 px-6 py-3 rounded-sm overflow-hidden"
          style={{
            background: "rgba(255,32,78,0.06)",
            border: "1px solid rgba(255,32,78,0.3)",
            transition: "all 0.3s ease",
          }}
        >
          <span
            className="relative z-10 uppercase tracking-[0.18em] text-xs font-bold"
            style={{ color: "#F5F5F5", fontFamily: "var(--font-heading)" }}
          >
            ACCESS FULL ARCHIVE
          </span>
          <div
            className="relative z-10 w-7 h-7 rounded-sm flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #FF204E, #A91032)",
              boxShadow: "0 0 10px rgba(255,32,78,0.3)",
            }}
          >
            <ArrowRight size={12} className="text-white" />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
