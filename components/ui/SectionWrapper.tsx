"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Show the radial glow background */
  withGlow?: boolean;
  /** Show the grid pattern overlay */
  withGrid?: boolean;
}

/**
 * Reusable section wrapper providing consistent padding,
 * background effects, and scroll-triggered entrance animation.
 */
export default function SectionWrapper({
  id,
  children,
  className = "",
  withGlow = true,
  withGrid = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative overflow-hidden bg-[var(--clr-bg)] text-white ${className}`}
    >
      {/* Background effects */}
      {withGlow && <div className="bg-glow" />}
      {withGrid && <div className="bg-grid" />}

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
