/**
 * GSAP Cinematic Presets — Jujutsu Kaisen Culling Games Animation System
 *
 * This file houses all GSAP-specific utilities:
 *   • Hero intro timeline choreography
 *   • ScrollTrigger parallax helpers
 *   • Ambient world animation helpers
 *   • Cursor GSAP smoothing utilities
 *
 * ⚠️  RULE: GSAP owns section-level & world-level animations.
 *     Framer Motion owns component-level interactions.
 *     Never animate the same property with both on the same element.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ── Register plugins once ────────────────────────────────────────────────────
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ================================================================== */
/*  EASING STRINGS (GSAP format)                                       */
/* ================================================================== */

export const gsapEase = {
  cinematic: "power4.out",
  smooth:    "power2.inOut",
  expo:      "expo.out",
  elastic:   "elastic.out(1, 0.5)",
  gentle:    "sine.inOut",
  drift:     "sine.out",
};

/* ================================================================== */
/*  HERO CINEMATIC INTRO TIMELINE                                       */
/* ================================================================== */

/**
 * Build the cinematic opening timeline for the hero section.
 * Call this once on mount inside the Hero component.
 *
 * Sequence:
 *  t=0.0s  Fog layers fade in
 *  t=0.4s  Moon glow emerges
 *  t=0.8s  Lanterns ignite
 *  t=1.2s  Particles start drifting (opacity ramp)
 *  t=1.8s  Narrative text begins sequencing (handled by Framer)
 *  t=4.0s  Main title reveal (handled by Framer)
 */
export function buildHeroTimeline(refs: {
  fog?: HTMLElement | null;
  moon?: HTMLElement | null;
  lanterns?: (HTMLElement | null)[];
  particleCanvas?: HTMLElement | null;
  palace?: HTMLElement | null;
}) {
  const tl = gsap.timeline({ defaults: { ease: gsapEase.cinematic } });

  if (refs.fog) {
    tl.fromTo(
      refs.fog,
      { opacity: 0 },
      { opacity: 1, duration: 2.5 },
      0
    );
  }

  if (refs.moon) {
    tl.fromTo(
      refs.moon,
      { opacity: 0, scale: 0.85, filter: "blur(20px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2.2, ease: gsapEase.smooth },
      0.4
    );
  }

  if (refs.palace) {
    tl.fromTo(
      refs.palace,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 2.8, ease: gsapEase.cinematic },
      0.2
    );
  }

  if (refs.lanterns && refs.lanterns.length > 0) {
    refs.lanterns.forEach((el, i) => {
      if (el) {
        tl.fromTo(
          el,
          { opacity: 0, scale: 0.3, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: gsapEase.elastic },
          0.8 + i * 0.18
        );
      }
    });
  }

  if (refs.particleCanvas) {
    tl.fromTo(
      refs.particleCanvas,
      { opacity: 0 },
      { opacity: 1, duration: 3 },
      1.2
    );
  }

  return tl;
}

/* ================================================================== */
/*  LANTERN FLOATING LOOPS (GSAP infinite)                             */
/* ================================================================== */

/**
 * Attach a natural infinite floating loop to a lantern element.
 * Randomised sway + drift creates organic variety across multiple lanterns.
 */
export function attachLanternFloat(
  el: HTMLElement,
  options: {
    swayX?: number;
    riseY?: number;
    duration?: number;
    delay?: number;
  } = {}
) {
  const { swayX = 12, riseY = 15, duration = 7, delay = 0 } = options;

  // Vertical float
  gsap.to(el, {
    y: `-=${riseY}`,
    duration,
    ease: gsapEase.gentle,
    yoyo: true,
    repeat: -1,
    delay,
  });

  // Horizontal sway (slightly different timing = Lissajous-like path)
  gsap.to(el, {
    x: `+=${swayX}`,
    duration: duration * 1.37,
    ease: gsapEase.gentle,
    yoyo: true,
    repeat: -1,
    delay: delay + 0.5,
  });

  // Glow pulse on the inner light element
  const glow = el.querySelector(".lantern-glow") as HTMLElement | null;
  if (glow) {
    gsap.to(glow, {
      opacity: 0.5,
      scale: 1.2,
      duration: duration * 0.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay,
    });
  }
}

/* ================================================================== */
/*  MOON AMBIENT PULSE                                                 */
/* ================================================================== */

