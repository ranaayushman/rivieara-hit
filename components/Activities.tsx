"use client";

import { useEffect, useState, useRef } from "react";
import { Code, Music, Gamepad2, Cpu, Palette, Trophy, Camera, BookOpen, Mic2, Rocket, Globe, Lightbulb, Sparkles, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ActivityItem {
  title: string;
  desc: string;
  iconName: string;
}

const iconMap: Record<string, LucideIcon> = {
  Code, Music, Gamepad2, Cpu, Palette, Trophy, Camera, BookOpen, Mic2, Rocket, Globe, Lightbulb,
};

const fallbackActivities: ActivityItem[] = [
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

// Extremely Premium Atmospheric Backgrounds for the Portals
const RealmAtmosphere = ({ type }: { type: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit] z-0">
      {type === "tech" && (
        <div className="absolute inset-0 opacity-20 group-hover:opacity-60 transition-opacity duration-700">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(100,200,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(100,200,255,0.15)_1px,transparent_1px)] bg-[size:15px_15px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom animate-[tech-scroll_8s_linear_infinite]" />
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[rgba(0,100,150,0.5)] to-transparent" />
        </div>
      )}
      {type === "cultural" && (
        <div className="absolute inset-0 opacity-30 group-hover:opacity-80 transition-opacity duration-700 mix-blend-screen">
          <div className="absolute bottom-0 left-[20%] w-24 h-24 bg-[rgba(255,100,0,0.5)] rounded-full blur-[30px] animate-[float-up_4s_ease-in_infinite]" />
          <div className="absolute bottom-0 right-[20%] w-16 h-16 bg-[rgba(255,200,0,0.4)] rounded-full blur-[20px] animate-[float-up_5s_ease-in_infinite_1s]" />
        </div>
      )}
      {type === "gaming" && (
        <div className="absolute inset-0 opacity-30 group-hover:opacity-70 transition-opacity duration-700 mix-blend-screen">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] border-[8px] border-[rgba(200,50,50,0.05)] rounded-full animate-[spin-slow_12s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-4 border-[rgba(150,0,255,0.08)] rounded-full animate-[spin-slow_8s_linear_infinite_reverse]" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-[radial-gradient(ellipse_at_bottom,rgba(200,50,50,0.4)_0%,transparent_70%)]" />
        </div>
      )}
      {type === "expo" && (
        <div className="absolute inset-0 opacity-20 group-hover:opacity-60 transition-opacity duration-700">
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-20 h-20 border-2 border-[rgba(212,160,23,0.3)] rotate-45 animate-[spin-slow_10s_linear_infinite]" />
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-20 h-20 border-2 border-[rgba(212,160,23,0.1)] rotate-0 animate-[spin-slow_15s_linear_infinite_reverse]" />
          <div className="absolute bottom-0 inset-x-0 h-full bg-gradient-to-t from-[rgba(212,160,23,0.15)] to-transparent mix-blend-overlay" />
        </div>
      )}
      
      {/* Universal Luxury Shimmer Sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" />
    </div>
  );
};


export default function Activities() {
  const [activities, setActivities] = useState<ActivityItem[]>(fallbackActivities);
  const sectionRef = useRef<HTMLElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    fetch("/api/public/activities")
      .then((r) => r.json())
      .then((data) => {
        if (data.activities && data.activities.length > 0) {
          setActivities(
            data.activities.map((a: { title: string; description: string; icon_name: string }) => ({
              title: a.title,
              desc: a.description,
              iconName: a.icon_name,
            }))
          );
        }
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  // GSAP Cinematic Reveal & Floating Motion
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      // 1. Cinematic Fog part
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1.5,
        onUpdate: (self) => {
          if (fogRef.current) gsap.set(fogRef.current, { opacity: 1 - self.progress });
        }
      });

      // 2. Constellation Lines Animation
      if (constellationRef.current) {
        gsap.fromTo(".constellation-path", 
          { strokeDasharray: "1500", strokeDashoffset: "1500" },
          { 
            strokeDashoffset: "0", 
            duration: 10, 
            ease: "power2.inOut",
            scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
          }
        );
        gsap.to(".constellation-path", {
          stroke: "rgba(255, 230, 150, 0.5)",
          duration: 4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
      }

      // 3. Float individual portals
      gsap.utils.toArray(".portal-card").forEach((card: any, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -12 : 12,
          duration: 3 + Math.random() * 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 2,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [activities]);

  return (
    <section
      ref={sectionRef}
      id="activities"
      className="relative min-h-screen overflow-hidden py-24 sm:py-32 flex flex-col items-center"
      style={{ background: "#020104" }}
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(25,15,5,1)_0%,rgba(2,1,4,1)_100%)]" />
      
      {/* Deep Magical Aura Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,160,23,0.15)_0%,transparent_60%)] rounded-full blur-[40px] pointer-events-none z-0 animate-[glow-pulse_8s_infinite]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,160,23,0.1)_0%,transparent_60%)] rounded-full blur-[50px] pointer-events-none z-0 animate-[glow-pulse_10s_infinite_reverse]" />

      {/* Constellation SVG Network */}
      <svg ref={constellationRef} className="absolute inset-0 w-full h-[150%] pointer-events-none z-0 opacity-50" preserveAspectRatio="none" viewBox="0 0 1000 1000">
        <path className="constellation-path" d="M50 150 L250 100 L450 350 L750 200 L950 550 L650 750 L150 650 Z" stroke="rgba(212,160,23,0.2)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path className="constellation-path" d="M250 100 L150 650" stroke="rgba(212,160,23,0.2)" strokeWidth="1" fill="none" />
        <path className="constellation-path" d="M450 350 L950 550" stroke="rgba(212,160,23,0.2)" strokeWidth="1" fill="none" />
        {[ [50,150], [250,100], [450,350], [750,200], [950,550], [650,750], [150,650], [350,150], [650,450], [250,550] ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="var(--gold-primary)" className="animate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
        ))}
      </svg>

      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none mix-blend-overlay bg-noise" />
      <div ref={fogRef} className="absolute inset-0 z-20 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(2,1,4,1) 0%, rgba(2,1,4,0.4) 100%)" }} />

      {/* ================= LUXURY HEADING ================= */}
      <div className="relative z-30 text-center mb-20 md:mb-32 px-4 w-full">
        <motion.p
          className="text-xs md:text-sm tracking-[0.5em] uppercase mb-4 font-semibold text-[var(--gold-primary)]"
          style={{ fontFamily: "var(--font-arabian)" }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          ✦ Enchanted Realms ✦
        </motion.p>
        
        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, filter: "blur(12px)", scale: 0.95 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
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
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.3)] to-transparent translate-x-[-100%] animate-[shimmer_5s_infinite] pointer-events-none z-20 mix-blend-overlay" />
        </motion.div>

        <motion.p
          className="mt-8 text-sm md:text-base text-[var(--gold-dim)] max-w-2xl mx-auto font-light leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Discover the magical worlds hidden within Riviera. 
          Each realm offers a unique trial of skill, creativity, and destiny.
        </motion.p>
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
                <motion.div
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                  whileHover={{ 
                    y: -12,
                    scale: 1.02,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.9), inset 0 0 60px rgba(212,160,23,0.3)" 
                  }}
                  className="group relative cursor-pointer overflow-hidden backdrop-blur-xl transition-all duration-700 w-full flex flex-col items-center text-center"
                  style={{
                    // Arabian Palace Arch Window Silhouette
                    borderRadius: "140px 140px 24px 24px",
                    background: "linear-gradient(180deg, rgba(25,15,5,0.9) 0%, rgba(10,5,0,0.95) 100%)",
                    border: "1px solid rgba(212,160,23,0.2)",
                    borderTop: "2px solid rgba(212,160,23,0.6)",
                    borderBottom: "8px solid rgba(160,110,10,0.8)",
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
                  <RealmAtmosphere type={realmType} />

                  {/* === Content (Popping out in 3D) === */}
                  <div className="relative z-20 flex flex-col h-full items-center w-full" style={{ transform: "translateZ(30px)" }}>
                    
                    {/* Keystone Medallion Icon */}
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8 relative group-hover:scale-110 transition-transform duration-500">
                       {/* Spinning Magic Ring */}
                       <div className="absolute inset-[-6px] border-[2px] border-dashed border-[rgba(212,160,23,0.4)] rounded-full animate-[spin-slow_10s_linear_infinite]" />
                       <div className="absolute inset-[-12px] border border-[rgba(212,160,23,0.1)] rounded-full animate-[spin-slow_15s_linear_infinite_reverse]" />
                       
                       {/* Core Plate */}
                       <div className="absolute inset-0 bg-[rgba(20,10,5,0.95)] rounded-full border-2 border-[rgba(212,160,23,0.8)] shadow-[0_0_20px_rgba(212,160,23,0.5)] group-hover:shadow-[0_0_40px_rgba(212,160,23,0.8)] group-hover:bg-[rgba(40,20,5,0.95)] transition-all duration-500" />
                       
                       <Icon 
                          size={32} 
                          className="text-[var(--gold-primary)] group-hover:text-[var(--gold-light)] relative z-10 drop-shadow-[0_0_15px_rgba(212,160,23,0.9)] transition-colors" 
                        />
                    </div>

                    {/* Cinematic Title */}
                    <h3 
                      className="text-2xl lg:text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 group-hover:from-[var(--gold-light)] group-hover:to-[var(--gold-primary)] transition-all duration-500 tracking-wide drop-shadow-md" 
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {activity.title}
                    </h3>
                    
                    {/* Elegant Divider */}
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[rgba(212,160,23,0.6)] to-transparent mb-5" />

                    {/* Atmospheric Description */}
                    <p className="text-gray-400 text-sm md:text-sm leading-relaxed font-light opacity-90 group-hover:opacity-100 transition-opacity flex-grow">
                      {activity.desc}
                    </p>

                    {/* Magical Indicator Accents */}
                    <div className="mt-8 pt-6 w-full flex items-center justify-center border-t border-[rgba(212,160,23,0.15)] relative overflow-hidden">
                      <button className="flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[var(--gold-dim)] group-hover:text-[var(--gold-light)] transition-colors">
                        <Sparkles size={14} className="opacity-0 group-hover:opacity-100 group-hover:animate-[glow-pulse_2s_infinite] transition-opacity duration-300" />
                        Unlock Portal
                      </button>
                      
                      {/* Hover Base Glow */}
                      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[rgba(212,160,23,0.8)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
