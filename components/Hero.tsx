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
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">

      {/* 🔴 Mouse Glow (Now More Visible) */}
      <div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full bg-red-600/30 blur-[150px] transition-all duration-200 z-0"
        style={{
          left: position.x - 300,
          top: position.y - 300,
        }}
      />

      {/* 🔲 Tech Grid (More Visible) */}
      <div className="absolute inset-0 z-0 opacity-30 bg-[linear-gradient(rgba(255,0,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.15)_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* 🔥 Center Glow Core */}
      <div className="absolute w-[400px] h-[400px] bg-red-600/20 rounded-full blur-[120px] z-0" />

      {/* ✨ Floating Particles */}
      <div className="absolute top-20 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping z-0" />
      <div className="absolute bottom-24 right-1/4 w-3 h-3 bg-red-500 rounded-full animate-ping delay-300 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight">
          Riviera{" "}
          <span className="text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.9)]">
            2026
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-zinc-400 leading-relaxed">
          The Ultimate Tech & Cultural Fest.
          Where innovation meets creativity.
        </p>

        <div className="mt-10 flex justify-center">
          <button className="group px-10 py-4 rounded-full text-lg font-semibold bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-[0_0_60px_rgba(239,68,68,0.6)] flex items-center gap-3">
            Explore Events
            <ArrowRight className="group-hover:translate-x-1 transition" size={20} />
          </button>
        </div>

      </div>
    </section>
  );
}
