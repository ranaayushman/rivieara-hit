"use client";

import Link from "next/link";
import Image from "next/image"; 
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Real Image Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          
          {/* Logo Image Container */}
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-[1.5px] border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] group-hover:border-red-500/50 transition-all duration-300 bg-black">
            <Image 
              src="/riviera-logo.jpeg" /* Yahan tumhara exact file name update ho gaya hai */
              alt="Riviera Official Logo" 
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Full Text next to icon */}
          <div className="hidden sm:flex flex-col">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300 group-hover:from-red-500 group-hover:to-red-600 transition-all duration-300 drop-shadow-sm">
              Riviera
            </h1>
            <span className="text-[10px] md:text-[11px] text-zinc-400 uppercase tracking-[0.2em] -mt-1 font-semibold group-hover:text-zinc-300 transition-all pl-0.5">
              HIT Haldia
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-zinc-400 text-sm font-medium">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/#schedule" className="hover:text-white transition">Schedule</Link>
          <Link href="/#activities" className="hover:text-white transition">Activities</Link>
          <Link href="/#sponsors" className="hover:text-white transition">Sponsors</Link>
          <Link href="/gallery" className="hover:text-white transition">Gallery</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>

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