"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
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

/* ── Animation variants ── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants: Variants = {
  hidden:  { opacity: 0, x: 24, scale: 0.96 },
  visible: {
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─────────────────────────────────────────────────────────────────
   HIT BUILDING
───────────────────────────────────────────────────────────────── */
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
      style={{ maxHeight: "42vh", display: "block" }}
    >
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#c8a84b" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#b07820" stopOpacity="0.58" />
        </linearGradient>
        <linearGradient id="canopy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#d4af37" stopOpacity="0.70" />
          <stop offset="100%" stopColor="#8a6010" stopOpacity="0.96" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#111e2e" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#080f1a" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id="pillar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#5a3a05" stopOpacity="0.78" />
          <stop offset="22%"  stopColor="#d4af37" stopOpacity="0.95" />
          <stop offset="78%"  stopColor="#c8a030" stopOpacity="0.90" />
          <stop offset="100%" stopColor="#4a2e04" stopOpacity="0.74" />
        </linearGradient>
        <radialGradient id="wglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ffe08a" stopOpacity="0.58" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0"   />
        </radialGradient>
        <radialGradient id="gground" cx="50%" cy="100%" r="55%">
          <stop offset="0%"   stopColor="#d4af37" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0"   />
        </radialGradient>
        <linearGradient id="uplight" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"   stopColor="#d4af37" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0"   />
        </linearGradient>
      </defs>

      <ellipse cx="720" cy="398" rx="680" ry="26" fill="url(#gground)" />
      <rect x="0" y="393" width="1440" height="7" fill="url(#wall)" opacity="0.5" />

      {/* LEFT WING */}
      <rect x="0" y="228" width={P[0]-PR-8} height="167" fill="url(#wall)" />
      <rect x="0" y="194" width={P[0]-PR-8} height="36"  fill="url(#wall)" opacity="0.65" />
      {[16,58,100,142,188,234,282,330,370].filter(x => x < P[0]-PR-18).map((x) => (
        <g key={`lwf2-${x}`}>
          <rect x={x} y="202" width="30" height="26" rx="2" fill="#06040f" opacity="0.50" />
          <ellipse cx={x+15} cy="202" rx="15" ry="9" fill="#06040f" opacity="0.50" />
          <ellipse cx={x+15} cy="213" rx="11" ry="12" fill="url(#wglow)" />
        </g>
      ))}
      {[16,58,100,142,188,234,282,330,370].filter(x => x < P[0]-PR-18).map((x) => (
        <g key={`lwgf-${x}`}>
          <rect x={x} y="278" width="30" height="55" rx="2" fill="#06040f" opacity="0.48" />
          <ellipse cx={x+15} cy="278" rx="15" ry="9" fill="#06040f" opacity="0.48" />
          <ellipse cx={x+15} cy="298" rx="11" ry="22" fill="url(#wglow)" />
        </g>
      ))}
      <rect x="-2" y="186" width={P[0]-PR+2} height="10" rx="2" fill="url(#canopy)" opacity="0.42" />
      {Array.from({ length: Math.floor((P[0]-PR)/18) }, (_, i) => 4+i*18).map((x) => (
        <rect key={`lwr-${x}`} x={x} y="177" width="3" height="11" rx="1" fill="#4a8ab5" opacity="0.42" />
      ))}

      {/* RIGHT WING */}
      <rect x={P[3]+PR+8} y="228" width={1440-(P[3]+PR+8)} height="167" fill="url(#wall)" />
      <rect x={P[3]+PR+8} y="194" width={1440-(P[3]+PR+8)} height="36"  fill="url(#wall)" opacity="0.65" />
      {[0,44,88,132,178,224,270,316,360].map((dx) => {
        const x = P[3]+PR+18+dx;
        return x < 1422 ? (
          <g key={`rwf2-${dx}`}>
            <rect x={x} y="202" width="30" height="26" rx="2" fill="#06040f" opacity="0.50" />
            <ellipse cx={x+15} cy="202" rx="15" ry="9" fill="#06040f" opacity="0.50" />
            <ellipse cx={x+15} cy="213" rx="11" ry="12" fill="url(#wglow)" />
          </g>
        ) : null;
      })}
      {[0,44,88,132,178,224,270,316,360].map((dx) => {
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

      {/* CENTRAL BUILDING BODY */}
      <rect x={P[0]-PR} y="194" width={P[3]+PR-(P[0]-PR)} height="200" fill="url(#wall)" />
      {[P[0]-PR+8, P[0]-PR+52, P[0]+PR+14, (P[0]+P[1])/2-16, P[1]+PR+14, (P[1]+P[2])/2-16, P[2]+PR+14, (P[2]+P[3])/2-16, P[3]-PR-52].map((x, i) => (
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
      {[P[0]-PR+8, (P[0]+P[1])/2-44, (P[0]+P[1])/2+12, (P[1]+P[2])/2-44, (P[1]+P[2])/2+12, (P[2]+P[3])/2-44, (P[2]+P[3])/2+12, P[3]+PR-52].map((x, i) => (
        <g key={`f1-${i}`}>
          <rect x={x} y="276" width="34" height="46" rx="2" fill="#06040f" opacity="0.50" />
          <ellipse cx={x+17} cy="276" rx="17" ry="10" fill="#06040f" opacity="0.50" />
          <ellipse cx={x+17} cy="294" rx="13" ry="20" fill="url(#wglow)" />
        </g>
      ))}
      <rect x={P[0]+30} y="238" width={P[3]-P[0]-60} height="28" rx="2" fill="url(#wall)" opacity="0.28" />
      <text x="720" y="256" textAnchor="middle" fontFamily="'Cinzel','Cormorant Garamond',serif" fontSize="13" fill="#d4af37" opacity="0.82" letterSpacing="4">
        HALDIA INSTITUTE OF TECHNOLOGY
      </text>
      <rect x="694" y="310" width="52" height="84" rx="2" fill="#06040f" opacity="0.93" />
      <ellipse cx="720" cy="310" rx="26" ry="14" fill="#06040f" opacity="0.93" />
      <path d="M694,394 L694,310 Q720,292 746,310 L746,394" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.40" />
      {[P[0]-PR+6, P[0]-PR+50, P[0]+PR+12, (P[0]+P[1])/2-48, (P[0]+P[1])/2+6, P[1]+PR+10, (P[1]+P[2])/2-60].map((x, i) => (
        <g key={`gfl-${i}`}>
          <rect x={x} y="316" width="36" height="58" rx="2" fill="#06040f" opacity="0.54" />
          <ellipse cx={x+18} cy="316" rx="18" ry="11" fill="#06040f" opacity="0.54" />
          <ellipse cx={x+18} cy="336" rx="14" ry="24" fill="url(#wglow)" />
        </g>
      ))}
      {[(P[1]+P[2])/2+14, P[2]-PR-50, P[2]+PR+10, (P[2]+P[3])/2-48, (P[2]+P[3])/2+6, P[3]-PR-50, P[3]+PR-8].map((x, i) => (
        <g key={`gfr-${i}`}>
          <rect x={x} y="316" width="36" height="58" rx="2" fill="#06040f" opacity="0.54" />
          <ellipse cx={x+18} cy="316" rx="18" ry="11" fill="#06040f" opacity="0.54" />
          <ellipse cx={x+18} cy="336" rx="14" ry="24" fill="url(#wglow)" />
        </g>
      ))}
      <path
        d={`M 258,198 L ${P[0]-PR},198 Q ${P[0]},194 ${P[0]+PR},198 Q ${(P[0]+P[1])/2},${198+((P[1]-P[0])*0.16)} ${P[1]-PR},198 Q ${P[1]},194 ${P[1]+PR},198 Q ${(P[1]+P[2])/2},${198+((P[2]-P[1])*0.16)} ${P[2]-PR},198 Q ${P[2]},194 ${P[2]+PR},198 Q ${(P[2]+P[3])/2},${198+((P[3]-P[2])*0.16)} ${P[3]-PR},198 Q ${P[3]},194 ${P[3]+PR},198 L 1182,198 L 1182,164 L 258,164 Z`}
        fill="url(#canopy)" opacity="0.88"
      />
      <rect x="256" y="144" width="928" height="22" fill="url(#canopy)" opacity="0.74" />
      <rect x="256" y="112" width="928" height="34" rx="2" fill="url(#glass)" />
      <rect x="256" y="112" width="928" height="3"  fill="#4a8ab5" opacity="0.60" />
      <rect x="256" y="144" width="928" height="2"  fill="#4a8ab5" opacity="0.32" />
      {Array.from({ length: 46 }, (_, i) => 262+i*20).map((x) => (
        <rect key={`rp-${x}`} x={x} y="102" width="4" height="12" rx="1" fill="#4a8ab5" opacity="0.58" />
      ))}
      <rect x="256" y="100" width="928" height="4" rx="2" fill="#4a8ab5" opacity="0.48" />
      {P.map((cx, i) => (
        <g key={`pillar-${i}`}>
          <path d={`M ${cx-14},394 L ${cx-75},265 L ${cx+75},265 L ${cx+14},394 Z`} fill="url(#uplight)" />
          <rect x={cx-PR}   y="194" width="16"      height="202" rx={PR} fill="#06040f" opacity="0.32" />
          <rect x={cx-PR}   y="194" width={PR*2}    height="202" rx={PR} fill="url(#pillar)" />
          <rect x={cx+8}    y="200" width="8"       height="194" rx="4"  fill="#d4af37" opacity="0.10" />
          <rect x={cx-PR-9} y="390" width={PR*2+18} height="10"  rx="3"  fill="url(#canopy)" opacity="0.62" />
          <path d={`M ${cx-PR-20},200 Q ${cx-PR},190 ${cx-PR},166 L ${cx+PR},166 Q ${cx+PR},190 ${cx+PR+20},200 Z`} fill="url(#canopy)" opacity="0.84" />
        </g>
      ))}
      {[[P[0],P[1]],[P[1],P[2]],[P[2],P[3]]].map(([x1,x2],i) => (
        <path key={`arch-${i}`} d={`M ${x1+PR},198 Q ${(x1+x2)/2},${198+(x2-x1)*0.14} ${x2-PR},198`} fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.22" />
      ))}
      <rect x={P[0]-PR} y="390" width={P[3]+PR-(P[0]-PR)} height="2" rx="1" fill="#d4af37" opacity="0.28" />
    </svg>
  );
}

/* ── CTA Button ── */
function CTAButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="https://forms.gle/eo9hVBTc3cUP86Z2A"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full overflow-hidden"
      style={{
        border: "1px solid rgba(212,175,55,0.42)",
        background: hovered ? "rgba(212,175,55,0.12)" : "rgba(212,175,55,0.06)",
        boxShadow: hovered
          ? "0 0 38px rgba(212,175,55,0.28), 0 0 72px rgba(212,175,55,0.10), inset 0 1px 0 rgba(255,255,255,0.07)"
          : "0 0 16px rgba(212,175,55,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-110%" }}
        animate={hovered ? { x: "110%" } : { x: "-110%" }}
        transition={{ duration: 0.52, ease: "easeInOut" }}
        style={{ background: "linear-gradient(105deg, transparent 25%, rgba(255,215,100,0.18) 50%, transparent 75%)", width: "80%" }}
      />
      <span className="relative z-10 uppercase tracking-[0.15em] text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
        Enter The Realm
      </span>
      <motion.div
        className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        animate={hovered ? { scale: 1.18, rotate: 15 } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "var(--gradient-gold)",
          boxShadow: hovered ? "0 0 26px rgba(212,160,23,0.65), 0 0 52px rgba(212,160,23,0.22)" : "var(--shadow-glow-gold-md)",
        }}
      >
        <ArrowRight size={15} className="text-[#0a0805]" />
      </motion.div>
    </Link>
  );
}

/* ── Magic Dots ── */
function MagicDots({ isLowPower }: { isLowPower: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  if (isLowPower || shouldReduceMotion) return null;
  const dots = [
    { x: "18%", y: "12%", size: 5, delay: 0,   dur: 3.8 },
    { x: "72%", y: "28%", size: 3, delay: 0.7, dur: 4.5 },
    { x: "42%", y: "52%", size: 4, delay: 1.4, dur: 3.2 },
    { x: "83%", y: "68%", size: 6, delay: 0.3, dur: 5.0 },
    { x: "8%",  y: "72%", size: 3, delay: 2.1, dur: 4.1 },
    { x: "58%", y: "83%", size: 4, delay: 1.0, dur: 3.6 },
    { x: "28%", y: "38%", size: 3, delay: 1.7, dur: 4.8 },
    { x: "90%", y: "44%", size: 2.5, delay: 2.5, dur: 3.4 },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none z-[2]"
          style={{ left: d.x, top: d.y, width: d.size, height: d.size,
            background: "radial-gradient(circle, #ffe08a, rgba(212,160,23,0.25))",
            boxShadow: `0 0 ${d.size * 3}px rgba(212,175,55,0.55)` }}
          animate={{ y: [-8, 8, -8], opacity: [0.2, 0.8, 0.2], scale: [0.85, 1.2, 0.85] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   COUNTDOWN TIMER
   - Live seconds tick with flip animation on each unit
   - Skeleton loader on SSR to avoid hydration mismatch
   - Target: 18 May 2026 00:00:00 IST
───────────────────────────────────────────────────────────────── */
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calc = () => {
      // 18 May 2026 00:00:00 IST = UTC+5:30
      const target = new Date("2026-05-18T00:00:00+05:30").getTime();
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days",    value: timeLeft.days    },
    { label: "Hours",   value: timeLeft.hours   },
    { label: "Mins",    value: timeLeft.minutes },
    { label: "Secs",    value: timeLeft.seconds },
  ];

  // SSR skeleton — prevents hydration mismatch
  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-3">
        {["Days","Hours","Mins","Secs"].map((l) => (
          <div key={l} className="flex flex-col items-center gap-2">
            <div className="w-full h-16 rounded-xl animate-pulse"
              style={{ background: "rgba(212,175,55,0.13)", border: "1px solid rgba(212,175,55,0.25)" }} />
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium"
              style={{ color: "rgba(212,175,55,0.65)", fontFamily: "var(--font-arabian)" }}>{l}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center gap-2">
          {/* Number block */}
          <div
            className="relative w-full flex items-center justify-center rounded-xl py-4 overflow-hidden"
            style={{
              background: "rgba(212,175,55,0.13)",
              border: "1px solid rgba(212,175,55,0.38)",
              boxShadow: "0 0 18px rgba(212,175,55,0.14), inset 0 1px 0 rgba(255,224,138,0.18)",
            }}
          >
            {/* Top inner glow */}
            <div className="absolute inset-0 rounded-xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.22), transparent 70%)" }} />
            {/* Flip animation on value change */}
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                className="relative text-3xl font-bold tabular-nums"
                style={{
                  fontFamily: "var(--font-heading)",
                  background: "linear-gradient(160deg, #FFF5B0 0%, #F5C832 45%, #C88010 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 8px rgba(212,175,55,0.5))",
                }}
                initial={{ y: -14, opacity: 0 }}
                animate={{ y: 0,   opacity: 1 }}
                exit={{    y:  14, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                {String(value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          {/* Label */}
          <span className="text-[10px] tracking-[0.22em] uppercase font-medium"
            style={{ color: "rgba(212,175,55,0.65)", fontFamily: "var(--font-arabian)" }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN HERO
═══════════════════════════════════════════════ */
export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const containerRef   = useRef<HTMLDivElement>(null);
  const heroFogRef     = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  const { isLowPower, isMounted } = usePerformanceMode();
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, isLowPower ? -20 : -50]);
  const rightY   = useTransform(scrollYProgress, [0, 1], [0, isLowPower ? 10  :  30]);
  const fadeOut  = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* Mouse follow */
  useEffect(() => {
    if (isLowPower) return;
    const handle = (e: MouseEvent) =>
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [isLowPower]);

  /* GSAP ambient */
  useEffect(() => {
    if (!isMounted) return;
    const ctx = gsap.context(() => {
      if (!isLowPower) {
        if (ambientGlowRef.current)
          gsap.to(ambientGlowRef.current, { scale: 1.08, opacity: 0.80, duration: 7, ease: "sine.inOut", yoyo: true, repeat: -1 });
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

  const stars = useMemo(() => {
    const { starCount } = getPerformanceAdjustedParticles(isLowPower);
    return generateStars(starCount);
  }, [isLowPower]);

  const activeLanterns = getLanterns(getPerformanceAdjustedParticles(isLowPower).lanternCount);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen overflow-hidden" style={{ background: "var(--gradient-hero)" }}>

      {/* Stars */}
      <div className="absolute inset-0" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs><style>{`@keyframes star-pulse { 0%,100%{opacity:var(--op-lo)} 50%{opacity:var(--op-hi)} }`}</style></defs>
          {stars.map((s) => (
            <circle key={s.id} cx={s.x} cy={s.y} r={s.size} fill="var(--gold-primary)"
              style={{ "--op-lo": s.opacity, "--op-hi": Math.min(s.opacity * 3, 1), opacity: s.opacity,
                animation: !isLowPower && !shouldReduceMotion ? `star-pulse ${s.dur}s ${s.delay}s ease-in-out infinite` : "none",
                willChange: "opacity" } as React.CSSProperties}
            />
          ))}
        </svg>
      </div>

      {/* Ambient glow */}
      <div ref={ambientGlowRef} className="absolute left-[-10%] top-[20%] w-[500px] h-[500px] rounded-full opacity-55"
        style={{ background: "radial-gradient(circle, var(--gold-dim) 0%, transparent 70%)", filter: isLowPower ? "blur(40px)" : "blur(70px)", willChange: "transform, opacity" }}
      />

      {/* Client-only effects */}
      {!isLowPower && (
        <>
          <div className="absolute right-[-5%] top-[10%] w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, var(--accent-purple-dim) 0%, transparent 70%)", filter: "blur(70px)" }} />
          <div className="absolute right-[5%] top-[35%] w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(212,175,55,0.045) 0%, transparent 70%)", filter: "blur(55px)" }} />
          <div className="pointer-events-none absolute w-[500px] h-[500px] rounded-full hidden md:block"
            style={{ background: "radial-gradient(circle, var(--moon-subtle) 0%, transparent 70%)",
              left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`,
              transform: "translate(-50%, -50%)", transition: "left 250ms linear, top 250ms linear", willChange: "transform" }}
          />
        </>
      )}

      <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      <div className="absolute bottom-0 inset-x-0 h-40 z-[4]"
        style={{ background: "linear-gradient(to top, var(--bg-primary) 20%, transparent)" }} />

      {/* ═══ MAIN CONTENT ═══ */}
      <motion.div
        className="relative z-10 section-container min-h-auto lg:min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-24 lg:pb-[22vh]"
        style={{ y: contentY, opacity: fadeOut }}
      >
        {/* LEFT COLUMN */}
        <motion.div
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl"
          variants={containerVariants} initial="hidden" animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5">
            <div style={{ height: 1, width: 28, background: "rgba(212,175,55,0.45)" }} />
            <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase"
              style={{ fontFamily: "var(--font-arabian)", color: "var(--gold-primary)" }}>
              ✦ The Mystical Techno-Cultural Festival ✦
            </p>
            <div style={{ height: 1, width: 28, background: "rgba(212,175,55,0.45)" }} />
          </motion.div>

          <motion.h1 variants={itemVariants}
            className="text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] font-extrabold leading-[0.9] tracking-tighter"
            style={{ fontFamily: "var(--font-heading)" }}>
            <span style={{ color: "var(--text-primary)" }}>Riviera</span>
            <br />
            <span className="text-gradient-gold inline-block" style={{ textShadow: "0 0 40px rgba(212,160,23,0.25)" }}>2K26</span>
          </motion.h1>

          <motion.h2 variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl mt-4 tracking-[0.2em]"
            style={{ fontFamily: "var(--font-arabian)", color: "var(--gold-primary)" }}>
            Arabian Nights
          </motion.h2>

          <motion.div variants={itemVariants} className="relative mt-6 max-w-lg">
            <div className="absolute -inset-x-4 -inset-y-3 rounded-xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(5,5,15,0.68) 0%, rgba(5,5,15,0.35) 65%, transparent 100%)", backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)" }} />
            <p className="relative text-sm md:text-base lg:text-lg leading-relaxed"
              style={{ color: "rgba(232, 220, 198, 0.96)", textShadow: "0 1px 18px rgba(5,5,15,0.95)" }}>
              Where innovation awakens beneath the moonlight —
              a mystical fusion of culture, technology, and imagination.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8">
            <CTAButton />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-6 mt-10 pt-8"
            style={{ borderTop: "1px solid rgba(212,175,55,0.15)" }}>
            {[{ num: "3", label: "Days" }, { num: "50+", label: "Events" }, { num: "10K+", label: "Attendees" }].map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-heading)", background: "linear-gradient(135deg, #F0D078, #D4A017)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {s.num}
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase mt-0.5" style={{ color: "rgba(212,175,55,0.5)" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — Countdown Timer ── */}
        <motion.div
          className="flex flex-1 relative w-full min-h-0 lg:min-h-[400px] flex-col items-center justify-start gap-4 lg:pr-4 pt-8 lg:pt-16"
          variants={containerVariants} initial="hidden" animate="visible" style={{ y: rightY }}
        >
          {/* Magic floating dots — desktop only */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
            <MagicDots isLowPower={isLowPower} />
          </div>

          {/* ── Countdown Card ── */}
          <motion.div
            variants={cardVariants}
            className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-2xl px-6 sm:px-8 py-6 sm:py-8 overflow-hidden"
            style={{
              background: "rgba(8, 5, 22, 0.75)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(212,175,55,0.38)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 60px rgba(212,175,55,0.18), 0 0 120px rgba(212,175,55,0.06)",
            }}
          >
            {/* Top shimmer line */}
            <div className="absolute inset-x-0 top-0 h-px pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.75), transparent)" }} />
            {/* Corner glow */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(212,175,55,0.18), transparent 70%)" }} />
            {/* Bottom corner glow */}
            <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(212,175,55,0.10), transparent 70%)" }} />

            {/* Header label */}
            <div className="flex items-center gap-2 mb-6 justify-center">
              <div style={{ height: 1, width: 18, background: "rgba(212,175,55,0.45)" }} />
              <p className="text-[9px] tracking-[0.35em] uppercase"
                style={{ color: "rgba(212,175,55,0.65)", fontFamily: "var(--font-arabian)" }}>
                ✦ Countdown to Riviera ✦
              </p>
              <div style={{ height: 1, width: 18, background: "rgba(212,175,55,0.45)" }} />
            </div>

            {/* Timer */}
            <CountdownTimer />

            {/* Divider */}
            <div className="mt-6 mb-4" style={{ height: 1, background: "rgba(212,175,55,0.20)" }} />

            {/* Fest info */}
            <div className="text-center space-y-1">
              <p className="text-sm font-semibold tracking-[0.15em]"
                style={{ color: "rgba(212,175,55,0.95)", fontFamily: "var(--font-arabian)" }}>
                18 · 19 · 20 May 2026
              </p>
              <p className="text-[10px] tracking-[0.25em] uppercase"
                style={{ color: "rgba(212,175,55,0.55)", fontFamily: "var(--font-arabian)" }}>
                Haldia Institute of Technology
              </p>
            </div>
          </motion.div>

          {/* Lanterns — desktop only */}
          {isMounted && activeLanterns.map((l, i) => (
            <motion.div key={i} className="absolute z-[8] hidden lg:block" style={{ left: l.x, bottom: "30%" }}
              animate={!shouldReduceMotion ? { y: [0, -10, 0] } : {}}
              transition={{ duration: l.dur, repeat: Infinity, delay: l.delay, ease: "easeInOut" }}>
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-px h-5"
                style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.25), rgba(212,175,55,0.55))" }} />
              <div className="rounded-full" style={{
                width: l.size, height: l.size * 1.4,
                background: "radial-gradient(ellipse, #FFC857 0%, var(--gold-primary) 52%, rgba(212,160,23,0.08) 100%)",
                boxShadow: "0 0 24px rgba(212,160,23,0.52), 0 0 48px rgba(212,160,23,0.16)", willChange: "transform",
              }} />
            </motion.div>
          ))}

          {/* Fog — desktop only */}
          <div ref={heroFogRef} className="absolute bottom-[10%] right-0 w-[120%] h-[40%] hidden lg:block">
            <div className="w-full h-full" style={{
              background: "radial-gradient(ellipse at 50% 80%, var(--accent-purple-subtle) 0%, transparent 70%)",
              filter: isLowPower ? "blur(30px)" : "blur(50px)",
            }} />
          </div>

          {/* Embers — desktop only */}
          {(() => {
            const { shouldRenderEmitters, emberCount } = getPerformanceAdjustedParticles(isLowPower);
            if (!shouldRenderEmitters || shouldReduceMotion) return null;
            return generateEmbers(emberCount).map((ember) => (
              <motion.div key={ember.id} className="absolute rounded-full z-[6] hidden lg:block"
                style={{ width: 3, height: 3, background: "var(--gold-light)", right: `${ember.right}%`, bottom: `${ember.bottom}%`, willChange: "transform, opacity" }}
                animate={{ y: [0, -70], opacity: [0, 0.8, 0] }}
                transition={{ duration: ember.duration, repeat: Infinity, delay: ember.delay }}
              />
            ));
          })()}
        </motion.div>
      </motion.div>

      {/* HIT Building */}
      <motion.div className="absolute left-0 right-0 w-full z-[3] pointer-events-none" style={{ bottom: "2%" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}>
        <div className="absolute inset-x-0 bottom-0 h-[60%] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(212,175,55,0.07) 0%, transparent 70%)" }} />
        <HITBuilding />
      </motion.div>
    </section>
  );
}