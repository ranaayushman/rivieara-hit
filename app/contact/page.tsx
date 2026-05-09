"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Instagram, MapPin, Phone, ChevronDown, ExternalLink, Star } from "lucide-react";
import Link from "next/link";

/* ── FAQ Data ── */
const FAQS = [
  {
    q: "What is the Riviera Pass and what does it include?",
    a: "The Riviera Pass (₹599/-) gives you all-access entry to all events, cultural nights, tech expo, gaming arena, and exclusive fest merchandise for all 3 days of Riviera 2026.",
  },
  {
    q: "Can I participate in individual events without the Riviera Pass?",
    a: "Yes! You can pay ₹100/- per event as an individual entry fee. However, the Riviera Pass is recommended for maximum value if you plan to attend multiple events.",
  },
  {
    q: "Who can participate in Riviera 2026?",
    a: "Riviera 2026 is open to all undergraduate and postgraduate students from any recognized college or university across India.",
  },
  {
    q: "How do I register for Riviera 2026?",
    a: "Click the 'Register Now' button on the homepage or use the 'Enter The Realm' button. You will be redirected to our official Google Form for registration.",
  },
  {
    q: "Will accommodation be provided for outstation participants?",
    a: "Yes, limited accommodation is available on campus for outstation participants. Please mention your requirement during registration and our team will get back to you.",
  },
  {
    q: "Is there a team size limit for events like Hackathon?",
    a: "Team sizes vary per event — Hackathon allows 2–4 members, while most technical events are solo or pairs. Specific details are mentioned on each event's registration page.",
  },
  {
    q: "What is the last date for registration?",
    a: "Early bird registration closes soon. We recommend registering as early as possible to secure your spot. Follow our Instagram for deadline announcements.",
  },
  {
    q: "Where is HIT Haldia located?",
    a: "Haldia Institute of Technology is located in Haldia, West Bengal — approximately 125 km from Kolkata. The campus is well connected by road and rail.",
  },
];

/* ── Corner Ornament ── */
function CornerOrnament({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const r = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  const style: React.CSSProperties = {
    position: "absolute",
    width: 56, height: 56,
    top:    pos.startsWith("t") ? 0 : "auto",
    bottom: pos.startsWith("b") ? 0 : "auto",
    left:   pos.endsWith("l")  ? 0 : "auto",
    right:  pos.endsWith("r")  ? 0 : "auto",
    pointerEvents: "none",
  };
  return (
    <div style={style}>
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ transform: `rotate(${r}deg)` }}>
        <path d="M0 0 L36 0 L0 36 Z" fill="rgba(212,160,23,0.07)" />
        <path d="M0 0 L24 0 L0 24 Z" fill="rgba(212,160,23,0.1)" />
        <path d="M2 0 L2 18 M0 2 L18 2" stroke="#D4A017" strokeWidth="0.8" opacity="0.45" />
        <circle cx="2" cy="2" r="1.5" fill="#D4A017" opacity="0.55" />
        <path d="M7 0 L0 7 M14 0 L0 14 M21 0 L0 21" stroke="#D4A017" strokeWidth="0.4" opacity="0.25" />
      </svg>
    </div>
  );
}

/* ── Gold Divider ── */
function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-2">
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(212,160,23,0.4))" }} />
      <span style={{ color: "#D4A017", fontSize: 12 }}>✦</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(212,160,23,0.4))" }} />
    </div>
  );
}

/* ── Section Header ── */
function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center mb-14">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div style={{ height: 1, width: 32, background: "rgba(212,160,23,0.45)" }} />
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.3em", color: "rgba(212,160,23,0.7)", textTransform: "uppercase" }}>
          {eyebrow}
        </p>
        <div style={{ height: 1, width: 32, background: "rgba(212,160,23,0.45)" }} />
      </div>
      <h2 style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        fontWeight: 900,
        background: "linear-gradient(135deg, #F0D078 0%, #D4A017 45%, #F0D078 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "0.04em",
        lineHeight: 1.1,
      }}>
        {title}
      </h2>
    </div>
  );
}

