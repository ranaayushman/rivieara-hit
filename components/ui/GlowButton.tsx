"use client";

import { motion } from "framer-motion";
import { easing, duration } from "@/lib/motionPresets";

interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "gold" | "outline" | "red";
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
}

/**
 * Premium animated button with shimmer sweep,
 * glow bloom on hover, and magnetic scaling.
 */
export default function GlowButton({
  children,
  className = "",
  variant = "gold",
  onClick,
  type = "button",
}: GlowButtonProps) {
  const baseStyles = {
    gold: "btn-gold",
    outline: "btn-outline-gold",
    red: "btn-primary",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseStyles[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: duration.fast, ease: easing.spring }}
    >
      {children}
    </motion.button>
  );
}
