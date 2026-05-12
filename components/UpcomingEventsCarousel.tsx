"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Crosshair } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

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
      <path d="M0 0 L14 0 L14 2.5 L2.5 2.5 L2.5 14 L0 14 Z" fill="#FF204E" opacity="0.5" />
    </svg>
  );
}

interface EventData {
  title: string;
  desc: string;
  image: string;
  tag: string;
  sectorId: string;
}

const fallbackEvents: EventData[] = [
  {
    title: "Hidden Protocol",
    desc: "Decode clues, chase hidden paths, and race against rival teams in an arena packed with mystery, strategy, and survival.",
    image: "/treasure.jpeg",
    tag: "RECON",
    sectorId: "SECTOR—01",
  },
  {
    title: "Digital Combat",
    desc: "A high-stakes gaming battleground. Compete against the fiercest players in an arena where only reflexes and strategy survive.",
    image: "/gaming6.jpeg",
    tag: "COMBAT",
    sectorId: "SECTOR—02",
  },
  {
    title: "Crimson Stage",
    desc: "Electrifying performances under the crimson lights. The grand cultural showdown where art becomes a weapon.",
    image: "/gallery3.jpg",
    tag: "PERFORMANCE",
    sectorId: "SECTOR—03",
  },
];

const FALLBACK_IMAGES = ["/gallery2.jpg", "/gallery3.jpg", "/gallery4.jpg"];