/* ── FAQ Item ── */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
    >
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer relative overflow-hidden"
        style={{
          background: open ? "rgba(212,160,23,0.06)" : "rgba(10,7,3,0.5)",
          border: `1px solid ${open ? "rgba(212,160,23,0.35)" : "rgba(212,160,23,0.14)"}`,
          borderRadius: 12,
          transition: "all 0.3s ease",
          marginBottom: 10,
        }}
      >
        {/* left accent bar */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
          background: open ? "linear-gradient(to bottom, #F0D078, #D4A017)" : "transparent",
          borderRadius: "12px 0 0 12px",
          transition: "all 0.3s ease",
        }} />

        <div className="flex items-center justify-between gap-4 px-6 py-4">
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 13,
            fontWeight: 600,
            color: open ? "#F0D078" : "rgba(220,210,185,0.88)",
            letterSpacing: "0.02em",
            transition: "color 0.3s",
            lineHeight: 1.5,
          }}>
            {q}
          </p>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ flexShrink: 0 }}>
            <ChevronDown size={16} color={open ? "#D4A017" : "rgba(212,160,23,0.45)"} />
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <p style={{
                padding: "0 24px 16px 24px",
                fontSize: 13,
                lineHeight: 1.75,
                color: "rgba(210,198,172,0.88)",
                fontFamily: "sans-serif",
                textShadow: "0 1px 8px rgba(0,0,0,0.6)",
              }}>
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Main Page ── */
export default function ContactPage() {
  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{ background: "var(--bg-primary, #050508)" }}
    >
      {/* ── Atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 50% at 20% 20%, rgba(139,94,0,0.12) 0%, transparent 65%),
          radial-gradient(ellipse 60% 40% at 80% 70%, rgba(212,160,23,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 80% 60% at 50% 100%, rgba(74,30,0,0.2) 0%, transparent 55%)
        `,
      }} />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 55 }, (_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 37.3 + 11) % 100}%`,
            top:  `${(i * 19.7 + 7)  % 85}%`,
            width:  1 + (i % 3) * 0.8,
            height: 1 + (i % 3) * 0.8,
            borderRadius: "50%",
            background: "#F0D078",
            opacity: 0.15 + (i % 5) * 0.08,
            animation: `twinkle ${3 + (i % 4)}s ${(i % 5) * 0.6}s ease-in-out infinite`,
          }} />
        ))}
      </div>

      <style>{`
        @keyframes twinkle { 0%,100%{opacity:.15} 50%{opacity:.7} }
        @keyframes float   { 0%,100%{transform:translateY(0) rotate(-4deg)} 50%{transform:translateY(-12px) rotate(4deg)} }
      `}</style>

      {/* Floating lanterns */}
      {[
        { left: "4%",  top: "12%", size: 22, delay: "0s"   },
        { left: "8%",  top: "40%", size: 16, delay: "1.4s" },
        { right:"5%",  top: "18%", size: 20, delay: "0.7s" },
        { right:"9%",  top: "55%", size: 14, delay: "2s"   },
      ].map((l, i) => (
        <div key={i} style={{ position: "absolute", ...l, animation: `float 5s ${l.delay} ease-in-out infinite`, pointerEvents: "none", zIndex: 2 }}>
          <svg width={l.size} height={l.size * 2.1} viewBox="0 0 30 58" fill="none">
            <line x1="15" y1="0" x2="15" y2="9" stroke="#D4A017" strokeWidth="1.8" />
            <ellipse cx="15" cy="12" rx="8" ry="3.5" fill="#5a3800" />
            <rect x="6" y="12" width="18" height="32" rx="5" fill="#100800" stroke="#D4A017" strokeWidth="1" />
            <rect x="8" y="14" width="14" height="28" rx="4" fill="rgba(212,150,23,.22)" />
            <line x1="15" y1="15" x2="15" y2="41" stroke="#D4A017" strokeWidth=".6" opacity=".45" />
            <ellipse cx="15" cy="44" rx="8" ry="3.5" fill="#5a3800" />
            <ellipse cx="15" cy="28" rx="3.5" ry="6" fill="rgba(255,185,35,.42)" />
          </svg>
        </div>
      ))}

      {/* ── Page content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-24">

        {/* ── HERO HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div style={{ height: 1, width: 40, background: "rgba(212,160,23,0.45)" }} />
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.35em", color: "rgba(212,160,23,0.65)", textTransform: "uppercase" }}>
              ✦ Find Us ✦
            </p>
            <div style={{ height: 1, width: 40, background: "rgba(212,160,23,0.45)" }} />
          </div>
          <h1 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            fontWeight: 900,
            background: "linear-gradient(135deg, #F2EDE0 0%, #D4A017 40%, #F0D078 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.03em",
            lineHeight: 1,
            marginBottom: 20,
          }}>
            Contact Us
          </h1>
          <p style={{
            fontSize: 15,
            color: "rgba(220,210,185,0.88)",
            fontFamily: "sans-serif",
            lineHeight: 1.7,
            maxWidth: 480,
            margin: "0 auto",
            textShadow: "0 1px 12px rgba(4,4,16,0.9)",
          }}>
            Have questions about Riviera 2026? Reach out to us — we'd love to hear from you.
          </p>
        </motion.div>

        {/* ── TOP ROW: Pricing + Contact + Venue ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

          {/* Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative"
            style={{
              background: "rgba(10,7,3,0.75)",
              border: "1px solid rgba(212,160,23,0.28)",
              borderRadius: 16,
              overflow: "hidden",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
            }}
          >
            <CornerOrnament pos="tl" />
            <CornerOrnament pos="tr" />
            <div style={{ height: 2, background: "linear-gradient(to right, transparent, #D4A017 30%, #F0D078 50%, #D4A017 70%, transparent)" }} />
            <div className="p-7">
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.3em", color: "rgba(212,160,23,0.55)", textTransform: "uppercase", marginBottom: 16 }}>
                ✦ Pricing
              </p>
              <div className="space-y-5">
                {/* Riviera Pass */}
                <div style={{
                  background: "linear-gradient(135deg, rgba(212,160,23,0.12), rgba(212,160,23,0.04))",
                  border: "1px solid rgba(212,160,23,0.3)",
                  borderRadius: 12,
                  padding: "16px 18px",
                }}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 700, color: "#F0D078", marginBottom: 4 }}>
                        Riviera Pass
                      </p>
                      <p style={{ fontSize: 11, color: "rgba(210,198,172,0.75)", fontFamily: "sans-serif", lineHeight: 1.5 }}>
                        All-access · All 3 days · All events
                      </p>
                    </div>
                    <div style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 22,
                      fontWeight: 900,
                      background: "linear-gradient(135deg, #F0D078, #D4A017)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      whiteSpace: "nowrap",
                    }}>
                      ₹599
                    </div>
                  </div>
                </div>

                {/* Per Event */}
                <div style={{
                  background: "rgba(10,7,3,0.4)",
                  border: "1px solid rgba(212,160,23,0.15)",
                  borderRadius: 12,
                  padding: "14px 18px",
                }}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600, color: "rgba(220,210,185,0.9)", marginBottom: 4 }}>
                        Event Entry Fee
                      </p>
                      <p style={{ fontSize: 11, color: "rgba(210,198,172,0.65)", fontFamily: "sans-serif" }}>
                        Per event · Pay as you go
                      </p>
                    </div>
                    <div style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 22,
                      fontWeight: 900,
                      color: "rgba(220,210,185,0.85)",
                      whiteSpace: "nowrap",
                    }}>
                      ₹100
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
            style={{
              background: "rgba(10,7,3,0.75)",
              border: "1px solid rgba(212,160,23,0.28)",
              borderRadius: 16,
              overflow: "hidden",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
            }}
          >
            <CornerOrnament pos="tl" />
            <CornerOrnament pos="br" />
            <div style={{ height: 2, background: "linear-gradient(to right, transparent, #D4A017 30%, #F0D078 50%, #D4A017 70%, transparent)" }} />
            <div className="p-7">
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.3em", color: "rgba(212,160,23,0.55)", textTransform: "uppercase", marginBottom: 16 }}>
                ✦ Get In Touch
              </p>

              <div className="space-y-4">
                {/* Email */}
                <a href="mailto:info@riviera2026.com" className="flex items-center gap-4 group" style={{ textDecoration: "none" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "rgba(212,160,23,0.1)",
                    border: "1px solid rgba(212,160,23,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                  }}>
                    <Mail size={16} color="#D4A017" />
                  </div>
                  <div>
                    <p style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(212,160,23,0.5)", textTransform: "uppercase", marginBottom: 2, fontFamily: "sans-serif" }}>Email</p>
                    <p style={{ fontSize: 13, color: "rgba(220,210,185,0.9)", fontFamily: "'Cinzel', serif", fontWeight: 600 }}>info@riviera2026.com</p>
                  </div>
                </a>

                <GoldDivider />

                {/* Instagram */}
                <a href="https://www.instagram.com/rivierahit?igsh=MTZ2YzhlM3ZlZzVodg==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4" style={{ textDecoration: "none" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "rgba(212,160,23,0.1)",
                    border: "1px solid rgba(212,160,23,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Instagram size={16} color="#D4A017" />
                  </div>
                  <div>
                    <p style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(212,160,23,0.5)", textTransform: "uppercase", marginBottom: 2, fontFamily: "sans-serif" }}>Instagram</p>
                    <p style={{ fontSize: 13, color: "rgba(220,210,185,0.9)", fontFamily: "'Cinzel', serif", fontWeight: 600 }}>@rivierahit</p>
                  </div>
                  <ExternalLink size={12} color="rgba(212,160,23,0.4)" style={{ marginLeft: "auto" }} />
                </a>

                <GoldDivider />

                {/* Teacher Contact */}
                <div className="flex items-center gap-4">
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "rgba(212,160,23,0.1)",
                    border: "1px solid rgba(212,160,23,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Phone size={16} color="#D4A017" />
                  </div>
                  <div>
                    <p style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(212,160,23,0.5)", textTransform: "uppercase", marginBottom: 2, fontFamily: "sans-serif" }}>Faculty Coordinator</p>
                    <p style={{ fontSize: 13, color: "rgba(220,210,185,0.9)", fontFamily: "'Cinzel', serif", fontWeight: 600 }}>Dr. Abhishek</p>
                    <a href="tel:+919734422649" style={{ fontSize: 12, color: "rgba(212,160,23,0.7)", fontFamily: "sans-serif", textDecoration: "none" }}>
                      +91 97344 22649
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Venue Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
            style={{
              background: "rgba(10,7,3,0.75)",
              border: "1px solid rgba(212,160,23,0.28)",
              borderRadius: 16,
              overflow: "hidden",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
            }}
          >
            <CornerOrnament pos="tr" />
            <CornerOrnament pos="bl" />
            <div style={{ height: 2, background: "linear-gradient(to right, transparent, #D4A017 30%, #F0D078 50%, #D4A017 70%, transparent)" }} />
            <div className="p-7">
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.3em", color: "rgba(212,160,23,0.55)", textTransform: "uppercase", marginBottom: 16 }}>
                ✦ Venue
              </p>

              <div className="flex items-start gap-3 mb-5">
                <MapPin size={18} color="#D4A017" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 700, color: "#F0D078", marginBottom: 4 }}>
                    HIT Haldia
                  </p>
                  <p style={{ fontSize: 12, color: "rgba(210,198,172,0.8)", fontFamily: "sans-serif", lineHeight: 1.6 }}>
                    Haldia Institute of Technology<br />
                    ICARE Complex, Haldia<br />
                    West Bengal – 721657
                  </p>
                </div>
              </div>

              {/* Mini map placeholder — styled as Arabian scroll */}
              <div style={{
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid rgba(212,160,23,0.2)",
                position: "relative",
                height: 130,
                background: "rgba(5,8,20,0.8)",
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.1!2d88.0498!3d22.0612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02f0e9b0b0b0b0%3A0x0!2sHaldia+Institute+of+Technology!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="130"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.4) brightness(0.7)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="HIT Haldia Map"
                />
              </div>

              <a
                href="https://maps.google.com/?q=Haldia+Institute+of+Technology"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-4"
                style={{
                  background: "rgba(212,160,23,0.08)",
                  border: "1px solid rgba(212,160,23,0.22)",
                  borderRadius: 8,
                  padding: "9px 0",
                  textDecoration: "none",
                  fontFamily: "'Cinzel', serif",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  color: "#D4A017",
                  textTransform: "uppercase",
                  transition: "all 0.3s ease",
                }}
              >
                <ExternalLink size={11} />
                Open in Maps
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── FAQ SECTION ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader eyebrow="Got Questions?" title="FAQ" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            <div>
              {FAQS.slice(0, 4).map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
            <div>
              {FAQS.slice(4).map((faq, i) => (
                <FAQItem key={i + 4} q={faq.q} a={faq.a} index={i + 4} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── BOTTOM CTA STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-20 text-center relative"
          style={{
            background: "rgba(10,7,3,0.7)",
            border: "1px solid rgba(212,160,23,0.25)",
            borderRadius: 20,
            padding: "48px 32px",
            backdropFilter: "blur(16px)",
            overflow: "hidden",
          }}
        >
          <CornerOrnament pos="tl" />
          <CornerOrnament pos="tr" />
          <CornerOrnament pos="bl" />
          <CornerOrnament pos="br" />
          <div style={{ height: 2, background: "linear-gradient(to right, transparent, #D4A017 30%, #F0D078 50%, #D4A017 70%, transparent)", position: "absolute", top: 0, left: 0, right: 0 }} />

          <Star size={20} color="#D4A017" style={{ margin: "0 auto 16px" }} />
          <h3 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
            fontWeight: 800,
            color: "#F2EDE0",
            marginBottom: 10,
            letterSpacing: "0.04em",
          }}>
            Still have questions?
          </h3>
          <p style={{
            fontSize: 14,
            color: "rgba(210,198,172,0.82)",
            fontFamily: "sans-serif",
            marginBottom: 28,
            lineHeight: 1.6,
            textShadow: "0 1px 8px rgba(0,0,0,0.7)",
          }}>
            Write to us at{" "}
            <a href="mailto:hithaldiariviera@gmail.com" style={{ color: "#D4A017", textDecoration: "none", fontFamily: "'Cinzel', serif" }}>
              hithaldiariviera@gmail.com 
            </a>{" "}
            and we'll get back to you within 24 hours.
          </p>
          <a
            href="mailto:hithaldiariviera@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "linear-gradient(135deg, #C49010, #F0D078)",
              color: "#050505",
              fontFamily: "'Cinzel', serif",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "13px 32px",
              borderRadius: 40,
              textDecoration: "none",
              boxShadow: "0 4px 24px rgba(212,160,23,0.25)",
            }}
          >
            <Mail size={14} />
            Send Us a Message
          </a>
        </motion.div>

      </div>
    </main>
  );
}