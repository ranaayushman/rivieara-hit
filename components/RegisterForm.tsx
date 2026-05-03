"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, college }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen pt-28 pb-12 flex items-center justify-center bg-[#150505] overflow-hidden px-4 sm:px-6">
      
      {/* Decorative outer dark pad with subtle top-left red highlight */}
      <div
        className="absolute w-[500px] h-[800px] rounded-[2rem] bg-[#0f0404]/80 border border-white/5 shadow-2xl hidden md:block"
        style={{ boxShadow: "-10px -10px 40px rgba(255, 51, 51, 0.05)" }}
        aria-hidden="true"
      >
         <div className="absolute top-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-red-500/50 to-transparent"></div>
         <div className="absolute top-0 left-0 w-[1px] h-1/2 bg-gradient-to-b from-red-500/50 to-transparent"></div>
      </div>

      {/* Register Card */}
      <motion.div
        className="relative z-10 w-full max-w-[420px]"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Solid vibrant red bg as seen in screenshot */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff3333] via-[#e61919] to-[#990000]" />

          <div className="relative p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-white mb-4">
                Riviera 2026
              </h1>
              <p className="text-white text-lg font-semibold tracking-wide">Create your account</p>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/30 text-red-200 text-sm p-3 rounded-xl mb-4">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-6 py-3.5 rounded-full bg-white text-black text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-shadow font-medium"
              />
              
              <input
                type="text"
                placeholder="College/University Name"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-6 py-3.5 rounded-full bg-white text-black text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-shadow font-medium"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-3.5 rounded-full bg-white text-black text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-shadow font-medium"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-6 py-3.5 rounded-full bg-white text-black text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-shadow pr-12 font-medium tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 pl-6 pr-2 rounded-full bg-[#110505] border border-[#ff3333]/40 hover:bg-[#1a0505] text-white font-medium flex items-center justify-between transition-all duration-300 group shadow-lg disabled:opacity-50"
                >
                  <span className="mx-auto pl-8 text-base">{loading ? "Creating Account..." : "Sign Up"}</span>
                  <div className="w-9 h-9 rounded-full bg-[#ff3333] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ArrowRight size={16} className="text-white" />
                  </div>
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="mt-8 mb-4 flex items-center justify-center">
              <span className="text-[10px] text-[#800000] uppercase tracking-widest font-bold">Continue with</span>
            </div>

            {/* Google */}
            <a href="/api/auth/google" className="w-full py-3.5 rounded-full border border-[#ff3333]/40 bg-[#110505] hover:bg-[#1a0505] text-white text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Register with Google
            </a>

            {/* Login link */}
            <p className="text-center text-sm text-white/70 mt-8">
              Already have an account?{" "}
              <Link href="/login" className="text-white font-bold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
