"use client";

import { useState, useEffect } from "react";

/**
 * usePerformanceMode
 * Detects device capabilities, screen size, and user preferences
 * to optimize cinematic animations and render payload.
 */
export function usePerformanceMode() {
  const [isMobile, setIsMobile] = useState(true); // Default to mobile-first (safest render)
  const [isTablet, setIsTablet] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const checkPerformance = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    };
    
    // Initial check
    checkPerformance();
    
    // Listen for resize and preference changes
    window.addEventListener("resize", checkPerformance);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", checkPerformance);
    }

    return () => {
      window.removeEventListener("resize", checkPerformance);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener("change", checkPerformance);
      }
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    reducedMotion,
    isLowPower: isMobile || reducedMotion, // Aggressive optimization flag
    isMounted // Prevents hydration mismatch on initial SSR render
  };
}
