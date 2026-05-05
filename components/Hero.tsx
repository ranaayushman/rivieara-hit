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
import {
  generateStars,
  generateEmbers,
  getLanterns,
  getPerformanceAdjustedParticles,
} from "@/lib/particleAnimations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INTRO_LINES = [
  "Beyond the dunes...",
  "Where technology meets mysticism...",
  "A new world awakens...",
];

// ─── HIT Building SVG ───────────────────────────────────────────────────────
function HITBuilding() {
  return (
    <svg
      width="100%"
      viewBox="0 0 1440 340"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bldg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8a84b" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#c8a84b" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="colGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#b8922a" stopOpacity="0.62" />
        </linearGradient>
      </defs>

      {/* Ground */}
      <rect x="0" y="318" width="1440" height="22" fill="url(#bldg)" />

      {/* ── LEFT WING ── */}
      <rect x="0" y="195" width="310" height="125" fill="url(#bldg)" />
      <rect x="0" y="155" width="310" height="42" fill="url(#bldg)" />
      <rect x="-10" y="140" width="330" height="18" rx="3" fill="url(#colGrad)" />
      {/* upper arched windows */}
      {[20, 55, 90, 125, 160, 195, 230, 265].map((x) => (
        <rect key={x} x={x} y="205" width="18" height="30" rx="9" fill="#06040f" opacity="0.7" />
      ))}
      {/* ground floor windows */}
      {[20, 55, 90, 125, 160, 195, 230, 265].map((x) => (
        <rect key={x} x={x} y="258" width="18" height="35" rx="3" fill="#06040f" opacity="0.6" />
      ))}
      {/* top floor windows */}
      {[20, 52, 84, 116, 148, 180, 212, 244, 276].map((x) => (
        <rect key={x} x={x} y="162" width="14" height="22" rx="7" fill="#06040f" opacity="0.5" />
      ))}

      {/* ── RIGHT WING ── */}
      <rect x="1130" y="195" width="310" height="125" fill="url(#bldg)" />
      <rect x="1130" y="155" width="310" height="42" fill="url(#bldg)" />
      <rect x="1120" y="140" width="330" height="18" rx="3" fill="url(#colGrad)" />
      {[1140, 1175, 1210, 1245, 1280, 1315, 1350, 1385].map((x) => (
        <rect key={x} x={x} y="205" width="18" height="30" rx="9" fill="#06040f" opacity="0.7" />
      ))}
      {[1140, 1175, 1210, 1245, 1280, 1315, 1350, 1385].map((x) => (
        <rect key={x} x={x} y="258" width="18" height="35" rx="3" fill="#06040f" opacity="0.6" />
      ))}
      {[1140, 1172, 1204, 1236, 1268, 1300, 1332, 1364, 1396].map((x) => (
        <rect key={x} x={x} y="162" width="14" height="22" rx="7" fill="#06040f" opacity="0.5" />
      ))}

      {/* ── CENTRAL BLOCK ── */}
      <rect x="310" y="210" width="820" height="110" fill="url(#bldg)" />
      <rect x="330" y="175" width="780" height="38" fill="url(#bldg)" />

      {/* Iconic mushroom canopy */}
      <ellipse cx="720" cy="108" rx="380" ry="38" fill="url(#colGrad)" />
      <rect x="355" y="108" width="730" height="28" fill="url(#bldg)" />

      {/* 4 mushroom columns */}
      {[
        { x: 410, cx: 445 },
        { x: 570, cx: 605 },
        { x: 800, cx: 835 },
        { x: 960, cx: 995 },
      ].map(({ x, cx }) => (
        <g key={x}>
          <rect x={x} y="136" width="70" height="184" fill="url(#colGrad)" />
          <ellipse cx={cx} cy="136" rx="55" ry="14" fill="url(#colGrad)" />
        </g>
      ))}

      {/* Sky gaps between columns */}
      <rect x="480" y="138" width="90" height="160" fill="#06040f" opacity="0.85" />
      <rect x="640" y="138" width="160" height="160" fill="#06040f" opacity="0.85" />
      <rect x="870" y="138" width="90" height="160" fill="#06040f" opacity="0.85" />

      {/* Upper arched windows centre */}
      {[650, 680, 710, 740, 770].map((x) => (
        <rect key={x} x={x} y="182" width="16" height="24" rx="8" fill="#06040f" opacity="0.6" />
      ))}

      {/* Central arched entry door */}
      <rect x="670" y="238" width="100" height="80" fill="#06040f" opacity="0.85" />
      <ellipse cx="720" cy="238" rx="50" ry="22" fill="#06040f" opacity="0.85" />
      <path
        d="M670,318 L670,238 Q720,215 770,238 L770,318"
        fill="none"
        stroke="#d4af37"
        strokeWidth="0.8"
        opacity="0.35"
      />

      {/* Ground floor arches left of door */}
      {[340, 378, 416, 490, 530, 570, 615].map((x) => (
        <rect key={x} x={x} y="250" width="24" height="50" rx="12" fill="#06040f" opacity="0.65" />
      ))}
      {/* Ground floor arches right of door */}
      {[800, 838, 876, 960, 998, 1036, 1074].map((x) => (
        <rect key={x} x={x} y="250" width="24" height="50" rx="12" fill="#06040f" opacity="0.65" />
      ))}

      {/* College name */}
      <text
        x="720"
        y="312"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="10"
        fill="#d4af37"
        opacity="0.4"
        letterSpacing="6"
      >
        HALDIA INSTITUTE OF TECHNOLOGY
      </text>

      {/* Subtle gold base glow line */}
      <rect x="300" y="300" width="840" height="3" rx="2" fill="#d4af37" opacity="0.07" />
    </svg>
  );
}

