"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * A performant mouse-following glow orb.
 * Uses CSS transform (GPU-accelerated) for smooth 60fps tracking.
 */
export default function MouseGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      aria-hidden="true"
    >
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-[var(--clr-primary)] opacity-[0.07] blur-[140px] will-change-transform"
        style={{
          transform: `translate(${pos.x - 250}px, ${pos.y - 250}px)`,
          transition: "transform 100ms linear",
        }}
      />
    </div>
  );
}
