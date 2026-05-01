"use client";

import { ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-start justify-center bg-[#0f0f0f] text-white overflow-hidden px-6">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.25)_0%,rgba(15,15,15,1)_70%)]"></div>

      <div className="relative w-full max-w-lg bg-gradient-to-br from-red-600 to-red-800 p-10 rounded-3xl shadow-[0_0_60px_rgba(239,68,68,0.4)]">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
          Contact <span className="text-white">Us</span>
        </h2>

        {/* Form */}
        <form className="space-y-6">

          <div>
            <label className="text-sm text-white/70">Your Name</label>
            <input
              type="text"
              placeholder="Aditya Raj"
              className="w-full mt-2 px-5 py-3 rounded-full bg-white/10 border border-white/30 focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="text-sm text-white/70">Phone Number</label>
            <input
              type="text"
              placeholder="+91 **********"
              className="w-full mt-2 px-5 py-3 rounded-full bg-white/10 border border-white/30 focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="text-sm text-white/70">Email</label>
            <input
              type="email"
              placeholder="yourname@gmail.com"
              className="w-full mt-2 px-5 py-3 rounded-full bg-white/10 border border-white/30 focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="text-sm text-white/70">Query</label>
            <textarea
              rows={4}
              placeholder="Write your message..."
              className="w-full mt-2 px-5 py-3 rounded-2xl bg-white/10 border border-white/30 focus:outline-none focus:border-white"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-full bg-black text-white font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition-all duration-300"
          >
            Submit
            <ArrowRight size={18} />
          </button>

        </form>
      </div>
    </section>
  );
}
