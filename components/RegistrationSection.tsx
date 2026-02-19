"use client";

import { CalendarDays, MapPin, User } from "lucide-react";

export default function RegistrationSection() {
  return (
    <section className="relative py-32 px-6 bg-black text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.25)_0%,rgba(0,0,0,1)_70%)]"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
          Registrations{" "}
          <span className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">
            Open
          </span>{" "}
          Now
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl mb-16 leading-relaxed">
          Be a part of HIT Fest Riviera, one of the most awaited
          techno-cultural celebrations, and experience days filled with
          innovation, talent, competition, and unforgettable memories.
        </p>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">

          <div className="border border-white/10 rounded-2xl p-10 backdrop-blur-md bg-white/5 hover:border-red-500/50 transition-all duration-300">
            <CalendarDays className="mx-auto mb-4 text-red-500" size={32} />
            <p className="text-gray-300">March 25 - 28, 2026</p>
          </div>

          <div className="border border-white/10 rounded-2xl p-10 backdrop-blur-md bg-white/5 hover:border-red-500/50 transition-all duration-300">
            <MapPin className="mx-auto mb-4 text-red-500" size={32} />
            <p className="text-gray-300">HIT Campus, Patna</p>
          </div>

          <div className="border border-white/10 rounded-2xl p-10 backdrop-blur-md bg-white/5 hover:border-red-500/50 transition-all duration-300">
            <User className="mx-auto mb-4 text-red-500" size={32} />
            <p className="text-gray-300">Open for All Students</p>
          </div>

        </div>

        {/* CTA Button */}
        <button className="group inline-flex items-center gap-3 px-10 py-4 bg-red-600 rounded-full text-white hover:bg-red-700 transition-all duration-300 shadow-[0_0_25px_rgba(239,68,68,0.6)]">
          Register Now
          <span className="bg-red-500 p-2 rounded-full group-hover:translate-x-1 transition">
            →
          </span>
        </button>

      </div>
    </section>
  );
}
