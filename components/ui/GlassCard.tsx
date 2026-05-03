"use client";

import { motion } from "framer-motion";
import { easing, duration, stagger } from "@/lib/motionPresets";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay index */
  index?: number;
  /** Enable hover lift + glow */
  interactive?: boolean;
  /** Use premium variant with gold gradient border */
  premium?: boolean;
}

/**
 * Arabian artifact-inspired glass card with entrance animation,
 * gold glow hover, and optional premium gold border shimmer.
 */
export default function GlassCard({
  children,
  className = "",
  index = 0,
  interactive = true,
  premium = false,
}: GlassCardProps) {
  return (
    <motion.div
      className={`${premium ? "glass-card-premium" : "glass-card"} p-6 md:p-8 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: duration.medium,
        delay: index * stagger.base,
        ease: easing.expoOut,
      }}
      whileHover={
        interactive
          ? {
              y: -6,
              scale: 1.02,
              transition: { duration: duration.base, ease: easing.spring },
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
