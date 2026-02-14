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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        {/* Brand */}
        <Link
          href="/admin/dashboard"
          className="text-lg font-bold text-indigo-600 tracking-tight"
        >
          Riviera Admin
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname.startsWith(item.href)
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <nav className="sm:hidden border-t border-gray-200 bg-white pb-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-medium ${
                pathname.startsWith(item.href)
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 cursor-pointer"
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}
