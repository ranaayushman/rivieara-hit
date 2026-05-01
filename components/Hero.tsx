"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen pt-24 flex items-center justify-center bg-black text-white overflow-hidden">

      {/* 🔴 Mouse Glow (Optimized with transform for smooth 60fps) */}
      <div
        className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-red-600/20 blur-[150px] transition-transform duration-75 ease-out z-0"
        style={{
          transform: `translate(${position.x - 300}px, ${position.y - 300}px)`,
        }}
      />

      {/* 🔲 Tech Grid (Faded at edges with a radial mask for depth) */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[linear-gradient(rgba(255,0,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.15)_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)]" />

      {/* 🔥 Center Glow Core */}
      <div className="absolute w-[400px] h-[400px] bg-red-600/20 rounded-full blur-[120px] z-0" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
        
        {/* Optional Status Badge for a pro feel */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 text-red-200 text-sm font-medium backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Registrations Now Open
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight">
          Riviera{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]">
            2026
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          The Ultimate Tech & Cultural Fest. <br className="hidden md:block" />
          Where <span className="text-zinc-200 font-medium">innovation</span> meets <span className="text-zinc-200 font-medium">creativity</span>.
        </p>

        <div className="mt-10 flex justify-center">
          <button className="group px-10 py-4 rounded-full text-lg font-semibold bg-red-600 text-white hover:bg-red-500 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(239,68,68,0.5)] flex items-center gap-3">
            Explore Events
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </div>

      </div>
    </section>
  );
}