export function attachMoonPulse(el: HTMLElement) {
  // Outer aura breathing
  gsap.to(el, {
    scale: 1.06,
    opacity: 0.85,
    duration: 4,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}

/* ================================================================== */
/*  SCROLL PARALLAX HELPER                                             */
/* ================================================================== */

/**
 * Attach a smooth parallax effect to an element using ScrollTrigger.
 * 'speed' controls how fast the element moves relative to scroll:
 *   speed > 1 = foreground (moves faster)
 *   speed < 1 = background (moves slower)
 */
export function attachParallax(
  el: HTMLElement,
  trigger: HTMLElement | string,
  speed = 0.5
) {
  ScrollTrigger.create({
    trigger,
    start: "top top",
    end: "bottom top",
    onUpdate: (self) => {
      gsap.set(el, {
        y: self.progress * 100 * speed,
        force3D: true,
      });
    },
  });
}

/* ================================================================== */
/*  SECTION REVEAL WITH SCROLL TRIGGER                                 */
/* ================================================================== */

/**
 * Attach a cinematic ScrollTrigger reveal to a section or element.
 * Children with [data-reveal] class will stagger-animate on entry.
 */
export function attachSectionReveal(
  container: HTMLElement,
  options: {
    stagger?: number;
    duration?: number;
    fromY?: number;
    blur?: boolean;
    once?: boolean;
  } = {}
) {
  const {
    stagger = 0.1,
    duration = 0.8,
    fromY = 50,
    blur = false,
    once = true,
  } = options;

  const children = container.querySelectorAll("[data-reveal]");
  if (!children.length) return;

  gsap.set(children, {
    opacity: 0,
    y: fromY,
    ...(blur ? { filter: "blur(12px)" } : {}),
  });

  ScrollTrigger.create({
    trigger: container,
    start: "top 85%",
    once,
    onEnter: () => {
      gsap.to(children, {
        opacity: 1,
        y: 0,
        ...(blur ? { filter: "blur(0px)" } : {}),
        duration,
        stagger,
        ease: gsapEase.cinematic,
      });
    },
  });
}

/* ================================================================== */
/*  SCROLL-DRIVEN GLOW INTENSITY                                       */
/* ================================================================== */

/**
 * Modulate glow CSS custom property based on scroll progress.
 * Creates ambient lighting shifts as user scrolls through the page.
 */
export function attachScrollGlow(trigger: HTMLElement) {
  ScrollTrigger.create({
    trigger,
    start: "top center",
    end: "bottom center",
    onUpdate: (self) => {
      const intensity = 0.7 + Math.sin(self.progress * Math.PI) * 0.6;
      document.documentElement.style.setProperty("--glow-intensity", String(intensity.toFixed(2)));
    },
  });
}

/* ================================================================== */
/*  CURSOR SMOOTH INTERPOLATION                                        */
/* ================================================================== */

/**
 * GSAP-powered smooth cursor following.
 * Returns a cleanup function to remove listeners.
 */
export function initGsapCursor(elements: {
  core: HTMLElement;
  aura: HTMLElement;
  trail?: HTMLElement[];
}) {
  let mouseX = -200, mouseY = -200;
  let coreX = -200, coreY = -200;
  let auraX = -200, auraY = -200;
  let raf: number;

  const handleMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  window.addEventListener("mousemove", handleMove, { passive: true });

  function tick() {
    // Core follows cursor tightly
    coreX += (mouseX - coreX) * 0.25;
    coreY += (mouseY - coreY) * 0.25;

    // Aura follows more lazily (cinematic lag)
    auraX += (mouseX - auraX) * 0.08;
    auraY += (mouseY - auraY) * 0.08;

    gsap.set(elements.core, { x: coreX - 3, y: coreY - 3, force3D: true });
    gsap.set(elements.aura, { x: auraX - 175, y: auraY - 175, force3D: true });

    raf = requestAnimationFrame(tick);
  }

  tick();

  return () => {
    window.removeEventListener("mousemove", handleMove);
    cancelAnimationFrame(raf);
  };
}

/* ================================================================== */
/*  FOG DRIFT ANIMATION                                                */
/* ================================================================== */

/**
 * Animate fog blob elements with organic GSAP keyframe motion.
 * More natural than pure CSS animation.
 */
export function animateFogBlob(
  el: HTMLElement,
  options: {
    duration?: number;
    delay?: number;
    xRange?: number;
    yRange?: number;
  } = {}
) {
  const { duration = 20, delay = 0, xRange = 5, yRange = 3 } = options;

  gsap.to(el, {
    x: `+=${xRange}%`,
    y: `+=${yRange}%`,
    duration,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay,
    force3D: true,
  });
}

/* ================================================================== */
/*  AMBIENT GLOW BREATHING                                             */
/* ================================================================== */

export function attachGlowBreathing(el: HTMLElement, duration = 4) {
  gsap.to(el, {
    opacity: 0.8,
    scale: 1.08,
    duration,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}

/* ================================================================== */
/*  KILL ALL SCROLL TRIGGERS (cleanup on unmount)                      */
/* ================================================================== */

export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}
