"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[var(--clr-bg)] overflow-hidden px-4 sm:px-6">
      {/* Background */}
      <div className="bg-glow" />

      {/* Decorative outer glow ring */}
      <div
        className="absolute w-[500px] h-[600px] rounded-3xl border border-[var(--clr-primary)]/20 hidden md:block"
        style={{ boxShadow: "var(--shadow-glow-xl)" }}
        aria-hidden="true"
      />

      {/* Login Card */}
      <motion.div
        className="relative z-10 w-full max-w-[420px]"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--clr-primary)] via-red-600 to-red-800" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent_60%)]" />

          <div className="relative p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">
                Riviera <span className="text-white/90">2026</span>
              </h1>
              <p className="text-white/60 text-sm mt-2">Welcome back</p>
            </div>

            {/* Form */}
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-5 py-3.5 rounded-xl bg-white/90 text-black text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition-shadow"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-5 py-3.5 rounded-xl bg-white/90 text-black text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition-shadow pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="flex justify-between items-center text-sm text-white/70">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-red-500 w-4 h-4 rounded" />
                  Remember me
                </label>
                <Link href="#" className="hover:text-white transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-black/90 hover:bg-black text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 group shadow-lg"
              >
                Log in
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/20" />
              <span className="text-xs text-white/50 uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-white/20" />
            </div>

            {/* Google */}
            <button className="w-full py-3.5 rounded-xl border border-white/20 bg-black/40 hover:bg-black/60 text-white text-sm font-medium transition-all duration-300">
              Continue with Google
            </button>

            {/* Register link */}
            <p className="text-center text-sm text-white/50 mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-white font-medium hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
