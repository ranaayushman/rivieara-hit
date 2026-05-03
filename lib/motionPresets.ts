/**
 * Centralized Framer Motion presets for the Arabian Nights theme.
 * Import these everywhere to ensure consistent, globally-tunable animation.
 */

/* ================================================================== */
/*  EASING CURVES                                                      */
/* ================================================================== */

export const easing = {
  expoOut:   [0.16, 1, 0.3, 1]   as [number, number, number, number],
  spring:    [0.22, 1, 0.36, 1]   as [number, number, number, number],
  cinematic: [0.4, 0, 0, 1]       as [number, number, number, number],
  smooth:    [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  dramatic:  [0.6, 0, 0.2, 1]     as [number, number, number, number],
};

/* ================================================================== */
/*  TIMING                                                             */
/* ================================================================== */

export const duration = {
  fast:     0.2,
  base:     0.35,
  medium:   0.5,
  slow:     0.7,
  slower:   1.0,
  cinematic: 1.2,
};

export const stagger = {
  fast:   0.05,
  base:   0.08,
  medium: 0.12,
  slow:   0.18,
};

/* ================================================================== */
/*  REUSABLE MOTION VARIANTS                                           */
/* ================================================================== */

/** Fade up from below — the bread-and-butter entrance */
export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: easing.expoOut } },
};

/** Fade up with blur — cinematic reveal */
export const fadeUpBlur = {
  hidden:  { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: duration.slow, ease: easing.expoOut } },
};

/** Cinematic reveal — scale + fade + blur */
export const cinematicReveal = {
  hidden:  { opacity: 0, scale: 0.95, filter: "blur(8px)" },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: duration.cinematic, ease: easing.cinematic },
  },
};

/** Glow reveal — fade in with glow ramp */
export const glowReveal = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: duration.medium, ease: easing.expoOut },
  },
};

/** Stagger container — wraps children that use fadeUp variants */
export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: stagger.base,
      delayChildren: 0.1,
    },
  },
};

/** Stagger container (slow) */
export const staggerContainerSlow = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: stagger.slow,
      delayChildren: 0.2,
    },
  },
};

/** Floating idle animation for decorative elements */
export const floatingMotion = {
  y: [-6, 6, -6],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

/** Slow rotation for decorative rings / patterns */
export const spinSlow = {
  rotate: 360,
  transition: {
    duration: 30,
    repeat: Infinity,
    ease: "linear" as const,
  },
};

/* ================================================================== */
/*  HOVER PRESETS                                                      */
/* ================================================================== */

export const hoverLift = {
  y: -6,
  scale: 1.02,
  transition: { duration: duration.base, ease: easing.spring },
};

export const hoverGlow = {
  scale: 1.03,
  transition: { duration: duration.base, ease: easing.spring },
};

export const hoverMagnetic = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 20 },
};

/* ================================================================== */
/*  TAP PRESETS                                                        */
/* ================================================================== */

export const tapShrink = {
  scale: 0.97,
};

/* ================================================================== */
/*  PAGE / SECTION TRANSITIONS                                         */
/* ================================================================== */

export const pageTransition = {
  initial:  { opacity: 0 },
  animate:  { opacity: 1, transition: { duration: duration.medium, ease: easing.cinematic } },
  exit:     { opacity: 0, transition: { duration: duration.fast, ease: easing.smooth } },
};

export const sectionEntrance = {
  hidden:  { opacity: 0, y: 50 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: duration.slow, ease: easing.expoOut },
  },
};

/* ================================================================== */
/*  CARD INTERACTION                                                   */
/* ================================================================== */

export const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.medium,
      delay: i * stagger.base,
      ease: easing.expoOut,
    },
  }),
};

/* ================================================================== */
/*  TEXT ANIMATION                                                     */
/* ================================================================== */

export const textReveal = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.medium,
      delay: i * 0.06,
      ease: easing.expoOut,
    },
  }),
};

export const shimmerText = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "linear" as const,
    },
  },
};

/* ================================================================== */
/*  VIEWPORT CONFIG                                                    */
/* ================================================================== */

export const viewport = {
  once: true,
  margin: "-80px" as const,
};

export const viewportTight = {
  once: true,
  margin: "-40px" as const,
};

/* ================================================================== */
/*  HERO CINEMATIC PRESETS                                              */
/* ================================================================== */

/** Lantern floating — warm idle drift for floating elements */
export const lanternFloat = {
  y: [-8, 8, -8],
  x: [-3, 3, -3],
  transition: {
    duration: 7,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

/** Glow pulse — breathing aura effect */
export const glowPulse = {
  opacity: [0.5, 1, 0.5],
  scale: [1, 1.05, 1],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

/** Magical hover — levitation + glow bloom */
export const magicalHover = {
  y: -8,
  scale: 1.04,
  transition: { type: "spring", stiffness: 300, damping: 15 },
};

/** Cinematic intro — blur-to-clear text entrance */
export const cinematicIntro = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      delay: i * 0.4 + 0.3,
      ease: easing.cinematic,
    },
  }),
};

/** Shimmer sweep — for button background animations */
export const shimmerSweep = {
  x: ["-100%", "100%"],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatDelay: 3,
    ease: "easeInOut" as const,
  },
};

/** Aura expand — hover glow bloom for cards and buttons */
export const auraExpand = {
  scale: 1.06,
  boxShadow: "0 0 60px rgba(212, 160, 23, 0.25), 0 0 120px rgba(212, 160, 23, 0.08)",
  transition: { duration: duration.medium, ease: easing.spring },
};

/** Levitation motion — smooth cinematic float-up */
export const levitationMotion = {
  y: -10,
  scale: 1.03,
  transition: { type: "spring", stiffness: 200, damping: 15 },
};

/** Floating motion (slow) — for decorative background elements */
export const floatingMotionSlow = {
  y: [-4, 4, -4],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

/** Stagger container (cinematic) — slower, more dramatic timing */
export const staggerContainerCinematic = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.slow,
      delayChildren: 0.3,
    },
  },
};

/** Carousel card variants — 3D depth transitions for event carousel */
export const carouselCard = {
  center: {
    x: "0%",
    scale: 1,
    rotateY: 0,
    opacity: 1,
    zIndex: 30,
    filter: "blur(0px) brightness(1)",
    transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] as readonly number[] },
  },
  left: {
    x: "-50%",
    scale: 0.82,
    rotateY: 20,
    opacity: 0.5,
    zIndex: 10,
    filter: "blur(2px) brightness(0.7)",
    transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] as readonly number[] },
  },
  right: {
    x: "50%",
    scale: 0.82,
    rotateY: -20,
    opacity: 0.5,
    zIndex: 10,
    filter: "blur(2px) brightness(0.7)",
    transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] as readonly number[] },
  },
};

/** Navbar glass transition — morphs from transparent to glass */
export const navbarGlass = {
  transparent: {
    backdropFilter: "blur(8px)",
    background: "rgba(5, 5, 5, 0.2)",
  },
  glass: {
    backdropFilter: "blur(24px)",
    background: "var(--surface-glass)",
  },
};

