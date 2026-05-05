"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Stars, Aperture } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { generateStars, generateEmbers, getPerformanceAdjustedParticles } from "@/lib/particleAnimations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const fallbackImages = ["/gallery1.jpg", "/gallery2.jpg", "/gallery3.jpg", "/gallery4.jpg", "/gallery1.jpg"];

/**
 * The Memory Vault of Riviera
 * Cinematic Arabian Nights memory experience.
 * Replaces a standard carousel with an organic floating cloud of memories.
 */
export default function Gallery() {
  const [images, setImages] = useState<string[]>(fallbackImages);
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  const { isLowPower, isMounted } = usePerformanceMode();

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
            // Keep exactly 5 or 7 images for optimal cloud distribution
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

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => navigate(1), 3500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, navigate]);

  // Calculate circular offset for scattered layout
  const getOffset = (index: number) => {
    const raw = index - current;
    const len = images.length;
    let offset = raw;
    if (offset > len / 2) offset -= len;
    if (offset < -len / 2) offset += len;
    return offset;
  };

  // Cinematic Scattered Positions
  const getPosition = (offset: number) => {
    // Drop heavy blurs on mobile
    const getBlur = (val: string) => isLowPower ? "blur(0px)" : val;
    
    if (offset === 0) return { x: "-50%", y: "-50%", scale: 1, zIndex: 50, opacity: 1, rotate: 0, filter: "blur(0px)" };
    if (offset === 1) return { x: "10%", y: "-75%", scale: 0.65, zIndex: 30, opacity: 0.8, rotate: 4, filter: getBlur("blur(2px)") };
    if (offset === -1) return { x: "-110%", y: "-20%", scale: 0.6, zIndex: 20, opacity: 0.7, rotate: -6, filter: getBlur("blur(3px)") };
    if (offset === 2) return { x: "-15%", y: "-10%", scale: 0.45, zIndex: 15, opacity: 0.5, rotate: -8, filter: getBlur("blur(5px)") };
    if (offset === -2) return { x: "-85%", y: "-85%", scale: 0.4, zIndex: 10, opacity: 0.4, rotate: 8, filter: getBlur("blur(6px)") };
    return { x: "-50%", y: "-50%", scale: 0, zIndex: 0, opacity: 0, rotate: 0, filter: "blur(0px)" };
  };

  // GSAP Environmental Motion
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      // Fog slowly parts on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1.5,
        onUpdate: (self) => {
          if (fogRef.current) gsap.set(fogRef.current, { opacity: 1 - self.progress });
        }
      });

      // Ambient Drifting memory wrappers (disable on low power)
      if (!isLowPower) {
        gsap.utils.toArray(".memory-drifter").forEach((drifter: any, i) => {
          gsap.to(drifter, {
            y: i % 2 === 0 ? -20 : 20,
            x: i % 3 === 0 ? 15 : -15,
            rotationZ: i % 2 === 0 ? 2 : -2,
            duration: 4 + (i % 3),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.5,
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [images, isLowPower]);

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
      ref={sectionRef}
      id="gallery"
      className="relative min-h-screen overflow-hidden py-24 sm:py-32 flex flex-col items-center justify-center"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      {/* 1. Deep Arabian Night */}
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at center, var(--bg-deep) 0%, var(--bg-primary) 80%)" }} />
      
      {/* 2. Giant Celestial Moon Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[50px] pointer-events-none z-0 animate-[glow-pulse_8s_infinite]" style={{ background: "radial-gradient(circle, var(--moon-glow) 0%, transparent 60%)" }} />

      {/* 3. Floating Fog Overlay */}
      <div ref={fogRef} className="absolute inset-0 z-20 pointer-events-none" style={{ background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--surface-glass) 100%)" }} />

      {/* 4. Ancient Parchment Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-noise" />

      {/* 5. Volumetric Light Beams */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen" style={{ background: "conic-gradient(from 180deg at 50% 50%, var(--moon-dim) 0deg, transparent 40deg, var(--moon-subtle) 80deg, transparent 120deg, var(--moon-dim) 160deg, transparent 360deg)" }} />

      {/* ── PARTICLE ANIMATIONS ── */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {/* Stars */}
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

        {/* Embers */}
        {embers.map((ember) => (
          <motion.div
            key={ember.id}
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              background: "var(--gold-light)",
              right: `${ember.right}%`,
              bottom: `${ember.bottom}%`,
            }}
            animate={{ y: [0, -60], opacity: [0, 0.7, 0] }}
            transition={{ duration: ember.duration, repeat: Infinity, delay: ember.delay }}
          />
        ))}
      </div>

      {/* ================= TITLE AREA ================= */}
      <div className="relative z-30 text-center mb-16 md:mb-24 px-4 w-full">
        <motion.p
          className="text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-semibold text-[var(--gold-primary)]"
          style={{ fontFamily: "var(--font-arabian)" }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          ✦ Echoes of Riviera ✦
        </motion.p>
        
        <motion.div
          className=""
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight relative z-10"
            style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)", textShadow: "0 0 50px var(--gold-glow), 0 5px 15px rgba(0,0,0,0.9)" }}
          >
            The Memory Vault
          </h2>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-transparent translate-x-[-100%] animate-[shimmer_6s_infinite] pointer-events-none z-20 mix-blend-overlay" />
        </motion.div>
      </div>

      {/* ================= FLOATING MEMORY FRAGMENTS ================= */}
      <div 
        className="relative z-30 w-full max-w-[1200px] h-[500px] sm:h-[600px] md:h-[700px] mx-auto flex items-center justify-center perspective-[2000px]"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {images.map((img, index) => {
          const offset = getOffset(index);
          const isActive = offset === 0;
          const pos = getPosition(offset);

          return (
            <div key={index} className="absolute top-1/2 left-1/2 w-[80%] sm:w-[55%] md:w-[45%] lg:w-[35%] aspect-[4/3] memory-drifter z-10" style={{ zIndex: pos.zIndex }}>
              <motion.div
                animate={{
                  x: pos.x,
                  y: pos.y,
                  scale: pos.scale,
                  rotateZ: pos.rotate,
                  opacity: pos.opacity,
                  filter: pos.filter,
                }}
                transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
                className={`relative w-full h-full rounded-2xl cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform-gpu ${isActive ? 'ring-1 ring-[var(--gold-primary)]' : ''}`}
                onClick={() => { if (!isActive) navigate(offset); }}
                whileHover={isActive ? { scale: 1.05, filter: "brightness(1.1)" } : undefined}
              >
                {/* Ancient Border Frame */}
                <div className="absolute inset-[-6px] border border-[var(--border-gold)] rounded-[20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Image Container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[var(--border-gold)] bg-[var(--surface-primary)]">
                  <Image 
                    src={img} 
                    alt={`Memory Fragment ${index + 1}`} 
                    fill 
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 ease-out" 
                    sizes="(max-width: 768px) 80vw, 40vw"
                    priority={isActive}
                  />
                  
                  {/* Atmospheric Depth Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--surface-glass)] to-transparent pointer-events-none" />
                  
                  {/* Magical Cinematic Aura on Hover */}
                  {isActive && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen pointer-events-none" style={{ background: "radial-gradient(circle at center, var(--gold-glow) 0%, transparent 70%)" }} />
                  )}
                </div>

                {/* Hero Memory Caption */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none"
                    >
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-glass)] backdrop-blur-md border border-[var(--border-gold)] shadow-[0_0_15px_var(--gold-glow)]">
                        <Aperture className="text-[var(--gold-primary)] w-3 h-3 md:w-4 md:h-4 animate-[spin-slow_6s_linear_infinite]" />
                        <span className="text-[var(--gold-light)] font-medium tracking-[0.2em] text-[10px] md:text-xs uppercase" style={{ fontFamily: "var(--font-arabian)" }}>
                          Memory Fragment
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ================= MAGICAL CTA BUTTON ================= */}
      <div className="relative z-40 mt-8 md:mt-16">
        <Link href="/gallery" className="group relative inline-flex items-center justify-center w-[220px] h-[56px] rounded-full overflow-hidden transition-transform duration-300 hover:scale-105">
          {/* Button Background Layers */}
          <div className="absolute inset-0 bg-[var(--surface-primary)] backdrop-blur-md border border-[var(--border-gold)] rounded-full transition-colors duration-500 group-hover:bg-[var(--surface-glass)] group-hover:border-[var(--gold-primary)]" />
          
          {/* Shimmer Sweep Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--gold-dim)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
          
          {/* Internal Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" style={{ background: "radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)" }} />

          {/* Button Content */}
          <div className="relative z-10 flex items-center gap-3">
            <span className="font-semibold tracking-[0.15em] text-sm text-[var(--gold-light)] uppercase" style={{ fontFamily: "var(--font-heading)" }}>
              Open Chronicle
            </span>
            <div className="w-8 h-8 rounded-full bg-[var(--gold-dim)] flex items-center justify-center border border-[var(--border-gold)] group-hover:bg-[var(--gold-primary)] transition-colors duration-500">
              <ArrowRight size={14} className="text-[var(--gold-light)] group-hover:text-[var(--bg-primary)] transition-colors duration-500 group-hover:translate-x-0.5" />
            </div>
          </div>
        </Link>
      </div>

    </section>
  );
}
