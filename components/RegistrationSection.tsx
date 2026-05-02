"use client";

import { CalendarDays, MapPin, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

const infoCards = [
  {
    icon: CalendarDays,
    label: "March 25–28",
    sublabel: "2026",
  },
  {
    icon: MapPin,
    label: "HIT Campus",
    sublabel: "Haldia",
  },
  {
    icon: User,
    label: "Open for All",
    sublabel: "Students",
  },
];

export default function RegistrationSection() {
  return (
    <SectionWrapper>
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight mb-6"
        >
          Registrations <span className="text-[#ff3333]">Open Now</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light"
        >
          Be a part of HIT Fest Riviera, one of the most awaited
          techno-cultural celebrations, and experience days filled
          with innovation, talent, competition, and unforgettable memories.
        </motion.p>
      </div>

      {/* Info cards matching screenshot style */}
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 max-w-4xl mx-auto mb-16 relative z-10">
        {infoCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex-1 px-6 py-5 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center gap-4 hover:bg-white/[0.04] transition-colors"
            >
              <Icon
                size={20}
                className="text-white/60"
              />
              <div className="flex flex-col text-left">
                 <span className="text-white/80 text-sm font-medium">{card.label}</span>
                 <span className="text-white/40 text-xs">{card.sublabel}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Button matching screenshot */}
      <motion.div 
        className="flex justify-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <Link 
          href="/register" 
          className="inline-flex items-center justify-between min-w-[220px] pl-10 pr-2 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 transition-all duration-300 group shadow-2xl"
        >
          <span className="text-white/90 font-light tracking-widest text-sm mr-8">Register Now</span>
          <div className="w-10 h-10 rounded-full bg-[#ff3333] flex items-center justify-center shadow-[0_0_20px_rgba(255,51,51,0.6)] group-hover:scale-105 transition-all">
            <ArrowRight size={16} className="text-white group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </motion.div>
    </SectionWrapper>
  );
}
