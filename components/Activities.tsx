"use client";

import { useEffect, useState, useMemo } from "react";
import { Code, Music, Gamepad2, Cpu, Palette, Trophy, Camera, BookOpen, Mic2, Rocket, Globe, Lightbulb, Sparkles, type LucideIcon } from "lucide-react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { generateStars, generateEmbers, getPerformanceAdjustedParticles } from "@/lib/particleAnimations";

const iconMap: Record<string, LucideIcon> = {
  Code, Music, Gamepad2, Cpu, Palette, Trophy, Camera, BookOpen, Mic2, Rocket, Globe, Lightbulb,
};

const activities = [
  { title: "Hackathon", desc: "A 24-hour techno-alchemist trial. Bend the rules of logic and forge the future.", iconName: "Code" },
  { title: "Cultural Night", desc: "A royal celebration of rhythm and light. Experience breathtaking performances.", iconName: "Music" },
  { title: "Gaming Arena", desc: "Celestial battlegrounds await. Prove your supremacy in the digital colosseum.", iconName: "Gamepad2" },
  { title: "Tech Expo", desc: "A grand chamber of futuristic relics and visionary student innovations.", iconName: "Cpu" },
];

const getRealmType = (title: string, icon: string) => {
  const text = (title + icon).toLowerCase();
  if (text.includes("hack") || text.includes("code") || text.includes("cpu")) return "tech";
  if (text.includes("cultur") || text.includes("music") || text.includes("art")) return "cultural";
  if (text.includes("game") || text.includes("arena") || text.includes("trophy")) return "gaming";
  return "expo";
};

// Extremely Premium Atmospheric Backgrounds for the Portals (Fully Static)
const RealmAtmosphere = ({ type, isLowPower }: { type: string, isLowPower?: boolean }) => {
  if (isLowPower) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit] z-0">
      {type === "tech" && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(100,200,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(100,200,255,0.15)_1px,transparent_1px)] bg-[size:15px_15px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom" />
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[rgba(0,100,150,0.5)] to-transparent" />
        </div>
      )}
      {type === "cultural" && (
        <div className="absolute inset-0 opacity-30 mix-blend-screen">
          <div className="absolute bottom-10 left-[20%] w-32 h-32 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,100,0,0.5) 0%, transparent 70%)" }} />
          <div className="absolute bottom-20 right-[20%] w-24 h-24 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,200,0,0.4) 0%, transparent 70%)" }} />
        </div>
      )}
      {type === "gaming" && (
        <div className="absolute inset-0 opacity-30 mix-blend-screen">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] border-[8px] border-[rgba(200,50,50,0.05)] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-4 border-[rgba(150,0,255,0.08)] rounded-full" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-[radial-gradient(ellipse_at_bottom,rgba(200,50,50,0.4)_0%,transparent_70%)]" />
        </div>
      )}
      {type === "expo" && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-20 h-20 border-2 border-[rgba(212,160,23,0.3)] rotate-45" />
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-20 h-20 border-2 border-[rgba(212,160,23,0.1)] rotate-0" />
          <div className="absolute bottom-0 inset-x-0 h-full bg-gradient-to-t from-[rgba(212,160,23,0.15)] to-transparent mix-blend-overlay" />
        </div>
      )}
    </div>
  );
};

