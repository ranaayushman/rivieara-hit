"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay index for entrance animation */
  index?: number;
  /** Enable hover lift + glow */
  interactive?: boolean;
}

/**
 * Reusable glass-morphism card with entrance animation
 * and optional interactive hover effect.
 */
export default function GlassCard({
  children,
  className = "",
  index = 0,
  interactive = true,
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass-card p-6 md:p-8 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={
        interactive
          ? { y: -4, scale: 1.01 }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
