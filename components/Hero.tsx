"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import { easing, duration } from "@/lib/motionPresets";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Narrative intro lines ── */
const INTRO_LINES = [
  "Beyond the dunes...",
  "Where technology meets mysticism...",
  "A new world awakens...",
];

/* ── Lantern config ── */
const LANTERNS = [
  { x: "62%", delay: 0, size: 18, dur: 7 },
  { x: "72%", delay: 2, size: 14, dur: 9 },
  { x: "80%", delay: 4, size: 10, dur: 8 },
  { x: "55%", delay: 1, size: 12, dur: 10 },
  { x: "90%", delay: 3, size: 8,  dur: 11 },
];

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [introPhase, setIntroPhase] = useState(0); // 0-3 (lines), then 4 = main
  const containerRef = useRef<HTMLDivElement>(null);
  const heroFogRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const { isLowPower, isMounted } = usePerformanceMode();

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse tracking (normalized 0-1)
  useEffect(() => {
    const handle = (e: MouseEvent) =>
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  // Cinematic intro sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setIntroPhase(1), 400),
      setTimeout(() => setIntroPhase(2), 1600),
      setTimeout(() => setIntroPhase(3), 2800),
      setTimeout(() => setIntroPhase(4), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // GSAP cinematic atmosphere system
  useEffect(() => {
    if (!isMounted) return;
    
    const ctx = gsap.context(() => {
      // Disable heavy ambient breathing on mobile
      if (!isLowPower) {
        // Ambient glow breathing
        if (ambientGlowRef.current) {
          gsap.to(ambientGlowRef.current, { scale: 1.1, opacity: 0.8, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 });
        }
        // Hero fog organic drift
        if (heroFogRef.current) {
          gsap.fromTo(heroFogRef.current, { opacity: 0 }, { opacity: 1, duration: 3, delay: 0.2, ease: "power2.out" });
          gsap.to(heroFogRef.current, { x: "5%", duration: 20, ease: "sine.inOut", yoyo: true, repeat: -1 });
        }
      } else {
        // Just fade in fog without movement on mobile
        if (heroFogRef.current) {
          gsap.fromTo(heroFogRef.current, { opacity: 0 }, { opacity: 0.8, duration: 2, ease: "power2.out" });
        }
      }

      // Scroll-driven glow intensity modulation
      if (containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => {
            const intensity = 1 - self.progress * 0.5;
            document.documentElement.style.setProperty("--glow-intensity", String(intensity.toFixed(2)));
          },
        });
      }
    });

    return () => ctx.revert();
  }, [isLowPower, isMounted]);

  // Stars — stable across renders
  const stars = useMemo(
    () =>
      Array.from({ length: isLowPower ? 20 : 60 }, (_, i) => ({
        id: i,
        x: `${(i * 17 + 3) % 100}%`,
        y: `${(i * 13 + 7) % 75}%`,
        size: ((i * 7) % 3) + 1,
        opacity: ((i * 11) % 25 + 8) / 100,
        dur: 3 + ((i * 7) % 5),
        delay: (i * 0.3) % 5,
      })),
    [isLowPower]
  );

  const activeLanterns = isLowPower ? LANTERNS.slice(0, 2) : LANTERNS;
  const mainVisible = introPhase >= 4;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* ═══════════ ATMOSPHERIC LAYERS ═══════════ */}

      {/* Stars */}
      <div className="absolute inset-0" aria-hidden="true">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full"
            style={{
              width: s.size, height: s.size,
              left: s.x, top: s.y,
              background: "var(--gold-primary)",
              opacity: s.opacity,
              animation: `glow-pulse ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Ambient glow — left side warm (GSAP breathing) */}
      <div
        ref={ambientGlowRef}
        className="absolute left-[-10%] top-[20%] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, var(--gold-dim) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      {/* Ambient glow — right side moonlight/purple */}
      <div
        className="absolute right-[-5%] top-[10%] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, var(--accent-purple-dim) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      {/* Mouse-reactive glow */}
      <div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full hidden md:block will-change-transform"
        style={{
          background: "radial-gradient(circle, var(--moon-subtle) 0%, transparent 70%)",
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: "translate(-50%, -50%)",
          transition: "left 200ms linear, top 200ms linear",
        }}
        aria-hidden="true"
      />

      {/* Film noise */}
      <div className="absolute inset-0 bg-noise" aria-hidden="true" />

      {/* Geometric overlay — subtle Islamic pattern */}
      <div className="bg-pattern-arabian" aria-hidden="true" />

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-40 z-[4]"
        style={{ background: "linear-gradient(to top, var(--bg-primary), transparent)" }}
        aria-hidden="true"
      />

      {/* ═══════════ INTRO SEQUENCE OVERLAY ═══════════ */}
      <AnimatePresence>
        {introPhase < 4 && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: easing.cinematic }}
          >
            <div className="text-center">
              {INTRO_LINES.map((line, i) => (
                <motion.p
                  key={i}
                  className="text-lg md:text-2xl lg:text-3xl font-light tracking-widest mb-4"
                  style={{
                    fontFamily: "var(--font-arabian)",
                    color: "var(--gold-primary)",
                  }}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={
                    introPhase > i
                      ? { opacity: introPhase === i + 1 ? 1 : 0.3, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: 20, filter: "blur(8px)" }
                  }
                  transition={{ duration: 0.9, ease: easing.expoOut }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ MAIN CONTENT — SPLIT LAYOUT ═══════════ */}
      <motion.div
        className="relative z-10 section-container min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 px-4 sm:px-6 pt-32 pb-28 lg:pt-28 lg:pb-24"
        style={{ y: contentY, opacity: fadeOut }}
      >
        {/* ──── LEFT: Storytelling Content ──── */}
        <motion.div
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl"
          initial={{ opacity: 0 }}
          animate={mainVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative pre-title */}
          <motion.p
            className="text-[10px] md:text-xs tracking-[0.5em] uppercase mb-5 lg:mb-6"
            style={{ fontFamily: "var(--font-arabian)", color: "var(--gold-primary)" }}
            initial={{ opacity: 0, y: 15 }}
            animate={mainVisible ? { opacity: 0.7, y: 0 } : {}}
            transition={{ duration: duration.slow, delay: 0.1, ease: easing.expoOut }}
          >
            ✦ The Mystical Techno-Cultural Festival ✦
          </motion.p>

          {/* Main heading */}
          <motion.h1
            className="text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.5rem] font-extrabold leading-[0.9] tracking-tighter"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={mainVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: easing.expoOut }}
          >
            <span style={{ color: "var(--text-primary)" }}>Riviera</span>
            <br />
            <span
              className="text-gradient-gold inline-block"
              style={{ filter: "drop-shadow(0 0 40px rgba(212, 160, 23, 0.25))" }}
            >
              2026
            </span>
          </motion.h1>

          {/* Arabian Nights subtitle */}
          <motion.h2
            className="text-xl md:text-2xl lg:text-3xl mt-3 md:mt-5 tracking-[0.2em]"
            style={{
              fontFamily: "var(--font-arabian)",
              color: "var(--gold-primary)",
              textShadow: "0 0 50px rgba(212, 160, 23, 0.2)",
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={mainVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: easing.expoOut }}
          >
            <motion.span animate={mainVisible ? { opacity: [0.7, 1, 0.7] } : {}} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              Arabian Nights
            </motion.span>
          </motion.h2>

          {/* Immersive tagline */}
          <motion.p
            className="text-sm md:text-base lg:text-lg mt-6 md:mt-8 max-w-lg leading-relaxed font-light"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0, y: 15 }}
            animate={mainVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7, ease: easing.expoOut }}
          >
            Where innovation awakens beneath the moonlight — a mystical fusion of culture, technology, and imagination.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={mainVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9, ease: easing.expoOut }}
          >
            {/* Primary — Enter The Realm */}
            <Link
              href="/register"
              className="group relative inline-flex items-center justify-between min-w-[230px] pl-8 pr-2 py-2 rounded-full overflow-hidden transition-all duration-300"
              style={{
                border: "1px solid var(--border-gold)",
                background: "var(--gold-subtle)",
                boxShadow: "0 0 30px rgba(212, 160, 23, 0.08)",
              }}
            >
              {/* Shimmer sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(212,160,23,0.12)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              {/* Breathing glow */}
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: "0 0 40px rgba(212, 160, 23, 0.15), inset 0 0 20px rgba(212, 160, 23, 0.05)" }}
              />
              <span className="font-medium tracking-[0.15em] text-sm mr-6 relative z-10 uppercase" style={{ color: "var(--text-primary)" }}>
                Enter The Realm
              </span>
              <div
                className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-400"
                style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-glow-gold-md)" }}
              >
                <ArrowRight size={15} className="text-[#0a0805] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Secondary — Discover The Festival */}
            <Link
              href="/#events"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full transition-all duration-300"
              style={{
                border: "1px solid var(--border-gold)",
                background: "transparent",
                color: "var(--gold-primary)",
              }}
            >
              <Compass size={16} className="group-hover:rotate-45 transition-transform duration-500" style={{ color: "var(--gold-primary)" }} />
              <span className="text-sm font-medium tracking-[0.1em] uppercase">Discover The Festival</span>
            </Link>
          </motion.div>

          {/* Info badges */}
          <motion.div
            className="mt-8 flex flex-wrap gap-4 items-center"
            initial={{ opacity: 0 }}
            animate={mainVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            {[
              { label: "March 25–28", sub: "2026" },
              { label: "HIT Campus", sub: "Haldia" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs"
                style={{ border: "1px solid var(--border)", background: "var(--gold-subtle)", color: "var(--text-muted)" }}
              >
                <span className="font-medium" style={{ color: "var(--gold-primary)" }}>{b.label}</span>
                <span style={{ color: "var(--text-dim)" }}>• {b.sub}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ──── RIGHT: Cinematic Visual World ──── */}
        <motion.div
          className="flex-1 relative w-full max-w-xl lg:max-w-none min-h-[350px] md:min-h-[500px] lg:min-h-0 flex items-center justify-center"
          style={{ y: rightY }}
          initial={{ opacity: 0 }}
          animate={mainVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >

          {/* ── Floating Lanterns ── */}
          {activeLanterns.map((l, i) => (
            <motion.div
              key={i}
              className="absolute z-[8]"
              style={{ left: l.x, bottom: "30%" }}
              animate={{
                y: [0, -120 - i * 30, -250 - i * 20],
                x: [0, (i % 2 === 0 ? 15 : -15), (i % 2 === 0 ? -10 : 20)],
                opacity: [0, 0.85, 0],
              }}
              transition={{
                duration: l.dur,
                repeat: Infinity,
                delay: l.delay,
                ease: "easeOut",
              }}
            >
              {/* Lantern body */}
              <div className="relative flex flex-col items-center">
                <div
                  className="rounded-full"
                  style={{
                    width: l.size, height: l.size * 1.3,
                    background: "radial-gradient(ellipse, #FFC857 0%, var(--gold-primary) 60%, transparent 100%)",
                    boxShadow: `0 0 ${l.size * 2}px var(--gold-glow), 0 0 ${l.size * 4}px var(--gold-dim)`,
                  }}
                />
                {/* Lantern glow halo */}
                <div
                  className="absolute -inset-2 rounded-full"
                  style={{
                    background: "radial-gradient(circle, var(--gold-subtle) 0%, transparent 70%)",
                  }}
                />
              </div>
            </motion.div>
          ))}

          {/* ── Desert fog wisps — GSAP drift (x+opacity) ── */}
          <div
            ref={heroFogRef}
            className="absolute bottom-[10%] right-0 w-[120%] h-[40%]"
            aria-hidden="true"
          >
            <div
              className="w-full h-full"
              style={{
                background: "radial-gradient(ellipse at 50% 80%, var(--accent-purple-subtle) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
          </div>

          {/* ── Geometric overlay (subtle Islamic pattern ring) ── */}
          <motion.div
            className="absolute z-[5] w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full opacity-[0.04]"
            style={{
              border: "1px solid var(--gold-primary)",
              right: "10%",
              top: "15%",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {/* Inner decorative ring */}
            <div
              className="absolute inset-4 rounded-full"
              style={{ border: "1px dashed var(--gold-primary)", opacity: 0.5 }}
            />
            <div
              className="absolute inset-10 rounded-full"
              style={{ border: "1px solid var(--gold-primary)", opacity: 0.3 }}
            />
          </motion.div>

          {/* ── Floating embers (right side) ── */}
          {Array.from({ length: isLowPower ? 2 : 8 }).map((_, i) => (
            <motion.div
              key={`ember-${i}`}
              className="absolute rounded-full z-[6]"
              style={{
                width: 2 + (i % 3),
                height: 2 + (i % 3),
                background: "var(--gold-light)",
                right: `${15 + (i * 10) % 60}%`,
                bottom: `${20 + (i * 7) % 40}%`,
              }}
              animate={{
                y: [0, -(60 + i * 20)],
                opacity: [0, 0.7, 0],
                x: [(i % 2 === 0 ? 0 : 10), (i % 2 === 0 ? 15 : -10)],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* ═══════════ SCROLL INDICATOR ═══════════ */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={mainVisible ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
          style={{ border: "1px solid var(--border-gold)" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: "var(--gold-primary)" }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}