"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { useMemo } from "react";

const UpcomingEventsCarousel = dynamic(() => import("./UpcomingEventsCarousel"));

/* ── Ember particles for section ── */
function SectorEmbers({ isLowPower }: { isLowPower: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const particles = useMemo(() => {
    const count = isLowPower ? 5 : 10;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: `${(i * 19 + 11) % 100}%`,
      y: `${(i * 23 + 5) % 90}%`,
      size: ((i * 3) % 2) + 1.5,
      opacity: ((i * 5) % 10 + 6) / 100,
      dur: 7 + ((i * 4) % 5),
      delay: (i * 0.7) % 3,
    }));
  }, [isLowPower]);

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[5]" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: "radial-gradient(circle, #FF204E, rgba(169,16,50,0.2))",
            boxShadow: `0 0 ${p.size * 2}px rgba(255,32,78,0.2)`,
          }}
          animate={!isLowPower ? { y: [-4, 4, -4], opacity: [p.opacity, p.opacity * 2.5, p.opacity] } : {}}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function UpcomingEvents() {
  const { isLowPower, isMounted } = usePerformanceMode();
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !shouldReduceMotion && !isLowPower;

  return (
    <section
      id="events"
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center py-24 sm:py-32"
      style={{
        background: "linear-gradient(180deg, #050507 0%, #08080D 25%, #12070B 50%, #09090F 75%, #050507 100%)",
      }}
    >
      {/* ── BACKGROUND LAYERS ── */}

      {/* Top divider */}
      <div
        className="absolute inset-x-0 top-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.12), transparent)" }}
      />

      {/* Crimson atmospheric haze — center */}
      <motion.div
        className="absolute top-[25%] left-[35%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(255,32,78,0.04) 0%, transparent 65%)" }}
        animate={shouldAnimate ? { scale: [1, 1.05, 1], opacity: [0.5, 0.75, 0.5] } : {}}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary haze — top right */}
      {!isLowPower && (
        <div
          className="absolute top-[5%] right-[-8%] w-[400px] h-[400px] rounded-full pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(169,16,50,0.035) 0%, transparent 70%)" }}
        />
      )}

      {/* Tactical grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,32,78,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,32,78,0.2) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] z-0" />

      {/* Scanlines */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.01]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 60% at 50% 50%, transparent 35%, rgba(5,5,7,0.55) 100%)" }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 inset-x-0 h-[30%] z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to top, #050507 0%, transparent 100%)" }}
      />

      {/* Diagonal energy streaks */}
      {!isLowPower && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.02]">
          <div
            className="absolute w-[180%] h-[1px]"
            style={{
              top: "20%", left: "-15%",
              background: "linear-gradient(90deg, transparent, #FF204E 40%, transparent)",
              transform: "rotate(-10deg)",
            }}
          />
          <div
            className="absolute w-[160%] h-[1px]"
            style={{
              top: "75%", left: "-20%",
              background: "linear-gradient(90deg, transparent, #A91032 50%, transparent)",
              transform: "rotate(-8deg)",
            }}
          />
        </div>
      )}

      {/* Ember particles */}
      {isMounted && <SectorEmbers isLowPower={isLowPower} />}

      {/* Carousel */}
      <UpcomingEventsCarousel />
    </section>
  );
}
