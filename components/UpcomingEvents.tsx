"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

/**
 * Cinematic Floating Carpet Experience
 * Replaces the traditional carousel with a magical Arabian Nights 3D diorama.
 * Features:
 * - Layered background (moon, fog, light rays, desert horizon)
 * - GSAP-driven environmental atmospheric loops (swaying lanterns, floating container)
 * - ScrollTrigger fog reveal
 * - Framer Motion 3D floating carpet interactions
 */
export default function UpcomingEvents() {
  const [events, setEvents] = useState<EventData[]>(fallbackEvents);
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const lanternsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => navigate(1), 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, navigate]);

  const getOffset = (index: number) => {
    const rawOffset = index - current;
    if (rawOffset > 1) return rawOffset - events.length;
    if (rawOffset < -1) return rawOffset + events.length;
    return rawOffset;
  };

  // GSAP Cinematic Animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. ScrollReveal: Fog parts slowly as user scrolls into view
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1.5,
        onUpdate: (self) => {
          if (fogRef.current) {
            // Opacity goes from 1 to 0
            gsap.set(fogRef.current, { opacity: 1 - self.progress });
          }
        }
      });

      // 2. Continuous Carpet Container Floating
      if (carouselRef.current) {
        gsap.to(carouselRef.current, {
          y: "-8px",
          duration: 6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // 3. Hanging Lanterns Swaying
      if (lanternsRef.current?.children) {
        gsap.utils.toArray(lanternsRef.current.children).forEach((lantern: any, i) => {
          gsap.to(lantern, {
            rotation: i % 2 === 0 ? 2.5 : -2.5,
            x: i % 2 === 0 ? 3 : -3,
            duration: 5 + i * 0.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            transformOrigin: "top center",
            delay: i * 0.2,
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center py-24 sm:py-32"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      {/* 1. Deep Arabian Night Sky */}
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at top center, var(--bg-deep) 0%, var(--bg-primary) 80%)" }} />

      {/* 2. Giant Glowing Moon */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-15 blur-3xl pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, var(--moon-glow) 0%, transparent 60%)" }}
      />
      <div
        className="absolute top-[5%] right-[5%] w-[150px] h-[150px] md:w-[250px] md:h-[250px] rounded-full pointer-events-none z-0 pulse-slow"
        style={{ background: "radial-gradient(circle, var(--moon-light) 0%, transparent 60%)", filter: "blur(40px)", opacity: 0.2 }}
      />

      {/* 3. Volumetric Light Rays (CSS Magic) */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen"
        style={{
          background: "conic-gradient(from 180deg at 50% -20%, var(--moon-dim) 0deg, transparent 40deg, var(--moon-subtle) 80deg, transparent 120deg, var(--moon-dim) 160deg, transparent 360deg)",
        }}
      />

      {/* 4. Desert Horizon Gradient */}
      <div
        className="absolute bottom-0 inset-x-0 h-[40%] z-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--bg-primary) 0%, var(--surface-glass) 30%, transparent 100%)",
        }}
      />

      {/* 5. GSAP Cinematic Fog Reveal Layer */}
      <div
        ref={fogRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--surface-glass) 100%)" }}
      />

      {/* 6. Foreground Hanging Lanterns */}
      <div ref={lanternsRef} className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[10, 25, 75, 90].map((left, i) => (
          <div key={i} className="absolute top-[-20px] will-change-transform" style={{ left: `${left}%` }}>
            {/* Chain */}
            <div className="w-[2px] h-[120px] md:h-[180px] bg-gradient-to-b from-black to-[rgba(212,160,23,0.4)] mx-auto" />
            {/* Lantern Body */}
            <div className="w-8 h-12 md:w-10 md:h-14 rounded-lg relative flex items-center justify-center shadow-[0_0_20px_var(--gold-glow)]" style={{ background: "var(--surface-glass)", border: "1px solid var(--border-gold)" }}>
              {/* Flame */}
              <div className="w-3 h-5 md:w-4 md:h-6 bg-[var(--gold-light)] rounded-full blur-[2px] animate-[glow-pulse_2s_infinite]" />
              {/* Ambient Glow Cast */}
              <div className="absolute inset-0 rounded-full blur-[40px] bg-[var(--gold-glow)] w-[120px] h-[120px] md:w-[200px] md:h-[200px] -left-[44px] -top-[44px] md:-left-[80px] md:-top-[80px]" />
            </div>
          </div>
        ))}
      </div>


      {/* ================= LUXURY HEADING ================= */}
      <div className="relative z-30 text-center mb-16 md:mb-24 px-4 w-full">
        <motion.p
          className="text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold"
          style={{ fontFamily: "var(--font-arabian)", color: "var(--gold-primary)" }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          ✦ Discover The Realm ✦
        </motion.p>

        <motion.div
          className=""
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
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
          {/* Shimmer sweep effect on heading */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-transparent translate-x-[-100%] animate-[shimmer_4s_infinite] pointer-events-none z-20 mix-blend-overlay" />
        </motion.div>
      </div>


      {/* ================= FLOATING CARPET CAROUSEL ================= */}
      <div
        className="relative z-30 w-full max-w-[1400px] flex items-center justify-center h-[450px] sm:h-[500px] md:h-[550px] [perspective:2500px]"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div ref={carouselRef} className="relative w-full h-full flex items-center justify-center transform-gpu">
          <AnimatePresence mode="popLayout">
            {events.map((event, index) => {
              const offset = getOffset(index);
              if (Math.abs(offset) > 1) return null;

              const isActive = offset === 0;

              return (
                <motion.article
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    x: offset === 0 ? "0%" : offset === 1 ? "56%" : "-56%",
                    y: isActive ? [0, -8, 0] : [28, 22, 28],
                    scale: offset === 0 ? 1 : 0.82,
                    rotateY: offset === 0 ? 0 : offset === 1 ? -16 : 16,
                    rotateX: isActive ? 10 : 15,
                    rotateZ: offset === 0 ? 0 : offset === 1 ? 2 : -2,
                    opacity: offset === 0 ? 1 : 0.68,
                    zIndex: offset === 0 ? 40 : 20,
                  }}
                  whileHover={isActive ? {
                    y: -10,
                    rotateX: 7,
                    scale: 1.03,
                    boxShadow: "0 50px 80px rgba(0,0,0,0.9), 0 0 80px rgba(212,160,23,0.3)"
                  } : undefined}
                  transition={{
                    x: { type: "spring", stiffness: 105, damping: 18, mass: 0.9 },
                    y: { duration: isActive ? 4.8 : 5.8, ease: "easeInOut", repeat: Infinity },
                    scale: { type: "spring", stiffness: 120, damping: 20 },
                    rotateY: { type: "spring", stiffness: 95, damping: 18 },
                    rotateX: { type: "spring", stiffness: 95, damping: 18 },
                    rotateZ: { type: "spring", stiffness: 90, damping: 18 },
                    opacity: { duration: 0.45, ease: "easeOut" },
                  }}
                  onClick={() => { if (!isActive) navigate(offset); }}
                  className="absolute w-[85%] sm:w-[60%] md:w-[45%] lg:w-[35%] aspect-[3/4] md:aspect-[4/5] flex flex-col justify-end cursor-pointer group will-change-transform"
                  style={{
                    // Carpet Material Styling
                    background: "var(--gradient-card)",
                    border: `2px solid ${isActive ? "var(--gold-primary)" : "var(--border-gold)"}`,
                    borderBottom: `10px solid ${isActive ? "rgba(160,110,10,1)" : "rgba(80,50,5,1)"}`, // Thick carpet edge
                    borderRadius: "20px",
                    boxShadow: isActive ? "0 30px 60px rgba(0,0,0,0.8), 0 0 50px rgba(212,160,23,0.15)" : "0 20px 40px rgba(0,0,0,0.6)",
                    transformStyle: "preserve-3d" // Allows content to float above
                  }}
                >
                  {/* === Carpet Ornamental Layers === */}
                  <div className="absolute inset-2 border border-[rgba(212,160,23,0.2)] rounded-xl pointer-events-none" />
                  <div className="absolute inset-4 border border-[rgba(212,160,23,0.1)] rounded-lg pointer-events-none bg-pattern-arabian opacity-15 mix-blend-overlay" />

                  {/* Corner Gold Ornaments */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[rgba(212,160,23,0.5)] rounded-tl-lg" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[rgba(212,160,23,0.5)] rounded-tr-lg" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[rgba(212,160,23,0.5)] rounded-bl-lg" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[rgba(212,160,23,0.5)] rounded-br-lg" />

                  {/* Hover Shimmer Sweep */}
                  {/* {isActive && (
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-[rgba(212,160,23,0.15)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2s] ease-in-out pointer-events-none rounded-[20px]" />
                  )} */}

                  {/* === Floating Cinematic Content === */}
                  <div
                    className="relative z-10 w-full h-full p-6 sm:p-8 flex flex-col items-center text-center justify-between"
                    style={{ transform: "translateZ(40px)" }} // 3D floating pop effect
                  >
                    {/* Holographic Image Panel */}
                    <div className="relative w-full h-[45%] md:h-[50%] mb-4 rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)] group-hover:shadow-[0_20px_60px_rgba(212,160,23,0.3)] transition-all duration-500 border border-[rgba(212,160,23,0.4)]">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                      />
                      {/* Magical Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--surface-glass)] to-transparent z-10" />
                      {/* Top highlight */}
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,160,23,0.8)] to-transparent z-20" />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col items-center flex-1 w-full justify-center">
                      <div className="px-4 py-1.5 mb-3 rounded-full border border-[rgba(212,160,23,0.4)] bg-[rgba(212,160,23,0.1)] text-[10px] sm:text-xs uppercase tracking-widest text-[var(--gold-light)] backdrop-blur-md shadow-[0_0_15px_rgba(212,160,23,0.2)]">
                        {event.tag}
                      </div>

                      <h3
                        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white group-hover:text-[var(--gold-light)] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-heading)", textShadow: "0 4px 20px rgba(0,0,0,0.9)" }}
                      >
                        {event.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 mb-4 max-w-[95%] leading-relaxed font-light">
                        {event.desc}
                      </p>

                      {/* Glowing CTA */}
                      {isActive && (
                        <div className="mt-auto">
                          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[rgba(212,160,23,0.1)] to-[rgba(139,94,0,0.2)] border border-[rgba(212,160,23,0.6)] text-[var(--gold-light)] text-sm font-semibold hover:bg-[rgba(212,160,23,0.3)] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(212,160,23,0.3)] group/btn">
                            <Sparkles size={16} className="group-hover/btn:animate-pulse" />
                            <span>Enter Experience</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ================= MAGICAL NAVIGATION SIGILS ================= */}
        <div className="absolute top-1/2 left-2 sm:left-6 md:left-12 -translate-y-1/2 z-40">
          <motion.button
            onClick={() => navigate(-1)}
            aria-label="Previous event"
            className="group relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Glass Background */}
            <div className="absolute inset-0 bg-[var(--surface-glass)] backdrop-blur-md border border-[var(--border-gold)] rounded-full group-hover:border-[var(--gold-primary)] transition-colors duration-300" />
            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle,var(--gold-glow)_0%,transparent_70%)] transition-opacity duration-300" />
            <Compass size={24} className="text-[var(--gold-primary)] group-hover:text-[var(--gold-light)] relative z-10 -scale-x-100 transition-colors" />
          </motion.button>
        </div>

        <div className="absolute top-1/2 right-2 sm:right-6 md:right-12 -translate-y-1/2 z-40">
          <motion.button
            onClick={() => navigate(1)}
            aria-label="Next event"
            className="group relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Glass Background */}
            <div className="absolute inset-0 bg-[var(--surface-glass)] backdrop-blur-md border border-[var(--border-gold)] rounded-full group-hover:border-[var(--gold-primary)] transition-colors duration-300" />
            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle,var(--gold-glow)_0%,transparent_70%)] transition-opacity duration-300" />
            <Compass size={24} className="text-[var(--gold-primary)] group-hover:text-[var(--gold-light)] relative z-10 transition-colors" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
