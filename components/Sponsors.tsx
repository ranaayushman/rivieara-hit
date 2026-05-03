"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";

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

  return (
    <SectionWrapper id="sponsors" className="!bg-[#150505]">
      <div className="text-center mb-16 md:mb-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
          Our <span className="text-red-500">Sponsors</span>
        </h2>
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
                    layout
                    initial={false}
                    animate={{ left: layout.left, top: layout.top, width: layout.width, height: layout.height }}
                    transition={{ type: "spring", stiffness: 120, damping: 18, mass: 1 }}
                    className="absolute rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/10"
                    style={{ backgroundColor: sponsor.bg_color }}
                  >
                    <a href={sponsor.website_url || "#"} target="_blank" rel="noopener noreferrer" className="w-full h-full absolute inset-0">
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
                    layout
                    initial={false}
                    animate={{ left: layout.left, top: layout.top, width: layout.width, height: layout.height }}
                    transition={{ type: "spring", stiffness: 120, damping: 18, mass: 1 }}
                    className={`absolute rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/10 ${sponsor.bg}`}
                  >
                    <div className="w-full h-full absolute inset-0">{sponsor.fallback}</div>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </SectionWrapper>
  );
}