// ─── Info Card ───────────────────────────────────────────────────────────────
function InfoCard({
  label,
  title,
  sub,
  delay,
  mainVisible,
  titleSize = "text-lg",
}: {
  label: string;
  title: string;
  sub: string;
  delay: number;
  mainVisible: boolean;
  titleSize?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={mainVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, delay }}
      className="rounded-xl px-5 py-4 backdrop-blur-sm"
      style={{
        background: "rgba(10, 6, 28, 0.72)",
        border: "1px solid rgba(212,175,55,0.2)",
      }}
    >
      <p
        className="text-[9px] tracking-[0.3em] uppercase mb-1"
        style={{ color: "rgba(212,175,55,0.5)", fontFamily: "var(--font-arabian)" }}
      >
        {label}
      </p>
      <p
        className={`${titleSize} font-bold`}
        style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
      >
        {title}
      </p>
      <p
        className="text-xs mt-0.5"
        style={{ color: "rgba(212,175,55,0.55)", fontFamily: "var(--font-arabian)" }}
      >
        {sub}
      </p>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
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

  /* ── MOUSE TRACKING (desktop only) ── */
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

  /* ── INTRO SEQUENCE ── */
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

  /* ── GSAP ATMOSPHERE ── */
  useEffect(() => {
    if (!isMounted) return;
    const ctx = gsap.context(() => {
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
          gsap.fromTo(heroFogRef.current, { opacity: 0 }, { opacity: 1, duration: 2, ease: "power2.out" });
          gsap.to(heroFogRef.current, { x: "4%", duration: 18, ease: "sine.inOut", yoyo: true, repeat: -1 });
        }
      } else {
        if (ambientGlowRef.current) gsap.set(ambientGlowRef.current, { opacity: 0.45, scale: 1 });
        if (heroFogRef.current) gsap.set(heroFogRef.current, { opacity: 0.5 });
      }
    });
    return () => ctx.revert();
  }, [isLowPower, isMounted]);

  /* ── STARS ── */
  const stars = useMemo(
    () => {
      const { starCount } = getPerformanceAdjustedParticles(isLowPower);
      return generateStars(starCount);
    },
    [isLowPower]
  );

  const activeLanterns = getLanterns(
    getPerformanceAdjustedParticles(isLowPower).lanternCount
  );
  const mainVisible = introPhase >= 4;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* ── BACKGROUND ── */}

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
            animate={isLowPower ? {} : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
          />
        ))}
      </div>

      {/* Ambient Glow */}
      <div
        ref={ambientGlowRef}
        className="absolute left-[-10%] top-[20%] w-[500px] h-[500px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, var(--gold-dim) 0%, transparent 70%)",
          filter: isLowPower ? "blur(40px)" : "blur(70px)",
        }}
      />

      {/* Right Glow */}
      {!isLowPower && (
        <div
          className="absolute right-[-5%] top-[10%] w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--accent-purple-dim) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      )}

      {/* Mouse Reactive Glow */}
      {!isLowPower && (
        <div
          className="pointer-events-none absolute w-[500px] h-[500px] rounded-full hidden md:block will-change-transform"
          style={{
            background: "radial-gradient(circle, var(--moon-subtle) 0%, transparent 70%)",
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
        style={{ background: "linear-gradient(to top, var(--bg-primary), transparent)" }}
      />

      {/* ── INTRO ── */}
      {!isLowPower && (
        <AnimatePresence>
          {introPhase < 4 && (
            <motion.div
              className="absolute inset-0 z-30 flex items-center justify-center"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: easing.cinematic }}
            >
              <div className="text-center">
                {INTRO_LINES.map((line, i) => (
                  <motion.p
                    key={i}
                    className="text-lg md:text-2xl lg:text-3xl font-light tracking-widest mb-4"
                    style={{ fontFamily: "var(--font-arabian)", color: "var(--gold-primary)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      introPhase > i
                        ? { opacity: introPhase === i + 1 ? 1 : 0.3, y: 0 }
                        : { opacity: 0, y: 20 }
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

      {/* ── MAIN CONTENT ── */}
      <motion.div
        className="
          relative z-10 section-container
          min-h-auto lg:min-h-screen
          flex flex-col lg:flex-row
          items-center justify-center
          gap-8 lg:gap-0
          px-4 sm:px-6
          pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-28
        "
        style={{ y: contentY, opacity: fadeOut }}
      >
        {/* LEFT */}
        <motion.div
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl"
          initial={{ opacity: 0 }}
          animate={mainVisible ? { opacity: 1 } : { opacity: 0 }}
        >
          <motion.p
            className="text-[10px] md:text-xs tracking-[0.5em] uppercase mb-5"
            style={{ fontFamily: "var(--font-arabian)", color: "var(--gold-primary)" }}
          >
            ✦ The Mystical Techno-Cultural Festival ✦
          </motion.p>

          <motion.h1
            className="text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] font-extrabold leading-[0.9] tracking-tighter"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span style={{ color: "var(--text-primary)" }}>Riviera</span>
            <br />
            <span
              className="text-gradient-gold inline-block"
              style={{ textShadow: "0 0 30px rgba(212,160,23,0.2)" }}
            >
              2026
            </span>
          </motion.h1>

          <motion.h2
            className="text-xl md:text-2xl lg:text-3xl mt-4 tracking-[0.2em]"
            style={{ fontFamily: "var(--font-arabian)", color: "var(--gold-primary)" }}
          >
            Arabian Nights
          </motion.h2>

          <motion.p
            className="text-sm md:text-base lg:text-lg mt-6 max-w-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Where innovation awakens beneath the moonlight — a mystical fusion of
            culture, technology, and imagination.
          </motion.p>

          <div className="mt-8">
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full overflow-hidden border"
              style={{ borderColor: "var(--border-gold)", background: "var(--gold-subtle)" }}
            >
              <span className="relative z-10 uppercase tracking-[0.15em] text-sm">
                Enter The Realm
              </span>
              <div
                className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "var(--gradient-gold)" }}
              >
                <ArrowRight size={15} />
              </div>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT — info cards + lanterns */}
        <motion.div
          className="hidden lg:flex flex-1 relative w-full min-h-[350px] flex-col items-end justify-start gap-4 pr-4 pt-4"
          style={{ y: rightY }}
        >
          {/* Venue card */}
          <InfoCard
            label="Venue"
            title="HIT Haldia"
            sub="Haldia Institute of Technology"
            delay={1.0}
            mainVisible={mainVisible}
          />

          {/* Edition card */}
          <InfoCard
            label="Edition"
            title="2026"
            sub="Annual Fest"
            delay={1.2}
            mainVisible={mainVisible}
            titleSize="text-3xl"
          />

          {/* Lanterns */}
          {activeLanterns.map((l, i) => (
            <motion.div
              key={i}
              className="absolute z-[8]"
              style={{ left: l.x, bottom: "30%" }}
              animate={isLowPower ? {} : { y: [0, -120], opacity: [0, 0.8, 0] }}
              transition={{ duration: l.dur, repeat: Infinity, delay: l.delay }}
            >
              <div
                className="rounded-full"
                style={{
                  width: l.size,
                  height: l.size * 1.3,
                  background: "radial-gradient(ellipse, #FFC857 0%, var(--gold-primary) 60%, transparent 100%)",
                  boxShadow: "0 0 20px rgba(212,160,23,0.4)",
                }}
              />
            </motion.div>
          ))}

          {/* Fog */}
          <div ref={heroFogRef} className="absolute bottom-[10%] right-0 w-[120%] h-[40%]">
            <div
              className="w-full h-full"
              style={{
                background: "radial-gradient(ellipse at 50% 80%, var(--accent-purple-subtle) 0%, transparent 70%)",
                filter: isLowPower ? "blur(30px)" : "blur(50px)",
              }}
            />
          </div>

          {/* Embers */}
          {(() => {
            const { shouldRenderEmitters, emberCount } = getPerformanceAdjustedParticles(isLowPower);
            if (!shouldRenderEmitters) return null;
            const embers = generateEmbers(emberCount);
            return embers.map((ember) => (
              <motion.div
                key={ember.id}
                className="absolute rounded-full z-[6]"
                style={{
                  width: 3,
                  height: 3,
                  background: "var(--gold-light)",
                  right: `${ember.right}%`,
                  bottom: `${ember.bottom}%`,
                }}
                animate={{ y: [0, -60], opacity: [0, 0.7, 0] }}
                transition={{ duration: ember.duration, repeat: Infinity, delay: ember.delay }}
              />
            ));
          })()}
        </motion.div>
      </motion.div>

      {/* ── HIT BUILDING SILHOUETTE (bottom) ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 w-full z-[3] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={mainVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 1.4 }}
      >
        <HITBuilding />
      </motion.div>
    </section>
  );
}