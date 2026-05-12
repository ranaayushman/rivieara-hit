"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { Shield, Zap } from "lucide-react";

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
      width="10" height="10" viewBox="0 0 14 14"
      className="absolute pointer-events-none z-30"
      style={{ ...pos, transform: `rotate(${rotate}deg)` }}
    >
      <path d="M0 0 L14 0 L14 2.5 L2.5 2.5 L2.5 14 L0 14 Z" fill="#FF204E" opacity="0.35" />
    </svg>
  );
}

/* ── Sponsor data ── */
const sponsors = [
  {
    id: "sprite",
    name: "Sprite",
    tier: "ALPHA",
    brandColor: "#008b47",
    textStyle: { fontFamily: "Georgia, serif", fontStyle: "italic" as const },
  },
  {
    id: "coca-cola",
    name: "Coca-Cola",
    tier: "ALPHA",
    brandColor: "#e50014",
    textStyle: { fontFamily: 'cursive, "Brush Script MT"' },
  },
  {
    id: "fanta",
    name: "FANTA",
    tier: "BRAVO",
    brandColor: "#ff8b00",
    textStyle: { fontFamily: "Impact, sans-serif", fontWeight: 900, letterSpacing: "-0.03em" },
  },
  {
    id: "pepsi",
    name: "PEPSI",
    tier: "BRAVO",
    brandColor: "#004b93",
    textStyle: { fontFamily: "Arial, sans-serif", fontWeight: 900, letterSpacing: "0.15em" },
  },
];

/* ── Section embers ── */
function SponsorEmbers({ isLowPower }: { isLowPower: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const particles = useMemo(() => {
    const count = isLowPower ? 3 : 6;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: `${(i * 27 + 11) % 100}%`,
      y: `${(i * 21 + 14) % 90}%`,
      size: ((i * 3) % 2) + 1.5,
      opacity: ((i * 5) % 10 + 4) / 100,
      dur: 7 + ((i * 3) % 5),
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

/* ── Animation variants ── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/* ═══════════════════════════════════════════════
   SPONSORS — ALLIED FORCES
═══════════════════════════════════════════════ */
export default function Sponsors() {
  const { isLowPower, isMounted } = usePerformanceMode();
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !shouldReduceMotion && !isLowPower;

  return (
    <section
      id="sponsors"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{
        background: "linear-gradient(180deg, #050507 0%, #08080D 30%, #12070B 55%, #09090F 80%, #050507 100%)",
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
        className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(255,32,78,0.035) 0%, transparent 65%)" }}
        animate={shouldAnimate ? { scale: [1, 1.06, 1], opacity: [0.5, 0.75, 0.5] } : {}}
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
        style={{ background: "radial-gradient(ellipse 65% 60% at 50% 50%, transparent 30%, rgba(5,5,7,0.5) 100%)" }}
      />

      {/* Embers */}
      {isMounted && <SponsorEmbers isLowPower={isLowPower} />}

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADING ── */}
        <motion.div
          className="text-center mb-16 md:mb-24"
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
              ◆ STRATEGIC ALLIES ◆
            </p>
            <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.02em] relative z-10"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span style={{ color: "#F5F5F5", textShadow: "0 0 35px rgba(255,32,78,0.1)" }}>
              ALLIED{" "}
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
              FORCES
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-sm md:text-base max-w-md mx-auto"
            style={{ color: "rgba(245,245,245,0.4)", fontFamily: "var(--font-body)" }}
          >
            Organizations powering the games from behind the line.
          </motion.p>
        </motion.div>

        {/* ── SPONSOR GRID ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-[900px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              variants={itemVariants}
              className="culling-info-card group relative rounded-sm overflow-hidden"
              style={{
                background: "rgba(9,9,15,0.75)",
                border: "1px solid rgba(255,32,78,0.08)",
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
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.2), transparent)" }}
              />

              {/* Scanline */}
              <div
                className="absolute inset-0 pointer-events-none z-0 opacity-[0.015]"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.04) 1px, rgba(255,255,255,0.04) 2px)",
                }}
              />

              <div className="relative z-10 p-6 sm:p-8">
                {/* Header — tier tag + status */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-[7px] tracking-[0.3em] uppercase font-bold"
                    style={{ color: "rgba(255,32,78,0.4)", fontFamily: "var(--font-tactical)" }}
                  >
                    TIER—{sponsor.tier}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      className="w-1 h-1 rounded-full"
                      style={{ background: "#FF204E", boxShadow: "0 0 4px rgba(255,32,78,0.5)" }}
                      animate={shouldAnimate ? { opacity: [0.4, 1, 0.4] } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
                    />
                    <span
                      className="text-[6px] tracking-[0.2em] uppercase font-bold"
                      style={{ color: "rgba(255,32,78,0.3)", fontFamily: "var(--font-tactical)" }}
                    >
                      ACTIVE
                    </span>
                  </div>
                </div>

                {/* Brand showcase area */}
                <div
                  className="relative w-full h-[120px] sm:h-[140px] rounded-sm flex items-center justify-center overflow-hidden mb-5"
                  style={{
                    background: sponsor.brandColor,
                    boxShadow: `0 6px 20px ${sponsor.brandColor}30, inset 0 0 40px rgba(0,0,0,0.15)`,
                  }}
                >
                  {/* Brand name */}
                  <span
                    className="text-white text-3xl sm:text-4xl md:text-5xl drop-shadow-md relative z-10"
                    style={sponsor.textStyle}
                  >
                    {sponsor.name}
                  </span>

                  {/* Subtle inner scanlines on brand */}
                  <div
                    className="absolute inset-0 pointer-events-none z-20 opacity-[0.04]"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.2) 1px, rgba(0,0,0,0.2) 2px)",
                    }}
                  />
                </div>

                {/* Bottom info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield size={10} className="text-[#FF204E] opacity-30" />
                    <span
                      className="text-[8px] tracking-[0.2em] uppercase font-bold"
                      style={{ color: "rgba(245,245,245,0.25)", fontFamily: "var(--font-tactical)" }}
                    >
                      {sponsor.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap size={8} className="text-[#FF204E] opacity-20" />
                    <span
                      className="text-[7px] tracking-[0.2em] uppercase"
                      style={{ color: "rgba(255,32,78,0.2)", fontFamily: "var(--font-tactical)" }}
                    >
                      ALLIED
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom line */}
              <div
                className="absolute inset-x-0 bottom-0 h-px pointer-events-none z-10"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.1), transparent)" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
