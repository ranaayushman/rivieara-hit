"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

/**
 * Magical Arabian lantern-inspired cursor system.
 * Uses GSAP for smooth interpolation (core follows tightly, aura lags cinematically).
 * - Warm gold glow core
 * - Expanding aura on hover
 * - Ember trail particles with fade
 * - Click ripple burst
 * GPU-accelerated via GSAP transforms.
 * Unmounts completely on mobile/low-power to preserve battery.
 */
export default function MouseGlow() {
  const coreRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mousePos = useRef({ x: -200, y: -200 });
  const corePos = useRef({ x: -200, y: -200 });
  const auraPos = useRef({ x: -200, y: -200 });
  const innerPos = useRef({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const { isLowPower, isMounted } = usePerformanceMode();

  // GSAP-powered smooth cursor interpolation
  useEffect(() => {
    if (!isMounted || isLowPower) return;

    let raf: number;
    const trailPositions = Array.from({ length: 6 }, () => ({ x: -200, y: -200 }));

    const handleMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select");
      setIsHovering(!!interactive);
    };

    const handleDown = () => {
      setIsClicking(true);
      if (rippleRef.current) {
        gsap.fromTo(
          rippleRef.current,
          { scale: 0.3, opacity: 0.6 },
          { scale: 2.5, opacity: 0, duration: 0.5, ease: "power2.out" }
        );
      }
      setTimeout(() => setIsClicking(false), 400);
    };

    function tick() {
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      corePos.current.x += (mx - corePos.current.x) * 0.25;
      corePos.current.y += (my - corePos.current.y) * 0.25;
      innerPos.current.x += (mx - innerPos.current.x) * 0.15;
      innerPos.current.y += (my - innerPos.current.y) * 0.15;
      auraPos.current.x += (mx - auraPos.current.x) * 0.08;
      auraPos.current.y += (my - auraPos.current.y) * 0.08;

      for (let i = trailPositions.length - 1; i > 0; i--) {
        trailPositions[i].x += (trailPositions[i - 1].x - trailPositions[i].x) * 0.3;
        trailPositions[i].y += (trailPositions[i - 1].y - trailPositions[i].y) * 0.3;
      }
      trailPositions[0].x += (corePos.current.x - trailPositions[0].x) * 0.4;
      trailPositions[0].y += (corePos.current.y - trailPositions[0].y) * 0.4;

      if (coreRef.current) gsap.set(coreRef.current, { x: corePos.current.x - 4, y: corePos.current.y - 4, force3D: true });
      if (innerRef.current) gsap.set(innerRef.current, { x: innerPos.current.x - 100, y: innerPos.current.y - 100, force3D: true });
      if (auraRef.current) gsap.set(auraRef.current, { x: auraPos.current.x - 175, y: auraPos.current.y - 175, force3D: true });
      if (rippleRef.current) gsap.set(rippleRef.current, { x: corePos.current.x - 20, y: corePos.current.y - 20, force3D: true });

      trailRefs.current.forEach((el, i) => {
        if (el) {
          gsap.set(el, {
            x: trailPositions[i].x - 2,
            y: trailPositions[i].y - 2,
            opacity: ((i + 1) / trailPositions.length) * 0.35,
            force3D: true,
          });
        }
      });

      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mousedown", handleDown);
    tick();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleDown);
      cancelAnimationFrame(raf);
    };
  }, [isLowPower, isMounted]);

  useEffect(() => {
    if (!coreRef.current || isLowPower) return;
    const size = isClicking ? 14 : isHovering ? 10 : 8;
    gsap.to(coreRef.current, { width: size, height: size, duration: 0.2, ease: "power2.out" });
  }, [isHovering, isClicking, isLowPower]);

  useEffect(() => {
    if (!auraRef.current || isLowPower) return;
    gsap.to(auraRef.current, {
      width: isHovering ? 420 : 350,
      height: isHovering ? 420 : 350,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [isHovering, isLowPower]);

  if (!isMounted || isLowPower) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[50] hidden md:block" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="absolute rounded-full"
          style={{
            width: 3 + i * 0.4,
            height: 3 + i * 0.4,
            background: "var(--gold-light)",
            opacity: 0,
            boxShadow: "0 0 6px rgba(212, 160, 23, 0.3)",
          }}
        />
      ))}

      <div
        ref={auraRef}
        className="absolute rounded-full will-change-transform"
        style={{
          width: 350,
          height: 350,
          background: `radial-gradient(circle, rgba(212, 160, 23, ${isHovering ? 0.08 : 0.04}) 0%, transparent 70%)`,
        }}
      />

      <div
        ref={innerRef}
        className="absolute rounded-full will-change-transform"
        style={{
          width: 200,
          height: 200,
          background: "radial-gradient(circle, rgba(139, 94, 0, 0.06) 0%, transparent 70%)",
        }}
      />

      <div
        ref={coreRef}
        className="absolute rounded-full will-change-transform"
        style={{
          width: 8,
          height: 8,
          background: "var(--gold-light)",
          boxShadow: isHovering
            ? "0 0 20px rgba(212, 160, 23, 0.6), 0 0 40px rgba(212, 160, 23, 0.25)"
            : "0 0 12px rgba(212, 160, 23, 0.45), 0 0 25px rgba(212, 160, 23, 0.15)",
        }}
      />

      <div
        ref={rippleRef}
        className="absolute rounded-full will-change-transform"
        style={{
          width: 40,
          height: 40,
          border: "1.5px solid rgba(212, 160, 23, 0.4)",
          opacity: 0,
        }}
      />
    </div>
  );
}
