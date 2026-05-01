"use client";

export default function Login() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.35)_0%,rgba(0,0,0,1)_70%)]" />

      {/* Outer Glow Box */}
      <div className="absolute w-[550px] h-[650px] rounded-3xl border border-red-500/30 shadow-[0_0_120px_rgba(239,68,68,0.4)]" />

      {/* Login Card */}
      <div className="relative z-10 w-[420px] bg-gradient-to-b from-red-600 to-red-800 p-10 rounded-3xl shadow-2xl border border-white/10">

        <h1 className="text-3xl font-bold text-center">
          Riviera <span className="text-white/90">2026</span>
        </h1>

        <p className="text-center mt-2 text-white/80">
          Welcome Back
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="mt-8 w-full px-5 py-3 rounded-xl bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="mt-4 w-full px-5 py-3 rounded-xl bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <div className="flex justify-between items-center mt-4 text-sm text-white/80">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-red-500" />
            Remember me
          </label>
          <a href="#" className="hover:text-white transition">
            Forgot Password?
          </a>
        </div>

        <button className="mt-6 w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-red-700 transition">
          Log in →
        </button>

        <div className="mt-6 text-center text-sm text-white/60">
          Continue with
        </div>

        <button className="mt-3 w-full py-3 rounded-full border border-white/20 bg-black/50 hover:bg-black transition">
          Continue with Google
        </button>

      </div>
    </section>
  );
}
