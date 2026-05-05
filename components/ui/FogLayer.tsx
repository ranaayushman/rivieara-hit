"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

/**
 * Cinematic fog layer — GSAP-driven layered atmospheric smoke.
 * Multiple fog blobs drift with organic, randomised movement
 * for depth and immersion. Uses GSAP for smoother-than-CSS motion.
 */
export default function FogLayer() {
  const fog1Ref = useRef<HTMLDivElement>(null);
  const fog2Ref = useRef<HTMLDivElement>(null);
  const fog3Ref = useRef<HTMLDivElement>(null);
  const fog4Ref = useRef<HTMLDivElement>(null);
  const { isLowPower, isMounted } = usePerformanceMode();

  useEffect(() => {
    if (!isMounted || isLowPower) return;

    const ctx = gsap.context(() => {
      if (fog1Ref.current) {
        gsap.to(fog1Ref.current, { x: "10%", y: "-3%", duration: 22, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(fog1Ref.current, { opacity: 0.6, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });
      }
      if (fog2Ref.current) {
        gsap.to(fog2Ref.current, { x: "-8%", y: "4%", duration: 25, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 3 });
        gsap.to(fog2Ref.current, { opacity: 0.5, duration: 10, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 5 });
      }
      if (fog3Ref.current) {
        gsap.to(fog3Ref.current, { x: "6%", duration: 30, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 });
      }
      if (fog4Ref.current) {
        gsap.fromTo(fog4Ref.current, { opacity: 0 }, { opacity: 1, duration: 4, ease: "power2.out" });
        gsap.to(fog4Ref.current, { x: "-12%", y: "2%", duration: 28, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 6 });
      }
    });

    return () => ctx.revert();
  }, [isLowPower, isMounted]);

  // ─── KEY FIX ───────────────────────────────────────────────────────────────
  // Before mount, isMounted=false so isLowPower is unreliable.
  // Always use the DESKTOP defaults for SSR/initial render so server
  // and client HTML match exactly. GSAP will take over after hydration.
  const getBlur = (desktopBlur: string) =>
    isMounted && isLowPower ? "blur(20px)" : desktopBlur;

  // fog4 opacity: on desktop GSAP animates it from 0→visible,
  // on low-power we show it at 0.3 statically. Before mount → 0 (desktop default).
  const fog4Opacity = isMounted && isLowPower ? 0.3 : 0;
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {/* Fog blob 1 */}
      <div
        ref={fog1Ref}
        className="absolute w-[120%] h-[40%] -left-[10%] top-[60%] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(ellipse at center, rgba(212, 160, 23, calc(0.06 * var(--glow-intensity, 1))), transparent 70%)",
          filter: getBlur("blur(80px)"),
          opacity: 0.3,
        }}
      />
      {/* Fog blob 2 */}
      <div
        ref={fog2Ref}
        className="absolute w-[80%] h-[30%] left-[20%] top-[30%] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(ellipse at center, rgba(106, 13, 173, calc(0.04 * var(--glow-intensity, 1))), transparent 70%)",
          filter: getBlur("blur(100px)"),
          opacity: 0.25,
        }}
      />
      {/* Fog blob 3 */}
      <div
        ref={fog3Ref}
        className="absolute w-[100%] h-[20%] left-0 bottom-0 will-change-transform"
        style={{
          background: "linear-gradient(to top, rgba(139, 94, 0, calc(0.05 * var(--glow-intensity, 1))), transparent)",
          filter: getBlur("blur(60px)"),
          opacity: 0.35,
        }}
      />
      {/* Fog blob 4 */}
      <div
        ref={fog4Ref}
        className="absolute w-[90%] h-[25%] left-[5%] top-[10%] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(ellipse at center, rgba(212, 160, 23, calc(0.03 * var(--glow-intensity, 1))), transparent 60%)",
          filter: getBlur("blur(120px)"),
          opacity: fog4Opacity,
        }}
      />
    </div>
  );
}