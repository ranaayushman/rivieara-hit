"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  Variants,
} from "framer-motion";
import { ArrowRight, Shield, Eye } from "lucide-react";
import Link from "next/link";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

/* ── Animation variants ── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const lcpVariants: Variants = {
  hidden: { y: 36 },
  visible: {
    y: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, x: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 },
  },
};

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
      width="16" height="16" viewBox="0 0 16 16"
      className="absolute pointer-events-none"
      style={{ ...pos, transform: `rotate(${rotate}deg)` }}
    >
      <path d="M0 0 L16 0 L16 3 L3 3 L3 16 L0 16 Z" fill="#FF204E" opacity="0.6" />
    </svg>
  );
}

/* ── Countdown Timer ── */
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calc = () => {
      const target = new Date("2026-05-18T00:00:00+05:30").getTime();
      const diff = target - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HRS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEC", value: timeLeft.seconds },
  ];

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-2">
        {["DAYS", "HRS", "MIN", "SEC"].map((l) => (
          <div key={l} className="flex flex-col items-center gap-1.5">
            <div className="w-full h-14 rounded-sm animate-pulse"
              style={{ background: "rgba(255,32,78,0.08)", border: "1px solid rgba(255,32,78,0.15)" }} />
            <span className="text-[9px] tracking-[0.25em] uppercase font-medium"
              style={{ color: "rgba(255,32,78,0.4)", fontFamily: "var(--font-tactical)" }}>{l}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div
            className="relative w-full flex items-center justify-center rounded-sm py-3 overflow-hidden"
            style={{
              background: "rgba(255,32,78,0.06)",
              border: "1px solid rgba(255,32,78,0.2)",
              boxShadow: "0 0 12px rgba(255,32,78,0.08), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(180deg, rgba(255,32,78,0.08) 0%, transparent 100%)" }} />
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                className="relative text-2xl font-bold tabular-nums"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "#F5F5F5",
                  textShadow: "0 0 10px rgba(255,32,78,0.4)",
                }}
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {String(value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-[8px] tracking-[0.3em] uppercase font-semibold"
            style={{ color: "rgba(255,32,78,0.5)", fontFamily: "var(--font-tactical)" }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Ember Particles ── */
function EmberParticles({ isLowPower }: { isLowPower: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const particles = useMemo(() => {
    const count = isLowPower ? 6 : 12;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: `${(i * 23 + 7) % 100}%`,
      y: `${(i * 19 + 11) % 90}%`,
      size: ((i * 5) % 3) + 1.5,
      opacity: ((i * 7) % 15 + 8) / 100,
      dur: 6 + ((i * 3) % 8),
      delay: (i * 0.5) % 4,
    }));
  }, [isLowPower]);

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[2]" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: "radial-gradient(circle, #FF204E, rgba(169,16,50,0.3))",
            boxShadow: `0 0 ${p.size * 2}px rgba(255,32,78,0.3)`,
          }}
          animate={
            !isLowPower
              ? { y: [-6, 6, -6], opacity: [p.opacity, p.opacity * 3, p.opacity] }
              : {}
          }
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN HERO
═══════════════════════════════════════════════ */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLowPower, isMounted } = usePerformanceMode();
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, isLowPower ? -15 : -40]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgDarken = useTransform(scrollYProgress, [0, 0.6], [0, 0.4]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050507 0%, #12070B 40%, #09090F 70%, #050507 100%)" }}
    >
      {/* ── BACKGROUND LAYERS ── */}

      {/* Crimson fog center */}
      <motion.div
        className="absolute top-[20%] left-[30%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(255,32,78,0.06) 0%, transparent 70%)",
          willChange: "transform",
        }}
        animate={!shouldReduceMotion && !isLowPower ? { scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary dark red haze */}
      {!isLowPower && (
        <div
          className="absolute top-[10%] right-[-5%] w-[450px] h-[450px] rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(169,16,50,0.05) 0%, transparent 70%)" }}
        />
      )}

      {/* Tactical grid overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,32,78,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,32,78,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.035] z-0" />

      {/* Diagonal energy streaks */}
      {!isLowPower && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.03]">
          <div
            className="absolute w-[200%] h-[1px]"
            style={{
              top: "30%",
              left: "-20%",
              background: "linear-gradient(90deg, transparent 0%, #FF204E 30%, #FF204E 70%, transparent 100%)",
              transform: "rotate(-15deg)",
            }}
          />
          <div
            className="absolute w-[200%] h-[1px]"
            style={{
              top: "65%",
              left: "-30%",
              background: "linear-gradient(90deg, transparent 0%, #A91032 40%, #A91032 60%, transparent 100%)",
              transform: "rotate(-12deg)",
            }}
          />
        </div>
      )}

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(5,5,7,0.6) 100%)",
        }}
      />

      {/* Scroll darken overlay */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "#050507", opacity: bgDarken }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-40 z-[4] pointer-events-none"
        style={{ background: "linear-gradient(to top, #050507 20%, transparent)" }}
      />

      {/* Ember particles */}
      {isMounted && <EmberParticles isLowPower={isLowPower} />}

      {/* Scanline overlay — very subtle */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      {/* ═══ MAIN CONTENT ═══ */}
      <motion.div
        className="relative z-10 section-container min-h-auto lg:min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0 px-4 sm:px-6 pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-28 lg:pb-[18vh]"
        style={{ y: contentY, opacity: fadeOut }}
      >
        {/* ── LEFT COLUMN ── */}
        <motion.div
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top label */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <div style={{ height: 1, width: 32, background: "rgba(255,32,78,0.35)" }} />
            <p
              className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-semibold"
              style={{ fontFamily: "var(--font-tactical)", color: "#FF204E" }}
            >
              ◆ PROTOCOL INITIATED ◆
            </p>
            <div style={{ height: 1, width: 32, background: "rgba(255,32,78,0.35)" }} />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={lcpVariants}
            className="text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] font-black leading-[0.85] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span style={{ color: "#F5F5F5", textShadow: "0 0 60px rgba(255,32,78,0.15)" }}>
              RIVIERA
            </span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #FF204E 0%, #FF2E63 50%, #FF4D6D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "none",
                filter: "drop-shadow(0 0 30px rgba(255,32,78,0.3))",
              }}
            >
              2026
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl mt-3 tracking-[0.35em] uppercase font-bold"
            style={{
              fontFamily: "var(--font-tactical)",
              color: "rgba(255,32,78,0.85)",
              textShadow: "0 0 20px rgba(255,32,78,0.2)",
            }}
          >
            CULLING GAMES
          </motion.h2>

          {/* Description */}
          <motion.div variants={itemVariants} className="relative mt-6 max-w-lg">
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{
                color: "rgba(245,245,245,0.7)",
                fontFamily: "var(--font-body)",
              }}
            >
              The arena awaits. A convergence of technology, culture, and
              relentless competition — where only the extraordinary survive.
              Three days. One protocol. No mercy.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mt-8">
            {/* Primary CTA */}
            <Link
              href="https://forms.gle/eo9hVBTc3cUP86Z2A"
              target="_blank"
              rel="noopener noreferrer"
              className="culling-btn-primary group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-sm overflow-hidden"
              style={{
                background: "rgba(255,32,78,0.1)",
                border: "1px solid rgba(255,32,78,0.5)",
                transition: "all 0.3s ease",
              }}
            >
              <span
                className="relative z-10 uppercase tracking-[0.2em] text-xs font-bold"
                style={{ color: "#F5F5F5", fontFamily: "var(--font-heading)" }}
              >
                Enter The Games
              </span>
              <div
                className="relative z-10 w-8 h-8 rounded-sm flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #FF204E, #A91032)",
                  boxShadow: "0 0 15px rgba(255,32,78,0.4)",
                }}
              >
                <ArrowRight size={14} className="text-white" />
              </div>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="#schedule"
              className="culling-btn-secondary inline-flex items-center gap-2 px-6 py-3.5 rounded-sm"
              style={{
                background: "transparent",
                border: "1px solid rgba(245,245,245,0.12)",
                transition: "all 0.3s ease",
              }}
            >
              <Eye size={14} style={{ color: "rgba(245,245,245,0.5)" }} />
              <span
                className="uppercase tracking-[0.2em] text-xs font-medium"
                style={{ color: "rgba(245,245,245,0.6)", fontFamily: "var(--font-heading)" }}
              >
                View Protocol
              </span>
            </Link>
          </motion.div>

          {/* Tournament Stats */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-8 mt-10 pt-8"
            style={{ borderTop: "1px solid rgba(255,32,78,0.1)" }}
          >
            {[
              { num: "3", label: "DAYS" },
              { num: "50+", label: "EVENTS" },
              { num: "10K+", label: "PLAYERS" },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-6">
                <div className="text-center lg:text-left">
                  <div
                    className="text-2xl font-black"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "#F5F5F5",
                      textShadow: "0 0 15px rgba(255,32,78,0.2)",
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    className="text-[8px] tracking-[0.3em] uppercase mt-0.5 font-semibold"
                    style={{ color: "rgba(255,32,78,0.4)", fontFamily: "var(--font-tactical)" }}
                  >
                    {s.label}
                  </div>
                </div>
                {i < 2 && (
                  <div
                    className="w-px h-8"
                    style={{ background: "rgba(255,32,78,0.1)" }}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — System Interface Panel ── */}
        <motion.div
          className="flex flex-1 relative w-full min-h-0 lg:min-h-[420px] flex-col items-center justify-start gap-4 lg:pr-4 pt-4 lg:pt-12"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            className="relative w-full max-w-[360px] sm:max-w-[400px] rounded-sm overflow-hidden"
            style={{
              background: "rgba(9,9,15,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,32,78,0.18)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.6), 0 0 40px rgba(255,32,78,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            {/* Tactical corners */}
            <TacticalCorner position="tl" />
            <TacticalCorner position="tr" />
            <TacticalCorner position="bl" />
            <TacticalCorner position="br" />

            {/* Top crimson line */}
            <div
              className="absolute inset-x-0 top-0 h-px pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.5), transparent)" }}
            />

            {/* Scanline overlay on panel */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0.05) 2px)",
              }}
            />

            {/* Panel content */}
            <div className="relative z-10 px-6 sm:px-8 py-6 sm:py-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Shield size={12} style={{ color: "#FF204E" }} />
                  <span
                    className="text-[9px] tracking-[0.35em] uppercase font-bold"
                    style={{ color: "rgba(255,32,78,0.7)", fontFamily: "var(--font-tactical)" }}
                  >
                    SYSTEM INTERFACE
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: "#FF204E",
                      boxShadow: "0 0 6px rgba(255,32,78,0.6)",
                    }}
                  />
                  <span
                    className="text-[8px] tracking-[0.2em] uppercase font-bold"
                    style={{ color: "#FF204E" }}
                  >
                    ACTIVE
                  </span>
                </div>
              </div>

              {/* Countdown */}
              <CountdownTimer />

              {/* Divider */}
              <div className="mt-5 mb-4" style={{ height: 1, background: "rgba(255,32,78,0.1)" }} />

              {/* Event info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[9px] tracking-[0.2em] uppercase font-semibold"
                    style={{ color: "rgba(245,245,245,0.35)", fontFamily: "var(--font-tactical)" }}
                  >
                    EVENT DATE
                  </span>
                  <span
                    className="text-xs font-bold tracking-wider"
                    style={{ color: "#F5F5F5", fontFamily: "var(--font-heading)" }}
                  >
                    18 · 19 · 20 MAY
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className="text-[9px] tracking-[0.2em] uppercase font-semibold"
                    style={{ color: "rgba(245,245,245,0.35)", fontFamily: "var(--font-tactical)" }}
                  >
                    LOCATION
                  </span>
                  <span
                    className="text-[10px] font-semibold tracking-wider uppercase"
                    style={{ color: "rgba(245,245,245,0.7)", fontFamily: "var(--font-heading)" }}
                  >
                    HIT HALDIA
                  </span>
                </div>

                {/* Status badges */}
                <div className="flex items-center gap-2 pt-2">
                  {["ENTRY OPEN", "PROTOCOL READY"].map((status) => (
                    <div
                      key={status}
                      className="px-2.5 py-1 rounded-sm"
                      style={{
                        background: "rgba(255,32,78,0.06)",
                        border: "1px solid rgba(255,32,78,0.15)",
                      }}
                    >
                      <span
                        className="text-[7px] tracking-[0.25em] uppercase font-bold"
                        style={{ color: "rgba(255,32,78,0.6)" }}
                      >
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom crimson line */}
            <div
              className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.3), transparent)" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}