"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { easing, duration } from "@/lib/motionPresets";

/**
 * Cinematic Arabian Nights hero section.
 * Features: crescent moon, palace silhouettes, floating particles,
 * atmospheric fog, parallax layers, staggered text reveal.
 */
export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [subtitle, setSubtitle] = useState("Biggest Private College Fest in West Bengal");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const moonY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const palaceY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const handle = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  useEffect(() => {
    fetch("/api/public/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.settings?.hero_subtitle) {
          setSubtitle(data.settings.hero_subtitle as string);
        }
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* ═══════════ BACKGROUND LAYERS ═══════════ */}

      {/* Stars / dots pattern */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              background: "var(--gold-primary)",
              opacity: Math.random() * 0.3 + 0.1,
              animation: `glow-pulse ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Mouse-tracking gold glow */}
      <div
        className="pointer-events-none absolute w-[700px] h-[700px] rounded-full hidden md:block will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(212, 160, 23, 0.06) 0%, transparent 70%)",
          transform: `translate(${mousePos.x - 350}px, ${mousePos.y - 350}px)`,
          transition: "transform 120ms linear",
        }}
        aria-hidden="true"
      />

      {/* Ambient center glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(212, 160, 23, 0.08) 0%, rgba(106, 13, 173, 0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      {/* Film noise */}
      <div className="absolute inset-0 bg-noise" aria-hidden="true" />

      {/* ═══════════ CRESCENT MOON ═══════════ */}
      <motion.div
        className="absolute top-[4%] right-[3%] md:top-[5%] md:right-[5%] lg:right-[8%]"
        style={{ y: moonY }}
        aria-hidden="true"
      >
        <div className="relative">
          {/* Moon glow */}
          <div
            className="absolute inset-0 w-24 h-24 md:w-36 md:h-36 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(212, 160, 23, 0.20) 0%, transparent 70%)",
              filter: "blur(30px)",
              transform: "scale(2.5)",
            }}
          />
          {/* Crescent moon shape */}
          <svg
            viewBox="0 0 100 100"
            className="w-20 h-20 md:w-28 md:h-28 relative z-10"
            style={{ filter: "drop-shadow(0 0 20px rgba(212, 160, 23, 0.4))" }}
          >
            <defs>
              <linearGradient id="moonGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--gold-light)" />
                <stop offset="100%" stopColor="var(--gold-primary)" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#moonGrad)" />
            <circle cx="65" cy="40" r="32" fill="var(--bg-primary)" />
          </svg>
        </div>
      </motion.div>

      {/* ═══════════ PALACE SILHOUETTE ═══════════ */}
      <motion.div
        className="absolute bottom-0 inset-x-0 h-[200px] md:h-[280px]"
        style={{ y: palaceY }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 280"
          className="w-full h-full"
          preserveAspectRatio="xMidYMax slice"
          style={{ opacity: 0.15 }}
        >
          <defs>
            <linearGradient id="palaceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--gold-primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--bg-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Palace domes and minarets */}
          <path
            d="M0,280 L0,220 L80,220 L80,180 L90,140 C95,120 105,120 110,140 L120,180 L120,220 
               L200,220 L200,170 C230,100 270,100 300,170 L300,220 
               L380,220 L380,190 L390,150 C395,130 405,130 410,150 L420,190 L420,220 
               L520,220 L520,160 C550,80 590,80 620,160 L620,220 
               L700,220 L700,200 L710,160 C715,140 725,140 730,160 L740,200 L740,220 
               L820,220 L820,180 C850,110 890,110 920,180 L920,220 
               L1000,220 L1000,190 L1010,150 C1015,130 1025,130 1030,150 L1040,190 L1040,220 
               L1120,220 L1120,170 C1150,100 1190,100 1220,170 L1220,220 
               L1300,220 L1300,200 L1310,160 C1315,140 1325,140 1330,160 L1340,200 L1340,220 
               L1440,220 L1440,280 Z"
            fill="url(#palaceGrad)"
          />
        </svg>
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-32"
        style={{ background: "linear-gradient(to top, var(--bg-primary), transparent)" }}
        aria-hidden="true"
      />

      {/* ═══════════ CONTENT ═══════════ */}
      <motion.div
        className="relative z-10 text-center section-container flex flex-col items-center px-4 sm:px-6 pt-28 pb-20 md:pt-0 md:pb-0"
        style={{ y: contentY, opacity }}
      >
        {/* Decorative Arabian text */}
        <motion.p
          className="text-xs md:text-sm tracking-[0.4em] uppercase mb-6"
          style={{
            fontFamily: "var(--font-arabian)",
            color: "var(--gold-primary)",
            opacity: 0.7,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: duration.slow, delay: 0.1, ease: easing.expoOut }}
        >
          ✦ A Night of Wonders ✦
        </motion.p>

        {/* Main heading — Cinzel */}
        <motion.h1
          className="text-hero font-bold tracking-tighter leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easing.expoOut }}
        >
          <span style={{ color: "var(--text-primary)" }}>Riviera</span>{" "}
          <span
            className="text-gradient-gold"
            style={{
              filter: "drop-shadow(0 0 30px rgba(212, 160, 23, 0.3))",
            }}
          >
            2026
          </span>
        </motion.h1>

        {/* Arabian Nights subtitle */}
        <motion.h2
          className="text-xl md:text-3xl mt-2 md:mt-4 tracking-[0.15em]"
          style={{
            fontFamily: "var(--font-arabian)",
            color: "var(--gold-primary)",
            textShadow: "0 0 40px rgba(212, 160, 23, 0.2)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: easing.expoOut }}
        >
          Arabian Nights
        </motion.h2>

        {/* Pill subtitle */}
        <motion.div
          className="mt-8 md:mt-10 px-8 py-3.5 rounded-full backdrop-blur-sm"
          style={{
            border: "1px solid var(--border-gold)",
            background: "var(--gold-subtle)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: easing.expoOut }}
        >
          <span
            className="text-sm sm:text-base md:text-lg font-light tracking-wide"
            style={{ color: "var(--text-muted)" }}
          >
            {subtitle}
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: easing.expoOut }}
        >
          {/* Primary CTA */}
          <Link
            href="/register"
            className="group relative inline-flex items-center justify-between min-w-[220px] pl-10 pr-2 py-2 rounded-full overflow-hidden transition-all duration-300 shadow-2xl"
            style={{
              border: "1px solid var(--border-gold)",
              background: "var(--gold-subtle)",
            }}
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--gold-dim)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span
              className="font-light tracking-widest text-sm mr-8 relative z-10"
              style={{ color: "var(--text-primary)" }}
            >
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

          {/* Secondary CTA */}
          <Link
            href="/#events"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full transition-all duration-300"
            style={{
              border: "1px solid var(--border-gold)",
              background: "transparent",
              color: "var(--gold-primary)",
            }}
          >
            <Sparkles size={16} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-sm font-medium tracking-wide">Explore Events</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
          style={{ border: "1px solid var(--border-gold)" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: "var(--gold-primary)" }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}