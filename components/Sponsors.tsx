"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

interface Sponsor {
  name: string;
  initials: string;
  tier: string;
  color: string;
}

const sponsors: Sponsor[] = [
  { name: "Fanta", initials: "Fa", tier: "Title Sponsor", color: "from-orange-500 to-orange-600" },
  { name: "Pepsi", initials: "Pe", tier: "Co-Sponsor", color: "from-blue-500 to-blue-700" },
  { name: "SBI", initials: "SBI", tier: "Banking Partner", color: "from-blue-800 to-indigo-900" },
  { name: "ICICI", initials: "IC", tier: "Payment Partner", color: "from-orange-600 to-red-700" },
];

export default function Sponsors() {
  return (
    <SectionWrapper id="sponsors">
      <SectionHeading
        text="Our"
        accent="Sponsors"
        subtitle="Proudly supported by industry leaders"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
        {sponsors.map((sponsor, index) => (
          <GlassCard
            key={sponsor.name}
            index={index}
            className="group text-center !p-8"
          >
            {/* Logo placeholder with initials */}
            <motion.div
              className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${sponsor.color} flex items-center justify-center mb-5 shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="text-2xl font-extrabold text-white drop-shadow-md">
                {sponsor.initials}
              </span>
            </motion.div>

            {/* Name */}
            <h3 className="text-lg font-bold mb-1 tracking-tight">
              {sponsor.name}
            </h3>

            {/* Tier badge */}
            <span className="text-xs text-[var(--clr-text-dim)] uppercase tracking-[0.2em] font-medium">
              {sponsor.tier}
            </span>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
