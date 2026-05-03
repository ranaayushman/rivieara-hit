"use client";

/**
 * Cinematic fog layer — slow-drifting atmospheric smoke.
 * Uses multiple CSS-animated gradient blobs for depth.
 */
export default function FogLayer() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {/* Fog blob 1 — large, slow, warm gold */}
      <div
        className="absolute w-[120%] h-[40%] -left-[10%] top-[60%] rounded-full animate-fog-drift"
        style={{
          background: "radial-gradient(ellipse at center, rgba(212, 160, 23, calc(0.06 * var(--glow-intensity, 1))), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Fog blob 2 — smaller, offset, purple tint */}
      <div
        className="absolute w-[80%] h-[30%] left-[20%] top-[30%] rounded-full animate-fog-drift"
        style={{
          background: "radial-gradient(ellipse at center, rgba(106, 13, 173, calc(0.04 * var(--glow-intensity, 1))), transparent 70%)",
          filter: "blur(100px)",
          animationDelay: "-8s",
          animationDuration: "25s",
        }}
      />

      {/* Fog blob 3 — bottom, warm */}
      <div
        className="absolute w-[100%] h-[20%] left-0 bottom-0 animate-fog-drift"
        style={{
          background: "linear-gradient(to top, rgba(139, 94, 0, calc(0.05 * var(--glow-intensity, 1))), transparent)",
          filter: "blur(60px)",
          animationDelay: "-14s",
          animationDuration: "30s",
        }}
      />
    </div>
  );
}
