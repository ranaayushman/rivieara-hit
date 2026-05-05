"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Aperture } from "lucide-react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { generateStars, generateEmbers, getPerformanceAdjustedParticles } from "@/lib/particleAnimations";

const fallbackImages = ["/gallery1.jpg", "/gallery2.jpg", "/gallery3.jpg", "/gallery4.jpg", "/gallery1.jpg"];

export default function Gallery() {
  const [images, setImages] = useState<string[]>(fallbackImages);
  const [current, setCurrent] = useState(0);

  const { isLowPower } = usePerformanceMode();

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
          if (allImages.length > 0) {
            setImages(allImages.length >= 5 ? allImages.slice(0, 5) : [...allImages, ...fallbackImages].slice(0, 5));
          }
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

  const getOffset = (index: number) => {
    const raw = index - current;
    const len = images.length;
    let offset = raw;
    if (offset > len / 2) offset -= len;
    if (offset < -len / 2) offset += len;
    return offset;
  };

  const getPosition = (offset: number) => {
    const getBlur = (val: string) => isLowPower ? "blur(0px)" : val;

    if (offset === 0) return { x: "-50%", y: "-50%", scale: 1, zIndex: 50, opacity: 1, rotate: 0, filter: "blur(0px)" };
    if (offset === 1) return { x: "10%", y: "-75%", scale: 0.65, zIndex: 30, opacity: 0.8, rotate: 4, filter: getBlur("blur(2px)") };
    if (offset === -1) return { x: "-110%", y: "-20%", scale: 0.6, zIndex: 20, opacity: 0.7, rotate: -6, filter: getBlur("blur(3px)") };
    if (offset === 2) return { x: "-15%", y: "-10%", scale: 0.45, zIndex: 15, opacity: 0.5, rotate: -8, filter: getBlur("blur(5px)") };
    if (offset === -2) return { x: "-85%", y: "-85%", scale: 0.4, zIndex: 10, opacity: 0.4, rotate: 8, filter: getBlur("blur(6px)") };
    return { x: "-50%", y: "-50%", scale: 0, zIndex: 0, opacity: 0, rotate: 0, filter: "blur(0px)" };
  };

  // ── PARTICLES ──
  const stars = useMemo(
    () => {
      const { starCount } = getPerformanceAdjustedParticles(isLowPower);
      return generateStars(starCount);
    },
    [isLowPower]
  );

  const embers = useMemo(
    () => {
      const { emberCount } = getPerformanceAdjustedParticles(isLowPower);
      return generateEmbers(emberCount);
    },
    [isLowPower]
  );

  return (
    <section
      id="gallery"
      className="relative min-h-screen overflow-hidden py-24 sm:py-32 flex flex-col items-center justify-center"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      {/* 1. Deep Arabian Night */}
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at center, var(--bg-deep) 0%, var(--bg-primary) 80%)" }} />

      {/* 2. Giant Celestial Moon Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none z-0" style={{ background: "radial-gradient(circle, var(--moon-glow) 0%, transparent 60%)" }} />

      {/* 3. Static Fog Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--surface-glass) 100%)" }} />

      {/* 4. Ancient Parchment Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-noise" />

      {/* 5. Volumetric Light Beams */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen" style={{ background: "conic-gradient(from 180deg at 50% 50%, var(--moon-dim) 0deg, transparent 40deg, var(--moon-subtle) 80deg, transparent 120deg, var(--moon-dim) 160deg, transparent 360deg)" }} />

      {/* ── PARTICLE LAYERS ── */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {/* Stars */}
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

        {/* Embers */}
        {embers.map((ember) => (
          <div
            key={ember.id}
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              background: "var(--gold-light)",
              right: `${ember.right}%`,
              bottom: `${ember.bottom}%`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* ================= TITLE AREA ================= */}
      <div className="relative z-30 text-center mb-16 md:mb-24 px-4 w-full">
        <p
          className="text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold text-[var(--gold-primary)]"
          style={{ fontFamily: "var(--font-arabian)" }}
        >
          ✦ Echoes of Riviera ✦
        </p>

        <div className="">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight relative z-10"
            style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)", textShadow: "0 0 50px var(--gold-glow), 0 5px 15px rgba(0,0,0,0.9)" }}
          >
            The Memory Vault
          </h2>
        </div>
      </div>

      {/* ================= FLOATING MEMORY FRAGMENTS ================= */}
      <div
        className="relative z-30 w-full max-w-[1200px] h-[500px] sm:h-[600px] md:h-[700px] mx-auto flex items-center justify-center perspective-[2000px]"
      >
        {images.map((img, index) => {
          const offset = getOffset(index);
          const isActive = offset === 0;
          const pos = getPosition(offset);

          return (
            <div key={index} className="absolute top-1/2 left-1/2 w-[80%] sm:w-[55%] md:w-[45%] lg:w-[35%] aspect-[4/3] z-10" style={{ zIndex: pos.zIndex }}>
              <div
                className={`relative w-full h-full rounded-2xl cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform-gpu ${isActive ? 'ring-1 ring-[var(--gold-primary)]' : ''}`}
                onClick={() => { if (!isActive) navigate(offset); }}
                style={{
                  transform: `translate(${pos.x}, ${pos.y}) scale(${pos.scale}) rotateZ(${pos.rotate}deg)`,
                  opacity: pos.opacity,
                  filter: pos.filter,
                  transition: "none",
                }}
              >
                {/* Ancient Border Frame */}
                <div className="absolute inset-[-6px] border border-[var(--border-gold)] rounded-[20px] pointer-events-none" />

                {/* Image Container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[var(--border-gold)] bg-[var(--surface-primary)]">
                  <Image
                    src={img}
                    alt={`Memory Fragment ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, 40vw"
                    priority={isActive}
                  />

                  {/* Atmospheric Depth Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--surface-glass)] to-transparent pointer-events-none" />

                  {/* Magical Cinematic Aura */}
                  {isActive && (
                    <div className="absolute inset-0 mix-blend-screen pointer-events-none" style={{ background: "radial-gradient(circle at center, var(--gold-glow) 0%, transparent 70%)" }} />
                  )}
                </div>

                {/* Hero Memory Caption */}
                {isActive && (
                  <div
                    className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none"
                  >
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-glass)] backdrop-blur-md border border-[var(--border-gold)] shadow-[0_0_15px_var(--gold-glow)]">
                      <Aperture className="text-[var(--gold-primary)] w-3 h-3 md:w-4 md:h-4" />
                      <span className="text-[var(--gold-light)] font-medium tracking-[0.2em] text-[10px] md:text-xs uppercase" style={{ fontFamily: "var(--font-arabian)" }}>
                        Memory Fragment
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

      {/* ================= MAGICAL CTA BUTTON ================= */}
      <div className="relative z-40 mt-8 md:mt-16">
        <Link href="/gallery" className="relative inline-flex items-center justify-center w-[220px] h-[56px] rounded-full overflow-hidden">
          {/* Button Background Layers */}
          <div className="absolute inset-0 bg-[var(--surface-primary)] backdrop-blur-md border border-[var(--border-gold)] rounded-full" />

          {/* Internal Glow */}
          <div className="absolute inset-0 blur-md" style={{ background: "radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)" }} />

          {/* Button Content */}
          <div className="relative z-10 flex items-center gap-3">
            <span className="font-semibold tracking-[0.15em] text-sm text-[var(--gold-light)] uppercase" style={{ fontFamily: "var(--font-heading)" }}>
              Open Chronicle
            </span>
            <div className="w-8 h-8 rounded-full bg-[var(--gold-dim)] flex items-center justify-center border border-[var(--border-gold)]">
              <ArrowRight size={14} className="text-[var(--gold-light)]" />
            </div>
          </div>
        </Link>
      </div>

    </section>
  );
}
