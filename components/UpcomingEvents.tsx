"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const events = [
  {
    title: "AI Workshop",
    desc: "Riviera 2026 proudly presents an exclusive Workshop on Artificial Intelligence. Step into the world of AI and explore how intelligent systems are transforming industries.",
    image: "/gallery1.jpg",
  },
  {
    title: "Hackathon",
    desc: "24-hour coding challenge with exciting prizes and real-world problem solving.",
    image: "/gallery2.jpg",
  },
  {
    title: "Cultural Night",
    desc: "Music, dance and unforgettable performances with electrifying vibes.",
    image: "/gallery3.jpg",
  },
];

export default function UpcomingEvents() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? events.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === events.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="relative py-32 bg-[#0f0f0f] text-white overflow-hidden">

      {/* Background Red Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.3)_0%,rgba(15,15,15,1)_70%)]"></div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-20">
          Upcoming <span className="text-red-500">Events</span>
        </h2>

        <div className="relative flex items-center justify-center">

          {/* Side Glow Panels */}
          <div className="hidden md:block absolute -left-32 w-96 h-80 border border-red-500/40 rounded-3xl blur-sm opacity-40"></div>
          <div className="hidden md:block absolute -right-32 w-96 h-80 border border-red-500/40 rounded-3xl blur-sm opacity-40"></div>

          {/* Main Card */}
          <div className="relative w-full max-w-4xl bg-gradient-to-br from-[#1a0000] to-[#0f0f0f] border border-red-500/40 rounded-3xl p-12 shadow-[0_0_60px_rgba(239,68,68,0.3)] overflow-visible transition-all duration-500">

            {/* Floating Circle Image */}
            <div className="absolute -top-12 right-10 w-32 h-32 rounded-full border-4 border-red-500 overflow-hidden shadow-xl">
              <Image
                src={events[current].image}
                alt="event"
                fill
                className="object-cover"
              />
            </div>

            <h3 className="text-3xl font-bold mb-6">
              {events[current].title}
            </h3>

            <p className="text-zinc-300 mb-8 max-w-xl">
              {events[current].desc}
            </p>

            <button className="group px-6 py-3 bg-black border border-red-500 rounded-full flex items-center gap-2 hover:bg-red-600 transition-all duration-300">
              Register Now
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition"
              />
            </button>

          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:-left-12 bg-red-600 p-3 rounded-full hover:bg-red-700 transition"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-4 md:-right-12 bg-red-600 p-3 rounded-full hover:bg-red-700 transition"
          >
            <ArrowRight size={20} />
          </button>

        </div>
      </div>
    </section>
  );
}
