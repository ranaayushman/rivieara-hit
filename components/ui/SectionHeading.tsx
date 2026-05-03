"use client";

import { motion } from "framer-motion";
import { easing, duration } from "@/lib/motionPresets";

interface SectionHeadingProps {
  /** Plain text part of the heading */
  text: string;
  /** Gold-accented part of the heading */
  accent: string;
  /** If true, accent comes first */
  accentFirst?: boolean;
  /** Optional subtitle */
  subtitle?: string;
  /** Optional decorative Arabian subtitle text */
  arabianText?: string;
}

/**
 * Cinematic section heading with Cinzel font, gold gradient accent,
 * and optional El Messiri decorative text.
 */
export default function SectionHeading({
  text,
  accent,
  accentFirst = false,
  subtitle,
  arabianText,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-16 md:mb-20">
      {/* Decorative Arabian text above heading */}
      {arabianText && (
        <motion.p
          className="text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          style={{
            fontFamily: "var(--font-arabian)",
            color: "var(--gold-primary)",
            opacity: 0.6,
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: duration.medium, ease: easing.expoOut }}
        >
          {arabianText}
        </motion.p>
      )}

      {/* Main heading — Cinzel font */}
      <motion.h2
        className="section-heading"
        style={{ fontFamily: "var(--font-heading)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: duration.slow, ease: easing.expoOut }}
      >
        {accentFirst ? (
          <>
            <span className="accent">{accent}</span> {text}
          </>
        ) : (
          <>
            {text} <span className="accent">{accent}</span>
          </>
        )}
      </motion.h2>

      {/* Decorative gold line */}
      <motion.div
        className="mx-auto mt-4 mb-2 h-[2px] rounded-full"
        style={{
          background: "var(--gradient-gold)",
          width: 0,
        }}
        whileInView={{ width: 80 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: duration.slow, delay: 0.2, ease: easing.expoOut }}
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-6"
          style={{ color: "var(--text-muted)" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: duration.medium, delay: 0.15, ease: easing.expoOut }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