export default function Activities() {


  const { isLowPower } = usePerformanceMode();

  // ── PARTICLES ──
  const stars = useMemo(
    () => {
      const { starCount } = getPerformanceAdjustedParticles(isLowPower);
      return generateStars(starCount);
    },
    [isLowPower]
  );

  const embers = useMemo(
    () => {
      const { emberCount } = getPerformanceAdjustedParticles(isLowPower);
      return generateEmbers(emberCount);
    },
    [isLowPower]
  );

  return (
    <section
      id="activities"
      className="relative min-h-screen overflow-hidden py-24 sm:py-32 flex flex-col items-center"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(circle at center, var(--bg-deep) 0%, var(--bg-primary) 100%)" }} />
      
      {/* Deep Magical Aura Orbs - Fully Static */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none z-0" style={{ background: "radial-gradient(circle, var(--moon-glow) 0%, transparent 60%)" }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none z-0" style={{ background: "radial-gradient(circle, var(--gold-glow) 0%, transparent 60%)" }} />

      {/* Constellation SVG Network (Static) */}
      <svg className="absolute inset-0 w-full h-[150%] pointer-events-none z-0 opacity-50" preserveAspectRatio="none" viewBox="0 0 1000 1000">
        <path d="M50 150 L250 100 L450 350 L750 200 L950 550 L650 750 L150 650 Z" stroke="rgba(212,160,23,0.2)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M250 100 L150 650" stroke="rgba(212,160,23,0.2)" strokeWidth="1" fill="none" />
        <path d="M450 350 L950 550" stroke="rgba(212,160,23,0.2)" strokeWidth="1" fill="none" />
        {[ [50,150], [250,100], [450,350], [750,200], [950,550], [650,750], [150,650], [350,150], [650,450], [250,550] ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="var(--gold-primary)" />
        ))}
      </svg>

      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none mix-blend-overlay bg-noise" />
      <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--surface-glass) 100%)" }} />

      {/* ── PARTICLE LAYERS ── */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {/* Stars */}
        {stars.map((s) => (
          <div
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
          />
        ))}

        {/* Embers */}
        {embers.map((ember) => (
          <div
            key={ember.id}
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              background: "var(--gold-light)",
              right: `${ember.right}%`,
              bottom: `${ember.bottom}%`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* ================= LUXURY HEADING ================= */}
      <div className="relative z-30 text-center mb-20 md:mb-32 px-4 w-full">
        <p
          className="text-xs md:text-sm tracking-[0.5em] uppercase mb-4 font-semibold text-[var(--gold-primary)]"
          style={{ fontFamily: "var(--font-arabian)" }}
        >
          ✦ Enchanted Realms ✦
        </p>
        
        <div className="">
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight relative z-10"
            style={{ 
              fontFamily: "var(--font-heading)", 
              color: "var(--text-primary)", 
              textShadow: "0 0 50px rgba(212,160,23,0.5), 0 5px 15px rgba(0,0,0,0.9)" 
            }}
          >
            Fest Activities
          </h2>
        </div>

        <p
          className="mt-8 text-sm md:text-base text-[var(--gold-dim)] max-w-2xl mx-auto font-light leading-relaxed"
        >
          Discover the magical worlds hidden within Riviera. 
          Each realm offers a unique trial of skill, creativity, and destiny.
        </p>
      </div>

      {/* ================= PORTAL WINDOWS GALLERY ================= */}
      <div className="relative z-30 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {activities.map((activity, index) => {
            const Icon = iconMap[activity.iconName] || Code;
            const realmType = getRealmType(activity.title, activity.iconName);
            
            // Create a majestic undulating wave layout using Y translations
            const layoutOffsets = ["lg:translate-y-0", "lg:translate-y-16", "lg:translate-y-8", "lg:translate-y-24"];
            const layoutOffset = layoutOffsets[index % 4];

            return (
              <div key={index} className={`portal-card relative w-full ${layoutOffset}`}>
                <div
                  className="group relative overflow-hidden w-full flex flex-col items-center text-center"
                  style={{
                    // Arabian Palace Arch Window Silhouette
                    borderRadius: "140px 140px 24px 24px",
                    background: "var(--gradient-card)",
                    border: "1px solid var(--border-gold)",
                    borderTop: "2px solid var(--gold-primary)",
                    borderBottom: "8px solid var(--gold-deep)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,0,0,0.4)",
                    transformStyle: "preserve-3d",
                    padding: "50px 24px 40px 24px",
                    minHeight: "480px" // Tall elegant portals
                  }}
                >
                  {/* === Inner Arch Decor === */}
                  <div className="absolute inset-[12px] border border-[rgba(212,160,23,0.15)] rounded-[130px_130px_16px_16px] pointer-events-none z-10" />
                  <div className="absolute inset-[24px] border border-[rgba(212,160,23,0.08)] rounded-[120px_120px_12px_12px] pointer-events-none bg-pattern-arabian opacity-10 mix-blend-overlay" />
                  
                  {/* Dynamic Realm Atmosphere Background */}
                  <RealmAtmosphere type={realmType} isLowPower={isLowPower} />

                  {/* === Content (Popping out in 3D) === */}
                  <div className="relative z-20 flex flex-col h-full items-center w-full" style={{ transform: "translateZ(30px)" }}>
                    
                    {/* Keystone Medallion Icon */}
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8 relative">
                       {/* Static Magic Ring */}
                       <div className="absolute inset-[-6px] border-[2px] border-dashed border-[rgba(212,160,23,0.4)] rounded-full" />
                       <div className="absolute inset-[-12px] border border-[rgba(212,160,23,0.1)] rounded-full" />
                       
                       {/* Core Plate */}
                       <div className="absolute inset-0 bg-[var(--surface-primary)] rounded-full border-2 border-[var(--gold-primary)] shadow-[0_0_20px_var(--gold-glow)]" />
                       
                       <Icon 
                          size={32} 
                          className="text-[var(--gold-primary)] relative z-10 drop-shadow-[0_0_15px_rgba(212,160,23,0.9)]" 
                        />
                    </div>

                    {/* Cinematic Title */}
                    <h3 
                      className="text-2xl lg:text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 tracking-wide drop-shadow-md" 
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {activity.title}
                    </h3>
                    
                    {/* Elegant Divider */}
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[rgba(212,160,23,0.6)] to-transparent mb-5" />

                    {/* Atmospheric Description */}
                    <p className="text-gray-400 text-sm md:text-sm leading-relaxed font-light opacity-90 flex-grow">
                      {activity.desc}
                    </p>

                    {/* Magical Indicator Accents */}
                    <div className="mt-8 pt-6 w-full flex items-center justify-center border-t border-[rgba(212,160,23,0.15)] relative overflow-hidden">
                      <button className="flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[var(--gold-dim)]">
                        <Sparkles size={14} className="opacity-50" />
                        Unlock Portal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
