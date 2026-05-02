"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

interface EventItem {
  time: string;
  title: string;
  desc?: string;
}

const scheduleData: Record<string, EventItem[]> = {
  "Day 1": [
    { time: "09:00 AM", title: "Opening Ceremony", desc: "Grand inauguration with guest speakers" },
    { time: "11:00 AM", title: "AI Workshop", desc: "Hands-on session on machine learning" },
    { time: "02:00 PM", title: "Coding Challenge", desc: "Competitive programming round" },
  ],
  "Day 2": [
    { time: "10:00 AM", title: "Hackathon Begins", desc: "24-hour build sprint starts" },
    { time: "01:00 PM", title: "Tech Talks", desc: "Industry experts share insights" },
    { time: "06:00 PM", title: "Cultural Night", desc: "Live performances & music" },
  ],
  "Day 3": [
    { time: "09:30 AM", title: "Robotics Competition", desc: "Bot battles & challenges" },
    { time: "12:00 PM", title: "Gaming Finals", desc: "Esports championship matches" },
    { time: "05:00 PM", title: "Closing Ceremony", desc: "Awards & farewell" },
  ],
};

const days = Object.keys(scheduleData);

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(days[0]);

  return (
    <SectionWrapper id="schedule">
      <SectionHeading
        text="Event"
        accent="Schedule"
        subtitle="Three days of non-stop tech, culture, and competition"
      />

      <div className="max-w-4xl mx-auto">
        {/* Day selector */}
        <div className="flex justify-center gap-3 mb-12">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeDay === day
                  ? "text-white"
                  : "text-[var(--clr-text-muted)] hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              {activeDay === day && (
                <motion.div
                  layoutId="schedule-tab"
                  className="absolute inset-0 bg-[var(--clr-primary)] rounded-full -z-10"
                  style={{ boxShadow: "var(--shadow-glow-md)" }}
                  transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                />
              )}
              {day}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute left-[21px] top-3 bottom-3 w-px bg-gradient-to-b from-[var(--clr-primary)]/60 via-[var(--clr-primary)]/20 to-transparent" />

            <div className="space-y-6">
              {scheduleData[activeDay].map((event, index) => (
                <motion.div
                  key={`${activeDay}-${index}`}
                  className="relative pl-14 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[14px] top-4 w-[14px] h-[14px] rounded-full border-[3px] border-[var(--clr-primary)] bg-[var(--clr-bg)] shadow-[0_0_12px_rgba(239,68,68,0.5)] group-hover:bg-[var(--clr-primary)] transition-colors duration-300" />

                  {/* Card */}
                  <div className="glass-card p-5 md:p-6 group-hover:border-[var(--clr-primary)]/40 transition-all duration-300">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Clock size={13} className="text-[var(--clr-primary)] flex-shrink-0" />
                          <span className="text-[var(--clr-primary)] text-sm font-semibold">
                            {event.time}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold tracking-tight">
                          {event.title}
                        </h3>
                        {event.desc && (
                          <p className="text-[var(--clr-text-muted)] text-sm mt-1 leading-relaxed">
                            {event.desc}
                          </p>
                        )}
                      </div>

                      <ChevronRight
                        size={18}
                        className="text-[var(--clr-text-dim)] group-hover:text-[var(--clr-primary)] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
