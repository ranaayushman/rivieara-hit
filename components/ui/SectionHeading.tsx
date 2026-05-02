"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  /** Plain text part of the heading */
  text: string;
  /** Red-accented part of the heading */
  accent: string;
  /** If true, accent comes first */
  accentFirst?: boolean;
  /** Optional subtitle below the heading */
  subtitle?: string;
}

/**
 * Consistent section heading with accent word
 * and optional subtitle, animated on mount.
 */
export default function SectionHeading({
  text,
  accent,
  accentFirst = false,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-16 md:mb-20">
      <motion.h2
        className="section-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

      {subtitle && (
        <motion.p
          className="text-[var(--clr-text-muted)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
