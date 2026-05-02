"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

const images = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const navigate = useCallback((dir: number) => {
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => navigate(1), 3000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, navigate]);

  const getOffset = (index: number) => {
    const raw = index - current;
    if (raw === 0) return 0; // Active
    if (raw === 1 || raw === -(images.length - 1)) return 1; // Right
    if (raw === -1 || raw === images.length - 1) return -1; // Left
    return 2; // Hidden
  };

  return (
    <SectionWrapper id="gallery">
      <div className="text-center mb-16 md:mb-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
          Gallery
        </h2>
      </div>

      <div 
        className="relative max-w-[1400px] mx-auto flex flex-col items-center justify-center"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Coverflow carousel */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center [perspective:1200px] overflow-hidden sm:overflow-visible">
          {images.map((img, index) => {
            const offset = getOffset(index);
            const isActive = offset === 0;
            const isHidden = Math.abs(offset) > 1;

            return (
              <motion.div
                key={index}
                animate={{
                  x: offset === 0 ? "0%" : offset === 1 ? "75%" : offset === -1 ? "-75%" : "0%",
                  scale: isActive ? 1 : 0.85,
                  opacity: isHidden ? 0 : isActive ? 1 : 0.6,
                  zIndex: isActive ? 30 : isHidden ? 0 : 10,
                }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] as const }}
                className="absolute w-[75%] sm:w-[55%] md:w-[45%] lg:w-[40%] aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
                style={{
                  boxShadow: isActive ? "0 0 80px rgba(239, 68, 68, 0.35)" : "none",
                  pointerEvents: isHidden ? "none" : "auto",
                }}
                onClick={() => {
                  if (!isActive) navigate(offset);
                }}
              >
                <Image
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 75vw, 50vw"
                  priority={isActive}
                />
                
                {/* Dark overlay for inactive slides */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/30 pointer-events-none transition-opacity duration-500" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* View Gallery Button */}
        <div className="mt-16 md:mt-24 z-40">
          <Link 
            href="/gallery" 
            className="inline-flex items-center gap-6 pl-8 pr-2 py-2 rounded-full border border-red-500/30 bg-[#110505] hover:bg-[#1a0505] hover:border-red-500/60 transition-all duration-300 group shadow-xl"
          >
            <span className="text-white/90 font-medium tracking-wide text-sm sm:text-base">
              View Gallery
            </span>
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.4)] group-hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] transition-all">
              <ArrowRight size={18} className="text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
