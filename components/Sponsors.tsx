"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";

// Sponsor data. 
// When the admin uploads real logos, populate the `imageUrl` property (e.g. imageUrl: "/sponsors/sprite.png").
// The layout will automatically use the real image instead of the CSS fallback!
const sponsors = [
  {
    id: "sprite",
    bg: "bg-[#008b47]", // Background color for the card
    imageUrl: "", // Placeholder for admin upload
    fallback: (
      <div className="flex items-center justify-center w-full h-full">
        <span className="text-white text-4xl sm:text-5xl md:text-6xl font-bold italic tracking-tighter drop-shadow-md" style={{ fontFamily: 'Georgia, serif' }}>
          Sprite
        </span>
      </div>
    )
  },
  {
    id: "coca-cola",
    bg: "bg-[#e50014]",
    imageUrl: "", // Placeholder for admin upload
    fallback: (
      <div className="flex items-center justify-center w-full h-full">
        <span className="text-white text-4xl sm:text-5xl md:text-6xl drop-shadow-md" style={{ fontFamily: 'cursive, "Brush Script MT"' }}>
          Coca-Cola
        </span>
      </div>
    )
  },
  {
    id: "fanta",
    bg: "bg-[#ff8b00]",
    imageUrl: "", // Placeholder for admin upload
    fallback: (
      <div className="flex items-center justify-center w-full h-full">
        <div className="relative inline-flex flex-col items-center mt-2">
           <div className="absolute -top-6 left-1/2 w-8 h-8 bg-[#008b47] rounded-tl-full rounded-br-full z-10 rotate-12 border-2 border-white shadow-sm"></div>
           <span className="text-white text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter" style={{ textShadow: '3px 3px 0 #004b93, -2px -2px 0 #004b93, 2px -2px 0 #004b93, -2px 2px 0 #004b93', fontFamily: 'Impact, sans-serif' }}>
             FANTA
           </span>
        </div>
      </div>
    )
  },
  {
    id: "pepsi",
    bg: "bg-white",
    imageUrl: "", // Placeholder for admin upload
    fallback: (
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full flex flex-col overflow-hidden border-4 border-white shadow-lg">
           <div className="bg-[#e01a22] w-full h-[40%]"></div>
           <div className="bg-white w-full h-[20%] flex items-center justify-center relative z-10 scale-110">
             <span className="text-[#004b93] font-black tracking-widest uppercase text-xl sm:text-2xl absolute z-20" style={{ fontFamily: 'Arial, sans-serif' }}>PEPSI</span>
           </div>
           <div className="bg-[#004b93] w-full h-[40%]"></div>
        </div>
      </div>
    )
  }
];

// Asymmetric masonry grid layout slots that form a bounding box
const layouts = [
  { left: "0%", top: "0%", width: "54%", height: "45%" },   // Slot 0: Top-Left (Wide)
  { left: "57%", top: "0%", width: "43%", height: "55%" },  // Slot 1: Top-Right (Tall)
  { left: "46%", top: "58%", width: "54%", height: "42%" }, // Slot 2: Bottom-Right (Wide)
  { left: "0%", top: "48%", width: "43%", height: "52%" },  // Slot 3: Bottom-Left (Tall)
];

export default function Sponsors() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Auto rotate every 3 seconds
    const timer = setInterval(() => {
      setOffset((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SectionWrapper id="sponsors" className="!bg-[#150505]">
      {/* Remove red glow to let the colorful cards pop against dark background */}
      <div className="text-center mb-16 md:mb-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
          Our <span className="text-red-500">Sponsors</span>
        </h2>
      </div>

      <div className="max-w-[700px] mx-auto w-full px-4 sm:px-6 mb-20">
        <div className="relative w-full aspect-[5/4] sm:aspect-[4/3] mx-auto">
          {sponsors.map((sponsor, i) => {
            // Clockwise movement: (i + offset) % 4
            const currentSlotIndex = (i + offset) % 4;
            const layout = layouts[currentSlotIndex];

            return (
              <motion.div
                key={sponsor.id}
                layout
                initial={false}
                animate={{
                  left: layout.left,
                  top: layout.top,
                  width: layout.width,
                  height: layout.height,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                  mass: 1,
                }}
                className={`absolute rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/10 ${sponsor.bg}`}
              >
                {/* layout prop on motion.div smoothly animates size & position changes */}
                <div className="w-full h-full absolute inset-0">
                  {sponsor.imageUrl ? (
                    <Image
                      src={sponsor.imageUrl}
                      alt={`${sponsor.id} logo`}
                      fill
                      className="object-contain p-6 sm:p-8 hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  ) : (
                    sponsor.fallback
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
