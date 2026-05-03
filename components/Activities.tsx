"use client";

import { useEffect, useState } from "react";
import { Code, Music, Gamepad2, Cpu, Palette, Trophy, Camera, BookOpen, Mic2, Rocket, Globe, Lightbulb, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

interface ActivityItem {
  title: string;
  desc: string;
  iconName: string;
}

const iconMap: Record<string, LucideIcon> = {
  Code, Music, Gamepad2, Cpu, Palette, Trophy, Camera, BookOpen, Mic2, Rocket, Globe, Lightbulb,
};

const fallbackActivities: ActivityItem[] = [
  { title: "Hackathon", desc: "24-hour coding battle with exciting prizes, mentorship, and real-world innovation challenges.", iconName: "Code" },
  { title: "Cultural Night", desc: "Music, dance & electrifying performances by top artists and student talent.", iconName: "Music" },
  { title: "Gaming Arena", desc: "Competitive esports tournaments with head-to-head challenges across popular titles.", iconName: "Gamepad2" },
  { title: "Tech Expo", desc: "Showcasing futuristic projects, AI innovations, and cutting-edge student research.", iconName: "Cpu" },
];

export default function Activities() {
  const [activities, setActivities] = useState<ActivityItem[]>(fallbackActivities);

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

  return (
    <SectionWrapper id="activities">
      <SectionHeading text="Fest" accent="Activities" subtitle="From coding battles to cultural nights — there's something for everyone" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.iconName] || Code;

          return (
            <GlassCard key={activity.title} index={index} className="group">
              <motion.div
                className="w-14 h-14 rounded-xl bg-[var(--clr-primary-dim)] flex items-center justify-center mb-6 group-hover:bg-[var(--clr-primary)] transition-colors duration-300"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                <Icon size={26} className="text-[var(--clr-primary)] group-hover:text-white transition-colors duration-300" />
              </motion.div>
              <h3 className="text-lg md:text-xl font-bold mb-3 tracking-tight">{activity.title}</h3>
              <p className="text-[var(--clr-text-muted)] text-sm leading-relaxed">{activity.desc}</p>
              <div className="mt-6 h-0.5 w-0 bg-gradient-to-r from-[var(--clr-primary)] to-red-400 group-hover:w-full transition-all duration-500 rounded-full" />
            </GlassCard>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
