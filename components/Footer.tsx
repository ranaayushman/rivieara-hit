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
    <footer className="relative" style={{ background: "var(--surface-primary)" }}>
      {/* Top gold gradient line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--gold-primary), transparent)",
          opacity: 0.3,
        }}
      />

      {/* Subtle glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(212, 160, 23, 0.05), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="section-container py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* ── Brand ── */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block group">
              <h2
                className="text-2xl md:text-3xl font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span
                  className="text-gradient-gold"
                >
                  Riviera
                </span>{" "}
                <span style={{ color: "var(--gold-primary)" }}>2026</span>
              </h2>
            </Link>
            <p
              className="mt-4 text-sm leading-relaxed max-w-sm"
              style={{ color: "var(--text-dim)" }}
            >
              The official website of Riviera — the annual techno-cultural fest of
              Haldia Institute of Technology. Three days of innovation, culture,
              and unforgettable memories.
            </p>

            {/* Decorative Arabian text */}
            <p
              className="mt-4 text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-arabian)", color: "var(--gold-primary)", opacity: 0.4 }}
            >
              ✦ Arabian Nights ✦
            </p>
          </div>

          {/* ── Quick Links ── */}
          <div className="md:col-span-3">
            <h3
              className="text-sm font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: "var(--gold-primary)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm inline-flex items-center gap-1.5 group"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span
                      className="w-0 h-px"
                      style={{ background: "var(--gold-primary)" }}
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
              className="text-sm font-semibold uppercase tracking-[0.15em] mb-5"
              style={{ color: "var(--gold-primary)" }}
            >
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={16} style={{ color: "var(--gold-primary)" }} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>{contact.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} style={{ color: "var(--gold-primary)" }} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>{contact.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} style={{ color: "var(--gold-primary)" }} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm whitespace-pre-line" style={{ color: "var(--text-muted)" }}>{contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-dim)" }}>
            © {new Date().getFullYear()} Riviera 2026 — Haldia Institute of Technology. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              border: "1px solid var(--border-gold)",
              color: "var(--text-dim)",
              background: "var(--gold-subtle)",
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
