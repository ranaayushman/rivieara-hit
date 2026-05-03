"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

const fallbackImages = ["/gallery1.jpg", "/gallery2.jpg", "/gallery3.jpg", "/gallery4.jpg"];

export default function Gallery() {
  const [images, setImages] = useState<string[]>(fallbackImages);
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    fetch("/api/public/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (data.albums && data.albums.length > 0) {
          const allImages: string[] = [];
          for (const album of data.albums) {
            for (const img of album.gallery_images || []) {
              allImages.push(img.image_url);
            }
          }
          if (allImages.length > 0) setImages(allImages.length >= 3 ? allImages : [...allImages, ...fallbackImages].slice(0, 4));
        }
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  const navigate = useCallback((dir: number) => {
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  }, [images.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => navigate(1), 3000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, navigate]);

  const getOffset = (index: number) => {
    const raw = index - current;
    if (raw === 0) return 0;
    if (raw === 1 || raw === -(images.length - 1)) return 1;
    if (raw === -1 || raw === images.length - 1) return -1;
    return 2;
  };

  return (
    <SectionWrapper id="gallery" withGlow>
      <SectionHeading
        text="Our"
        accent="Gallery"
        arabianText="✦ Memories ✦"
      />

      <div
        className="relative max-w-[1400px] mx-auto flex flex-col items-center justify-center"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
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
                className="absolute w-[75%] sm:w-[55%] md:w-[45%] lg:w-[40%] aspect-[4/3] overflow-hidden cursor-pointer shadow-2xl"
                style={{
                  borderRadius: "var(--radius-luxury)",
                  border: isActive ? "2px solid var(--border-hover)" : "1px solid var(--border-gold)",
                  boxShadow: isActive ? "var(--shadow-glow-gold-lg)" : "none",
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

                {/* Inactive overlay */}
                {!isActive && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{ background: "rgba(5, 5, 5, 0.3)" }}
                  />
                )}

                {/* Gold vignette on active */}
                {isActive && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, rgba(5, 5, 5, 0.4) 0%, transparent 40%)",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* View Gallery CTA */}
        <div className="mt-16 md:mt-24 z-40">
          <Link
            href="/gallery"
            className="group relative inline-flex items-center gap-6 pl-8 pr-2 py-2 rounded-full overflow-hidden transition-all duration-300 shadow-xl"
            style={{
              border: "1px solid var(--border-gold)",
              background: "var(--gold-subtle)",
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--gold-dim)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="font-medium tracking-wide text-sm sm:text-base relative z-10" style={{ color: "var(--text-primary)" }}>
              View Gallery
            </span>
            <div
              className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-all"
              style={{
                background: "var(--gradient-gold)",
                boxShadow: "var(--shadow-glow-gold-md)",
              }}
            >
              <ArrowRight size={18} className="text-[#0a0805] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
