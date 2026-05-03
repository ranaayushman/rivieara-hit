"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Show Arabian gold aura glow */
  withGlow?: boolean;
  /** Show geometric pattern overlay */
  withPattern?: boolean;
}

/**
 * Reusable section wrapper — consistent Arabian-themed spacing,
 * atmospheric effects, GSAP ScrollTrigger fog reveal,
 * and scroll-triggered entrance animation (Framer Motion).
 */
export default function SectionWrapper({
  id,
  children,
  className = "",
  withGlow = true,
  withPattern = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const fogOverlayRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // GSAP ScrollTrigger — fog reveal + glow intensity shift
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Fog overlay fades out as section enters
      if (fogOverlayRef.current) {
        gsap.set(fogOverlayRef.current, { opacity: 0.4 });
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 90%",
          end: "top 30%",
          scrub: 1.5,
          onUpdate: (self) => {
            if (fogOverlayRef.current) {
              gsap.set(fogOverlayRef.current, {
                opacity: 0.4 * (1 - self.progress),
              });
            }
          },
        });
      }

      // Glow intensifies as section enters viewport
      if (glowRef.current) {
        gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 2,
          onUpdate: (self) => {
            if (glowRef.current) {
              gsap.set(glowRef.current, {
                opacity: self.progress * 0.8,
                scale: 0.8 + self.progress * 0.2,
              });
            }
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ background: "var(--bg-primary)" }}
    >
      {/* GSAP fog overlay — fades out on scroll reveal */}
      <div
        ref={fogOverlayRef}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(5, 5, 5, 0.6) 0%, transparent 40%, transparent 60%, rgba(5, 5, 5, 0.4) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Atmospheric glow (GSAP scroll-driven) */}
      {withGlow && (
        <div ref={glowRef} className="bg-glow-arabian" />
      )}

      {/* Islamic geometric pattern */}
      {withPattern && <div className="bg-pattern-arabian" />}

      {/* Film noise texture */}
      <div className="absolute inset-0 bg-noise" aria-hidden="true" />

      {/* Section divider — gold gradient line at top */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--gold-dim), var(--gold-subtle), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Content with Framer Motion entrance */}
      <motion.div
        className="relative z-10 section-container section-py"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
