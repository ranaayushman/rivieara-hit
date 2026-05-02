"use client";

import { Code, Music, Gamepad2, Cpu, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

interface Activity {
  title: string;
  desc: string;
  icon: LucideIcon;
}

const activities: Activity[] = [
  {
    title: "Hackathon",
    desc: "24-hour coding battle with exciting prizes, mentorship, and real-world innovation challenges.",
    icon: Code,
  },
  {
    title: "Cultural Night",
    desc: "Music, dance & electrifying performances by top artists and student talent.",
    icon: Music,
  },
  {
    title: "Gaming Arena",
    desc: "Competitive esports tournaments with head-to-head challenges across popular titles.",
    icon: Gamepad2,
  },
  {
    title: "Tech Expo",
    desc: "Showcasing futuristic projects, AI innovations, and cutting-edge student research.",
    icon: Cpu,
  },
];

export default function Activities() {
  return (
    <SectionWrapper id="activities">
      <SectionHeading
        text="Fest"
        accent="Activities"
        subtitle="From coding battles to cultural nights — there's something for everyone"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <GlassCard key={activity.title} index={index} className="group">
              {/* Icon container */}
              <motion.div
                className="w-14 h-14 rounded-xl bg-[var(--clr-primary-dim)] flex items-center justify-center mb-6 group-hover:bg-[var(--clr-primary)] transition-colors duration-300"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                <Icon
                  size={26}
                  className="text-[var(--clr-primary)] group-hover:text-white transition-colors duration-300"
                />
              </motion.div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold mb-3 tracking-tight">
                {activity.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--clr-text-muted)] text-sm leading-relaxed">
                {activity.desc}
              </p>

              {/* Bottom accent line */}
              <div className="mt-6 h-0.5 w-0 bg-gradient-to-r from-[var(--clr-primary)] to-red-400 group-hover:w-full transition-all duration-500 rounded-full" />
            </GlassCard>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
