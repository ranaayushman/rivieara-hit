"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MousePointerClick } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

interface EventData {
  title: string;
  desc: string;
  image: string;
  tag: string;
}

const events: EventData[] = [
  {
    title: "AI Workshop",
    desc: "Riviera 2026 proudly presents an exclusive Workshop on Artificial Intelligence. Step into the world of AI and explore how intelligent systems are transforming industries.",
    image: "/gallery1.jpg",
    tag: "Workshop",
  },
  {
    title: "Hackathon",
    desc: "24-hour coding challenge with exciting prizes and real-world problem solving. Build, innovate, and compete with the best developers.",
    image: "/gallery2.jpg",
    tag: "Competition",
  },
  {
    title: "Cultural Night",
    desc: "Music, dance and unforgettable performances with electrifying vibes. Experience the energy of the biggest cultural night in the region.",
    image: "/gallery3.jpg",
    tag: "Cultural",
  },
];

export default function UpcomingEvents() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const navigate = useCallback((dir: number) => {
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return events.length - 1;
      if (next >= events.length) return 0;
      return next;
    });
  }, []);

  // Auto-play interval for rotating animations
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => navigate(1), 3500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, navigate]);

  const getOffset = (index: number) => {
    const rawOffset = index - current;
    if (rawOffset > 1) return rawOffset - events.length;
    if (rawOffset < -1) return rawOffset + events.length;
    return rawOffset;
  };

  return (
    <SectionWrapper id="events">
      <SectionHeading
        text="Upcoming"
        accent="Events"
        subtitle="Discover the most anticipated events of Riviera 2026"
      />

      <div 
        className="relative max-w-6xl mx-auto flex items-center justify-center -mt-4 md:-mt-8"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="relative h-[400px] sm:h-[460px] md:h-[500px] w-full [perspective:2000px] flex items-center justify-center overflow-hidden py-10">
          {events.map((event, index) => {
            const offset = getOffset(index);
            const isActive = offset === 0;
            const isNext = offset === 1;
            const isPrev = offset === -1;

            return (
              <motion.article
                key={index}
                animate={{
                  x: offset === 0 ? "0%" : offset === 1 ? "45%" : "-45%",
                  y: offset === 0 ? "0%" : offset === 1 ? "8%" : "8%",
                  scale: offset === 0 ? 1 : 0.8,
                  rotateY: offset === 0 ? 0 : offset === 1 ? -25 : 25,
                  rotateZ: offset === 0 ? 0 : offset === 1 ? 6 : -6,
                  opacity: offset === 0 ? 1 : 0.5,
                  zIndex: offset === 0 ? 30 : 10,
                }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] as const }}
                className={`absolute w-[85%] sm:w-[65%] md:w-[55%] lg:w-[45%] h-[300px] sm:h-[340px] md:h-[380px] rounded-[2rem] border ${isActive ? "border-[var(--clr-primary)]/50" : "border-white/10"} bg-gradient-to-br from-[#1a0000] via-[var(--clr-surface)] to-[var(--clr-bg)] backdrop-blur-xl overflow-hidden cursor-pointer`}
                style={{
                  boxShadow: isActive 
                    ? "0 0 60px rgba(239, 68, 68, 0.2), 0 20px 40px rgba(0,0,0,0.6)" 
                    : "0 10px 30px rgba(0,0,0,0.4)",
                }}
                onClick={() => {
                  if (offset !== 0) navigate(offset);
                }}
              >
                {/* Inner radial glow */}
                <div className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.2),transparent_60%)] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-30'}`} />

                <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className={`text-[10px] uppercase tracking-[0.35em] mb-2 font-medium ${isActive ? 'text-red-300' : 'text-zinc-500'}`}>
                        {isActive ? "Featured Event" : isNext ? "Next Up" : "Previous"}
                      </p>
                      <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                        {event.title}
                      </h3>
                    </div>
                    
                    {/* Image thumbnail in top right */}
                    <motion.div 
                      className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-[4px] shadow-2xl transition-all duration-500 ${isActive ? 'border-[var(--clr-primary)]/60 shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'border-white/10 shadow-none'}`}
                      animate={{
                         rotate: isActive ? 0 : offset === 1 ? -15 : 15,
                         scale: isActive ? 1 : 0.9
                      }}
                      transition={{ duration: 0.7 }}
                    >
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 96px, 112px"
                      />
                    </motion.div>
                  </div>

                  <p className={`text-sm sm:text-base leading-relaxed line-clamp-3 ${isActive ? 'text-[var(--clr-text-muted)]' : 'text-zinc-500'}`}>
                    {event.desc}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    {isActive ? (
                      <button className="btn-primary !py-2.5 !px-6 !text-sm group">
                        Register Now
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </button>
                    ) : (
                       <span className="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--clr-text-dim)] font-medium">
                         <MousePointerClick size={14} /> Click to View
                       </span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Previous event"
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[var(--clr-primary)] hover:border-[var(--clr-primary)] transition-all duration-300 shadow-lg hover:shadow-[var(--shadow-glow-sm)]"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          onClick={() => navigate(1)}
          aria-label="Next event"
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[var(--clr-primary)] hover:border-[var(--clr-primary)] transition-all duration-300 shadow-lg hover:shadow-[var(--shadow-glow-sm)]"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </SectionWrapper>
  );
}
