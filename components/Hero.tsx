"use client";

import { useEffect, useState, useRef } from "react";
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

const LANTERNS = [
  { x: "62%", delay: 0, size: 18, dur: 7 },
  { x: "72%", delay: 2, size: 14, dur: 9 },
  { x: "80%", delay: 4, size: 10, dur: 8 },
  { x: "55%", delay: 1, size: 12, dur: 10 },
  { x: "90%", delay: 3, size: 8,  dur: 11 },
];

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id:      i,
  x:       `${(i * 17 + 3) % 100}%`,
  y:       `${(i * 13 + 7) % 75}%`,
  size:    ((i * 7) % 3) + 1,
  opacity: ((i * 11) % 25 + 8) / 100,
  dur:     3 + ((i * 7) % 5),
  delay:   (i * 0.3) % 5,
}));

function HITBuilding() {
  const P  = [430, 600, 840, 1010];
  const PR = 26;

  return (
    <svg
      width="100%"
      viewBox="0 0 1440 400"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#c8a84b" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#b07820" stopOpacity="0.46" />
        </linearGradient>
        <linearGradient id="canopy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#d4af37" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#8a6010" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#111e2e" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#080f1a" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id="pillar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#5a3a05" stopOpacity="0.78" />
          <stop offset="22%"  stopColor="#d4af37" stopOpacity="0.92" />
          <stop offset="78%"  stopColor="#c8a030" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#4a2e04" stopOpacity="0.74" />
        </linearGradient>
        <radialGradient id="wglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ffe08a" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0"   />
        </radialGradient>
        <radialGradient id="gground" cx="50%" cy="100%" r="55%">
          <stop offset="0%"   stopColor="#d4af37" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0"   />
        </radialGradient>
        <linearGradient id="uplight" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"   stopColor="#d4af37" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0"   />
        </linearGradient>
      </defs>

      <ellipse cx="720" cy="398" rx="680" ry="26" fill="url(#gground)" />
      <rect x="0" y="393" width="1440" height="7" fill="url(#wall)" opacity="0.5" />

      <rect x="0" y="228" width={P[0]-PR-8} height="167" fill="url(#wall)" />
      <rect x="0" y="194" width={P[0]-PR-8} height="36"  fill="url(#wall)" opacity="0.65" />
      {[16, 58, 100, 142, 188, 234, 282, 330, 370].filter(x => x < P[0]-PR-18).map((x) => (
        <g key={`lwf2-${x}`}>
          <rect x={x} y="202" width="30" height="26" rx="2" fill="#06040f" opacity="0.50" />
          <ellipse cx={x+15} cy="202" rx="15" ry="9" fill="#06040f" opacity="0.50" />
          <ellipse cx={x+15} cy="213" rx="11" ry="12" fill="url(#wglow)" />
        </g>
      ))}
      {[16, 58, 100, 142, 188, 234, 282, 330, 370].filter(x => x < P[0]-PR-18).map((x) => (
        <g key={`lwgf-${x}`}>
          <rect x={x} y="278" width="30" height="55" rx="2" fill="#06040f" opacity="0.48" />
          <ellipse cx={x+15} cy="278" rx="15" ry="9" fill="#06040f" opacity="0.48" />
          <ellipse cx={x+15} cy="298" rx="11" ry="22" fill="url(#wglow)" />
        </g>
      ))}
      <rect x="-2" y="186" width={P[0]-PR+2} height="10" rx="2" fill="url(#canopy)" opacity="0.42" />
      {Array.from({ length: Math.floor((P[0]-PR)/18) }, (_, i) => 4 + i*18).map((x) => (
        <rect key={`lwr-${x}`} x={x} y="177" width="3" height="11" rx="1" fill="#4a8ab5" opacity="0.42" />
      ))}

      <rect x={P[3]+PR+8} y="228" width={1440-(P[3]+PR+8)} height="167" fill="url(#wall)" />
      <rect x={P[3]+PR+8} y="194" width={1440-(P[3]+PR+8)} height="36"  fill="url(#wall)" opacity="0.65" />
      {[0, 44, 88, 132, 178, 224, 270, 316, 360].map((dx) => {
        const x = P[3]+PR+18+dx;
        return x < 1422 ? (
          <g key={`rwf2-${dx}`}>
            <rect x={x} y="202" width="30" height="26" rx="2" fill="#06040f" opacity="0.50" />
            <ellipse cx={x+15} cy="202" rx="15" ry="9" fill="#06040f" opacity="0.50" />
            <ellipse cx={x+15} cy="213" rx="11" ry="12" fill="url(#wglow)" />
          </g>
        ) : null;
      })}
      {[0, 44, 88, 132, 178, 224, 270, 316, 360].map((dx) => {
        const x = P[3]+PR+18+dx;
        return x < 1422 ? (
          <g key={`rwgf-${dx}`}>
            <rect x={x} y="278" width="30" height="55" rx="2" fill="#06040f" opacity="0.48" />
            <ellipse cx={x+15} cy="278" rx="15" ry="9" fill="#06040f" opacity="0.48" />
            <ellipse cx={x+15} cy="298" rx="11" ry="22" fill="url(#wglow)" />
          </g>
        ) : null;
      })}
      <rect x={P[3]+PR} y="186" width={1440-(P[3]+PR)} height="10" rx="2" fill="url(#canopy)" opacity="0.42" />
      {Array.from({ length: 20 }, (_, i) => P[3]+PR+4+i*18).map((x) => (
        <rect key={`rwr-${x}`} x={x} y="177" width="3" height="11" rx="1" fill="#4a8ab5" opacity="0.42" />
      ))}

      <rect x={P[0]-PR} y="194" width={P[3]+PR-(P[0]-PR)} height="200" fill="url(#wall)" />

      {[
        P[0]-PR+8, P[0]-PR+52, P[0]+PR+14, (P[0]+P[1])/2-16,
        P[1]+PR+14, (P[1]+P[2])/2-16,
        P[2]+PR+14, (P[2]+P[3])/2-16, P[3]-PR-52,
      ].map((x, i) => (
        <g key={`f2-${i}`}>
          <rect x={x} y="202" width="30" height="26" rx="2" fill="#06040f" opacity="0.52" />
          <ellipse cx={x+15} cy="202" rx="15" ry="9" fill="#06040f" opacity="0.52" />
          <ellipse cx={x+15} cy="214" rx="11" ry="12" fill="url(#wglow)" />
        </g>
      ))}

      <rect x={P[0]-PR} y="268" width={P[3]+PR-(P[0]-PR)} height="4" rx="1" fill="#d4af37" opacity="0.20" />
      {Array.from({ length: Math.floor((P[3]+PR-(P[0]-PR))/16) }, (_, i) => P[0]-PR+4+i*16).map((x) => (
        <rect key={`br1-${x}`} x={x} y="254" width="2" height="16" rx="1" fill="#d4af37" opacity="0.16" />
      ))}

      {[
        P[0]-PR+8, (P[0]+P[1])/2-44, (P[0]+P[1])/2+12,
        (P[1]+P[2])/2-44, (P[1]+P[2])/2+12,
        (P[2]+P[3])/2-44, (P[2]+P[3])/2+12, P[3]+PR-52,
      ].map((x, i) => (
        <g key={`f1-${i}`}>
          <rect x={x} y="276" width="34" height="46" rx="2" fill="#06040f" opacity="0.50" />
          <ellipse cx={x+17} cy="276" rx="17" ry="10" fill="#06040f" opacity="0.50" />
          <ellipse cx={x+17} cy="294" rx="13" ry="20" fill="url(#wglow)" />
        </g>
      ))}

      <rect x={P[0]+30} y="238" width={P[3]-P[0]-60} height="28" rx="2" fill="url(#wall)" opacity="0.28" />
      <text
        x="720" y="256"
        textAnchor="middle"
        fontFamily="'Cinzel','Cormorant Garamond',serif"
        fontSize="13"
        fill="#d4af37"
        opacity="0.72"
        letterSpacing="4"
      >
        HALDIA INSTITUTE OF TECHNOLOGY
      </text>

      <rect x="694" y="310" width="52" height="84" rx="2" fill="#06040f" opacity="0.93" />
      <ellipse cx="720" cy="310" rx="26" ry="14" fill="#06040f" opacity="0.93" />
      <path
        d="M694,394 L694,310 Q720,292 746,310 L746,394"
        fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.40"
      />

      {[P[0]-PR+6, P[0]-PR+50, P[0]+PR+12, (P[0]+P[1])/2-48, (P[0]+P[1])/2+6,
        P[1]+PR+10, (P[1]+P[2])/2-60].map((x, i) => (
        <g key={`gfl-${i}`}>
          <rect x={x} y="316" width="36" height="58" rx="2" fill="#06040f" opacity="0.54" />
          <ellipse cx={x+18} cy="316" rx="18" ry="11" fill="#06040f" opacity="0.54" />
          <ellipse cx={x+18} cy="336" rx="14" ry="24" fill="url(#wglow)" />
        </g>
      ))}
      {[(P[1]+P[2])/2+14, P[2]-PR-50, P[2]+PR+10, (P[2]+P[3])/2-48, (P[2]+P[3])/2+6,
        P[3]-PR-50, P[3]+PR-8].map((x, i) => (
        <g key={`gfr-${i}`}>
          <rect x={x} y="316" width="36" height="58" rx="2" fill="#06040f" opacity="0.54" />
          <ellipse cx={x+18} cy="316" rx="18" ry="11" fill="#06040f" opacity="0.54" />
          <ellipse cx={x+18} cy="336" rx="14" ry="24" fill="url(#wglow)" />
        </g>
      ))}

      <path
        d={`
          M 258,198
          L ${P[0]-PR},198
          Q ${P[0]},194 ${P[0]+PR},198
          Q ${(P[0]+P[1])/2},${198+((P[1]-P[0])*0.16)} ${P[1]-PR},198
          Q ${P[1]},194 ${P[1]+PR},198
          Q ${(P[1]+P[2])/2},${198+((P[2]-P[1])*0.16)} ${P[2]-PR},198
          Q ${P[2]},194 ${P[2]+PR},198
          Q ${(P[2]+P[3])/2},${198+((P[3]-P[2])*0.16)} ${P[3]-PR},198
          Q ${P[3]},194 ${P[3]+PR},198
          L 1182,198
          L 1182,164
          L 258,164
          Z
        `}
        fill="url(#canopy)"
        opacity="0.88"
      />

      <rect x="256" y="144" width="928" height="22" fill="url(#canopy)" opacity="0.74" />
      <rect x="256" y="112" width="928" height="34" rx="2" fill="url(#glass)" />
      <rect x="256" y="112" width="928" height="3"  fill="#4a8ab5" opacity="0.60" />
      <rect x="256" y="144" width="928" height="2"  fill="#4a8ab5" opacity="0.32" />

      {Array.from({ length: 46 }, (_, i) => 262 + i * 20).map((x) => (
        <rect key={`rp-${x}`} x={x} y="102" width="4" height="12" rx="1" fill="#4a8ab5" opacity="0.58" />
      ))}
      <rect x="256" y="100" width="928" height="4" rx="2" fill="#4a8ab5" opacity="0.48" />

      {P.map((cx, i) => (
        <g key={`pillar-${i}`}>
          <path
            d={`M ${cx-14},394 L ${cx-75},265 L ${cx+75},265 L ${cx+14},394 Z`}
            fill="url(#uplight)"
          />
          <rect x={cx-PR}   y="194" width="16"    height="202" rx={PR} fill="#06040f" opacity="0.32" />
          <rect x={cx-PR}   y="194" width={PR*2}  height="202" rx={PR} fill="url(#pillar)" />
          <rect x={cx+8}    y="200" width="8"     height="194" rx="4"  fill="#d4af37" opacity="0.10" />
          <rect x={cx-PR-9} y="390" width={PR*2+18} height="10" rx="3" fill="url(#canopy)" opacity="0.62" />
          <path
            d={`M ${cx-PR-20},200 Q ${cx-PR},190 ${cx-PR},166 L ${cx+PR},166 Q ${cx+PR},190 ${cx+PR+20},200 Z`}
            fill="url(#canopy)"
            opacity="0.84"
          />
        </g>
      ))}

      {[
        [P[0], P[1]],
        [P[1], P[2]],
        [P[2], P[3]],
      ].map(([x1, x2], i) => {
        const mx   = (x1 + x2) / 2;
        const span = x2 - x1;
        return (
          <path
            key={`arch-${i}`}
            d={`M ${x1+PR},198 Q ${mx},${198+span*0.14} ${x2-PR},198`}
            fill="none"
            stroke="#d4af37"
            strokeWidth="1"
            opacity="0.18"
          />
        );
      })}

      <rect x={P[0]-PR} y="390" width={P[3]+PR-(P[0]-PR)} height="2" rx="1" fill="#d4af37" opacity="0.22" />
    </svg>
  );
}

