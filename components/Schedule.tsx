"use client";

import { useState, useEffect, useMemo } from "react";
import { MapPin, Sparkles, Compass, Moon } from "lucide-react";
import { generateStars, getLanterns, getPerformanceAdjustedParticles } from "@/lib/particleAnimations";

interface EventItem {
  time: string;
  title: string;
  desc?: string;
}

const fallbackSchedule: Record<string, EventItem[]> = {
  "Day 1": [
    { time: "09:00 AM", title: "Opening Ceremony", desc: "Grand inauguration with guest speakers" },
    { time: "11:00 AM", title: "AI Workshop", desc: "Hands-on session on machine learning" },
    { time: "02:00 PM", title: "Coding Challenge", desc: "Competitive programming round" },
  ],
  "Day 2": [
    { time: "10:00 AM", title: "Hackathon Begins", desc: "24-hour build sprint starts" },
    { time: "01:00 PM", title: "Tech Talks", desc: "Industry experts share insights" },
    { time: "06:00 PM", title: "Cultural Night", desc: "Live performances & music" },
  ],
  "Day 3": [
    { time: "09:30 AM", title: "Robotics Competition", desc: "Bot battles & challenges" },
    { time: "12:00 PM", title: "Gaming Finals", desc: "Esports championship matches" },
    { time: "05:00 PM", title: "Closing Ceremony", desc: "Awards & farewell" },
  ],
};

const mapDayToChapter = (day: string) => {
  if (day.includes("1")) return "Day One";
  if (day.includes("2")) return "Day Two";
  if (day.includes("3")) return "Day Three";
  return day;
};

