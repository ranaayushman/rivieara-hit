"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Code, Music, Gamepad2, Cpu, Palette, Trophy,
  Camera, BookOpen, Mic2, Rocket, Globe, Lightbulb,
  Crosshair, Target, Zap, Shield,
  type LucideIcon
} from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

/* ── Icon map ── */
const iconMap: Record<string, LucideIcon> = {
  Code, Music, Gamepad2, Cpu, Palette, Trophy,
  Camera, BookOpen, Mic2, Rocket, Globe, Lightbulb,
  Crosshair, Target, Zap, Shield,
};

/* ── Activity data ── */
const activities = [
  {
    title: "Hidden Protocol",
    desc: "Navigate a web of encoded clues across the arena. Decode, pursue, and outmaneuver rival squads in a high-stakes survival pursuit.",
    iconName: "Crosshair",
    sectorTag: "RECON—01",
    threatLevel: "HIGH",
  },
  {
    title: "Crimson Stage",
    desc: "Where performance becomes a weapon. Electrifying acts under crimson lights in the most intense cultural showdown.",
    iconName: "Music",
    sectorTag: "PERFORMANCE—02",
    threatLevel: "CRITICAL",
  },
  {
    title: "Digital Combat",
    desc: "Enter the digital battlefield. Only reflexes, strategy, and ruthless precision will determine the survivors.",
    iconName: "Gamepad2",
    sectorTag: "COMBAT—03",
    threatLevel: "EXTREME",
  },
  {
    title: "Innovation Forge",
    desc: "A vault of cutting-edge creations and experimental technology. Where visionary minds showcase weapons of innovation.",
    iconName: "Cpu",
    sectorTag: "TACTICAL—04",
    threatLevel: "ELEVATED",
  },
];

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
      width="12" height="12" viewBox="0 0 14 14"
      className="absolute pointer-events-none z-30"
      style={{ ...pos, transform: `rotate(${rotate}deg)` }}
    >
      <path d="M0 0 L14 0 L14 2.5 L2.5 2.5 L2.5 14 L0 14 Z" fill="#FF204E" opacity="0.4" />
    </svg>
  );
}

