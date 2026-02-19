"use client";

import { ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-32 bg-[#0f0f0f] text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.25)_0%,rgba(15,15,15,1)_70%)]"></div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-extrabold mb-20">
          Contact <span className="text-red-500">Us</span>
        </h2>

        {/* Form Card */}
        <div className="backdrop-blur-2xl bg-red-600/10 border border-red-500/30 rounded-3xl p-10 md:p-14 shadow-[0_0_60px_rgba(239,68,68,0.3)] transition-all duration-500">

          <form className="space-y-8 text-left">

            {/* Name */}
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Riya Singh"
                className="w-full px-6 py-4 rounded-full bg-black/40 border border-white/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 outline-none transition-all duration-300"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+91 **********"
                className="w-full px-6 py-4 rounded-full bg-black/40 border border-white/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 outline-none transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Email ID
              </label>
              <input
                type="email"
                placeholder="yourname@gmail.com"
                className="w-full px-6 py-4 rounded-full bg-black/40 border border-white/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 outline-none transition-all duration-300"
              />
            </div>

            {/* Query */}
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Query
              </label>
              <textarea
                rows={4}
                placeholder="Write your message..."
                className="w-full px-6 py-4 rounded-2xl bg-black/40 border border-white/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/40 outline-none transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button className="group relative px-10 py-4 rounded-full text-lg font-semibold bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-[0_0_40px_rgba(239,68,68,0.6)] flex items-center gap-3">
                Submit
                <ArrowRight
                  className="group-hover:translate-x-1 transition"
                  size={20}
                />
              </button>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
}
