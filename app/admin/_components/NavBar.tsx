"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { removeToken } from "@/lib/admin-auth";
import { MenuIcon, CloseIcon } from "./Icons";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Top navigation bar — desktop + mobile responsive                   */
/* ------------------------------------------------------------------ */

export interface NavItem {
  label: string;
  href: string;
}

interface NavBarProps {
  items: NavItem[];
}

export default function NavBar({ items }: NavBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    removeToken();
    router.replace("/admin/login");
  }

  return (
    <header className="bg-[#0a0202]/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Brand */}
        <Link
          href="/admin/dashboard"
          className="text-lg font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent hover:from-[#ff3333] hover:to-red-400 transition-all duration-300"
        >
          Riviera <span className="text-[#ff3333]">Admin</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-2">
          {items.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#ff3333]/10 text-[#ff3333] border border-[#ff3333]/20"
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="ml-4 px-5 py-2 rounded-full text-sm font-medium border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-red-500/50 text-white transition-all duration-300 group flex items-center gap-2"
          >
            Logout
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 group-hover:animate-pulse" />
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <nav className="sm:hidden border-t border-white/10 bg-[#0f0404] pb-3 pt-2 px-4 space-y-1 shadow-2xl">
          {items.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#ff3333]/10 text-[#ff3333]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2 mt-2 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Logout
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
