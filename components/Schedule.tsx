"use client";
import { useState, useEffect, useMemo } from "react";
import { MapPin, Sparkles, Compass, Moon } from "lucide-react";
import { generateStars, getLanterns, getPerformanceAdjustedParticles } from "@/lib/particleAnimations";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

interface EventItem {
  time: string;
  title: string;
  desc?: string;
}

const fallbackSchedule: Record<string, EventItem[]> = {
  "Day 0": [
    { time: "09:00 AM", title: "Gaming Event",             desc: "Enter the arena where strategy, skill, and glory collide." },
    { time: "11:00 AM", title: "Treasure Hunt (Round -1)", desc: "Venture through mystery and magic in search of the hidden prize." },
    { time: "02:00 PM", title: "Fashion Show",             desc: "Showcase the latest trends in sustainable fashion." },
  ],
  "Day 1": [
    { time: "07:00 AM", title: "Opening Ceremony", desc: "The grand beginning — where the magic of Riviera 2K26 comes to life." },
    { time: "07:30 AM", title: "Group Dance",      desc: "Synchronized moves, boundless energy — let the rhythm take over the main stage." },
    { time: "10:00 PM", title: "Open Mic",         desc: "Unfiltered voices, raw talent, open stage — your moment to shine." },
  ],
  "Day 2": [
    { time: "09:30 AM", title: "Treasure Hunt Final", desc: "Bot battles & challenges" },
    { time: "12:00 AM", title: "Gaming Finals",       desc: "Esports championship matches" },
    { time: "08:00 PM", title: "Cultural Night",      desc: "Live performances & music" },
  ],
};

const mapDayToChapter = (day: string) => {
  if (day.includes("0")) return "Day 0";
  if (day.includes("1")) return "Day 1";
  if (day.includes("2")) return "Day 2";
  return day;
};

