"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { generateStars, getPerformanceAdjustedParticles } from "@/lib/particleAnimations";

interface SponsorData {
  id: string;
  name: string;
  tier: string;
  logo_url: string;
  bg_color: string;
  website_url: string | null;
}

// Fallback sponsors rendered when API returns nothing
const fallbackSponsors: { id: string; bg: string; name: string; fallback: React.ReactNode }[] = [
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
  const [offset, setOffset] = useState(0);
  const [dynamicSponsors, setDynamicSponsors] = useState<SponsorData[] | null>(null);

  useEffect(() => {
    fetch("/api/public/sponsors")
      .then((r) => r.json())
      .then((data) => {
        if (data.sponsors && data.sponsors.length >= 4) {
          setDynamicSponsors(data.sponsors.slice(0, 4));
        }
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  useEffect(() => {
    const count = dynamicSponsors ? dynamicSponsors.length : fallbackSponsors.length;
    const timer = setInterval(() => {
      setOffset((prev) => (prev + 1) % count);
    }, 3000);
    return () => clearInterval(timer);
  }, [dynamicSponsors]);

  const items = dynamicSponsors
    ? dynamicSponsors.map((s) => ({
        id: s.id, bg: "", name: s.name, logo_url: s.logo_url, bg_color: s.bg_color, website_url: s.website_url,
      }))
    : null;

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

      {/* ── PARTICLE ANIMATIONS ── */}
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
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
          />
        ))}
      </div>

      <div className="max-w-[700px] mx-auto w-full px-4 sm:px-6 mb-20">
        <div className="relative w-full aspect-[5/4] sm:aspect-[4/3] mx-auto">
          {items
            ? items.map((sponsor, i) => {
                const slot = (i + offset) % items.length;
                const layout = layouts[slot] || layouts[0];

                return (
                  <motion.div
                    key={sponsor.id}
                    initial={false}
                    animate={{ left: layout.left, top: layout.top, width: layout.width, height: layout.height }}
                    transition={{ type: "spring", stiffness: 120, damping: 18, mass: 1 }}
                    className="absolute overflow-hidden shadow-2xl group"
                    style={{
                      backgroundColor: sponsor.bg_color,
                      borderRadius: "var(--radius-luxury)",
                      border: "1px solid var(--border-gold)",
                    }}
                  >
                    {/* Gold shimmer on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                      style={{
                        background: "linear-gradient(135deg, rgba(212, 160, 23, 0.1), transparent 50%)",
                      }}
                    />
                    <a href={sponsor.website_url || "#"} target="_blank" rel="noopener noreferrer" className="w-full h-full absolute inset-0 z-20">
                      <Image src={sponsor.logo_url} alt={`${sponsor.name} logo`} fill className="object-contain p-6 sm:p-8 hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
                    </a>
                  </motion.div>
                );
              })
            : fallbackSponsors.map((sponsor, i) => {
                const slot = (i + offset) % fallbackSponsors.length;
                const layout = layouts[slot];

                return (
                  <motion.div
                    key={sponsor.id}
                    initial={false}
                    animate={{ left: layout.left, top: layout.top, width: layout.width, height: layout.height }}
                    transition={{ type: "spring", stiffness: 120, damping: 18, mass: 1 }}
                    className={`absolute overflow-hidden shadow-2xl ring-1 ring-black/10 group ${sponsor.bg}`}
                    style={{
                      borderRadius: "var(--radius-luxury)",
                      border: "1px solid var(--border-gold)",
                    }}
                  >
                    {/* Gold shimmer on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                      style={{
                        background: "linear-gradient(135deg, rgba(212, 160, 23, 0.15), transparent 50%)",
                      }}
                    />
                    <div className="w-full h-full absolute inset-0">{sponsor.fallback}</div>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </SectionWrapper>
  );
}
