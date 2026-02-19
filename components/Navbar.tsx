"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition">
            Riviera
          </h1>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-zinc-400 text-sm font-medium">

          <Link
            href="/"
            className="hover:text-white transition"
          >
            Home
          </Link>

          <Link
            href="/#schedule"
            className="hover:text-white transition"
          >
            Schedule
          </Link>

          <Link
            href="/#activities"
            className="hover:text-white transition"
          >
            Activities
          </Link>

          <Link
            href="/#sponsors"
            className="hover:text-white transition"
          >
            Sponsors
          </Link>

          <Link
            href="/gallery"
            className="hover:text-white transition"
          >
            Gallery
          </Link>

          <Link
            href="/contact"
            className="hover:text-white transition"
          >
            Contact
          </Link>

          {/* Register CTA */}
          <Link
            href="/register"
            className="px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition shadow-lg shadow-red-500/30"
          >
            Register
          </Link>
        </div>

        {/* Login Button */}
        <Link href="/login">
          <button className="hidden md:block px-4 py-2 bg-red-600 text-sm rounded-lg text-white hover:bg-red-700 transition shadow-lg shadow-red-500/30">
            Log in
          </button>
        </Link>

      </div>
    </nav>
  );
}
