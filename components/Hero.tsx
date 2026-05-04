"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { easing } from "@/lib/motionPresets";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INTRO_LINES = [
  "Beyond the dunes...",
  "Where technology meets mysticism...",
  "A new world awakens...",
];

const LANTERNS = [
  { x: "62%", delay: 0, size: 18, dur: 7 },
  { x: "72%", delay: 2, size: 14, dur: 9 },
  { x: "80%", delay: 4, size: 10, dur: 8 },
  { x: "55%", delay: 1, size: 12, dur: 10 },
  { x: "90%", delay: 3, size: 8, dur: 11 },
];

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [introPhase, setIntroPhase] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroFogRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const { isLowPower, isMounted } = usePerformanceMode();

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isLowPower ? -20 : -50]
  );

  const rightY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isLowPower ? 10 : 30]
  );

  const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* =========================
     MOUSE TRACKING
     DISABLE ON MOBILE
  ========================= */

  useEffect(() => {
    if (isLowPower) return;

    const handle = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handle);

    return () => window.removeEventListener("mousemove", handle);
  }, [isLowPower]);

  /* =========================
     INTRO SEQUENCE
     SKIP ON MOBILE
  ========================= */

  useEffect(() => {
    if (isLowPower) {
      Promise.resolve().then(() => setIntroPhase(4));
      return;
    }

    const timers = [
      setTimeout(() => setIntroPhase(1), 400),
      setTimeout(() => setIntroPhase(2), 1600),
      setTimeout(() => setIntroPhase(3), 2800),
      setTimeout(() => setIntroPhase(4), 4200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isLowPower]);

  /* =========================
     GSAP ATMOSPHERE
  ========================= */

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      /* DESKTOP */
      if (!isLowPower) {
        if (ambientGlowRef.current) {
          gsap.to(ambientGlowRef.current, {
            scale: 1.05,
            opacity: 0.75,
            duration: 6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }

        if (heroFogRef.current) {
          gsap.fromTo(
            heroFogRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 2,
              ease: "power2.out",
            }
          );

          gsap.to(heroFogRef.current, {
            x: "4%",
            duration: 18,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      }

      /* MOBILE */
      else {
        if (ambientGlowRef.current) {
          gsap.set(ambientGlowRef.current, {
            opacity: 0.45,
            scale: 1,
          });
        }

        if (heroFogRef.current) {
          gsap.set(heroFogRef.current, {
            opacity: 0.5,
          });
        }
      }
    });

    return () => ctx.revert();
  }, [isLowPower, isMounted]);

  /* =========================
     REDUCED PARTICLES
  ========================= */

  const stars = useMemo(
    () =>
      Array.from(
        { length: isLowPower ? 12 : 40 },
        (_, i) => ({
          id: i,
          x: `${(i * 17 + 3) % 100}%`,
          y: `${(i * 13 + 7) % 75}%`,
          size: ((i * 7) % 3) + 1,
          opacity: ((i * 11) % 25 + 8) / 100,
          dur: 3 + ((i * 7) % 5),
          delay: (i * 0.3) % 5,
        })
      ),
    [isLowPower]
  );

  /* REDUCED LANTERNS */
  const activeLanterns = isLowPower
    ? LANTERNS.slice(0, 1)
    : LANTERNS.slice(0, 3);

  const mainVisible = introPhase >= 4;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "var(--gradient-hero)",
      }}
    >
      {/* ================= BACKGROUND ================= */}

      {/* Stars */}
      <div className="absolute inset-0" aria-hidden="true">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full"
            style={{
              width: s.size,
              height: s.size,
              left: s.x,
              top: s.y,
              background: "var(--gold-primary)",
              opacity: s.opacity,
            }}
            animate={
              isMounted && !isLowPower
                ? {
                  opacity: [0.3, 1, 0.3],
                }
                : {}
            }
            transition={{
              duration: s.dur,
              repeat: Infinity,
              delay: s.delay,
            }}
          />
        ))}
      </div>

      {/* Ambient Glow */}
      <div
        ref={ambientGlowRef}
        className="
          absolute
          left-[-10%]
          top-[20%]
          w-[500px]
          h-[500px]
          rounded-full
          opacity-50
        "
        style={{
          background:
            "radial-gradient(circle, var(--gold-dim) 0%, transparent 70%)",

          /* REDUCED BLUR */
          filter: isLowPower ? "blur(40px)" : "blur(70px)",
        }}
      />

      {/* Right Glow */}
      {!isLowPower && (
        <div
          className="
            absolute
            right-[-5%]
            top-[10%]
            w-[400px]
            h-[400px]
            rounded-full
          "
          style={{
            background:
              "radial-gradient(circle, var(--accent-purple-dim) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      )}

      {/* Mouse Reactive Glow — DESKTOP ONLY */}
      {!isLowPower && (
        <div
          className="
            pointer-events-none
            absolute
            w-[500px]
            h-[500px]
            rounded-full
            hidden
            md:block
            will-change-transform
          "
          style={{
            background:
              "radial-gradient(circle, var(--moon-subtle) 0%, transparent 70%)",

            left: `${mousePos.x * 100}%`,
            top: `${mousePos.y * 100}%`,

            transform: "translate(-50%, -50%)",
            transition: "left 250ms linear, top 250ms linear",
          }}
        />
      )}

      {/* Noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.03]" />

      {/* Bottom Fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-40 z-[4]"
        style={{
          background:
            "linear-gradient(to top, var(--bg-primary), transparent)",
        }}
      />

      {/* ================= INTRO ================= */}

      {!isLowPower && (
        <AnimatePresence>
          {introPhase < 4 && (
            <motion.div
              className="
                absolute
                inset-0
                z-30
                flex
                items-center
                justify-center
              "
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: easing.cinematic,
              }}
            >
              <div className="text-center">
                {INTRO_LINES.map((line, i) => (
                  <motion.p
                    key={i}
                    className="
                      text-lg
                      md:text-2xl
                      lg:text-3xl
                      font-light
                      tracking-widest
                      mb-4
                    "
                    style={{
                      fontFamily: "var(--font-arabian)",
                      color: "var(--gold-primary)",
                    }}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={
                      introPhase > i
                        ? {
                          opacity:
                            introPhase === i + 1 ? 1 : 0.3,
                          y: 0,
                        }
                        : {
                          opacity: 0,
                          y: 20,
                        }
                    }
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* ================= CONTENT ================= */}

      <motion.div
        className="
          relative
          z-10
          section-container
          min-h-auto
          lg:min-h-screen
          flex
          flex-col
          lg:flex-row
          items-center
          justify-center
          gap-8
          lg:gap-0
          px-4
          sm:px-6
          pt-24
          pb-16
          sm:pt-32
          sm:pb-24
          lg:pb-28
        "
        style={{
          y: contentY,
          opacity: fadeOut,
        }}
      >
        {/* LEFT CONTENT */}
        <motion.div
          className="
            flex-1
            flex
            flex-col
            items-center
            lg:items-start
            text-center
            lg:text-left
            max-w-2xl
          "
          initial={{ opacity: 0 }}
          animate={
            mainVisible
              ? { opacity: 1 }
              : { opacity: 0 }
          }
        >
          {/* Subtitle */}
          <motion.p
            className="
              text-[10px]
              md:text-xs
              tracking-[0.5em]
              uppercase
              mb-5
            "
            style={{
              fontFamily: "var(--font-arabian)",
              color: "var(--gold-primary)",
            }}
          >
            ✦ The Mystical Techno-Cultural Festival ✦
          </motion.p>

          {/* Heading */}
          <motion.h1
            className="
              text-[3.5rem]
              sm:text-[4.5rem]
              md:text-[5.5rem]
              lg:text-[7rem]
              font-extrabold
              leading-[0.9]
              tracking-tighter
            "
            style={{
              fontFamily: "var(--font-heading)",
            }}
          >
            <span style={{ color: "var(--text-primary)" }}>
              Riviera
            </span>

            <br />

            <span
              className="text-gradient-gold inline-block"
              style={{
                textShadow:
                  "0 0 30px rgba(212,160,23,0.2)",
              }}
            >
              2026
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            className="
              text-xl
              md:text-2xl
              lg:text-3xl
              mt-4
              tracking-[0.2em]
            "
            style={{
              fontFamily: "var(--font-arabian)",
              color: "var(--gold-primary)",
            }}
          >
            Arabian Nights
          </motion.h2>

          {/* Description */}
          <motion.p
            className="
              text-sm
              md:text-base
              lg:text-lg
              mt-6
              max-w-lg
              leading-relaxed
            "
            style={{
              color: "var(--text-muted)",
            }}
          >
            Where innovation awakens beneath the moonlight —
            a mystical fusion of culture, technology, and imagination.
          </motion.p>

          {/* CTA */}
          <div className="mt-8">
            <Link
              href="/register"
              className="
                group
                relative
                inline-flex
                items-center
                gap-4
                px-8
                py-4
                rounded-full
                overflow-hidden
                border
              "
              style={{
                borderColor: "var(--border-gold)",
                background: "var(--gold-subtle)",
              }}
            >
              <span className="relative z-10 uppercase tracking-[0.15em] text-sm">
                Enter The Realm
              </span>

              <div
                className="
                  relative
                  z-10
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
                style={{
                  background: "var(--gradient-gold)",
                }}
              >
                <ArrowRight size={15} />
              </div>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          className="
            hidden
            lg:flex
            flex-1
            relative
            w-full
            min-h-[350px]
            flex
            items-center
            justify-center
          "
          style={{
            y: rightY,
          }}
        >
          {/* Lanterns */}
          {activeLanterns.map((l, i) => (
            <motion.div
              key={i}
              className="absolute z-[8]"
              style={{
                left: l.x,
                bottom: "30%",
              }}
              animate={
                isLowPower
                  ? {}
                  : {
                    y: [0, -120],
                    opacity: [0, 0.8, 0],
                  }
              }
              transition={{
                duration: l.dur,
                repeat: Infinity,
                delay: l.delay,
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: l.size,
                  height: l.size * 1.3,

                  background:
                    "radial-gradient(ellipse, #FFC857 0%, var(--gold-primary) 60%, transparent 100%)",

                  boxShadow:
                    "0 0 20px rgba(212,160,23,0.4)",
                }}
              />
            </motion.div>
          ))}

          {/* Fog */}
          <div
            ref={heroFogRef}
            className="
              absolute
              bottom-[10%]
              right-0
              w-[120%]
              h-[40%]
            "
          >
            <div
              className="w-full h-full"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 80%, var(--accent-purple-subtle) 0%, transparent 70%)",

                filter: isLowPower
                  ? "blur(30px)"
                  : "blur(50px)",
              }}
            />
          </div>

          {/* EMBERS — DESKTOP ONLY */}
          {!isLowPower &&
            Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full z-[6]"
                style={{
                  width: 3,
                  height: 3,
                  background: "var(--gold-light)",
                  right: `${15 + i * 10}%`,
                  bottom: `${20 + i * 7}%`,
                }}
                animate={{
                  y: [0, -60],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  delay: i * 0.8,
                }}
              />
            ))}
        </motion.div>
      </motion.div>
    </section>
  );
}