export default function UpcomingEventsCarousel() {
  const [events, setEvents] = useState<EventData[]>(fallbackEvents);
  const [current, setCurrent] = useState(0);

  const { isLowPower } = usePerformanceMode();
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !shouldReduceMotion && !isLowPower;

  useEffect(() => {
    fetch("/api/public/events")
      .then((r) => r.json())
      .then((data) => {
        if (data.events && data.events.length > 0) {
          const sectorTags = ["RECON", "COMBAT", "PERFORMANCE", "TACTICAL", "ENDURANCE"];
          setEvents(
            data.events.map((e: Record<string, unknown>, i: number) => ({
              title: e.title as string,
              desc: (e.description as string) || "",
              image: (e.banner_url as string) || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
              tag: sectorTags[i % sectorTags.length],
              sectorId: `SECTOR—${String(i + 1).padStart(2, "0")}`,
            }))
          );
        }
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  const navigate = useCallback((dir: number) => {
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return events.length - 1;
      if (next >= events.length) return 0;
      return next;
    });
  }, [events.length]);

  const getOffset = (index: number) => {
    const rawOffset = index - current;
    if (rawOffset > 1) return rawOffset - events.length;
    if (rawOffset < -1) return rawOffset + events.length;
    return rawOffset;
  };

  return (
    <>
      {/* ═══ SECTION TITLE ═══ */}
      <motion.div
        className="relative z-30 text-center mb-14 md:mb-20 px-4 w-full"
        initial={!shouldReduceMotion ? { opacity: 0, y: 36 } : {}}
        whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top label */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
          <p
            className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-bold"
            style={{ fontFamily: "var(--font-tactical)", color: "#FF204E", opacity: 0.7 }}
          >
            ◆ ACTIVE ZONES ◆
          </p>
          <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
        </div>

        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.02em] relative z-10"
          style={{
            fontFamily: "var(--font-heading)",
            color: "#F5F5F5",
            textShadow: "0 0 40px rgba(255,32,78,0.12), 0 4px 10px rgba(0,0,0,0.8)",
          }}
        >
          COMBAT{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #FF204E, #FF2E63, #FF4D6D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 18px rgba(255,32,78,0.2))",
            }}
          >
            SECTORS
          </span>
        </h2>

        <p
          className="text-sm md:text-base mt-4 max-w-lg mx-auto"
          style={{ color: "rgba(245,245,245,0.45)", fontFamily: "var(--font-body)" }}
        >
          Choose your battlefield and survive the challenge.
        </p>
      </motion.div>

      {/* ═══ CAROUSEL ═══ */}
      <div
        className="relative z-30 w-full max-w-[1400px] flex items-center justify-center h-[480px] sm:h-[520px] md:h-[560px] [perspective:2000px]"
      >
        <div className="relative w-full h-full flex items-center justify-center transform-gpu">
          {events.map((event, index) => {
            const offset = getOffset(index);
            if (Math.abs(offset) > 1) return null;

            const isActive = offset === 0;

            const x = offset === 0 ? "0%" : offset === 1 ? "108%" : "-108%";
            const y = isActive ? 0 : 16;
            const scale = offset === 0 ? 1 : isLowPower ? 0.92 : 0.88;
            const rotateY = offset === 0 ? 0 : offset === 1 ? -8 : 8;
            const rotateX = isActive ? 6 : 10;
            const rotateZ = offset === 0 ? 0 : offset === 1 ? 1.5 : -1.5;
            const opacity = offset === 0 ? 1 : 0.5;
            const zIndex = offset === 0 ? 40 : 20;

            return (
              <motion.article
                key={index}
                onClick={() => { if (!isActive) navigate(offset); }}
                className="absolute w-[82%] sm:w-[55%] md:w-[40%] lg:w-[32%] aspect-[3/4] md:aspect-[4/5] flex flex-col justify-end cursor-pointer group"
                initial={false}
                animate={{ x, y, scale, rotateY, rotateX, rotateZ, opacity, zIndex }}
                transition={{
                  duration: shouldReduceMotion ? 0 : isLowPower ? 0.35 : 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={shouldAnimate && isActive ? { y: -3, scale: 1.008 } : {}}
                style={{
                  background: "linear-gradient(145deg, rgba(9,9,15,0.9), rgba(18,7,11,0.95))",
                  border: isActive ? "1px solid rgba(255,32,78,0.3)" : "1px solid rgba(255,32,78,0.08)",
                  borderRadius: "4px",
                  boxShadow: isActive
                    ? "0 25px 50px rgba(0,0,0,0.7), 0 0 30px rgba(255,32,78,0.08)"
                    : "0 15px 30px rgba(0,0,0,0.5)",
                  transition: "box-shadow 0.4s ease, border-color 0.4s ease",
                  willChange: "transform, opacity",
                }}
              >
                {/* Tactical corners */}
                <TacticalCorner position="tl" />
                <TacticalCorner position="tr" />
                <TacticalCorner position="bl" />
                <TacticalCorner position="br" />

                {/* Active crimson glow */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-[4px] pointer-events-none z-0"
                    style={{ background: "radial-gradient(circle at center, rgba(255,32,78,0.05) 0%, transparent 65%)" }}
                    animate={shouldAnimate ? { opacity: [0.4, 0.8, 0.4] } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                {/* Top crimson line */}
                <div
                  className="absolute inset-x-0 top-0 h-px pointer-events-none z-20"
                  style={{
                    background: isActive
                      ? "linear-gradient(90deg, transparent, rgba(255,32,78,0.5), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(255,32,78,0.1), transparent)",
                  }}
                />

                {/* Scanline overlay */}
                <div
                  className="absolute inset-0 rounded-[4px] pointer-events-none z-10 opacity-[0.02]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.04) 1px, rgba(255,255,255,0.04) 2px)",
                  }}
                />

                {/* ═══ CARD CONTENT ═══ */}
                <div className="relative z-20 w-full h-full p-5 sm:p-6 flex flex-col items-center text-center justify-between">
                  {/* Image panel */}
                  <div
                    className="relative w-full h-[45%] md:h-[48%] mb-3 rounded-sm overflow-hidden"
                    style={{
                      border: isActive ? "1px solid rgba(255,32,78,0.2)" : "1px solid rgba(255,32,78,0.06)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    }}
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 640px) 75vw, (max-width: 768px) 50vw, (max-width: 1024px) 35vw, 280px"
                      priority={index === 0}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    {/* Dark overlay */}
                    <div
                      className="absolute inset-0 z-10"
                      style={{
                        background: isActive
                          ? "linear-gradient(to top, rgba(5,5,7,0.85) 0%, rgba(5,5,7,0.2) 50%, transparent 100%)"
                          : "linear-gradient(to top, rgba(5,5,7,0.9) 0%, rgba(5,5,7,0.4) 60%, rgba(5,5,7,0.2) 100%)",
                      }}
                    />
                    {/* Crimson edge */}
                    <div
                      className="absolute top-0 inset-x-0 h-px z-20"
                      style={{
                        background: isActive
                          ? "linear-gradient(90deg, transparent, rgba(255,32,78,0.4), transparent)"
                          : "linear-gradient(90deg, transparent, rgba(255,32,78,0.1), transparent)",
                      }}
                    />
                    {/* Sector ID in image */}
                    <div className="absolute bottom-2 left-2 z-20">
                      <span
                        className="text-[7px] tracking-[0.3em] uppercase font-bold"
                        style={{ color: "rgba(255,32,78,0.5)", fontFamily: "var(--font-tactical)" }}
                      >
                        {event.sectorId}
                      </span>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col items-center flex-1 w-full justify-center">
                    {/* Tag */}
                    <div
                      className="px-3 py-1 mb-3 rounded-sm text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-bold"
                      style={{
                        background: isActive ? "rgba(255,32,78,0.1)" : "rgba(255,32,78,0.04)",
                        border: isActive ? "1px solid rgba(255,32,78,0.3)" : "1px solid rgba(255,32,78,0.1)",
                        color: isActive ? "#FF204E" : "rgba(255,32,78,0.5)",
                        fontFamily: "var(--font-tactical)",
                      }}
                    >
                      {event.tag}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl font-black mb-2"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: isActive ? "#F5F5F5" : "rgba(245,245,245,0.6)",
                        textShadow: isActive ? "0 0 20px rgba(255,32,78,0.1)" : "none",
                      }}
                    >
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-[11px] sm:text-xs line-clamp-2 mb-4 max-w-[90%] leading-relaxed"
                      style={{ color: "rgba(245,245,245,0.35)" }}
                    >
                      {event.desc}
                    </p>

                    {/* CTA — active only */}
                    <div
                      className="mt-auto"
                      style={{
                        opacity: isActive ? 1 : 0,
                        pointerEvents: isActive ? "auto" : "none",
                        transform: isActive ? "translateY(0)" : "translateY(8px)",
                        transition: "opacity 0.4s ease, transform 0.4s ease",
                      }}
                    >
                      <button
                        className="culling-btn-primary flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-[0.15em]"
                        style={{
                          background: "rgba(255,32,78,0.08)",
                          border: "1px solid rgba(255,32,78,0.35)",
                          color: "#F5F5F5",
                          fontFamily: "var(--font-heading)",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Crosshair size={13} className="text-[#FF204E] opacity-70" />
                        <span>Enter Sector</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom line */}
                <div
                  className="absolute inset-x-0 bottom-0 h-px pointer-events-none z-20"
                  style={{
                    background: isActive
                      ? "linear-gradient(90deg, transparent, rgba(255,32,78,0.3), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(255,32,78,0.06), transparent)",
                  }}
                />
              </motion.article>
            );
          })}
        </div>

        {/* ═══ NAVIGATION BUTTONS ═══ */}
        <div className="absolute top-1/2 left-1 sm:left-4 md:left-10 -translate-y-1/2 z-40">
          <button
            onClick={() => navigate(-1)}
            aria-label="Previous sector"
            className="culling-nav-btn relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-sm overflow-hidden group"
            style={{
              background: "rgba(9,9,15,0.7)",
              border: "1px solid rgba(255,32,78,0.15)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              transition: "all 0.3s ease",
            }}
          >
            <ChevronLeft size={18} className="text-[rgba(245,245,245,0.5)] relative z-10 transition-colors duration-300 group-hover:text-[#FF204E]" />
          </button>
        </div>

        <div className="absolute top-1/2 right-1 sm:right-4 md:right-10 -translate-y-1/2 z-40">
          <button
            onClick={() => navigate(1)}
            aria-label="Next sector"
            className="culling-nav-btn relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-sm overflow-hidden group"
            style={{
              background: "rgba(9,9,15,0.7)",
              border: "1px solid rgba(255,32,78,0.15)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              transition: "all 0.3s ease",
            }}
          >
            <ChevronRight size={18} className="text-[rgba(245,245,245,0.5)] relative z-10 transition-colors duration-300 group-hover:text-[#FF204E]" />
          </button>
        </div>

        {/* Sector indicator dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
          {events.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to sector ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === current ? 24 : 6,
                height: 6,
                borderRadius: 2,
                background: i === current ? "#FF204E" : "rgba(255,32,78,0.2)",
                boxShadow: i === current ? "0 0 8px rgba(255,32,78,0.4)" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
