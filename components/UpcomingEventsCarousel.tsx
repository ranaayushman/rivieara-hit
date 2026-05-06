"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import { Compass, Sparkles } from "lucide-react";
import { generateStars, getLanterns, getPerformanceAdjustedParticles } from "@/lib/particleAnimations";
import { motion, useReducedMotion } from "framer-motion";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

interface EventData {
  title: string;
  desc: string;
  image: string;
  tag: string;
}

const fallbackEvents: EventData[] = [
  {
    title: "AI Workshop",
    desc: "Step into the world of AI and explore how intelligent systems are transforming industries in this mystical journey of knowledge.",
    image: "/gallery1.jpg",
    tag: "Workshop",
  },
  {
    title: "Hackathon",
    desc: "A 24-hour coding trial. Build, innovate, and compete with the finest minds in an enchanted atmosphere of creation.",
    image: "/gallery2.jpg",
    tag: "Competition",
  },
  {
    title: "Cultural Night",
    desc: "Unforgettable performances with electrifying vibes. Experience the grandest royal celebration of the region.",
    image: "/gallery3.jpg",
    tag: "Cultural",
  },
];

const FALLBACK_IMAGES = ["/gallery1.jpg", "/gallery2.jpg", "/gallery3.jpg", "/gallery4.jpg"];

