"use client";

import { CalendarDays, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

const infoCards = [
  {
    icon: CalendarDays,
    label: "March 25 – 28, 2026",
    sublabel: "4 Days of Events",
  },
  {
    icon: MapPin,
    label: "HIT Campus, Haldia",
    sublabel: "West Bengal, India",
  },
  {
    icon: Users,
    label: "Open for All Students",
    sublabel: "Register as Individual or Team",
  },
];

export default function RegistrationSection() {
  return (
    <SectionWrapper>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <SectionHeading
          text="Registrations"
          accent="Open Now"
          accentFirst={false}
        />
        <p className="text-[var(--clr-text-muted)] text-base md:text-lg leading-relaxed -mt-10">
          Be a part of HIT Fest Riviera, one of the most awaited techno-cultural
          celebrations, and experience days filled with innovation, talent,
          competition, and unforgettable memories.
        </p>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto mb-14">
        {infoCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <GlassCard
              key={card.label}
              index={index}
              className="text-center !p-8"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[var(--clr-primary-dim)] flex items-center justify-center mb-4">
                <Icon
                  size={26}
                  className="text-[var(--clr-primary)]"
                />
              </div>
              <p className="text-white font-semibold mb-1">{card.label}</p>
              <p className="text-xs text-[var(--clr-text-dim)]">{card.sublabel}</p>
            </GlassCard>
          );
        })}
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <Link href="/register" className="btn-primary group text-lg px-10 py-4">
          Register Now
          <ArrowRight
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </SectionWrapper>
  );
}
