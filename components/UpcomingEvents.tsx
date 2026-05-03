"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MousePointerClick } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { easing, duration } from "@/lib/motionPresets";

interface EventData {
  title: string;
  desc: string;
  image: string;
  tag: string;
}

const fallbackEvents: EventData[] = [
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

const FALLBACK_IMAGES = ["/gallery1.jpg", "/gallery2.jpg", "/gallery3.jpg", "/gallery4.jpg"];

export default function UpcomingEvents() {
  const [events, setEvents] = useState<EventData[]>(fallbackEvents);
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    fetch("/api/public/events")
      .then((r) => r.json())
      .then((data) => {
        if (data.events && data.events.length > 0) {
          setEvents(
            data.events.map((e: Record<string, unknown>, i: number) => ({
              title: e.title as string,
              desc: (e.description as string) || "",
              image: (e.banner_url as string) || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
              tag: (e.tag as string) || "Event",
            }))
          );
        }
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  const navigate = useCallback((dir: number) => {
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return events.length - 1;
      if (next >= events.length) return 0;
      return next;
    });
  }, [events.length]);

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
    <SectionWrapper id="events" withPattern>
      <SectionHeading
        text="Upcoming"
        accent="Events"
        arabianText="✦ Discover ✦"
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

            return (
              <motion.article
                key={index}
                animate={{
                  x: offset === 0 ? "0%" : offset === 1 ? "45%" : "-45%",
                  y: offset === 0 ? "0%" : "8%",
                  scale: offset === 0 ? 1 : 0.8,
                  rotateY: offset === 0 ? 0 : offset === 1 ? -25 : 25,
                  rotateZ: offset === 0 ? 0 : offset === 1 ? 6 : -6,
                  opacity: offset === 0 ? 1 : 0.5,
                  zIndex: offset === 0 ? 30 : 10,
                }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] as const }}
                className="absolute w-[85%] sm:w-[65%] md:w-[55%] lg:w-[45%] h-[300px] sm:h-[340px] md:h-[380px] rounded-[2rem] backdrop-blur-xl overflow-hidden cursor-pointer"
                style={{
                  border: `1px solid ${isActive ? "var(--border-hover)" : "var(--border-gold)"}`,
                  background: "var(--gradient-card)",
                  boxShadow: isActive
                    ? "0 0 60px rgba(212, 160, 23, 0.15), 0 20px 40px rgba(0,0,0,0.5)"
                    : "0 10px 30px rgba(0,0,0,0.3)",
                }}
                onClick={() => {
                  if (offset !== 0) navigate(offset);
                }}
              >
                {/* Inner radial glow */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle at 30% 20%, rgba(212, 160, 23, 0.12), transparent 60%)",
                    opacity: isActive ? 1 : 0.3,
                  }}
                />

                {/* Gold shimmer border on active */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-[2rem]"
                    style={{
                      background: "linear-gradient(135deg, rgba(212, 160, 23, 0.1), transparent 50%)",
                    }}
                  />
                )}

                <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p
                        className="text-[10px] uppercase tracking-[0.35em] mb-2 font-medium"
                        style={{
                          color: isActive ? "var(--gold-primary)" : "var(--text-dim)",
                          fontFamily: "var(--font-arabian)",
                        }}
                      >
                        {isActive ? "Featured Event" : isNext ? "Next Up" : "Previous"}
                      </p>
                      <h3
                        className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
                        style={{
                          color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {event.title}
                      </h3>
                    </div>

                    {/* Image thumbnail */}
                    <motion.div
                      className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-2xl transition-all duration-500"
                      style={{
                        border: `3px solid ${isActive ? "var(--gold-primary)" : "var(--border-gold)"}`,
                        boxShadow: isActive ? "var(--shadow-glow-gold-md)" : "none",
                      }}
                      animate={{
                        rotate: isActive ? 0 : offset === 1 ? -15 : 15,
                        scale: isActive ? 1 : 0.9,
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

                  <p
                    className="text-sm sm:text-base leading-relaxed line-clamp-3"
                    style={{ color: isActive ? "var(--text-muted)" : "var(--text-dim)" }}
                  >
                    {event.desc}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    {isActive ? (
                      <button className="btn-gold !py-2.5 !px-6 !text-sm group">
                        Register Now
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    ) : (
                      <span className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium" style={{ color: "var(--text-dim)" }}>
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
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg"
          style={{
            background: "var(--surface-glass)",
            border: "1px solid var(--border-gold)",
            color: "var(--gold-primary)",
          }}
        >
          <ArrowLeft size={20} />
        </button>

        <button
          onClick={() => navigate(1)}
          aria-label="Next event"
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-lg"
          style={{
            background: "var(--surface-glass)",
            border: "1px solid var(--border-gold)",
            color: "var(--gold-primary)",
          }}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </SectionWrapper>
  );
}
