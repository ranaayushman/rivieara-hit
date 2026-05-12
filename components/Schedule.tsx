"use client";
import { useState, useEffect, useMemo } from "react";
import { Crosshair, Zap, Target } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
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
      width="12" height="12" viewBox="0 0 14 14"
      className="absolute pointer-events-none z-30"
      style={{ ...pos, transform: `rotate(${rotate}deg)` }}
    >
      <path d="M0 0 L14 0 L14 2.5 L2.5 2.5 L2.5 14 L0 14 Z" fill="#FF204E" opacity="0.4" />
    </svg>
  );
}

interface EventItem {
  time: string;
  title: string;
  desc?: string;
}

/* ── Fallback data with cinematic naming ── */
const fallbackSchedule: Record<string, EventItem[]> = {
  "SECTOR 01": [
    { time: "09:00", title: "Digital Combat",      desc: "Enter the arena where strategy, skill, and survival instincts collide in a brutal gaming showdown." },
    { time: "11:00", title: "Hidden Protocol R-1",  desc: "Navigate through layers of mystery and deception — the first elimination round begins." },
    { time: "14:00", title: "Crimson Runway",       desc: "Style meets danger on the stage where fashion becomes a weapon of self-expression." },
  ],
  "SECTOR 02": [
    { time: "07:00", title: "Opening Protocol",    desc: "The games are formally declared active — the culling begins now." },
    { time: "07:30", title: "Synchronized Assault",  desc: "Coordinated movement, relentless energy — the stage trembles under collective force." },
    { time: "22:00", title: "Open Domain",          desc: "Raw talent, unfiltered voices — step into the arena and claim your moment." },
  ],
  "FINAL PHASE": [
    { time: "09:30", title: "Hidden Protocol — Final", desc: "The last survivors face the ultimate treasure pursuit. No second chances." },
    { time: "12:00", title: "Digital Combat — Finals",  desc: "Championship combat. The strongest players battle for the title." },
    { time: "20:00", title: "Crimson Stage",            desc: "The grand cultural showdown — where art, music, and performance ignite the final night." },
  ],
};

/* ── Map API day keys to sector labels ── */
const mapDayToSector = (day: string) => {
  if (day.includes("0")) return "SECTOR 01";
  if (day.includes("1")) return "SECTOR 02";
  if (day.includes("2")) return "FINAL PHASE";
  return day;
};

