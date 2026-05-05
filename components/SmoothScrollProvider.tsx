"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Respect system preferences for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Initialize Lenis for a premium, cinematic scroll feel
    // Note: smoothTouch is false by default, giving mobile a native, optimized touch feel.
    const lenis = new Lenis({
      lerp: 0.08, // Smooth cinematic inertia without feeling sluggish
      wheelMultiplier: 1,
    });

    let rafId: number;

    // Optimized requestAnimationFrame loop
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Proper cleanup to prevent memory leaks and layout thrashing
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
