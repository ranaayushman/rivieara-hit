"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });
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

        {/* Status badge */}
        <motion.div
          className="mb-8 inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[var(--clr-primary)]/20 bg-[var(--clr-primary-dim)] text-red-200 text-sm font-medium backdrop-blur-md animate-pulse-glow"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Sparkles size={14} className="text-[var(--clr-primary)]" />
          Registrations Now Open
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Riviera{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--clr-primary)] to-red-400 drop-shadow-[0_0_40px_rgba(239,68,68,0.7)]">
            2026
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-[var(--clr-text-muted)] leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          The Ultimate Tech & Cultural Fest.{" "}
          <br className="hidden sm:block" />
          Where{" "}
          <span className="text-zinc-200 font-medium">innovation</span> meets{" "}
          <span className="text-zinc-200 font-medium">creativity</span>.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="mt-10 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <Link href="/#events" className="btn-primary group text-lg px-10 py-4">
            Explore Events
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
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
        </motion.div>
      </div>
    </section>
  );
}