"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    rotateY: dir > 0 ? 15 : -15,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.9,
    rotateY: dir > 0 ? -15 : 15,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function UpcomingEvents() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setCurrent((prev) => {
        const next = prev + dir;
        if (next < 0) return events.length - 1;
        if (next >= events.length) return 0;
        return next;
      });
    },
    []
  );

  const event = events[current];

  return (
    <SectionWrapper id="events">
      <SectionHeading
        text="Upcoming"
        accent="Events"
        subtitle="Discover the most anticipated events of Riviera 2026"
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Main card area */}
        <div className="relative h-[420px] sm:h-[440px] md:h-[400px] [perspective:1800px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 rounded-3xl border border-[var(--clr-border)] bg-gradient-to-br from-[#1a0000]/80 via-[var(--clr-surface)]/90 to-[var(--clr-bg)] backdrop-blur-md overflow-hidden"
              style={{
                boxShadow: "0 0 60px rgba(239, 68, 68, 0.12), 0 20px 50px rgba(0,0,0,0.5)",
              }}
            >
              {/* Inner radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.15),transparent_50%)]" />

              <div className="relative h-full flex flex-col md:flex-row gap-6 p-6 sm:p-8 md:p-10">
                {/* Image */}
                <div className="relative flex-shrink-0 w-full md:w-[280px] h-[160px] md:h-full rounded-2xl overflow-hidden ring-1 ring-white/10">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                  {/* Tag badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-red-300">
                    {event.tag}
                  </div>
                </div>

                {/* Text content */}
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-red-300/70 mb-2 font-medium">
                      Featured Event
                    </p>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                      {event.title}
                    </h3>
                    <p className="text-[var(--clr-text-muted)] text-sm sm:text-base leading-relaxed line-clamp-3 md:line-clamp-4">
                      {event.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    {/* Dots indicator */}
                    <div className="flex gap-2">
                      {events.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setDirection(i > current ? 1 : -1);
                            setCurrent(i);
                          }}
                          className={`transition-all duration-300 rounded-full ${
                            i === current
                              ? "w-8 h-2 bg-[var(--clr-primary)]"
                              : "w-2 h-2 bg-white/20 hover:bg-white/40"
                          }`}
                          aria-label={`Go to event ${i + 1}`}
                        />
                      ))}
                    </div>

                    <button className="btn-primary !py-2.5 !px-6 !text-sm group">
                      Register Now
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Previous event"
          className="absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[var(--clr-surface)] border border-white/10 flex items-center justify-center text-white hover:bg-[var(--clr-primary)] hover:border-[var(--clr-primary)] transition-all duration-300 shadow-lg hover:shadow-[var(--shadow-glow-sm)]"
        >
          <ArrowLeft size={18} />
        </button>

        <button
          onClick={() => navigate(1)}
          aria-label="Next event"
          className="absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[var(--clr-surface)] border border-white/10 flex items-center justify-center text-white hover:bg-[var(--clr-primary)] hover:border-[var(--clr-primary)] transition-all duration-300 shadow-lg hover:shadow-[var(--shadow-glow-sm)]"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </SectionWrapper>
  );
}
