"use client";

import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin, Zap } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Activities", href: "/#activities" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

const defaultContact: ContactInfo = {
  email: "info@riviera2026.com",
  phone: "+91 9142047263",
  address: "HIT Campus, Haldia,\nWest Bengal 721657",
};

export default function Footer() {
  const contact = defaultContact;

  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <footer
      className="relative"
      style={{ background: "#050507" }}
    >
      {/* Top crimson gradient line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.2), transparent)",
        }}
      />

      {/* Subtle crimson glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(255,32,78,0.02), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* ── Brand ── */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block group">
              <h2
                className="text-2xl md:text-3xl font-black tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span style={{ color: "#F5F5F5" }}>RIVIERA</span>{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #FF204E, #FF2E63)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: "var(--font-tactical)",
                  }}
                >
                  2026
                </span>
              </h2>
            </Link>
            <p
              className="mt-4 text-sm leading-relaxed max-w-sm"
              style={{ color: "rgba(245,245,245,0.35)" }}
            >
              The official website of Riviera — the annual techno-cultural fest of
              Haldia Institute of Technology. Three days of competition, culture,
              and relentless challenges.
            </p>

            {/* Tactical branding */}
            <p
              className="mt-4 text-[9px] tracking-[0.4em] uppercase font-bold"
              style={{ fontFamily: "var(--font-tactical)", color: "rgba(255,32,78,0.35)" }}
            >
              ◆ CULLING GAMES ◆
            </p>
          </div>

          {/* ── Quick Links ── */}
          <div className="md:col-span-3">
            <h3
              className="text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
              style={{ color: "rgba(255,32,78,0.5)", fontFamily: "var(--font-tactical)" }}
            >
              NAVIGATION
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm inline-flex items-center gap-2 group transition-colors duration-200"
                    style={{ color: "rgba(245,245,245,0.35)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(245,245,245,0.75)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(245,245,245,0.35)"; }}
                  >
                    <span
                      className="w-0 group-hover:w-3 h-px transition-all duration-200"
                      style={{ background: "#FF204E" }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="md:col-span-4">
            <h3
              className="text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
              style={{ color: "rgba(255,32,78,0.5)", fontFamily: "var(--font-tactical)" }}
            >
              COMMUNICATIONS
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={14} style={{ color: "rgba(255,32,78,0.4)" }} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm" style={{ color: "rgba(245,245,245,0.35)" }}>{contact.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={14} style={{ color: "rgba(255,32,78,0.4)" }} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm" style={{ color: "rgba(245,245,245,0.35)" }}>{contact.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} style={{ color: "rgba(255,32,78,0.4)" }} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm whitespace-pre-line" style={{ color: "rgba(245,245,245,0.35)" }}>{contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,32,78,0.06)" }}
        >
          <p className="text-xs flex items-center gap-2" style={{ color: "rgba(245,245,245,0.2)" }}>
            <Zap size={10} className="text-[#FF204E] opacity-30" />
            © {new Date().getFullYear()} Riviera 2026 — Haldia Institute of Technology. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group w-9 h-9 rounded-sm flex items-center justify-center transition-all duration-200"
            style={{
              border: "1px solid rgba(255,32,78,0.12)",
              color: "rgba(245,245,245,0.3)",
              background: "rgba(255,32,78,0.04)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,32,78,0.3)";
              e.currentTarget.style.color = "rgba(245,245,245,0.6)";
              e.currentTarget.style.background = "rgba(255,32,78,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,32,78,0.12)";
              e.currentTarget.style.color = "rgba(245,245,245,0.3)";
              e.currentTarget.style.background = "rgba(255,32,78,0.04)";
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