export default function Schedule() {
  const [scheduleData, setScheduleData] = useState<Record<string, EventItem[]>>(fallbackSchedule);
  const days = Object.keys(scheduleData);
  const [activeDay, setActiveDay] = useState(days[0]);

  const { isLowPower } = usePerformanceMode();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    fetch("/api/public/schedule")
      .then((r) => r.json())
      .then((data) => {
        if (data.schedule && Object.keys(data.schedule).length > 0) {
          const grouped: Record<string, EventItem[]> = {};
          for (const [day, items] of Object.entries(data.schedule)) {
            grouped[day] = (items as Array<{ time: string; title: string; description?: string }>).map((item) => ({
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

  /* ── PARTICLES ── */
  const stars = useMemo(
    () => {
      const { starCount } = getPerformanceAdjustedParticles(isLowPower);
      return generateStars(Math.floor(starCount / 3));
    },
    [isLowPower]
  );

  const activeLanterns = useMemo(
    () => getLanterns(Math.floor(getPerformanceAdjustedParticles(isLowPower).lanternCount / 2)),
    [isLowPower]
  );

  const titleVariants: Variants = {
    hidden:  { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      id="schedule"
      className="relative min-h-screen overflow-hidden py-24 sm:py-32"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at center, var(--bg-deep) 0%, var(--bg-primary) 80%)" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-20 pointer-events-none z-0" style={{ background: "radial-gradient(circle, var(--moon-glow) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none mix-blend-overlay bg-noise" />
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-color-dodge bg-pattern-arabian" />
      <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--surface-glass) 100%)" }} />
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-screen" style={{ background: "conic-gradient(from 180deg at 50% 0%, var(--gold-dim) 0deg, transparent 30deg, var(--gold-dim) 60deg, transparent 90deg, var(--gold-dim) 120deg, transparent 360deg)" }} />

      {/* ── PARTICLES ── */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full"
            style={{ width: s.size, height: s.size, left: s.x, top: s.y, background: "var(--gold-primary)", opacity: s.opacity }}
            animate={!shouldReduceMotion && !isLowPower ? { opacity: [s.opacity, s.opacity * 0.3, s.opacity] } : {}}
            transition={{ duration: 4 + ((s.id * 7) % 4), repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {activeLanterns.map((l, i) => (
          <div key={i} className="absolute z-[8]" style={{ left: l.x, bottom: "30%", opacity: 0.8 }}>
            <div
              className="rounded-full"
              style={{
                width: l.size, height: l.size * 1.3,
                background: "radial-gradient(ellipse, #FFC857 0%, var(--gold-primary) 60%, transparent 100%)",
                boxShadow: "0 0 20px rgba(212,160,23,0.4)",
              }}
            />
          </div>
        ))}
      </div>

      {/* ── SECTION TITLE ── */}
      <motion.div
        className="relative z-30 text-center mb-16 md:mb-24 px-4 w-full"
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <p
          className="text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold"
          style={{ fontFamily: "var(--font-arabian)", color: "var(--gold-primary)" }}
        >
          ✦ The Journey ✦
        </p>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight relative z-10"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-primary)",
            textShadow: "0 0 40px rgba(212,160,23,0.5), 0 4px 10px rgba(0,0,0,0.8)",
          }}
        >
          Event Schedule
        </h2>
        <p className="mt-6 text-sm md:text-base text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          Three days of non-stop innovation, culture, and unforgettable experiences.
          Follow the glowing route to discover your destiny.
        </p>
      </motion.div>

      {/* ── DAY SELECTOR ── */}
      <motion.div
        className="relative z-30 flex flex-wrap justify-center gap-3 sm:gap-4 mb-16 md:mb-24 px-4"
        initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : {}}
        whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {days.map((day) => {
          const isActive = activeDay === day;
          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className="group relative px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold overflow-hidden transition-transform duration-300 hover:scale-105"
              style={{
                color:      isActive ? "var(--bg-primary)" : "var(--gold-light)",
                border:     isActive ? "1px solid transparent" : "1px solid var(--border-gold)",
                background: isActive ? "transparent" : "var(--surface-glass)",
                boxShadow:  isActive ? "0 0 30px var(--gold-glow)" : "none",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-chapter-glow"
                  className="absolute inset-0 rounded-full z-0"
                  style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold-deep))" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2 tracking-wider uppercase">
                {isActive ? <Compass size={16} /> : <Moon size={16} className="opacity-50" />}
                {mapDayToChapter(day)}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* ── TIMELINE ── */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Glowing route line */}
        <div className="absolute top-0 bottom-0 left-[38px] md:left-1/2 -translate-x-1/2 w-[40px] md:w-[100px] pointer-events-none z-0">
          <motion.div
            className="w-full h-full"
            style={{ transformOrigin: "top" }}
            initial={!shouldReduceMotion ? { scaleY: 0, opacity: 0 } : { opacity: 0.7 }}
            whileInView={!shouldReduceMotion ? { scaleY: 1, opacity: 0.7 } : { opacity: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
              <motion.path
                d="M 50 0 C 80 200, 20 400, 50 600 C 80 800, 20 1000, 50 1000"
                stroke="var(--gold-primary)"
                strokeWidth="6"
                fill="none"
                vectorEffect="non-scaling-stroke"
                initial={{ strokeOpacity: 0.15 }}
                animate={!shouldReduceMotion && !isLowPower ? { strokeOpacity: [0.15, 0.4, 0.15] } : {}}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        </div>

        <div key={activeDay} className="space-y-16 md:space-y-24 relative z-10 py-10">
          {(scheduleData[activeDay] || []).map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex items-center md:justify-between w-full ${isLeft ? "md:flex-row-reverse" : "md:flex-row"}`}
              >
                {/* Desktop spacer */}
                <div className="hidden md:block w-[45%]" />

                {/* Timeline node */}
                <div className="absolute left-[38px] md:left-1/2 -translate-x-1/2 z-20">
                  <motion.div
                    initial={!shouldReduceMotion ? { scale: 0.5, opacity: 0 } : {}}
                    whileInView={!shouldReduceMotion ? { scale: [0.5, 1.08, 1], opacity: 1 } : { scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center relative border-2"
                      style={{
                        background: "var(--surface-primary)",
                        borderColor: "var(--border-gold)",
                        boxShadow: "0 0 30px var(--gold-glow)",
                      }}
                    >
                      <Sparkles className="text-[var(--gold-light)] w-5 h-5 md:w-6 md:h-6 relative z-10" />
                      <div
                        className="absolute inset-0 rounded-full z-0"
                        style={{ background: "radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)" }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Event card */}
                <div className="w-full pl-[70px] sm:pl-[80px] md:pl-0 md:w-[45%] z-10">
                  <motion.div
                    initial={!shouldReduceMotion ? { opacity: 0, x: isLeft ? -30 : 30 } : {}}
                    whileInView={!shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: isLowPower ? 0.4 : 0.7, ease: "easeOut" }}
                  >
                    <motion.div
                      initial={{ opacity: 0.6 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <motion.div
                        className="relative p-6 md:p-8 rounded-[24px] backdrop-blur-xl group cursor-default"
                        style={{
                          background: "var(--gradient-card)",
                          border: "1px solid var(--border-gold)",
                          borderBottom: "4px solid var(--gold-deep)",
                          boxShadow: "0 15px 35px rgba(0,0,0,0.8)",
                          transformStyle: "preserve-3d",
                        }}
                        whileHover={!shouldReduceMotion && !isLowPower ? {
                          y: -3,
                          scale: 1.01,
                          borderColor: "rgba(212,160,23,0.8)",
                          boxShadow: "0 25px 50px rgba(0,0,0,0.9), 0 0 30px rgba(212,160,23,0.15)",
                        } : {}}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <div className="absolute inset-0 rounded-[24px] bg-noise opacity-[0.08] pointer-events-none mix-blend-overlay z-0" />

                        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>

                          {/* Time */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-[rgba(212,160,23,0.15)] border border-[rgba(212,160,23,0.4)] flex items-center justify-center shadow-[0_0_10px_rgba(212,160,23,0.2)]">
                              <MapPin className="text-[var(--gold-primary)] w-4 h-4" />
                            </div>
                            <span
                              className="text-[var(--gold-light)] font-bold tracking-[0.2em] text-xs sm:text-sm uppercase"
                              style={{ fontFamily: "var(--font-arabian)" }}
                            >
                              {event.time}
                            </span>
                          </div>

                          {/* Title */}
                          <h3
                            className="text-2xl md:text-3xl font-extrabold text-white mb-3 drop-shadow-md"
                            style={{ fontFamily: "var(--font-heading)" }}
                          >
                            {event.title}
                          </h3>

                          {/* Description */}
                          {event.desc && (
                            <p className="text-gray-300 leading-relaxed font-light text-sm md:text-base opacity-90">
                              {event.desc}
                            </p>
                          )}

                          {/* ✅ CHANGED: ROUTE // 100 → ✦ RIVIERA 2K26 ✦ */}
                          <div className="mt-6 flex items-center justify-end opacity-40">
                            <span
                              className="text-[10px] tracking-widest uppercase text-[var(--gold-primary)]"
                              style={{ fontFamily: "var(--font-arabian)" }}
                            >
                              ✦ RIVIERA 2K26 ✦
                            </span>
                          </div>

                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}