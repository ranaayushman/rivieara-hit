"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { generateStars, getPerformanceAdjustedParticles } from "@/lib/particleAnimations";



const sponsorsList = [
  {
    id: "sprite", bg: "bg-[#008b47]", name: "Sprite",
    fallback: <div className="flex items-center justify-center w-full h-full"><span className="text-white text-4xl sm:text-5xl md:text-6xl font-bold italic tracking-tighter drop-shadow-md" style={{ fontFamily: 'Georgia, serif' }}>Sprite</span></div>
  },
  {
    id: "coca-cola", bg: "bg-[#e50014]", name: "Coca-Cola",
    fallback: <div className="flex items-center justify-center w-full h-full"><span className="text-white text-4xl sm:text-5xl md:text-6xl drop-shadow-md" style={{ fontFamily: 'cursive, "Brush Script MT"' }}>Coca-Cola</span></div>
  },
  {
    id: "fanta", bg: "bg-[#ff8b00]", name: "Fanta",
    fallback: <div className="flex items-center justify-center w-full h-full"><span className="text-white text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter" style={{ textShadow: '3px 3px 0 #004b93', fontFamily: 'Impact, sans-serif' }}>FANTA</span></div>
  },
  {
    id: "pepsi", bg: "bg-white", name: "Pepsi",
    fallback: <div className="flex items-center justify-center w-full h-full p-4"><div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full flex flex-col overflow-hidden border-4 border-white shadow-lg"><div className="bg-[#e01a22] w-full h-[40%]" /><div className="bg-white w-full h-[20%] flex items-center justify-center relative z-10 scale-110"><span className="text-[#004b93] font-black tracking-widest uppercase text-xl sm:text-2xl absolute z-20" style={{ fontFamily: 'Arial, sans-serif' }}>PEPSI</span></div><div className="bg-[#004b93] w-full h-[40%]" /></div></div>
  }
];

const layouts = [
  { left: "0%", top: "0%", width: "54%", height: "45%" },
  { left: "57%", top: "0%", width: "43%", height: "55%" },
  { left: "46%", top: "58%", width: "54%", height: "42%" },
  { left: "0%", top: "48%", width: "43%", height: "52%" },
];

export default function Sponsors() {


  // ── PARTICLES ──
  const stars = useMemo(
    () => {
      const { starCount } = getPerformanceAdjustedParticles(false);
      return generateStars(Math.floor(starCount / 2)); // Half stars for sponsors
    },
    []
  );

  return (
    <SectionWrapper id="sponsors">
      <SectionHeading
        text="Our"
        accent="Sponsors"
        arabianText="✦ Royal Patrons ✦"
      />

      {/* ── PARTICLE LAYERS ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
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
      </div>

      <div className="max-w-[700px] mx-auto w-full px-4 sm:px-6 mb-20">
        <div className="relative w-full aspect-[5/4] sm:aspect-[4/3] mx-auto">
          {sponsorsList.map((sponsor, i) => {
                const layout = layouts[i % layouts.length];

                return (
                  <div
                    key={sponsor.id}
                    className={`absolute overflow-hidden shadow-2xl ring-1 ring-black/10 ${sponsor.bg}`}
                    style={{
                      left: layout.left,
                      top: layout.top,
                      width: layout.width,
                      height: layout.height,
                      borderRadius: "var(--radius-luxury)",
                      border: "1px solid var(--border-gold)",
                    }}
                  >
                    <div className="w-full h-full absolute inset-0">{sponsor.fallback}</div>
                  </div>
                );
              })}
        </div>
      </div>
    </SectionWrapper>
  );
}
