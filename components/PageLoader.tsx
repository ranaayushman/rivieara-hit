"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Boot sequence text lines ── */
const BOOT_LINES = [
  "SYSTEM LINK — ESTABLISHED",
  "BARRIER PROTOCOL — ACTIVE",
  "DOMAIN VERIFIED — RIVIERA:2026",
  "PARTICIPANT ACCESS — GRANTED",
];

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  /* Fast progress ~500ms total */
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return Math.min(prev + (prev < 50 ? 7 : 9), 100);
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  /* Stagger boot lines */
  useEffect(() => {
    const timers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), 80 + i * 90)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  /* Dismiss after complete */
  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setLoading(false), 250);
      return () => clearTimeout(t);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "#050507" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ── BACKGROUND LAYERS ── */}

          {/* Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,32,78,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,32,78,0.2) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          {/* Horizontal scan line */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] pointer-events-none z-20"
            style={{ background: "linear-gradient(90deg, transparent 10%, rgba(255,32,78,0.15) 50%, transparent 90%)" }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.015]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)",
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 30%, rgba(5,5,7,0.7) 100%)" }}
          />

          {/* Crimson ambient */}
          <motion.div
            className="absolute w-[350px] h-[350px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,32,78,0.04) 0%, transparent 60%)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ── CONTENT ── */}
          <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">

            {/* Top tactical label */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ height: 1, width: 20, background: "rgba(255,32,78,0.25)" }} />
              <p
                className="text-[8px] tracking-[0.5em] uppercase font-bold"
                style={{ fontFamily: "var(--font-tactical)", color: "rgba(255,32,78,0.4)" }}
              >
                ◆ DOMAIN INITIALIZATION ◆
              </p>
              <div style={{ height: 1, width: 20, background: "rgba(255,32,78,0.25)" }} />
            </motion.div>

            {/* Main title — glitch-style */}
            <motion.div
              className="relative mb-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-center"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "#F5F5F5",
                  textShadow: "0 0 20px rgba(255,32,78,0.1)",
                }}
              >
                RIVIERA
              </h1>
              {/* Glitch duplicate — offset crimson */}
              <motion.h1
                className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-center pointer-events-none select-none"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "transparent",
                  WebkitTextStroke: "0.5px rgba(255,32,78,0.15)",
                }}
                animate={{ x: [-1, 1, 0, -1], opacity: [0.3, 0.5, 0.3, 0.4] }}
                transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              >
                RIVIERA
              </motion.h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-[9px] tracking-[0.5em] uppercase font-bold mb-10 text-center"
              style={{ fontFamily: "var(--font-tactical)", color: "#FF204E", opacity: 0.45 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              THE CULLING GAMES
            </motion.p>

            {/* ── Boot sequence terminal ── */}
            <div className="w-full mb-8">
              {BOOT_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 py-[3px]"
                  initial={{ opacity: 0, x: -8 }}
                  animate={i < visibleLines ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.span
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{
                      background: i < visibleLines ? "#FF204E" : "transparent",
                      boxShadow: i < visibleLines ? "0 0 4px rgba(255,32,78,0.4)" : "none",
                    }}
                    animate={i < visibleLines ? { opacity: [0.4, 1, 0.4] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  />
                  <span
                    className="text-[8px] tracking-[0.2em] uppercase font-bold"
                    style={{
                      fontFamily: "var(--font-tactical)",
                      color: i < visibleLines ? "rgba(245,245,245,0.25)" : "transparent",
                    }}
                  >
                    {line}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* ── Progress bar ── */}
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[7px] tracking-[0.3em] uppercase font-bold"
                  style={{ fontFamily: "var(--font-tactical)", color: "rgba(255,32,78,0.3)" }}
                >
                  LOADING
                </span>
                <span
                  className="text-[8px] tracking-[0.15em] font-bold tabular-nums"
                  style={{ fontFamily: "var(--font-tactical)", color: "rgba(255,32,78,0.4)" }}
                >
                  {progress}%
                </span>
              </div>
              <div
                className="relative w-full h-[2px] overflow-hidden"
                style={{ background: "rgba(255,32,78,0.06)" }}
              >
                <div
                  className="absolute inset-y-0 left-0"
                  style={{
                    background: "linear-gradient(90deg, #A91032, #FF204E, #FF2E63)",
                    boxShadow: "0 0 8px rgba(255,32,78,0.35)",
                    width: `${progress}%`,
                    transition: "width 0.15s linear",
                  }}
                />
              </div>
            </div>

            {/* Status text */}
            <motion.p
              className="mt-4 text-[8px] tracking-[0.4em] uppercase font-bold"
              style={{ color: "rgba(245,245,245,0.15)", fontFamily: "var(--font-tactical)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {progress < 100 ? "INITIALIZING DOMAIN..." : "◆ ENTER ◆"}
            </motion.p>
          </div>

          {/* ── Corner brackets ── */}
          {[
            { pos: "top-4 left-4", border: "border-t border-l" },
            { pos: "top-4 right-4", border: "border-t border-r" },
            { pos: "bottom-4 left-4", border: "border-b border-l" },
            { pos: "bottom-4 right-4", border: "border-b border-r" },
          ].map((c, i) => (
            <motion.div
              key={i}
              className={`absolute ${c.pos} w-6 h-6 ${c.border} pointer-events-none`}
              style={{ borderColor: "rgba(255,32,78,0.1)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
