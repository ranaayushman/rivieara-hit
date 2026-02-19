"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">

      {/* Fire Background */}
      <Image
        src="/fire-bg.png"
        alt="fire background"
        fill
        priority
        className="object-cover opacity-80"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Login Card */}
      <div className="relative z-10 w-[400px] md:w-[450px] bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-10 text-white shadow-2xl">

        <h1 className="text-3xl font-bold text-center mb-2">
          Riviera 2026
        </h1>

        <p className="text-center mb-8 text-lg">
          Welcome Back
        </p>

        {/* Email Input */}
        <div className="mb-5">
          <input
            type="email"
            placeholder="you@yourmail.com"
            className="w-full px-6 py-4 rounded-full bg-transparent border border-white/70 outline-none placeholder:text-white/70 focus:border-white"
          />
        </div>

        {/* Password Input */}
        <div className="mb-8">
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-6 py-4 rounded-full bg-transparent border border-white/70 outline-none placeholder:text-white/70 focus:border-white"
          />
        </div>

        {/* Button Row */}
        <div className="flex items-center justify-between">

          <button className="bg-black text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-red-900 transition">
            Login
            <ArrowRight size={16} />
          </button>

          <button className="text-sm underline text-white/80 hover:text-white">
            forgot password
          </button>

        </div>

      </div>
    </div>
  );
}
