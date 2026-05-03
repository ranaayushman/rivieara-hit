"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Sparkles, Compass, Moon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

/**
 * Ancient Desert Route Schedule Section
 * A mystical desert expedition map guiding users through the Riviera 2026 timeline.
 */
export default function Schedule() {
  const [scheduleData, setScheduleData] = useState<Record<string, EventItem[]>>(fallbackSchedule);
  const days = Object.keys(scheduleData);
  const [activeDay, setActiveDay] = useState(days[0]);

  const sectionRef = useRef<HTMLElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const routePathRef = useRef<SVGPathElement>(null);

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

  // GSAP Cinematic Revealing & Route Flow
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      // 1. Cinematic Scroll Reveal (Fog clears, discovering the map)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1.5,
        onUpdate: (self) => {
          if (fogRef.current) {
            gsap.set(fogRef.current, { opacity: 1 - self.progress });
          }
        }
      });

      // 2. Magical Route Energy Flow (marching ants effect on SVG path)
      if (routePathRef.current) {
        gsap.to(routePathRef.current, {
          strokeDashoffset: -100,
          duration: 3,
          ease: "none",
          repeat: -1,
        });
      }
      
      // 3. Floating Magical Checkpoints
      gsap.utils.toArray(".magical-checkpoint").forEach((checkpoint: any, i) => {
        gsap.to(checkpoint, {
          y: i % 2 === 0 ? -6 : 6,
          duration: 2 + Math.random(),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [activeDay]); // Re-bind GSAP when checkpoints change

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative min-h-screen overflow-hidden py-24 sm:py-32"
      style={{ background: "#010103" }}
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      {/* 1. Deep Arabian Night Atmosphere */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(15,10,5,1)_0%,rgba(1,1,3,1)_80%)]" />
      
      {/* 2. Giant Moonlight Aura */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-20 blur-3xl pointer-events-none z-0 animate-[glow-pulse_6s_infinite]"
        style={{ background: "radial-gradient(circle, rgba(212,160,23,0.4) 0%, transparent 60%)" }}
      />
      
      {/* 3. Ancient Map Texture & Overlays */}
      <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none mix-blend-overlay bg-noise" />
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-color-dodge bg-pattern-arabian" />

      {/* 4. Cinematic GSAP Fog Overlay */}
      <div 
        ref={fogRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(1,1,3,1) 0%, rgba(1,1,3,0.8) 100%)" }}
      />

      {/* 5. Volumetric Golden Light Rays */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-screen"
        style={{
          background: "conic-gradient(from 180deg at 50% 0%, rgba(212,160,23,0.1) 0deg, transparent 30deg, rgba(212,160,23,0.1) 60deg, transparent 90deg, rgba(212,160,23,0.1) 120deg, transparent 360deg)",
        }}
      />

      {/* ================= SECTION TITLE AREA ================= */}
      <div className="relative z-30 text-center mb-16 md:mb-24 px-4 w-full">
        <motion.p
          className="text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold"
          style={{ fontFamily: "var(--font-arabian)", color: "var(--gold-primary)" }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          ✦ The Journey ✦
        </motion.p>
        
        <motion.div
          className="relative inline-block"
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
            Event Schedule
          </h2>
          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-transparent translate-x-[-100%] animate-[shimmer_4s_infinite] pointer-events-none z-20 mix-blend-overlay" />
        </motion.div>

        <motion.p
          className="mt-6 text-sm md:text-base text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Three days of non-stop innovation, culture, and unforgettable experiences.
          Follow the glowing route to discover your destiny.
        </motion.p>
      </div>

      {/* ================= EXPEDITION CHAPTER SELECTOR ================= */}
      <div className="relative z-30 flex flex-wrap justify-center gap-3 sm:gap-4 mb-16 md:mb-24 px-4">
        {days.map((day) => {
          const isActive = activeDay === day;
          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className="group relative px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-500 overflow-hidden"
              style={{
                color: isActive ? "var(--bg-primary)" : "var(--gold-light)",
                border: isActive ? "1px solid transparent" : "1px solid rgba(212,160,23,0.4)",
                background: isActive ? "transparent" : "rgba(20,10,0,0.4)",
                boxShadow: isActive ? "0 0 30px rgba(212,160,23,0.5)" : "none",
              }}
            >
              {/* Active Golden Glow Background */}
              {isActive && (
                <motion.div
                  layoutId="chapter-glow"
                  className="absolute inset-0 rounded-full z-0"
                  style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold-deep))" }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              
              {/* Hover Glow for Inactive Buttons */}
              {!isActive && (
                <div className="absolute inset-0 bg-[rgba(212,160,23,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              )}
              
              <span className="relative z-10 flex items-center gap-2 tracking-wider uppercase">
                {isActive ? (
                  <Compass size={16} className="animate-[spin-slow_4s_linear_infinite]" />
                ) : (
                  <Moon size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
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
            {/* Animated Energy Flow */}
            <path 
              ref={routePathRef}
              d="M 50 0 C 80 200, 20 400, 50 600 C 80 800, 20 1000, 50 1000" 
              stroke="url(#routeEnergy)" 
              strokeWidth="4" 
              fill="none" 
              vectorEffect="non-scaling-stroke"
              strokeDasharray="15 30"
              strokeLinecap="round"
            />
            {/* Soft Ambient Route Backbone */}
            <path 
              d="M 50 0 C 80 200, 20 400, 50 600 C 80 800, 20 1000, 50 1000" 
              stroke="rgba(212,160,23,0.15)" 
              strokeWidth="6" 
              fill="none" 
              vectorEffect="non-scaling-stroke"
            />
            <defs>
              <linearGradient id="routeEnergy" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(212,160,23,0)" />
                <stop offset="50%" stopColor="rgba(255,230,150,1)" />
                <stop offset="100%" stopColor="rgba(212,160,23,0)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
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
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center relative bg-[rgba(15,8,0,0.95)] border-2 border-[rgba(212,160,23,0.6)] shadow-[0_0_30px_rgba(212,160,23,0.5)] cursor-pointer group hover:border-[rgba(255,230,150,0.8)] transition-colors duration-300">
                      <Sparkles className="text-[var(--gold-light)] w-5 h-5 md:w-6 md:h-6 animate-[glow-pulse_3s_infinite] group-hover:scale-125 transition-transform" />
                      {/* Magical Checkpoint Aura */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,160,23,0.4)_0%,transparent_70%)] blur-[10px] rounded-full group-hover:bg-[radial-gradient(circle,rgba(255,230,150,0.6)_0%,transparent_70%)] transition-colors duration-500" />
                    </div>
                  </div>

                  {/* === FLOATING DESTINATION ARTIFACT (Event Card) === */}
                  <div className="w-full pl-[70px] sm:pl-[80px] md:pl-0 md:w-[45%] z-10">
                    <motion.div 
                      className="relative p-6 md:p-8 rounded-[24px] backdrop-blur-xl group cursor-pointer"
                      style={{
                        background: "linear-gradient(145deg, rgba(30,20,10,0.85) 0%, rgba(10,5,0,0.95) 100%)",
                        border: "1px solid rgba(212,160,23,0.3)",
                        borderBottom: "4px solid rgba(160,110,10,0.8)",
                        boxShadow: "0 15px 35px rgba(0,0,0,0.8)",
                        transformStyle: "preserve-3d"
                      }}
                      initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                      whileHover={{ 
                        y: -8, 
                        rotateX: 2,
                        scale: 1.02, 
                        boxShadow: "0 25px 50px rgba(0,0,0,0.9), 0 0 40px rgba(212,160,23,0.25)" 
                      }}
                    >
                      {/* Hover Shimmer Overlay */}
                      <div className="absolute inset-0 rounded-[24px] bg-gradient-to-r from-transparent via-[rgba(212,160,23,0.15)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" />
                      
                      {/* Ancient Map Texture Overlay */}
                      <div className="absolute inset-0 rounded-[24px] bg-noise opacity-[0.08] pointer-events-none mix-blend-overlay" />
                      
                      {/* Content Container (Popping out slightly in 3D) */}
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
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 group-hover:text-[var(--gold-light)] transition-colors duration-300 drop-shadow-md" style={{ fontFamily: "var(--font-heading)" }}>
                          {event.title}
                        </h3>
                        
                        {/* Description */}
                        {event.desc && (
                          <p className="text-gray-300 leading-relaxed font-light text-sm md:text-base opacity-90 group-hover:opacity-100 transition-opacity">
                            {event.desc}
                          </p>
                        )}

                        {/* Magical Route ID Metadata (Optional Explorer Detail) */}
                        <div className="mt-6 flex items-center justify-end opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                          <span className="text-[10px] tracking-widest uppercase text-[var(--gold-primary)]" style={{ fontFamily: "var(--font-arabian)" }}>
                            ROUTE // {index + 1}0{activeDay.replace(/\D/g, '') || '1'}
                          </span>
                        </div>

                      </div>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
