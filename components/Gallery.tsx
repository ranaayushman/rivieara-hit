"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Aperture } from "lucide-react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { generateStars, generateEmbers, getPerformanceAdjustedParticles } from "@/lib/particleAnimations";
import { motion, useReducedMotion, Variants } from "framer-motion";

const fallbackImages = ["/gallery2.jpg", "/Gaming3.jpeg", "/gallery3.jpg", "/gallery4.jpg", "/gaming4.jpeg"];

export default function Gallery() {
  const [images, setImages] = useState<string[]>(fallbackImages);
  const [current, setCurrent] = useState(0);

  const { isLowPower } = usePerformanceMode();
  const shouldReduceMotion = useReducedMotion();

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
    // Completely removed blur/filters for extreme performance
    if (offset === 0) return { x: "-50%", y: "-50%", scale: 1, zIndex: 50, opacity: 1, rotateZ: 0 };
    if (offset === 1) return { x: "10%", y: "-65%", scale: 0.65, zIndex: 30, opacity: 0.8, rotateZ: 4 };
    if (offset === -1) return { x: "-110%", y: "-35%", scale: 0.6, zIndex: 20, opacity: 0.7, rotateZ: -6 };
    if (offset === 2) return { x: "-15%", y: "-15%", scale: 0.45, zIndex: 15, opacity: 0.5, rotateZ: -8 };
    if (offset === -2) return { x: "-85%", y: "-80%", scale: 0.4, zIndex: 10, opacity: 0.4, rotateZ: 8 };
    return { x: "-50%", y: "-50%", scale: 0, zIndex: 0, opacity: 0, rotateZ: 0 };
  };

  // ── PARTICLES ──
  const stars = useMemo(
    () => {
      const { starCount } = getPerformanceAdjustedParticles(isLowPower);
      return generateStars(Math.floor(starCount / 3)); // Minimal particles
    },
    [isLowPower]
  );

  const embers = useMemo(
    () => {
      const { emberCount } = getPerformanceAdjustedParticles(isLowPower);
      return generateEmbers(Math.floor(emberCount / 3)); // Minimal particles
    },
    [isLowPower]
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="gallery"
      className="relative min-h-screen overflow-hidden py-24 sm:py-32 flex flex-col items-center justify-center"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at center, var(--bg-deep) 0%, var(--bg-primary) 80%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none z-0" style={{ background: "radial-gradient(circle, var(--moon-glow) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--surface-glass) 100%)" }} />
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-noise" />
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen" style={{ background: "conic-gradient(from 180deg at 50% 50%, var(--moon-dim) 0deg, transparent 40deg, var(--moon-subtle) 80deg, transparent 120deg, var(--moon-dim) 160deg, transparent 360deg)" }} />

      {/* ── PARTICLE LAYERS (Minimal Dust) ── */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full"
            style={{ width: s.size, height: s.size, left: s.x, top: s.y, background: "var(--gold-primary)", opacity: s.opacity }}
            animate={!shouldReduceMotion && !isLowPower ? { opacity: [s.opacity, s.opacity * 0.2, s.opacity] } : {}}
            transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {embers.map((ember) => (
          <motion.div
            key={ember.id}
            className="absolute rounded-full"
            style={{ width: 3, height: 3, background: "var(--gold-light)", right: `${ember.right}%`, bottom: `${ember.bottom}%`, opacity: 0.5 }}
            animate={!shouldReduceMotion && !isLowPower ? { y: [0, -30], opacity: [0, 0.4, 0] } : {}}
            transition={{ duration: 8 + (ember.id % 4), repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* ================= TITLE AREA ================= */}
      <motion.div 
        className="relative z-30 text-center mb-16 md:mb-24 px-4 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.p
          variants={itemVariants}
          className="text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold text-[var(--gold-primary)]"
          style={{ fontFamily: "var(--font-arabian)" }}
        >
          ✦ Echoes of Riviera ✦
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight relative z-10"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)", textShadow: "0 0 50px var(--gold-glow), 0 5px 15px rgba(0,0,0,0.9)" }}
        >
          The Memory Vault
        </motion.h2>
      </motion.div>

      {/* ================= FLOATING MEMORY FRAGMENTS ================= */}
      <div className="relative z-30 w-full max-w-[1200px] h-[500px] sm:h-[600px] md:h-[700px] mx-auto flex items-center justify-center perspective-[2000px]">
        {images.map((img, index) => {
          const offset = getOffset(index);
          const isActive = offset === 0;
          const pos = getPosition(offset);

          return (
            <motion.div 
              key={index} 
              className="absolute top-1/2 left-1/2 w-[80%] sm:w-[55%] md:w-[45%] lg:w-[35%] aspect-[4/3] z-10"
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
                duration: isLowPower ? 0.6 : 1.2, // Cinematic slow slide
                ease: "easeOut"
              }}
            >
              <motion.div
                className={`relative w-full h-full rounded-2xl cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform-gpu ${isActive ? 'ring-1 ring-[var(--gold-primary)]' : ''}`}
                onClick={() => { if (!isActive) navigate(offset); }}
                animate={!shouldReduceMotion && !isLowPower ? {
                  y: isActive ? ["0%", "-2%", "0%"] : ["0%", "-4%", "0%"],
                  x: isActive ? ["0%", "1%", "0%"] : ["0%", "-2%", "0%"],
                } : {}}
                transition={{
                  duration: 8 + Math.abs(offset) * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={(!shouldReduceMotion && !isLowPower) ? {
                  y: "-4px",
                  scale: 1.01,
                  boxShadow: "0 25px 60px rgba(0,0,0,0.9)",
                } : {}}
              >
                {/* Active Card Glow Breathing */}
                {isActive && (
                  <motion.div
                    className="absolute inset-[-20px] rounded-[30px] pointer-events-none z-0"
                    style={{ background: "radial-gradient(circle at center, rgba(212,160,23,0.15) 0%, transparent 60%)" }}
                    animate={!shouldReduceMotion && !isLowPower ? { opacity: [0.3, 0.8, 0.3] } : {}}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                <div className="absolute inset-[-6px] border border-[var(--border-gold)] rounded-[20px] pointer-events-none z-10" />

                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[var(--border-gold)] bg-[var(--surface-primary)] z-20">
                  <Image
                    src={img}
                    alt={`Memory Fragment ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 75vw, (max-width: 768px) 50vw, (max-width: 1024px) 40vw, 384px"
                    priority={isActive}
                  />

                  {/* Image Overlay Breathing */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--surface-glass)] to-transparent pointer-events-none"
                    animate={!shouldReduceMotion && !isLowPower ? { opacity: [0.8, 0.5, 0.8] } : {}}
                    transition={{ duration: 6 + Math.abs(offset), repeat: Infinity, ease: "easeInOut" }}
                  />

                  {isActive && (
                    <div className="absolute inset-0 mix-blend-screen pointer-events-none" style={{ background: "radial-gradient(circle at center, var(--gold-glow) 0%, transparent 70%)" }} />
                  )}
                </div>

                {isActive && (
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none z-30">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-glass)] backdrop-blur-md border border-[var(--border-gold)] shadow-[0_0_15px_var(--gold-glow)]">
                      <Aperture className="text-[var(--gold-primary)] w-3 h-3 md:w-4 md:h-4" />
                      <span className="text-[var(--gold-light)] font-medium tracking-[0.2em] text-[10px] md:text-xs uppercase" style={{ fontFamily: "var(--font-arabian)" }}>
                        Memory Fragment
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= MAGICAL CTA BUTTON ================= */}
      <motion.div 
        className="relative z-40 mt-8 md:mt-16"
        initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : {}}
        whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <Link href="/gallery" className="group relative inline-flex items-center justify-center w-[220px] h-[56px] rounded-full overflow-hidden">
          <motion.span 
            className="inline-flex items-center justify-center w-full h-full"
            whileHover={!shouldReduceMotion && !isLowPower ? { y: -2, scale: 1.02 } : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-[var(--surface-primary)] backdrop-blur-md border border-[var(--border-gold)] rounded-full transition-colors duration-300 group-hover:bg-[rgba(212,160,23,0.1)]" />
            <div className="absolute inset-0 blur-md" style={{ background: "radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)" }} />
            <div className="relative z-10 flex items-center gap-3">
              <span className="font-semibold tracking-[0.15em] text-sm text-[var(--gold-light)] uppercase transition-colors duration-300 group-hover:text-[#FFF]" style={{ fontFamily: "var(--font-heading)" }}>
                Open Chronicle
              </span>
              <div className="w-8 h-8 rounded-full bg-[var(--gold-dim)] flex items-center justify-center border border-[var(--border-gold)] transition-transform duration-300 group-hover:scale-110">
                <ArrowRight size={14} className="text-[var(--gold-light)]" />
              </div>
            </div>
          </motion.span>
        </Link>
      </motion.div>

    </section>
  );
}