/* ── Section embers ── */
function ActivityEmbers({ isLowPower }: { isLowPower: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const particles = useMemo(() => {
    const count = isLowPower ? 4 : 8;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: `${(i * 21 + 13) % 100}%`,
      y: `${(i * 17 + 8) % 90}%`,
      size: ((i * 3) % 2) + 1.5,
      opacity: ((i * 5) % 10 + 5) / 100,
      dur: 6 + ((i * 4) % 5),
      delay: (i * 0.6) % 3,
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

/* ── Animation Variants ── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/* ═══════════════════════════════════════════════
   ACTIVITIES — COMBAT DOMAINS
═══════════════════════════════════════════════ */
export default function Activities() {
  const { isLowPower, isMounted } = usePerformanceMode();
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !shouldReduceMotion && !isLowPower;

  return (
    <section
      id="activities"
      className="relative min-h-screen overflow-hidden py-24 sm:py-32 flex flex-col items-center"
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

      {/* Crimson haze — left */}
      <motion.div
        className="absolute top-[15%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(255,32,78,0.04) 0%, transparent 65%)" }}
        animate={shouldAnimate ? { scale: [1, 1.04, 1], opacity: [0.5, 0.7, 0.5] } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Crimson haze — right */}
      {!isLowPower && (
        <div
          className="absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(169,16,50,0.03) 0%, transparent 65%)" }}
        />
      )}

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
        style={{ background: "radial-gradient(ellipse 65% 60% at 50% 50%, transparent 30%, rgba(5,5,7,0.5) 100%)" }}
      />

      {/* Diagonal energy streaks */}
      {!isLowPower && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.018]">
          <div
            className="absolute w-[180%] h-[1px]"
            style={{
              top: "30%", left: "-10%",
              background: "linear-gradient(90deg, transparent, #FF204E 40%, transparent)",
              transform: "rotate(-12deg)",
            }}
          />
          <div
            className="absolute w-[150%] h-[1px]"
            style={{
              top: "70%", left: "-15%",
              background: "linear-gradient(90deg, transparent, #A91032 50%, transparent)",
              transform: "rotate(-6deg)",
            }}
          />
        </div>
      )}

      {/* Embers */}
      {isMounted && <ActivityEmbers isLowPower={isLowPower} />}

      {/* ═══ HEADING ═══ */}
      <motion.div
        className="relative z-30 text-center mb-16 md:mb-24 px-4 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Top label */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-5">
          <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
          <p
            className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-bold"
            style={{ fontFamily: "var(--font-tactical)", color: "#FF204E", opacity: 0.7 }}
          >
            ◆ COMBAT DOMAINS ◆
          </p>
          <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.02em] relative z-10"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span style={{ color: "#F5F5F5", textShadow: "0 0 35px rgba(255,32,78,0.1)" }}>
            ACTIVE{" "}
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
            DOMAINS
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-5 text-sm md:text-base max-w-lg mx-auto"
          style={{ color: "rgba(245,245,245,0.4)", fontFamily: "var(--font-body)" }}
        >
          Each domain is a unique trial of skill, strategy, and survival.
          Choose your battlefield wisely.
        </motion.p>
      </motion.div>

      {/* ═══ DOMAIN CARDS ═══ */}
      <motion.div
        className="relative z-30 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {activities.map((activity, index) => {
            const Icon = iconMap[activity.iconName] || Code;
            const staggerOffsets = [
              "lg:translate-y-0",
              "lg:translate-y-8",
              "lg:translate-y-4",
              "lg:translate-y-12",
            ];

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`culling-info-card group relative overflow-hidden rounded-sm ${staggerOffsets[index % 4]}`}
                style={{
                  background: "rgba(9,9,15,0.75)",
                  border: "1px solid rgba(255,32,78,0.1)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Tactical corners */}
                <TacticalCorner position="tl" />
                <TacticalCorner position="tr" />
                <TacticalCorner position="bl" />
                <TacticalCorner position="br" />

                {/* Top crimson line */}
                <div
                  className="absolute inset-x-0 top-0 h-px pointer-events-none z-10"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.3), transparent)" }}
                />

                {/* Scanline texture */}
                <div
                  className="absolute inset-0 pointer-events-none z-0 opacity-[0.015]"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.04) 1px, rgba(255,255,255,0.04) 2px)",
                  }}
                />

                {/* Card content */}
                <div className="relative z-10 p-6 sm:p-7 flex flex-col min-h-[320px] sm:min-h-[360px]">
                  {/* Sector tag + threat level */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="text-[7px] tracking-[0.25em] uppercase font-bold"
                      style={{ color: "rgba(255,32,78,0.4)", fontFamily: "var(--font-tactical)" }}
                    >
                      {activity.sectorTag}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        className="w-1 h-1 rounded-full"
                        style={{ background: "#FF204E", boxShadow: "0 0 4px rgba(255,32,78,0.5)" }}
                        animate={shouldAnimate ? { opacity: [0.4, 1, 0.4] } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                      />
                      <span
                        className="text-[6px] tracking-[0.2em] uppercase font-bold"
                        style={{ color: "rgba(255,32,78,0.3)", fontFamily: "var(--font-tactical)" }}
                      >
                        {activity.threatLevel}
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center mb-5"
                    style={{
                      background: "rgba(255,32,78,0.05)",
                      border: "1px solid rgba(255,32,78,0.12)",
                    }}
                  >
                    <Icon size={22} style={{ color: "#FF204E", opacity: 0.6 }} />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl sm:text-2xl font-black mb-3"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "#F5F5F5",
                      textShadow: "0 0 12px rgba(255,32,78,0.06)",
                    }}
                  >
                    {activity.title}
                  </h3>

                  {/* Crimson divider */}
                  <div
                    className="w-8 h-px mb-4"
                    style={{ background: "linear-gradient(90deg, rgba(255,32,78,0.4), transparent)" }}
                  />

                  {/* Description */}
                  <p
                    className="text-[11px] sm:text-xs leading-relaxed flex-grow"
                    style={{ color: "rgba(245,245,245,0.35)" }}
                  >
                    {activity.desc}
                  </p>

                  {/* Bottom action */}
                  <div
                    className="mt-5 pt-4 flex items-center justify-between"
                    style={{ borderTop: "1px solid rgba(255,32,78,0.06)" }}
                  >
                    <div className="flex items-center gap-2">
                      <Target size={10} className="text-[#FF204E] opacity-30" />
                      <span
                        className="text-[8px] tracking-[0.2em] uppercase font-bold"
                        style={{ color: "rgba(255,32,78,0.3)", fontFamily: "var(--font-tactical)" }}
                      >
                        ACCESS DOMAIN
                      </span>
                    </div>
                    <div
                      className="w-5 h-5 rounded-sm flex items-center justify-center"
                      style={{
                        background: "rgba(255,32,78,0.06)",
                        border: "1px solid rgba(255,32,78,0.15)",
                      }}
                    >
                      <Zap size={9} className="text-[#FF204E] opacity-50" />
                    </div>
                  </div>
                </div>

                {/* Bottom line */}
                <div
                  className="absolute inset-x-0 bottom-0 h-px pointer-events-none z-10"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.12), transparent)" }}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}