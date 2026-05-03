"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MapPin, User, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { easing, duration, stagger } from "@/lib/motionPresets";

interface InfoCard {
  icon: typeof CalendarDays;
  label: string;
  sublabel: string;
}

const defaultCards: InfoCard[] = [
  { icon: CalendarDays, label: "March 25–28", sublabel: "2026" },
  { icon: MapPin, label: "HIT Campus", sublabel: "Haldia" },
  { icon: User, label: "Open for All", sublabel: "Students" },
];

export default function RegistrationSection() {
  const [infoCards, setInfoCards] = useState<InfoCard[]>(defaultCards);

  useEffect(() => {
    fetch("/api/public/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.settings) {
          const s = data.settings as Record<string, string>;
          if (s.event_dates || s.event_venue) {
            setInfoCards([
              { icon: CalendarDays, label: s.event_dates || "March 25–28", sublabel: "2026" },
              { icon: MapPin, label: s.event_venue || "HIT Campus", sublabel: "Haldia" },
              { icon: User, label: "Open for All", sublabel: "Students" },
            ]);
          }
        }
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  return (
    <SectionWrapper withPattern>
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        {/* Decorative text */}
        <motion.p
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ fontFamily: "var(--font-arabian)", color: "var(--gold-primary)", opacity: 0.5 }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.5, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.medium, ease: easing.expoOut }}
        >
          ✦ Join the Journey ✦
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          Registrations{" "}
          <span className="text-gradient-gold">Open Now</span>
        </motion.h2>

        {/* Decorative line */}
        <motion.div
          className="mx-auto h-[2px] rounded-full mb-6"
          style={{ background: "var(--gradient-gold)", width: 0 }}
          whileInView={{ width: 60 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, delay: 0.2, ease: easing.expoOut }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light"
          style={{ color: "var(--text-muted)" }}
        >
          Be a part of HIT Fest Riviera, one of the most awaited
          techno-cultural celebrations, and experience days filled
          with innovation, talent, competition, and unforgettable memories.
        </motion.p>
      </div>

      {/* Info cards */}
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 max-w-4xl mx-auto mb-16 relative z-10">
        {infoCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * stagger.base }}
              className="flex-1 px-6 py-5 rounded-2xl flex items-center gap-4 transition-all duration-300 group"
              style={{
                border: "1px solid var(--border-gold)",
                background: "var(--gold-subtle)",
              }}
              whileHover={{ y: -2, scale: 1.01 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{ background: "var(--gold-dim)" }}
              >
                <Icon size={18} style={{ color: "var(--gold-primary)" }} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{card.label}</span>
                <span className="text-xs" style={{ color: "var(--text-dim)" }}>{card.sublabel}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.div
        className="flex justify-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/register"
          className="group relative inline-flex items-center justify-between min-w-[220px] pl-10 pr-2 py-2 rounded-full overflow-hidden transition-all duration-300 shadow-2xl"
          style={{
            border: "1px solid var(--border-gold)",
            background: "var(--gold-subtle)",
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--gold-dim)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <span className="font-light tracking-widest text-sm mr-8 relative z-10" style={{ color: "var(--text-primary)" }}>
            Register Now
          </span>
          <div
            className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300"
            style={{
              background: "var(--gradient-gold)",
              boxShadow: "var(--shadow-glow-gold-md)",
            }}
          >
            <ArrowRight size={16} className="text-[#0a0805] group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </motion.div>
    </SectionWrapper>
  );
}