export default function UpcomingEventsCarousel() {
  const [events, setEvents] = useState<EventData[]>(fallbackEvents);
  const [current, setCurrent] = useState(0);

  const { isLowPower, isMounted } = usePerformanceMode();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    fetch("/api/public/events")
      .then((r) => r.json())
      .then((data) => {
        if (data.events && data.events.length > 0) {
          setEvents(
            data.events.map((e: Record<string, unknown>, i: number) => ({
              title: e.title as string,
              desc: (e.description as string) || "",
              image: (e.banner_url as string) || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
              tag: (e.tag as string) || "Event",
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

  // ── PARTICLES ──
  const stars = useMemo(
    () => {
      const { starCount } = getPerformanceAdjustedParticles(false);
      // Even further reduce stars for this section to keep it minimal
      return generateStars(Math.floor(starCount / 3));
    },
    []
  );

  const activeLanterns = useMemo(
    () => getLanterns(getPerformanceAdjustedParticles(false).lanternCount),
    []
  );

  return (
    <>
      {/* 3. Ambient Background Glow (Static/Simplified) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none z-0 mix-blend-screen"
        style={{ background: "radial-gradient(circle, rgba(212,160,23,0.04) 0%, transparent 60%)" }}
      />

      {/* ── PARTICLE LAYERS ── */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {/* Stars (Minimal Atmospheric Particles) */}
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full"
            style={{
              width: s.size,
              height: s.size,
              left: s.x,
              top: s.y,
              background: "var(--gold-primary)",
              opacity: s.opacity,
              willChange: "opacity"
            }}
            animate={!shouldReduceMotion && !isLowPower ? { opacity: [s.opacity, s.opacity * 0.3, s.opacity] } : {}}
            transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* Lanterns */}
        {activeLanterns.map((l, i) => (
          <div
            key={i}
            className="absolute z-[8]"
            style={{ left: l.x, bottom: "30%", opacity: 0.8 }}
          >
            <div
              className="rounded-full"
              style={{
                width: l.size,
                height: l.size * 1.3,
                background: "radial-gradient(ellipse, #FFC857 0%, var(--gold-primary) 60%, transparent 100%)",
                boxShadow: "0 0 20px rgba(212,160,23,0.4)",
              }}
            />
          </div>
        ))}
      </div>

      {/* ================= SECTION ENTRANCE REVEAL ================= */}
      <motion.div
        className="relative z-30 text-center mb-16 md:mb-24 px-4 w-full"
        initial={!shouldReduceMotion ? { opacity: 0, y: 40 } : {}}
        whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p
          className="text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold"
          style={{ fontFamily: "var(--font-arabian)", color: "var(--gold-primary)" }}
        >
          ✦ Discover The Realm ✦
        </p>

        <div className="">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight relative z-10"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
              textShadow: "0 0 40px rgba(212,160,23,0.5), 0 4px 10px rgba(0,0,0,0.8)"
            }}
          >
            Upcoming Events
          </h2>
        </div>
      </motion.div>


      {/* ================= FLOATING CARPET CAROUSEL ================= */}
      <div
        className="relative z-30 w-full max-w-[1400px] flex items-center justify-center h-[450px] sm:h-[500px] md:h-[550px] [perspective:2500px]"
      >
        <div className="relative w-full h-full flex items-center justify-center transform-gpu">
          {events.map((event, index) => {
            const offset = getOffset(index);
            if (Math.abs(offset) > 1) return null;

            const isActive = offset === 0;

            const x = offset === 0 ? "0%" : offset === 1 ? "110%" : "-110%";
            const y = isActive ? 0 : 20;
            const scale = offset === 0 ? 1 : (isLowPower ? 0.94 : 0.9);
            const rotateY = offset === 0 ? 0 : offset === 1 ? -12 : 12;
            const rotateX = isActive ? 10 : 15;
            const rotateZ = offset === 0 ? 0 : offset === 1 ? 2 : -2;
            const opacity = offset === 0 ? 1 : 0.68;
            const zIndex = offset === 0 ? 40 : 20;

            return (
              <motion.article
                key={index}
                onClick={() => { if (!isActive) navigate(offset); }}
                className="absolute w-[80%] sm:w-[55%] md:w-[40%] lg:w-[32%] aspect-[3/4] md:aspect-[4/5] flex flex-col justify-end cursor-pointer group"
                initial={false}
                animate={{
                  x,
                  y,
                  scale,
                  rotateY,
                  rotateX,
                  rotateZ,
                  opacity,
                  zIndex,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : (isLowPower ? 0.4 : 0.75),
                  ease: "easeOut",
                }}
                whileHover={(!shouldReduceMotion && !isLowPower && isActive) ? {
                  y: -4,
                  scale: 1.01,
                } : {}}
                style={{
                  background: "var(--gradient-card)",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderBottomWidth: "10px",
                  borderRadius: "20px",
                  transformStyle: "preserve-3d",
                  boxShadow: isActive ? "0 30px 60px rgba(0,0,0,0.8), 0 0 50px rgba(212,160,23,0.15)" : "0 20px 40px rgba(0,0,0,0.6)",
                  borderColor: isActive ? "var(--gold-primary)" : "var(--border-gold)",
                  borderBottomColor: isActive ? "rgba(160,110,10,1)" : "rgba(80,50,5,1)",
                  transition: "box-shadow 0.5s ease-out, border-color 0.5s ease-out",
                  willChange: "transform, opacity",
                }}
              >
                {/* Active Card Focus Animation (Warm Glow) */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-[20px] pointer-events-none z-0 opacity-50"
                    style={{ background: "radial-gradient(circle at center, rgba(212,160,23,0.1) 0%, transparent 70%)" }}
                  />
                )}

                {/* === Carpet Ornamental Layers === */}
                <div className="absolute inset-2 border border-[rgba(212,160,23,0.2)] rounded-xl pointer-events-none z-10" />
                <div className="absolute inset-4 border border-[rgba(212,160,23,0.1)] rounded-lg pointer-events-none bg-pattern-arabian opacity-15 mix-blend-overlay z-10" />

                {/* Corner Gold Ornaments */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[rgba(212,160,23,0.5)] rounded-tl-lg z-10" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[rgba(212,160,23,0.5)] rounded-tr-lg z-10" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[rgba(212,160,23,0.5)] rounded-bl-lg z-10" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[rgba(212,160,23,0.5)] rounded-br-lg z-10" />

                {/* === Floating Cinematic Content === */}
                <div
                  className="relative z-20 w-full h-full p-6 sm:p-8 flex flex-col items-center text-center justify-between"
                  style={{ transform: "translateZ(40px)" }}
                >
                  {/* Holographic Image Panel */}
                  <div className="relative w-full h-[45%] md:h-[50%] mb-4 rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-[rgba(212,160,23,0.4)]">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Magical Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--surface-glass)] to-transparent z-10" />
                    {/* Top highlight */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,160,23,0.8)] to-transparent z-20" />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col items-center flex-1 w-full justify-center">
                    <div className="px-4 py-1.5 mb-3 rounded-full border border-[rgba(212,160,23,0.4)] bg-[rgba(212,160,23,0.8)] text-[10px] sm:text-xs uppercase tracking-widest text-[var(--bg-primary)] shadow-[0_0_15px_rgba(212,160,23,0.2)] font-bold">
                      {event.tag}
                    </div>

                    <h3
                      className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white"
                      style={{ fontFamily: "var(--font-heading)", textShadow: "0 4px 20px rgba(0,0,0,0.9)" }}
                    >
                      {event.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 mb-4 max-w-[95%] leading-relaxed font-light">
                      {event.desc}
                    </p>

                    {/* Static CTA */}
                    <div 
                      className="mt-auto transition-all duration-500" 
                      style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none', transform: isActive ? 'translateY(0)' : 'translateY(10px)' }}
                    >
                      <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[rgba(212,160,23,0.1)] to-[rgba(139,94,0,0.2)] border border-[rgba(212,160,23,0.6)] text-[var(--gold-light)] text-sm font-semibold shadow-[0_0_20px_rgba(212,160,23,0.3)] transition-colors duration-300 hover:bg-[rgba(212,160,23,0.2)]">
                        <Sparkles size={16} />
                        <span>Enter Experience</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ================= MAGICAL NAVIGATION SIGILS ================= */}
        <div className="absolute top-1/2 left-2 sm:left-6 md:left-12 -translate-y-1/2 z-40">
          <button
            onClick={() => navigate(-1)}
            aria-label="Previous event"
            className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full overflow-hidden group"
          >
            {/* Glass Background */}
            <div className="absolute inset-0 bg-[var(--surface-glass)] backdrop-blur-md border border-[var(--border-gold)] rounded-full transition-colors duration-300 group-hover:bg-[rgba(212,160,23,0.1)]" />
            <Compass size={24} className="text-[var(--gold-primary)] relative z-10 -scale-x-100 transition-transform duration-300 group-hover:scale-110" />
          </button>
        </div>

        <div className="absolute top-1/2 right-2 sm:right-6 md:right-12 -translate-y-1/2 z-40">
          <button
            onClick={() => navigate(1)}
            aria-label="Next event"
            className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full overflow-hidden group"
          >
            {/* Glass Background */}
            <div className="absolute inset-0 bg-[var(--surface-glass)] backdrop-blur-md border border-[var(--border-gold)] rounded-full transition-colors duration-300 group-hover:bg-[rgba(212,160,23,0.1)]" />
            <Compass size={24} className="text-[var(--gold-primary)] relative z-10 transition-transform duration-300 group-hover:scale-110" />
          </button>
        </div>

      </div>
    </>
  );
}
