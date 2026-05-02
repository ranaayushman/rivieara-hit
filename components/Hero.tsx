"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) =>
      setMousePos({ x: e.pageX, y: e.pageY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[var(--clr-bg)] text-white overflow-hidden">

      {/* ── Background Layers ── */}

      {/* Mouse-tracking glow */}
      <div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full bg-[var(--clr-primary)] opacity-[0.08] blur-[160px] hidden md:block will-change-transform"
        style={{
          transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
          transition: "transform 80ms linear",
        }}
        aria-hidden="true"
      />

      {/* Tech grid */}
      <div className="bg-grid" aria-hidden="true" />

      {/* Center radial glow */}
      <div
        className="absolute w-[500px] h-[500px] bg-[var(--clr-primary)] opacity-[0.12] rounded-full blur-[180px]"
        aria-hidden="true"
      />

      {/* Noise */}
      <div className="absolute inset-0 bg-noise" aria-hidden="true" />

      {/* Gradient edge fade */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[var(--clr-bg)] via-transparent to-[var(--clr-bg)] opacity-60"
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 text-center section-container flex flex-col items-center px-4 sm:px-6 pt-24 pb-16 md:pt-0 md:pb-0">

        {/* Main heading */}
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-white">Riviera</span>{" "}
          <span className="text-[#ff3333] drop-shadow-[0_0_30px_rgba(255,51,51,0.4)]">
            2026
          </span>
        </motion.h1>

        {/* Pill Subtitle */}
        <motion.div
          className="mt-8 md:mt-10 px-8 py-3.5 rounded-full border border-white/20 bg-white/[0.02] backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm sm:text-base md:text-lg text-white/70 font-light tracking-wide">
            Biggest Private College Fest in West Bengal
          </span>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mt-10 md:mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <Link 
            href="/register" 
            className="inline-flex items-center justify-between min-w-[200px] pl-10 pr-2 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 transition-all duration-300 group shadow-2xl"
          >
            <span className="text-white/90 font-light tracking-widest text-sm mr-8">Sign Up</span>
            <div className="w-10 h-10 rounded-full bg-[#ff3333] flex items-center justify-center shadow-[0_0_20px_rgba(255,51,51,0.6)] group-hover:scale-105 transition-all">
              <ArrowRight size={16} className="text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        {/* <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--clr-text-dim)] font-medium">
            Scroll
          </span>
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-white/60"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  );
}