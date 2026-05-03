"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fog blob 1 — large, slow, warm gold
      if (fog1Ref.current) {
        gsap.to(fog1Ref.current, {
          x: "10%",
          y: "-3%",
          duration: 22,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to(fog1Ref.current, {
          opacity: 0.6,
          duration: 8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2,
        });
      }

      // Fog blob 2 — smaller, offset, purple tint
      if (fog2Ref.current) {
        gsap.to(fog2Ref.current, {
          x: "-8%",
          y: "4%",
          duration: 25,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 3,
        });
        gsap.to(fog2Ref.current, {
          opacity: 0.5,
          duration: 10,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 5,
        });
      }

      // Fog blob 3 — bottom layer, warm
      if (fog3Ref.current) {
        gsap.to(fog3Ref.current, {
          x: "6%",
          duration: 30,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1,
        });
      }

      // Fog blob 4 — upper mist, subtle
      if (fog4Ref.current) {
        gsap.fromTo(
          fog4Ref.current,
          { opacity: 0 },
          { opacity: 1, duration: 4, ease: "power2.out" }
        );
        gsap.to(fog4Ref.current, {
          x: "-12%",
          y: "2%",
          duration: 28,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 6,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {/* Fog blob 1 — large, slow, warm gold */}
      <div
        ref={fog1Ref}
        className="absolute w-[120%] h-[40%] -left-[10%] top-[60%] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(212, 160, 23, calc(0.06 * var(--glow-intensity, 1))), transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.3,
        }}
      />

      {/* Fog blob 2 — smaller, offset, purple tint */}
      <div
        ref={fog2Ref}
        className="absolute w-[80%] h-[30%] left-[20%] top-[30%] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(106, 13, 173, calc(0.04 * var(--glow-intensity, 1))), transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.25,
        }}
      />

      {/* Fog blob 3 — bottom, warm */}
      <div
        ref={fog3Ref}
        className="absolute w-[100%] h-[20%] left-0 bottom-0"
        style={{
          background: "linear-gradient(to top, rgba(139, 94, 0, calc(0.05 * var(--glow-intensity, 1))), transparent)",
          filter: "blur(60px)",
          opacity: 0.35,
        }}
      />

      {/* Fog blob 4 — upper atmospheric mist (new) */}
      <div
        ref={fog4Ref}
        className="absolute w-[90%] h-[25%] left-[5%] top-[10%] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(212, 160, 23, calc(0.03 * var(--glow-intensity, 1))), transparent 60%)",
          filter: "blur(120px)",
          opacity: 0,
        }}
      />
    </div>
  );
}
