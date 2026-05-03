"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Mouse-following gold glow orb.
 * GPU-accelerated via CSS transform.
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
      {/* Primary gold glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(212, 160, 23, 0.07) 0%, transparent 70%)",
          transform: `translate(${pos.x - 250}px, ${pos.y - 250}px)`,
          transition: "transform 100ms linear",
        }}
      />
      {/* Secondary warm glow — offset */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(139, 94, 0, 0.04) 0%, transparent 70%)",
          transform: `translate(${pos.x - 150}px, ${pos.y - 150}px)`,
          transition: "transform 150ms linear",
        }}
      />
    </div>
  );
}
