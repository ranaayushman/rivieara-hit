"use client";

import { useState, useEffect } from "react";

function getInitialPerformanceState() {
  if (typeof window === "undefined") {
    return {
      isMobile: true,
      isTablet: false,
      reducedMotion: false,
    };
  }

  return {
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
}

/**
 * usePerformanceMode
 * Detects device capabilities, screen size, and user preferences
 * to optimize cinematic animations and render payload.
 */
export function usePerformanceMode() {
  const initialState = getInitialPerformanceState();

  const [isMobile, setIsMobile] = useState(initialState.isMobile);
  const [isTablet, setIsTablet] = useState(initialState.isTablet);
  const [reducedMotion, setReducedMotion] = useState(initialState.reducedMotion);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setIsMounted(true));

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
