"use client";

import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Activities", href: "/#activities" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[var(--clr-surface)] border-t border-white/[0.06]">
      {/* Top gradient fade */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--clr-primary)]/30 to-transparent" />

      <div className="section-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* ── Brand ── */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block group">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent group-hover:from-[var(--clr-primary)] group-hover:to-red-400 transition-all duration-300">
                  Riviera
                </span>{" "}
                <span className="text-[var(--clr-primary)]">2026</span>
              </h2>
            </Link>
            <p className="mt-4 text-[var(--clr-text-dim)] text-sm leading-relaxed max-w-sm">
              The official website of Riviera — the annual techno-cultural fest of
              Haldia Institute of Technology. Three days of innovation, culture,
              and unforgettable memories.
            </p>
          </div>

          {/* ── Quick Links ── */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-[0.15em] mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--clr-text-muted)] text-sm hover:text-[var(--clr-primary)] transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[var(--clr-primary)] transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-[0.15em] mb-5">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-[var(--clr-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm text-[var(--clr-text-muted)]">info@riviera2026.com</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[var(--clr-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm text-[var(--clr-text-muted)]">+91 9142047263</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[var(--clr-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm text-[var(--clr-text-muted)]">
                    HIT Campus, Haldia,<br />
                    West Bengal 721657
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--clr-text-dim)]">
            © {new Date().getFullYear()} Riviera 2026 — Haldia Institute of Technology. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[var(--clr-text-dim)] hover:text-white hover:border-[var(--clr-primary)] hover:bg-[var(--clr-primary-dim)] transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
