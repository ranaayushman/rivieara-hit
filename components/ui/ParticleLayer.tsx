"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

/**
 * Floating gold particles — ambient atmosphere layer.
 * Uses canvas for GPU performance, with GSAP for ambient glow breathing.
 * Implements mobile-first performance reduction.
 */
export default function ParticleLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isLowPower, isMounted } = usePerformanceMode();

  useEffect(() => {
    if (!isMounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Only apply heavy GSAP canvas breathing if NOT in low power mode
    let ctxGsap: gsap.Context | undefined;
    if (!isLowPower) {
      ctxGsap = gsap.context(() => {
        gsap.to(canvas, {
          opacity: 0.8,
          duration: 3.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    }

    let animationId: number;
    let particles: Particle[] = [];
    const targetParticleCount = isLowPower ? 12 : 120; // Massive reduction for mobile
    const spawnRate = isLowPower ? 0.05 : 0.15; // Slower spawning

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
        size: isLowPower ? Math.random() * 1.5 + 0.5 : Math.random() * 2.5 + 0.8,
        speedY: -(Math.random() * 0.8 + 0.2), 
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

      if (particles.length < targetParticleCount && Math.random() < spawnRate) {
        particles.push(createParticle());
      }

      particles = particles.filter((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        if (!isLowPower) {
          p.x += Math.sin(p.life * 0.02) * 0.2;
        }

        const progress = p.life / p.maxLife;
        if (progress < 0.1) {
          p.opacity = progress / 0.1;
        } else if (progress > 0.8) {
          p.opacity = (1 - progress) / 0.2;
        }

        const currentGlow = isLowPower ? 1 : Math.abs(Math.sin(p.life * p.glowSpeed)) * p.glowIntensity;
        const computedOpacity = getComputedStyle(document.documentElement).getPropertyValue("--particle-opacity").trim();
        const baseOpacity = computedOpacity ? parseFloat(computedOpacity) : 0.6;
        const finalOpacity = p.opacity * baseOpacity;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${finalOpacity * 0.8})`; 
        ctx.fill();

        if (!isLowPower) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (3 + currentGlow * 2), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 160, 23, ${finalOpacity * 0.15 * currentGlow})`;
          ctx.fill();
        }

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
      ctxGsap?.revert();
    };
  }, [isLowPower, isMounted]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[2]"
      aria-hidden="true"
      style={{ opacity: "var(--particle-opacity, 0.6)" }}
    />
  );
}
