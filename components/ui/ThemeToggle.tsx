"use client";

import { useTheme } from "@/lib/theme";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Cinematic theme toggle — crescent moon / golden sun.
 * Smooth icon transition with glow effect.
 */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group"
      style={{
        background: theme === "night"
          ? "rgba(212, 160, 23, 0.1)"
          : "rgba(184, 134, 11, 0.12)",
        border: `1px solid ${theme === "night" ? "rgba(212, 160, 23, 0.2)" : "rgba(184, 134, 11, 0.2)"}`,
      }}
      aria-label={`Switch to ${theme === "night" ? "day" : "night"} mode`}
    >
      {/* Hover glow ring */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: theme === "night"
            ? "0 0 20px rgba(212, 160, 23, 0.3)"
            : "0 0 20px rgba(184, 134, 11, 0.25)",
        }}
      />

      <AnimatePresence mode="wait">
        {theme === "night" ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Moon size={18} className="text-[var(--gold-primary)]" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Sun size={18} className="text-[var(--gold-primary)]" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