function InfoCard({
  label, title, sub, delay, mainVisible, titleSize = "text-lg",
}: {
  label: string; title: string; sub: string;
  delay: number; mainVisible: boolean; titleSize?: string;
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
      <p className="text-[9px] tracking-[0.3em] uppercase mb-1"
        style={{ color: "rgba(212,175,55,0.5)", fontFamily: "var(--font-arabian)" }}>
        {label}
      </p>
      <p className={`${titleSize} font-bold`}
        style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
        {title}
      </p>
      <p className="text-xs mt-0.5"
        style={{ color: "rgba(212,175,55,0.55)", fontFamily: "var(--font-arabian)" }}>
        {sub}
      </p>
    </motion.div>
  );
}

export default function Hero() {
  const [mousePos,   setMousePos]   = useState({ x: 0, y: 0 });
  const [introPhase, setIntroPhase] = useState(0);

  const containerRef   = useRef<HTMLDivElement>(null);
  const heroFogRef     = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const { isLowPower, isMounted } = usePerformanceMode();

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rightY   = useTransform(scrollYProgress, [0, 1], [0,  30]);
  const fadeOut  = useTransform(scrollYProgress, [0, 0.5], [1,  0]);

  useEffect(() => {
    if (!isMounted || isLowPower) return;
    const handle = (e: MouseEvent) =>
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [isLowPower, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    if (isLowPower) { setIntroPhase(4); return; }
    const timers = [
      setTimeout(() => setIntroPhase(1), 400),
      setTimeout(() => setIntroPhase(2), 1600),
      setTimeout(() => setIntroPhase(3), 2800),
      setTimeout(() => setIntroPhase(4), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isLowPower, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const ctx = gsap.context(() => {
      if (!isLowPower) {
        if (ambientGlowRef.current)
          gsap.to(ambientGlowRef.current, {
            scale: 1.05, opacity: 0.75, duration: 6,
            ease: "sine.inOut", yoyo: true, repeat: -1,
          });
        if (heroFogRef.current) {
          gsap.fromTo(heroFogRef.current, { opacity: 0 }, { opacity: 1, duration: 2, ease: "power2.out" });
          gsap.to(heroFogRef.current, { x: "4%", duration: 18, ease: "sine.inOut", yoyo: true, repeat: -1 });
        }
      } else {
        if (ambientGlowRef.current) gsap.set(ambientGlowRef.current, { opacity: 0.45, scale: 1 });
        if (heroFogRef.current)     gsap.set(heroFogRef.current,     { opacity: 0.5 });
      }
    });
    return () => ctx.revert();
  }, [isLowPower, isMounted]);

  const mainVisible = introPhase >= 4;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Stars */}
      <div className="absolute inset-0" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <style>{`
              @keyframes star-pulse {
                0%,100% { opacity: var(--op-lo); }
                50%      { opacity: var(--op-hi); }
              }
            `}</style>
          </defs>
          {STARS.map((s) => (
            <circle
              key={s.id}
              cx={s.x} cy={s.y} r={s.size}
              fill="var(--gold-primary)"
              style={{
                "--op-lo": s.opacity,
                "--op-hi": Math.min(s.opacity * 3, 1),
                opacity: s.opacity,
                animation: isMounted && !isLowPower
                  ? `star-pulse ${s.dur}s ${s.delay}s ease-in-out infinite`
                  : "none",
                willChange: "opacity",
              } as React.CSSProperties}
            />
          ))}
        </svg>
      </div>

      {/* Ambient glow */}
      <div
        ref={ambientGlowRef}
        className="absolute left-[-10%] top-[20%] w-[500px] h-[500px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(212,160,23,0.15) 0%, transparent 70%)",
          willChange: "transform, opacity",
        }}
      />

      {isMounted && !isLowPower && (
        <>
          <div
            className="absolute right-[-5%] top-[10%] w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(106,13,173,0.15) 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute w-[500px] h-[500px] rounded-full hidden md:block"
            style={{
              background: "radial-gradient(circle, var(--moon-subtle) 0%, transparent 70%)",
              left: `${mousePos.x * 100}%`,
              top:  `${mousePos.y * 100}%`,
              transform: "translate(-50%, -50%)",
              transition: "left 250ms linear, top 250ms linear",
              willChange: "transform",
            }}
          />
        </>
      )}

      <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      <div
        className="absolute bottom-0 inset-x-0 h-40 z-[4]"
        style={{ background: "linear-gradient(to top, var(--bg-primary), transparent)" }}
      />

      {/* Cinematic intro */}
      {isMounted && !isLowPower && (
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

      {/* Main content */}
      <motion.div
        className="relative z-10 section-container min-h-auto lg:min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-28"
        style={{ y: contentY, opacity: fadeOut }}
      >
        {/* Left — text content, button removed from here */}
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
            className="text-xl md:text-2xl lg:text-3xl mt-4 tracking-[0.2em] arabian-pulse"
            style={{ fontFamily: "var(--font-arabian)", color: "var(--gold-primary)" }}
          >
            Arabian Nights
          </motion.h2>

          <motion.p
            className="text-sm md:text-base lg:text-lg mt-6 max-w-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Where innovation awakens beneath the moonlight —
            a mystical fusion of culture, technology, and imagination.
          </motion.p>

          {/* CTA Button — below description, center aligned */}
          <motion.div
            className="mt-10 flex justify-center lg:justify-start w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={mainVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {/* Glow pulse ring around button */}
            <div className="relative inline-flex">
              {/* Animated glow ring — performance guarded */}
              {isMounted && !isLowPower && (
                <motion.span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{
                    boxShadow: [
                      "0 0 0px 0px rgba(212,160,23,0)",
                      "0 0 18px 6px rgba(212,160,23,0.35)",
                      "0 0 0px 0px rgba(212,160,23,0)",
                    ],
                  }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
              )}
              <Link
                href="/register"
                className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full overflow-hidden border shimmer-sweep"
                style={{
                  borderColor: "var(--border-gold)",
                  background: "var(--gold-subtle)",
                }}
              >
                <span
                  className="relative z-10 uppercase tracking-[0.15em] text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  Enter The Realm
                </span>
                <motion.div
                  className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center"
                  animate={isMounted && !isLowPower ? {
                    boxShadow: [
                      "0 0 8px 2px rgba(212,160,23,0.4)",
                      "0 0 20px 6px rgba(212,160,23,0.7)",
                      "0 0 8px 2px rgba(212,160,23,0.4)",
                    ],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.12, rotate: 15 }}
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <ArrowRight size={15} className="text-[#0a0805]" />
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Right — info cards only, no button */}
        <motion.div
          className="hidden lg:flex flex-1 relative w-full min-h-[350px] flex-col items-end justify-start gap-4 pr-4 pt-4"
          style={{ y: rightY }}
        >
          <InfoCard
            label="Venue" title="HIT Haldia"
            sub="Haldia Institute of Technology"
            delay={1.0} mainVisible={mainVisible}
          />
          <InfoCard
            label="Edition" title="2026"
            sub="Annual Fest"
            delay={1.2} mainVisible={mainVisible} titleSize="text-3xl"
          />

          {/* Lanterns */}
          {isMounted && (isLowPower ? LANTERNS.slice(0, 1) : LANTERNS.slice(0, 3)).map((l, i) => (
            <motion.div
              key={i}
              className="absolute z-[8] lantern-layer"
              style={{ left: l.x, bottom: "30%" }}
              animate={isLowPower ? {} : { y: [0, -120], opacity: [0, 0.8, 0] }}
              transition={{ duration: l.dur, repeat: Infinity, delay: l.delay }}
            >
              <div
                className="rounded-full"
                style={{
                  width: l.size, height: l.size * 1.3,
                  background: "radial-gradient(ellipse, #FFC857 0%, var(--gold-primary) 60%, transparent 100%)",
                  boxShadow: "0 0 20px rgba(212,160,23,0.4)",
                }}
              />
            </motion.div>
          ))}

          {/* Fog */}
          <div
            ref={heroFogRef}
            className="absolute bottom-[10%] right-0 w-[120%] h-[40%] fog-layer"
          >
            <div
              className="w-full h-full"
              style={{
                background: "radial-gradient(ellipse at 50% 80%, rgba(106,13,173,0.2) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Embers */}
          {isMounted && !isLowPower && Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full z-[6]"
              style={{
                width: 3, height: 3,
                background: "var(--gold-light)",
                right: `${15 + i * 10}%`,
                bottom: `${20 + i * 7}%`,
                willChange: "transform, opacity",
              }}
              animate={{ y: [0, -60], opacity: [0, 0.7, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.8 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* HIT Building silhouette */}
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