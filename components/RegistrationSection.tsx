"use client";

import { useMemo } from "react";
import { CalendarDays, MapPin, Shield, ArrowRight, Zap } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import Link from "next/link";

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
      className="absolute pointer-events-none"
      style={{ ...pos, transform: `rotate(${rotate}deg)` }}
    >
      <path d="M0 0 L14 0 L14 2.5 L2.5 2.5 L2.5 14 L0 14 Z" fill="#FF204E" opacity="0.5" />
    </svg>
  );
}

/* ── Tournament Entry Seal (abstract geometric emblem) ── */
function EntrySeal({ shouldAnimate }: { shouldAnimate: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <motion.div
        className="relative"
        style={{ width: 420, height: 420 }}
        animate={shouldAnimate ? { rotate: 360 } : {}}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer ring */}
        <svg viewBox="0 0 420 420" className="absolute inset-0 w-full h-full">
          <circle cx="210" cy="210" r="200" fill="none" stroke="#FF204E" strokeWidth="0.5" opacity="0.08" />
          <circle cx="210" cy="210" r="180" fill="none" stroke="#FF204E" strokeWidth="0.3" opacity="0.06" strokeDasharray="8 12" />
          <circle cx="210" cy="210" r="155" fill="none" stroke="#A91032" strokeWidth="0.4" opacity="0.05" />
          {/* Cross lines */}
          <line x1="210" y1="10" x2="210" y2="410" stroke="#FF204E" strokeWidth="0.3" opacity="0.04" />
          <line x1="10" y1="210" x2="410" y2="210" stroke="#FF204E" strokeWidth="0.3" opacity="0.04" />
          {/* Diagonal lines */}
          <line x1="68" y1="68" x2="352" y2="352" stroke="#A91032" strokeWidth="0.3" opacity="0.03" />
          <line x1="352" y1="68" x2="68" y2="352" stroke="#A91032" strokeWidth="0.3" opacity="0.03" />
          {/* Inner geometric shape */}
          <polygon
            points="210,30 390,210 210,390 30,210"
            fill="none" stroke="#FF204E" strokeWidth="0.4" opacity="0.05"
          />
          <polygon
            points="210,80 340,210 210,340 80,210"
            fill="none" stroke="#FF2E63" strokeWidth="0.3" opacity="0.04"
          />
          {/* Tick marks */}
          {Array.from({ length: 36 }, (_, i) => {
            const angle = (i * 10 * Math.PI) / 180;
            const x1 = 210 + 195 * Math.cos(angle);
            const y1 = 210 + 195 * Math.sin(angle);
            const x2 = 210 + 188 * Math.cos(angle);
            const y2 = 210 + 188 * Math.sin(angle);
            return (
              <line
                key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#FF204E" strokeWidth="0.5" opacity={i % 3 === 0 ? "0.1" : "0.04"}
              />
            );
          })}
        </svg>
      </motion.div>
      {/* Center glow */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,32,78,0.04) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

/* ── Info card data ── */
interface TacticalCard {
  icon: typeof CalendarDays;
  tag: string;
  label: string;
  sublabel: string;
}

const tacticalCards: TacticalCard[] = [
  { icon: CalendarDays, tag: "DATE_PROTOCOL", label: "18 — 20 May", sublabel: "2026" },
  { icon: MapPin,       tag: "ARENA_LOCATION", label: "HIT Campus", sublabel: "Haldia, West Bengal" },
  { icon: Shield,       tag: "ENTRY_STATUS", label: "Open for All", sublabel: "Students & Teams" },
];

/* ── Animation variants ── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── Ember particles ── */
function SectionEmbers({ isLowPower }: { isLowPower: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const particles = useMemo(() => {
    const count = isLowPower ? 5 : 10;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: `${(i * 21 + 9) % 100}%`,
      y: `${(i * 17 + 13) % 95}%`,
      size: ((i * 3) % 2) + 1.5,
      opacity: ((i * 7) % 12 + 5) / 100,
      dur: 7 + ((i * 3) % 6),
      delay: (i * 0.6) % 3,
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
            left: p.x, top: p.y,
            width: p.size, height: p.size,
            background: "radial-gradient(circle, #FF204E, rgba(169,16,50,0.2))",
            boxShadow: `0 0 ${p.size * 2}px rgba(255,32,78,0.25)`,
          }}
          animate={!isLowPower ? { y: [-5, 5, -5], opacity: [p.opacity, p.opacity * 2.5, p.opacity] } : {}}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   REGISTRATION SECTION — CULLING GAMES
═══════════════════════════════════════════════ */
export default function RegistrationSection() {
  const shouldReduceMotion = useReducedMotion();
  const { isLowPower, isMounted } = usePerformanceMode();
  const shouldAnimate = !shouldReduceMotion && !isLowPower;

  return (
    <section
      id="registration"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050507 0%, #12070B 30%, #09090F 70%, #050507 100%)",
      }}
    >
      {/* ── BACKGROUND LAYERS ── */}

      {/* Top divider — crimson line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.15), transparent)" }}
        aria-hidden="true"
      />

      {/* Tactical grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,32,78,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,32,78,0.25) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] z-0" />

      {/* Crimson fog */}
      <motion.div
        className="absolute top-[30%] left-[40%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(255,32,78,0.05) 0%, transparent 70%)",
        }}
        animate={shouldAnimate ? { scale: [1, 1.06, 1], opacity: [0.5, 0.8, 0.5] } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 65% at 50% 50%, transparent 30%, rgba(5,5,7,0.5) 100%)" }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      {/* Embers */}
      {isMounted && <SectionEmbers isLowPower={isLowPower} />}

      {/* Tournament Entry Seal */}
      {isMounted && !isLowPower && <EntrySeal shouldAnimate={shouldAnimate} />}

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 section-container py-24 sm:py-32 md:py-40">
        <motion.div
          className="relative z-10 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* ── HEADING BLOCK ── */}
          <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
            {/* Top tag */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-6">
              <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
              <p
                className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-bold"
                style={{ fontFamily: "var(--font-tactical)", color: "#FF204E", opacity: 0.7 }}
              >
                ◆ ENTRY PROTOCOL ◆
              </p>
              <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
            </motion.div>

            {/* Main title */}
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.02em] leading-[0.9] mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span style={{ color: "#F5F5F5", textShadow: "0 0 40px rgba(255,32,78,0.1)" }}>
                ENTER THE
              </span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #FF204E 0%, #FF2E63 50%, #FF4D6D 100%)",
                  WebkitBackgroundClip: "text",
                  fontFamily: "var(--font-tactical)",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(255,32,78,0.25))",
                }}
              >
                CULLING GAMES
              </span>
            </motion.h2>

            {/* Crimson divider */}
            <motion.div
              variants={itemVariants}
              className="mx-auto h-[1px] rounded-full mb-6"
              style={{
                background: "linear-gradient(90deg, transparent, #FF204E, transparent)",
                width: 80,
                opacity: 0.4,
              }}
            />

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base leading-relaxed max-w-xl mx-auto"
              style={{
                color: "rgba(245,245,245,0.55)",
                fontFamily: "var(--font-body)",
              }}
            >
              The protocol has been activated. Step into the battlefield of
              innovation, culture, and chaos — where only the strongest minds,
              creators, and challengers survive the arena.
            </motion.p>
          </div>

          {/* ── TACTICAL INFO CARDS ── */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto relative z-10 mb-12"
          >
            {tacticalCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.tag}
                  variants={cardVariants}
                  className="culling-info-card group relative rounded-sm overflow-hidden"
                  style={{
                    background: "rgba(9,9,15,0.7)",
                    border: "1px solid rgba(255,32,78,0.12)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* Tactical corners */}
                  <TacticalCorner position="tl" />
                  <TacticalCorner position="tr" />
                  <TacticalCorner position="bl" />
                  <TacticalCorner position="br" />

                  {/* Top scanline on hover */}
                  <div
                    className="absolute inset-x-0 top-0 h-px pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.3), transparent)" }}
                  />

                  {/* Card content */}
                  <div className="relative z-10 px-5 py-5 flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(255,32,78,0.06)",
                        border: "1px solid rgba(255,32,78,0.12)",
                      }}
                    >
                      <Icon size={16} style={{ color: "#FF204E", opacity: 0.7 }} />
                    </div>
                    <div className="flex flex-col">
                      {/* Tag label */}
                      <span
                        className="text-[7px] tracking-[0.3em] uppercase font-bold mb-1.5"
                        style={{ color: "rgba(255,32,78,0.4)", fontFamily: "var(--font-tactical)" }}
                      >
                        {card.tag}
                      </span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "#F5F5F5", fontFamily: "var(--font-heading)" }}
                      >
                        {card.label}
                      </span>
                      <span
                        className="text-[11px] mt-0.5"
                        style={{ color: "rgba(245,245,245,0.4)" }}
                      >
                        {card.sublabel}
                      </span>
                    </div>
                    {/* Status dot */}
                    <div className="ml-auto flex-shrink-0 mt-1">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: "#FF204E",
                          boxShadow: "0 0 6px rgba(255,32,78,0.5)",
                        }}
                        animate={shouldAnimate ? { opacity: [0.4, 1, 0.4] } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Bottom line */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.15), transparent)" }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── CTA BUTTON ── */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <Link
              href="https://forms.gle/eo9hVBTc3cUP86Z2A"
              target="_blank"
              rel="noopener noreferrer"
              className="culling-btn-primary group relative inline-flex items-center gap-4 px-8 py-4 rounded-sm overflow-hidden"
              style={{
                background: "rgba(255,32,78,0.08)",
                border: "1px solid rgba(255,32,78,0.4)",
                transition: "all 0.3s ease",
              }}
            >
              <Zap size={14} className="text-[#FF204E] opacity-60" />
              <span
                className="relative z-10 uppercase tracking-[0.2em] text-xs font-bold"
                style={{ color: "#F5F5F5", fontFamily: "var(--font-heading)" }}
              >
                ENTER THE GAMES
              </span>
              <div
                className="relative z-10 w-8 h-8 rounded-sm flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #FF204E, #A91032)",
                  boxShadow: "0 0 12px rgba(255,32,78,0.35)",
                }}
              >
                <ArrowRight size={13} className="text-white" />
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}