/* ── Section embers ── */
function TimelineEmbers({ isLowPower }: { isLowPower: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const particles = useMemo(() => {
    const count = isLowPower ? 4 : 8;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: `${(i * 23 + 7) % 100}%`,
      y: `${(i * 19 + 12) % 90}%`,
      size: ((i * 3) % 2) + 1.5,
      opacity: ((i * 6) % 10 + 5) / 100,
      dur: 6 + ((i * 3) % 5),
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

/* ═══ ANIMATION VARIANTS ═══ */
const titleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/* ═══════════════════════════════════════════════
   SCHEDULE — CULLING PROTOCOL TIMELINE
═══════════════════════════════════════════════ */
export default function Schedule() {
  const [scheduleData, setScheduleData] = useState<Record<string, EventItem[]>>(fallbackSchedule);
  const days = Object.keys(scheduleData);
  const [activeDay, setActiveDay] = useState(days[0]);

  const { isLowPower, isMounted } = usePerformanceMode();
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !shouldReduceMotion && !isLowPower;

  useEffect(() => {
    fetch("/api/public/schedule")
      .then((r) => r.json())
      .then((data) => {
        if (data.schedule && Object.keys(data.schedule).length > 0) {
          const grouped: Record<string, EventItem[]> = {};
          for (const [day, items] of Object.entries(data.schedule)) {
            const sectorKey = mapDayToSector(day);
            grouped[sectorKey] = (items as Array<{ time: string; title: string; description?: string }>).map((item) => ({
              time: item.time,
              title: item.title,
              desc: item.description || undefined,
            }));
          }
          setScheduleData(grouped);
          setActiveDay(Object.keys(grouped)[0]);
        }
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  return (
    <section
      id="schedule"
      className="relative min-h-screen overflow-hidden py-24 sm:py-32"
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

      {/* Crimson atmospheric haze */}
      <motion.div
        className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
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
          backgroundSize: "70px 70px",
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
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 30%, rgba(5,5,7,0.5) 100%)" }}
      />

      {/* Embers */}
      {isMounted && <TimelineEmbers isLowPower={isLowPower} />}

      {/* ═══ SECTION TITLE ═══ */}
      <motion.div
        className="relative z-30 text-center mb-12 md:mb-20 px-4 w-full"
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Top label */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
          <p
            className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-bold"
            style={{ fontFamily: "var(--font-tactical)", color: "#FF204E", opacity: 0.7 }}
          >
            ◆ PROTOCOL ROUTE ◆
          </p>
          <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
        </div>

        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.02em] relative z-10"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span style={{ color: "#F5F5F5", textShadow: "0 0 35px rgba(255,32,78,0.1)" }}>
            SURVIVAL{" "}
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
            TIMELINE
          </span>
        </h2>

        <p
          className="mt-5 text-sm md:text-base max-w-lg mx-auto"
          style={{ color: "rgba(245,245,245,0.4)", fontFamily: "var(--font-body)" }}
        >
          Advance through the sectors and survive each challenge.
        </p>
      </motion.div>

      {/* ═══ SECTOR SELECTOR ═══ */}
      <motion.div
        className="relative z-30 flex flex-wrap justify-center gap-2 sm:gap-3 mb-14 md:mb-20 px-4"
        initial={!shouldReduceMotion ? { opacity: 0, y: 16 } : {}}
        whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {days.map((day) => {
          const isActive = activeDay === day;
          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className="group relative px-5 sm:px-6 py-2.5 rounded-sm text-[10px] sm:text-xs font-bold overflow-hidden transition-all duration-300"
              style={{
                color: isActive ? "#F5F5F5" : "rgba(245,245,245,0.4)",
                border: isActive ? "1px solid rgba(255,32,78,0.4)" : "1px solid rgba(255,32,78,0.08)",
                background: isActive ? "rgba(255,32,78,0.08)" : "rgba(9,9,15,0.5)",
                boxShadow: isActive ? "0 0 20px rgba(255,32,78,0.06)" : "none",
              }}
            >
              {/* Active glow pill */}
              {isActive && (
                <motion.div
                  layoutId="active-sector-glow"
                  className="absolute inset-0 rounded-sm z-0"
                  style={{
                    background: "rgba(255,32,78,0.06)",
                    border: "1px solid rgba(255,32,78,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2 tracking-[0.25em] uppercase"
                style={{ fontFamily: "var(--font-tactical)" }}
              >
                {/* Status dot */}
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: isActive ? "#FF204E" : "rgba(255,32,78,0.2)",
                    boxShadow: isActive ? "0 0 6px rgba(255,32,78,0.5)" : "none",
                  }}
                />
                {day}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* ═══ TIMELINE ═══ */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Energy progression route */}
        <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 md:-translate-x-1/2 w-px pointer-events-none z-0">
          <motion.div
            className="w-full h-full"
            style={{ transformOrigin: "top" }}
            initial={!shouldReduceMotion ? { scaleY: 0, opacity: 0 } : { opacity: 0.3 }}
            whileInView={!shouldReduceMotion ? { scaleY: 1, opacity: 1 } : { opacity: 0.3 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main line */}
            <div
              className="w-full h-full"
              style={{ background: "linear-gradient(180deg, rgba(255,32,78,0.25) 0%, rgba(255,32,78,0.05) 100%)" }}
            />
          </motion.div>
        </div>

        {/* Pulsing route glow (desktop only) */}
        {shouldAnimate && (
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] pointer-events-none z-0">
            <motion.div
              className="w-full h-full"
              style={{ background: "linear-gradient(180deg, rgba(255,32,78,0.12) 0%, transparent 100%)" }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        )}

        {/* Event cards */}
        <motion.div
          key={activeDay}
          className="space-y-12 md:space-y-20 relative z-10 py-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {(scheduleData[activeDay] || []).map((event, index) => {
            const isLeft = index % 2 === 0;
            const checkpointId = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`relative flex items-start md:items-center md:justify-between w-full ${isLeft ? "md:flex-row-reverse" : "md:flex-row"}`}
              >
                {/* Desktop spacer */}
                <div className="hidden md:block w-[44%]" />

                {/* ── CHECKPOINT NODE ── */}
                <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 z-20">
                  <motion.div
                    initial={!shouldReduceMotion ? { scale: 0.5, opacity: 0 } : {}}
                    whileInView={!shouldReduceMotion ? { scale: 1, opacity: 1 } : { opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div
                      className="w-10 h-10 md:w-14 md:h-14 rounded-sm flex items-center justify-center relative"
                      style={{
                        background: "rgba(9,9,15,0.9)",
                        border: "1px solid rgba(255,32,78,0.25)",
                        boxShadow: "0 0 15px rgba(255,32,78,0.06)",
                      }}
                    >
                      {/* Rotating ring (desktop only) */}
                      {shouldAnimate && (
                        <motion.div
                          className="absolute inset-[-3px] rounded-sm pointer-events-none hidden md:block"
                          style={{ border: "1px solid rgba(255,32,78,0.08)" }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      {/* Checkpoint number */}
                      <span
                        className="text-[9px] md:text-[10px] font-bold tracking-[0.15em]"
                        style={{ color: "#FF204E", fontFamily: "var(--font-tactical)" }}
                      >
                        {checkpointId}
                      </span>
                      {/* Pulse glow */}
                      <motion.div
                        className="absolute inset-0 rounded-sm pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(255,32,78,0.08) 0%, transparent 70%)" }}
                        animate={shouldAnimate ? { opacity: [0.3, 0.7, 0.3] } : {}}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* ── EVENT CARD ── */}
                <div className="w-full pl-[58px] sm:pl-[68px] md:pl-0 md:w-[44%] z-10">
                  <div
                    className="culling-info-card relative p-5 md:p-7 rounded-sm group cursor-default overflow-hidden"
                    style={{
                      background: "rgba(9,9,15,0.7)",
                      border: "1px solid rgba(255,32,78,0.1)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
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
                      className="absolute inset-x-0 top-0 h-px pointer-events-none"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.25), transparent)" }}
                    />

                    {/* Scanline */}
                    <div
                      className="absolute inset-0 rounded-sm pointer-events-none z-0 opacity-[0.02]"
                      style={{
                        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.04) 1px, rgba(255,255,255,0.04) 2px)",
                      }}
                    />

                    <div className="relative z-10">
                      {/* Activation time */}
                      <div className="flex items-center gap-2 mb-3">
                        <Crosshair size={12} className="text-[#FF204E] opacity-50" />
                        <span
                          className="text-[8px] sm:text-[9px] font-bold tracking-[0.3em] uppercase"
                          style={{ color: "rgba(255,32,78,0.55)", fontFamily: "var(--font-tactical)" }}
                        >
                          ACTIVATION — {event.time}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className="text-lg sm:text-xl md:text-2xl font-black mb-2"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "#F5F5F5",
                          textShadow: "0 0 15px rgba(255,32,78,0.06)",
                        }}
                      >
                        {event.title}
                      </h3>

                      {/* Description */}
                      {event.desc && (
                        <p
                          className="text-[11px] sm:text-xs leading-relaxed mb-4"
                          style={{ color: "rgba(245,245,245,0.35)" }}
                        >
                          {event.desc}
                        </p>
                      )}

                      {/* Bottom stamp */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Target size={10} className="text-[#FF204E] opacity-30" />
                          <span
                            className="text-[7px] tracking-[0.25em] uppercase font-bold"
                            style={{ color: "rgba(255,32,78,0.3)", fontFamily: "var(--font-tactical)" }}
                          >
                            CHECKPOINT {checkpointId}
                          </span>
                        </div>
                        <span
                          className="text-[7px] tracking-[0.2em] uppercase"
                          style={{ color: "rgba(245,245,245,0.15)", fontFamily: "var(--font-tactical)" }}
                        >
                          RIVIERA 2026
                        </span>
                      </div>
                    </div>

                    {/* Bottom line */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.12), transparent)" }}
                    />
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* ── End-of-route marker ── */}
        <motion.div
          className="flex justify-center mt-12"
          initial={!shouldReduceMotion ? { opacity: 0 } : {}}
          whileInView={!shouldReduceMotion ? { opacity: 1 } : {}}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div style={{ height: 1, width: 20, background: "rgba(255,32,78,0.15)" }} />
            <div className="flex items-center gap-2">
              <Zap size={10} className="text-[#FF204E] opacity-30" />
              <span
                className="text-[8px] tracking-[0.4em] uppercase font-bold"
                style={{ color: "rgba(255,32,78,0.3)", fontFamily: "var(--font-tactical)" }}
              >
                END OF SECTOR
              </span>
            </div>
            <div style={{ height: 1, width: 20, background: "rgba(255,32,78,0.15)" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}