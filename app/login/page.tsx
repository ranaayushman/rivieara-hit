"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
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
    <section className="relative min-h-screen pt-28 pb-12 flex items-center justify-center bg-[var(--clr-bg)] overflow-hidden px-4 sm:px-6">
      <div className="bg-glow" />

      <div
        className="absolute w-[500px] h-[600px] rounded-3xl border border-[var(--clr-primary)]/20 hidden md:block"
        style={{ boxShadow: "var(--shadow-glow-xl)" }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 w-full max-w-[420px]"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--clr-primary)] via-red-600 to-red-800" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent_60%)]" />

          <div className="relative p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">
                Riviera <span className="text-white/90">2026</span>
              </h1>
              <p className="text-white/60 text-sm mt-2">Welcome back</p>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/30 text-red-200 text-sm p-3 rounded-xl mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3.5 rounded-xl bg-white/90 text-black text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition-shadow"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-3.5 rounded-xl bg-white/90 text-black text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition-shadow pr-12"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors" aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button type="submit" disabled={loading} className="w-full mt-2 py-3.5 rounded-xl bg-black/90 hover:bg-black text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 group shadow-lg disabled:opacity-50">
                {loading ? "Signing in..." : "Log in"}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/20" />
              <span className="text-xs text-white/50 uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-white/20" />
            </div>

            <a href="/api/auth/google" className="w-full py-3.5 rounded-xl border border-white/20 bg-black/40 hover:bg-black/60 text-white text-sm font-medium transition-all duration-300 flex items-center justify-center gap-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </a>

            <p className="text-center text-sm text-white/50 mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-white font-medium hover:underline">Register</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
