"use client";

import { useEffect, useRef } from "react";

/**
 * Floating gold particles — ambient atmosphere layer.
 * Creates drifting embers that float upward across the viewport.
 * Uses canvas for GPU performance.
 */
export default function ParticleLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
        size: Math.random() * 2.5 + 0.5,
        speedY: -(Math.random() * 0.5 + 0.15),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: 0,
        life: 0,
        maxLife: Math.random() * 400 + 300,
      };
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles slowly
      if (particles.length < 40 && Math.random() < 0.05) {
        particles.push(createParticle());
      }

      particles = particles.filter((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        // Fade in and out
        const progress = p.life / p.maxLife;
        if (progress < 0.1) {
          p.opacity = progress / 0.1;
        } else if (progress > 0.8) {
          p.opacity = (1 - progress) / 0.2;
        }

        const computedOpacity = getComputedStyle(document.documentElement)
          .getPropertyValue("--particle-opacity").trim();
        const baseOpacity = computedOpacity ? parseFloat(computedOpacity) : 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 160, 23, ${p.opacity * baseOpacity * 0.5})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 160, 23, ${p.opacity * baseOpacity * 0.1})`;
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
