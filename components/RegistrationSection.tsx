"use client";

import { useEffect, useState, useMemo } from "react";
import { CalendarDays, MapPin, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { generateStars, getPerformanceAdjustedParticles } from "@/lib/particleAnimations";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

interface InfoCard {
  icon: typeof CalendarDays;
  label: string;
  sublabel: string;
}

const defaultCards: InfoCard[] = [
  { icon: CalendarDays, label: "May 19–20", sublabel: "2026" },
  { icon: MapPin, label: "HIT Campus", sublabel: "Haldia" },
  { icon: User, label: "Open for All", sublabel: "Students" },
];

export default function RegistrationSection() {
  const [infoCards, setInfoCards] = useState<InfoCard[]>(defaultCards);
  const shouldReduceMotion = useReducedMotion();
  const { isLowPower } = usePerformanceMode();

  useEffect(() => {
    fetch("/api/public/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.settings) {
          const s = data.settings as Record<string, string>;
          if (s.event_dates || s.event_venue) {
            setInfoCards([
              { icon: CalendarDays, label: s.event_dates || "May 19–20", sublabel: "2026" },
              { icon: MapPin, label: s.event_venue || "HIT Campus", sublabel: "Haldia" },
              { icon: User, label: "Open for All", sublabel: "Students" },
            ]);
          }
        }
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  // ── PARTICLES ──
  const stars = useMemo(
    () => {
      const { starCount } = getPerformanceAdjustedParticles(false);
      return generateStars(Math.floor(starCount / 2));
    },
    []
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <SectionWrapper withPattern>
      {/* ── LIGHT ATMOSPHERIC MOTION (Shimmer) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {stars.map((s) => (
          <motion.div
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
            animate={!shouldReduceMotion && !isLowPower ? {
              opacity: [s.opacity, s.opacity * 0.3, s.opacity]
            } : {}}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* ── SOFT AMBIENT GLOW PULSE ── */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(212,160,23,0.1) 0%, transparent 70%)",
        }}
        animate={!shouldReduceMotion && !isLowPower ? { opacity: [0.3, 0.7, 0.3] } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        className="relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          {/* Decorative text */}
          <motion.p
            variants={itemVariants}
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-arabian)", color: "var(--gold-primary)", opacity: 0.5 }}
          >
            ✦ Join the Journey ✦
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
          >
            Registrations{" "}
            <span className="text-gradient-gold">Open Now</span>
          </motion.h2>

          {/* Decorative line */}
          <motion.div
            variants={itemVariants}
            className="mx-auto h-[2px] rounded-full mb-6"
            style={{ background: "var(--gradient-gold)", width: 60 }}
          />

          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light"
            style={{ color: "var(--text-muted)" }}
          >
            Be a part of HIT Fest Riviera, one of the most awaited
            techno-cultural celebrations, and experience days filled
            with innovation, talent, competition, and unforgettable memories.
          </motion.p>
        </div>

        {/* Info cards */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 max-w-4xl mx-auto mb-16 relative z-10"
        >
          {infoCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="flex-1 px-6 py-5 rounded-2xl flex items-center gap-4"
                style={{
                  border: "1px solid var(--border-gold)",
                  background: "var(--gold-subtle)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--gold-dim)" }}
                >
                  <Icon size={18} style={{ color: "var(--gold-primary)" }} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{card.label}</span>
                  <span className="text-xs" style={{ color: "var(--text-dim)" }}>{card.sublabel}</span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center relative z-10"
        >
          <Link href="/register" passHref legacyBehavior>
            <motion.a
              className="group relative inline-flex items-center justify-between min-w-[220px] pl-10 pr-2 py-2 rounded-full overflow-hidden shadow-2xl"
              style={{
                border: "1px solid var(--border-gold)",
                background: "var(--gold-subtle)",
              }}
              whileHover={!shouldReduceMotion ? {
                y: -2,
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(212,160,23,0.15)",
                borderColor: "rgba(212,160,23,0.5)",
                background: "rgba(212,160,23,0.12)",
              } : {}}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span className="font-light tracking-widest text-sm mr-8 relative z-10 transition-colors duration-300 group-hover:text-[var(--gold-light)]" style={{ color: "var(--text-primary)" }}>
                Register Now
              </span>
              <div
                className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: "var(--gradient-gold)",
                  boxShadow: "var(--shadow-glow-gold-md)",
                }}
              >
                <ArrowRight size={16} className="text-[#0a0805]" />
              </div>
            </motion.a>
          </Link>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
