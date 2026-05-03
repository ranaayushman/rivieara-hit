"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Show Arabian gold aura glow */
  withGlow?: boolean;
  /** Show geometric pattern overlay */
  withPattern?: boolean;
}

/**
 * Reusable section wrapper — consistent Arabian-themed spacing,
 * atmospheric effects, and scroll-triggered entrance animation.
 */
export default function SectionWrapper({
  id,
  children,
  className = "",
  withGlow = true,
  withPattern = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Atmospheric glow */}
      {withGlow && <div className="bg-glow-arabian" />}

      {/* Islamic geometric pattern */}
      {withPattern && <div className="bg-pattern-arabian" />}

      {/* Film noise texture */}
      <div className="absolute inset-0 bg-noise" aria-hidden="true" />

      {/* Section divider — gold gradient line at top */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--gold-dim), var(--gold-subtle), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Content with entrance animation */}
      <motion.div
        className="relative z-10 section-container section-py"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
