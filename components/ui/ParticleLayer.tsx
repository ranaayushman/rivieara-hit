"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Floating gold particles — ambient atmosphere layer.
 * Creates drifting embers that float upward across the viewport.
 * Uses canvas for GPU performance, with GSAP for ambient glow breathing.
 */
export default function ParticleLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // GSAP glow breathing for the entire canvas
    const ctxGsap = gsap.context(() => {
      gsap.to(canvas, {
        opacity: 0.8,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    let animationId: number;
    let particles: Particle[] = [];

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      life: number;
      maxLife: number;
      glowIntensity: number;
      glowSpeed: number;
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * (canvas?.width || window.innerWidth),
        y: (canvas?.height || window.innerHeight) + 20,
        size: Math.random() * 2.5 + 0.8,
        speedY: -(Math.random() * 0.8 + 0.2), // slightly faster
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: 0,
        life: 0,
        maxLife: Math.random() * 500 + 300,
        glowIntensity: Math.random() * 0.5 + 0.5,
        glowSpeed: Math.random() * 0.05 + 0.02,
      };
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Denser ember system
      if (particles.length < 120 && Math.random() < 0.15) {
        particles.push(createParticle());
      }

      particles = particles.filter((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        // Add subtle sine wave to X for natural drift
        p.x += Math.sin(p.life * 0.02) * 0.2;

        // Fade in and out
        const progress = p.life / p.maxLife;
        if (progress < 0.1) {
          p.opacity = progress / 0.1;
        } else if (progress > 0.8) {
          p.opacity = (1 - progress) / 0.2;
        }

        // Individual glow breathing
        const currentGlow = Math.abs(Math.sin(p.life * p.glowSpeed)) * p.glowIntensity;

        const computedOpacity = getComputedStyle(document.documentElement)
          .getPropertyValue("--particle-opacity").trim();
        const baseOpacity = computedOpacity ? parseFloat(computedOpacity) : 0.6;

        const finalOpacity = p.opacity * baseOpacity;

        // Core particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${finalOpacity * 0.8})`; // brighter core
        ctx.fill();

        // Dynamic Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (3 + currentGlow * 2), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 160, 23, ${finalOpacity * 0.15 * currentGlow})`;
        ctx.fill();

        return p.life < p.maxLife;
      });

      animationId = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
      ctxGsap.revert();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[2]"
      aria-hidden="true"
      style={{ opacity: "var(--particle-opacity, 0.6)" }}
    />
  );
}