export default function Schedule() {
  const [scheduleData, setScheduleData] = useState<Record<string, EventItem[]>>(fallbackSchedule);
  const days = Object.keys(scheduleData);
  const [activeDay, setActiveDay] = useState(days[0]);

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

  // ── PARTICLES ──
  const stars = useMemo(
    () => {
      const { starCount } = getPerformanceAdjustedParticles(false);
      return generateStars(starCount);
    },
    []
  );

  const activeLanterns = useMemo(
    () => getLanterns(getPerformanceAdjustedParticles(false).lanternCount),
    []
  );

  return (
    <section
      id="schedule"
      className="relative min-h-screen overflow-hidden py-24 sm:py-32"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      {/* 1. Deep Arabian Night Atmosphere */}
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at center, var(--bg-deep) 0%, var(--bg-primary) 80%)" }} />
      
      {/* 2. Giant Moonlight Aura */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-20 pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, var(--moon-glow) 0%, transparent 60%)" }}
      />
      
      {/* 3. Ancient Map Texture & Overlays */}
      <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none mix-blend-overlay bg-noise" />
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-color-dodge bg-pattern-arabian" />

      {/* 4. Cinematic Static Fog Overlay */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--surface-glass) 100%)" }}
      />

      {/* 5. Volumetric Golden Light Rays */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-screen"
        style={{
          background: "conic-gradient(from 180deg at 50% 0%, var(--gold-dim) 0deg, transparent 30deg, var(--gold-dim) 60deg, transparent 90deg, var(--gold-dim) 120deg, transparent 360deg)",
        }}
      />

      {/* ── PARTICLE LAYERS ── */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {/* Stars */}
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full"
            style={{
              width: s.size,
              height: s.size,
              left: s.x,
              top: s.y,
              background: "var(--gold-primary)",
              opacity: s.opacity,
            }}
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

      {/* ================= SECTION TITLE AREA ================= */}
      <div className="relative z-30 text-center mb-16 md:mb-24 px-4 w-full">
        <p
          className="text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold"
          style={{ fontFamily: "var(--font-arabian)", color: "var(--gold-primary)" }}
        >
          ✦ The Journey ✦
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
            Event Schedule
          </h2>
          {/* Static shimmer replacement */}
        </div>

        <p
          className="mt-6 text-sm md:text-base text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Three days of non-stop innovation, culture, and unforgettable experiences.
          Follow the glowing route to discover your destiny.
        </p>
      </div>

      {/* ================= EXPEDITION CHAPTER SELECTOR ================= */}
      <div className="relative z-30 flex flex-wrap justify-center gap-3 sm:gap-4 mb-16 md:mb-24 px-4">
        {days.map((day) => {
          const isActive = activeDay === day;
          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className="group relative px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold overflow-hidden"
              style={{
                color: isActive ? "var(--bg-primary)" : "var(--gold-light)",
                border: isActive ? "1px solid transparent" : "1px solid var(--border-gold)",
                background: isActive ? "transparent" : "var(--surface-glass)",
                boxShadow: isActive ? "0 0 30px var(--gold-glow)" : "none",
              }}
            >
              {/* Active Golden Glow Background */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-full z-0"
                  style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold-deep))" }}
                />
              )}
              
              <span className="relative z-10 flex items-center gap-2 tracking-wider uppercase">
                {isActive ? (
                  <Compass size={16} />
                ) : (
                  <Moon size={16} className="opacity-50" />
                )}
                {mapDayToChapter(day)}
              </span>
            </button>
          );
        })}
      </div>

      {/* ================= MAGICAL DESERT ROUTE SYSTEM ================= */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Background Winding SVG Route */}
        <div className="absolute top-0 bottom-0 left-[38px] md:left-1/2 md:-translate-x-1/2 w-[40px] md:w-[100px] pointer-events-none z-0 opacity-70">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
            {/* Soft Ambient Route Backbone */}
            <path 
              d="M 50 0 C 80 200, 20 400, 50 600 C 80 800, 20 1000, 50 1000" 
              stroke="rgba(212,160,23,0.15)" 
              strokeWidth="6" 
              fill="none" 
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div
          key={activeDay}
          className="space-y-16 md:space-y-24 relative z-10 py-10"
        >
          {(scheduleData[activeDay] || []).map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div key={index} className={`relative flex items-center md:justify-between w-full ${isLeft ? "md:flex-row-reverse" : "md:flex-row"}`}>
                
                {/* Desktop Spacer (50% width) */}
                <div className="hidden md:block w-[45%]" />

                {/* === MAGICAL CHECKPOINT (Lantern Marker) === */}
                <div className="absolute left-[14px] md:left-1/2 -translate-x-1/2 z-20 magical-checkpoint">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center relative border-2"
                       style={{ background: "var(--surface-primary)", borderColor: "var(--border-gold)", boxShadow: "0 0 30px var(--gold-glow)" }}>
                    <Sparkles className="text-[var(--gold-light)] w-5 h-5 md:w-6 md:h-6" />
                    {/* Magical Checkpoint Aura */}
                    <div className="absolute inset-0 rounded-full" 
                         style={{ background: "radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)" }} />
                  </div>
                </div>

                {/* === DESTINATION ARTIFACT (Event Card) === */}
                <div className="w-full pl-[70px] sm:pl-[80px] md:pl-0 md:w-[45%] z-10">
                  <div 
                    className="relative p-6 md:p-8 rounded-[24px] backdrop-blur-xl group"
                    style={{
                      background: "var(--gradient-card)",
                      border: "1px solid var(--border-gold)",
                      borderBottom: "4px solid var(--gold-deep)",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.8)",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    
                    {/* Ancient Map Texture Overlay */}
                    <div className="absolute inset-0 rounded-[24px] bg-noise opacity-[0.08] pointer-events-none mix-blend-overlay" />
                    
                    {/* Content Container */}
                    <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                      
                      {/* Time & Marker */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-[rgba(212,160,23,0.15)] border border-[rgba(212,160,23,0.4)] flex items-center justify-center shadow-[0_0_10px_rgba(212,160,23,0.2)]">
                          <MapPin className="text-[var(--gold-primary)] w-4 h-4" />
                        </div>
                        <span className="text-[var(--gold-light)] font-bold tracking-[0.2em] text-xs sm:text-sm uppercase" style={{ fontFamily: "var(--font-arabian)" }}>
                          {event.time}
                        </span>
                      </div>
                      
                      {/* Event Title */}
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 drop-shadow-md" style={{ fontFamily: "var(--font-heading)" }}>
                        {event.title}
                      </h3>
                      
                      {/* Description */}
                      {event.desc && (
                        <p className="text-gray-300 leading-relaxed font-light text-sm md:text-base opacity-90">
                          {event.desc}
                        </p>
                      )}

                      {/* Magical Route ID Metadata */}
                      <div className="mt-6 flex items-center justify-end opacity-40">
                        <span className="text-[10px] tracking-widest uppercase text-[var(--gold-primary)]" style={{ fontFamily: "var(--font-arabian)" }}>
                          ROUTE // {index + 1}0{activeDay.replace(/\D/g, '') || '1'}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
