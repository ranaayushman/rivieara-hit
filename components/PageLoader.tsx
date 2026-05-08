"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast progress to minimize LCP render delay
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }    
        // Fast curve — reaches 100 in ~400ms
        const increment = prev < 50 ? 8 : 10;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => setLoading(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "var(--bg-primary)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0, 1] }}
        >
          {/* Deep background radial */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--bg-deep) 0%, var(--bg-primary) 70%)",
            }}
          />

          {/* Ambient moon glow */}
          <div
            className="absolute top-[10%] right-[15%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(147,197,253,0.08) 0%, transparent 60%)",
            }}
          />

          {/* Gold atmospheric glow behind the emblem */}
          <motion.div
            className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,181,71,0.06) 0%, transparent 60%)",
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* ─── Central Emblem ─── */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Ornamental crescent + star */}
            <motion.div
              className="relative w-28 h-28 md:w-36 md:h-36 mb-8"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Outer rotating ring */}
              <motion.svg
                viewBox="0 0 120 120"
                className="absolute inset-0 w-full h-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <defs>
                  <linearGradient
                    id="ring-grad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="var(--gold-light)" />
                    <stop offset="50%" stopColor="var(--gold-primary)" />
                    <stop offset="100%" stopColor="var(--gold-deep)" />
                  </linearGradient>
                </defs>
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  fill="none"
                  stroke="url(#ring-grad)"
                  strokeWidth="1.5"
                  strokeDasharray="12 8"
                  opacity="0.6"
                />
              </motion.svg>

              {/* Inner counter-rotating ring */}
              <motion.svg
                viewBox="0 0 120 120"
                className="absolute inset-0 w-full h-full"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="var(--gold-primary)"
                  strokeWidth="0.8"
                  strokeDasharray="6 14"
                  opacity="0.35"
                />
              </motion.svg>

              {/* Central crescent moon + star */}
              <svg
                viewBox="0 0 120 120"
                className="absolute inset-0 w-full h-full"
              >
                <defs>
                  <linearGradient
                    id="crescent-grad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="var(--gold-light)" />
                    <stop offset="100%" stopColor="var(--gold-deep)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Crescent */}
                <path
                  d="M 52 30 A 28 28 0 1 0 52 90 A 22 22 0 1 1 52 30"
                  fill="url(#crescent-grad)"
                  filter="url(#glow)"
                  opacity="0.9"
                />
                {/* Star */}
                <polygon
                  points="78,38 80,44 86,44 81,48 83,54 78,50 73,54 75,48 70,44 76,44"
                  fill="var(--gold-light)"
                  filter="url(#glow)"
                  opacity="0.85"
                />
              </svg>

              {/* Pulsing aura behind the emblem */}
              <motion.div
                className="absolute inset-[-20%] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,181,71,0.12) 0%, transparent 70%)",
                }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Title text */}
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider mb-2"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--text-primary)",
                textShadow:
                  "0 0 30px rgba(255,181,71,0.3), 0 2px 8px rgba(0,0,0,0.8)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            >
              RIVIERA
            </motion.h1>

            <motion.p
              className="text-[10px] sm:text-xs tracking-[0.5em] uppercase mb-10"
              style={{
                fontFamily: "var(--font-arabian)",
                color: "var(--gold-primary)",
                opacity: 0.7,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Arabian Nights
            </motion.p>

            {/* ─── Progress bar ─── */}
            <motion.div
              className="relative w-48 sm:w-56 md:w-64 h-[2px] overflow-hidden rounded-full"
              style={{ background: "rgba(255,181,71,0.1)" }}
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--gold-deep), var(--gold-primary), var(--gold-light))",
                  boxShadow: "0 0 12px rgba(255,181,71,0.5)",
                  width: `${progress}%`,
                  transition: "width 0.15s linear",
                }}
              />
              {/* Bright tip glow */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none"
                style={{
                  left: `calc(${progress}% - 6px)`,
                  background:
                    "radial-gradient(circle, var(--gold-light) 0%, transparent 70%)",
                  transition: "left 0.15s linear",
                  opacity: progress < 100 ? 1 : 0,
                }}
              />
            </motion.div>

            {/* Loading text */}
            <motion.p
              className="mt-5 text-[10px] tracking-[0.35em] uppercase"
              style={{ color: "var(--text-dim)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {progress < 100 ? "Unveiling the Realm..." : "Enter"}
            </motion.p>
          </div>

          {/* Corner ornamental dots */}
          {[
            "top-6 left-6",
            "top-6 right-6",
            "bottom-6 left-6",
            "bottom-6 right-6",
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-1.5 h-1.5 rounded-full`}
              style={{ background: "var(--gold-primary)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            />
          ))}

          {/* Corner ornamental lines */}
          <motion.div
            className="absolute top-6 left-6 w-12 h-12 border-t border-l pointer-events-none"
            style={{ borderColor: "rgba(255,181,71,0.15)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
          <motion.div
            className="absolute top-6 right-6 w-12 h-12 border-t border-r pointer-events-none"
            style={{ borderColor: "rgba(255,181,71,0.15)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          />
          <motion.div
            className="absolute bottom-6 left-6 w-12 h-12 border-b border-l pointer-events-none"
            style={{ borderColor: "rgba(255,181,71,0.15)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-6 right-6 w-12 h-12 border-b border-r pointer-events-none"
            style={{ borderColor: "rgba(255,181,71,0.15)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
