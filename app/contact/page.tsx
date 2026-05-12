"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Instagram, MapPin, Phone, ChevronDown, ExternalLink, Zap, Target, Shield } from "lucide-react";

/* ── FAQ Data ── */
const FAQS = [
  { q: "What is the Riviera Pass and what does it include?", a: "The Riviera Pass (₹599/-) gives you all-access entry to all events, cultural nights, tech expo, gaming arena, and exclusive fest merchandise for all 3 days of Riviera 2026." },
  { q: "Can I participate in individual events without the Riviera Pass?", a: "Yes! You can pay ₹100/- per event as an individual entry fee. However, the Riviera Pass is recommended for maximum value if you plan to attend multiple events." },
  { q: "Who can participate in Riviera 2026?", a: "Riviera 2026 is open to all undergraduate and postgraduate students from any recognized college or university across India." },
  { q: "How do I register for Riviera 2026?", a: "Click the 'Enter Games' button on the homepage. You will be redirected to our official registration portal." },
  { q: "Will accommodation be provided for outstation participants?", a: "Yes, limited accommodation is available on campus for outstation participants. Please mention your requirement during registration and our team will get back to you." },
  { q: "Is there a team size limit for events like Hackathon?", a: "Team sizes vary per event — Hackathon allows 2–4 members, while most technical events are solo or pairs. Specific details are mentioned on each event's registration page." },
  { q: "What is the last date for registration?", a: "Early bird registration closes soon. We recommend registering as early as possible to secure your spot. Follow our Instagram for deadline announcements." },
  { q: "Where is HIT Haldia located?", a: "Haldia Institute of Technology is located in Haldia, West Bengal — approximately 125 km from Kolkata. The campus is well connected by road and rail." },
];

/* ── Tactical Corner ── */
function TC({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const rotate = { tl: 0, tr: 90, bl: -90, br: 180 }[position];
  const pos = { tl: { top: -1, left: -1 }, tr: { top: -1, right: -1 }, bl: { bottom: -1, left: -1 }, br: { bottom: -1, right: -1 } }[position];
  return (
    <svg width="10" height="10" viewBox="0 0 14 14" className="absolute pointer-events-none z-30" style={{ ...pos, transform: `rotate(${rotate}deg)` }}>
      <path d="M0 0 L14 0 L14 2.5 L2.5 2.5 L2.5 14 L0 14 Z" fill="#FF204E" opacity="0.35" />
    </svg>
  );
}

/* ── Crimson Divider ── */
function CrimsonDivider() {
  return <div className="my-3" style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,32,78,0.1), transparent)" }} />;
}

/* ── FAQ Item ── */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer relative overflow-hidden rounded-sm transition-all duration-300"
        style={{
          background: open ? "rgba(255,32,78,0.04)" : "rgba(9,9,15,0.5)",
          border: `1px solid ${open ? "rgba(255,32,78,0.2)" : "rgba(255,32,78,0.06)"}`,
          marginBottom: 8,
        }}
      >
        {/* Left accent */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 2,
          background: open ? "linear-gradient(to bottom, #FF204E, #A91032)" : "transparent",
          transition: "all 0.3s ease",
        }} />

        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <p style={{
            fontFamily: "var(--font-heading)",
            fontSize: 13, fontWeight: 700,
            color: open ? "#F5F5F5" : "rgba(245,245,245,0.6)",
            transition: "color 0.3s", lineHeight: 1.5,
          }}>{q}</p>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ flexShrink: 0 }}>
            <ChevronDown size={14} color={open ? "#FF204E" : "rgba(255,32,78,0.3)"} />
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
              <p style={{ padding: "0 20px 14px 20px", fontSize: 12, lineHeight: 1.75, color: "rgba(245,245,245,0.4)" }}>{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Contact Info Row ── */
function ContactRow({ icon: Icon, label, children }: { icon: typeof Mail; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,32,78,0.05)", border: "1px solid rgba(255,32,78,0.12)" }}>
        <Icon size={14} style={{ color: "#FF204E", opacity: 0.5 }} />
      </div>
      <div>
        <p className="text-[8px] tracking-[0.2em] uppercase font-bold mb-0.5" style={{ color: "rgba(255,32,78,0.35)", fontFamily: "var(--font-tactical)" }}>{label}</p>
        {children}
      </div>
    </div>
  );
}

/* ═══ MAIN PAGE ═══ */
export default function ContactPage() {
  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(180deg, #050507 0%, #08080D 30%, #12070B 55%, #09090F 80%, #050507 100%)" }}>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.012]" style={{ backgroundImage: "linear-gradient(rgba(255,32,78,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,32,78,0.2) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.01]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)" }} />
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "radial-gradient(ellipse 65% 55% at 50% 40%, transparent 30%, rgba(5,5,7,0.5) 100%)" }} />
      <div className="absolute top-[20%] left-[40%] w-[500px] h-[500px] rounded-full pointer-events-none z-0" style={{ background: "radial-gradient(circle, rgba(255,32,78,0.03) 0%, transparent 65%)" }} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-24">

        {/* ── HERO ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
            <p className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-bold" style={{ fontFamily: "var(--font-tactical)", color: "#FF204E", opacity: 0.7 }}>◆ COMMUNICATIONS ◆</p>
            <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.02em]" style={{ fontFamily: "var(--font-heading)" }}>
            <span style={{ color: "#F5F5F5", textShadow: "0 0 35px rgba(255,32,78,0.1)" }}>CONTACT </span>
            <span style={{ background: "linear-gradient(135deg, #FF204E, #FF2E63, #FF4D6D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "var(--font-tactical)", filter: "drop-shadow(0 0 18px rgba(255,32,78,0.2))" }}>HQ</span>
          </h1>
          <p className="mt-5 text-sm md:text-base max-w-md mx-auto" style={{ color: "rgba(245,245,245,0.4)" }}>Have questions about the games? Reach out through secure channels.</p>
        </motion.div>

        {/* ── TOP ROW: Pricing + Contact + Venue ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">

          {/* Pricing Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}
            className="relative rounded-sm overflow-hidden" style={{ background: "rgba(9,9,15,0.75)", border: "1px solid rgba(255,32,78,0.08)", backdropFilter: "blur(10px)", boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }}>
            <TC position="tl" /><TC position="tr" /><TC position="bl" /><TC position="br" />
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.25), transparent)" }} />
            <div className="p-6">
              <p className="text-[8px] tracking-[0.3em] uppercase font-bold mb-5" style={{ color: "rgba(255,32,78,0.4)", fontFamily: "var(--font-tactical)" }}>◆ ENTRY PROTOCOL</p>
              
              {/* Riviera Pass */}
              <div className="rounded-sm p-4 mb-3" style={{ background: "rgba(255,32,78,0.04)", border: "1px solid rgba(255,32,78,0.12)" }}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-black mb-1" style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}>Riviera Pass</p>
                    <p className="text-[10px]" style={{ color: "rgba(245,245,245,0.3)" }}>All-access · All 3 days · All events</p>
                  </div>
                  <div className="text-xl font-black" style={{ background: "linear-gradient(135deg, #FF204E, #FF2E63)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "var(--font-heading)", whiteSpace: "nowrap" }}>₹599</div>
                </div>
              </div>

              {/* Per Event */}
              <div className="rounded-sm p-4" style={{ background: "rgba(9,9,15,0.4)", border: "1px solid rgba(255,32,78,0.06)" }}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold mb-1" style={{ fontFamily: "var(--font-heading)", color: "rgba(245,245,245,0.7)" }}>Event Entry Fee</p>
                    <p className="text-[10px]" style={{ color: "rgba(245,245,245,0.25)" }}>Per event · Pay as you go</p>
                  </div>
                  <div className="text-xl font-black" style={{ color: "rgba(245,245,245,0.6)", fontFamily: "var(--font-heading)", whiteSpace: "nowrap" }}>₹100</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Details Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
            className="relative rounded-sm overflow-hidden" style={{ background: "rgba(9,9,15,0.75)", border: "1px solid rgba(255,32,78,0.08)", backdropFilter: "blur(10px)", boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }}>
            <TC position="tl" /><TC position="tr" /><TC position="bl" /><TC position="br" />
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.25), transparent)" }} />
            <div className="p-6">
              <p className="text-[8px] tracking-[0.3em] uppercase font-bold mb-5" style={{ color: "rgba(255,32,78,0.4)", fontFamily: "var(--font-tactical)" }}>◆ SECURE CHANNELS</p>

              <div className="space-y-3">
                <a href="mailto:info@riviera2026.com" className="block" style={{ textDecoration: "none" }}>
                  <ContactRow icon={Mail} label="EMAIL">
                    <p className="text-xs font-bold" style={{ color: "rgba(245,245,245,0.7)", fontFamily: "var(--font-heading)" }}>info@riviera2026.com</p>
                  </ContactRow>
                </a>
                <CrimsonDivider />
                <a href="https://www.instagram.com/rivierahit?igsh=MTZ2YzhlM3ZlZzVodg==" target="_blank" rel="noopener noreferrer" className="flex items-center" style={{ textDecoration: "none" }}>
                  <ContactRow icon={Instagram} label="INSTAGRAM">
                    <p className="text-xs font-bold" style={{ color: "rgba(245,245,245,0.7)", fontFamily: "var(--font-heading)" }}>@rivierahit</p>
                  </ContactRow>
                  <ExternalLink size={10} style={{ marginLeft: "auto", color: "rgba(255,32,78,0.25)" }} />
                </a>
                <CrimsonDivider />
                <ContactRow icon={Phone} label="FACULTY COORDINATOR">
                  <p className="text-xs font-bold" style={{ color: "rgba(245,245,245,0.7)", fontFamily: "var(--font-heading)" }}>Dr. Abhishek</p>
                  <a href="tel:+919734422649" className="text-[11px]" style={{ color: "rgba(255,32,78,0.5)", textDecoration: "none" }}>+91 97344 22649</a>
                </ContactRow>
              </div>
            </div>
          </motion.div>

          {/* Venue Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }}
            className="relative rounded-sm overflow-hidden" style={{ background: "rgba(9,9,15,0.75)", border: "1px solid rgba(255,32,78,0.08)", backdropFilter: "blur(10px)", boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }}>
            <TC position="tl" /><TC position="tr" /><TC position="bl" /><TC position="br" />
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.25), transparent)" }} />
            <div className="p-6">
              <p className="text-[8px] tracking-[0.3em] uppercase font-bold mb-5" style={{ color: "rgba(255,32,78,0.4)", fontFamily: "var(--font-tactical)" }}>◆ ARENA LOCATION</p>

              <div className="flex items-start gap-3 mb-4">
                <MapPin size={16} style={{ color: "#FF204E", opacity: 0.4, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p className="text-sm font-black mb-1" style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}>HIT Haldia</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: "rgba(245,245,245,0.35)" }}>
                    Haldia Institute of Technology<br />ICARE Complex, Haldia<br />West Bengal – 721657
                  </p>
                </div>
              </div>

              <div className="rounded-sm overflow-hidden mb-3" style={{ border: "1px solid rgba(255,32,78,0.08)", height: 120 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.1!2d88.0498!3d22.0612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02f0e9b0b0b0b0%3A0x0!2sHaldia+Institute+of+Technology!5e0!3m2!1sen!2sin!4v1"
                  width="100%" height="120"
                  style={{ border: 0, filter: "invert(92%) hue-rotate(180deg) saturate(0.3) brightness(0.6)" }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="HIT Haldia Map"
                />
              </div>

              <a href="https://maps.google.com/?q=Haldia+Institute+of+Technology" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 rounded-sm transition-all duration-200"
                style={{ background: "rgba(255,32,78,0.04)", border: "1px solid rgba(255,32,78,0.12)", textDecoration: "none", fontFamily: "var(--font-tactical)", fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,32,78,0.5)", textTransform: "uppercase" }}>
                <ExternalLink size={10} /> OPEN IN MAPS
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── FAQ SECTION ── */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
              <p className="text-[9px] tracking-[0.5em] uppercase font-bold" style={{ fontFamily: "var(--font-tactical)", color: "#FF204E", opacity: 0.7 }}>◆ INTEL BRIEF ◆</p>
              <div style={{ height: 1, width: 28, background: "rgba(255,32,78,0.3)" }} />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[-0.02em]" style={{ fontFamily: "var(--font-heading)" }}>
              <span style={{ color: "#F5F5F5" }}>COMMON </span>
              <span style={{ background: "linear-gradient(135deg, #FF204E, #FF2E63)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "var(--font-tactical)" }}>QUERIES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
            <div>{FAQS.slice(0, 4).map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} index={i} />)}</div>
            <div>{FAQS.slice(4).map((faq, i) => <FAQItem key={i + 4} q={faq.q} a={faq.a} index={i + 4} />)}</div>
          </div>
        </motion.div>

        {/* ── BOTTOM CTA ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-20 text-center relative rounded-sm overflow-hidden"
          style={{ background: "rgba(9,9,15,0.7)", border: "1px solid rgba(255,32,78,0.1)", padding: "48px 32px", backdropFilter: "blur(10px)" }}>
          <TC position="tl" /><TC position="tr" /><TC position="bl" /><TC position="br" />
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.3), transparent)" }} />

          <Target size={18} style={{ color: "#FF204E", opacity: 0.4, margin: "0 auto 16px" }} />
          <h3 className="text-xl sm:text-2xl font-black mb-3" style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}>Still have questions?</h3>
          <p className="text-xs mb-6" style={{ color: "rgba(245,245,245,0.35)", lineHeight: 1.7 }}>
            Write to us at{" "}
            <a href="mailto:hithaldiariviera@gmail.com" style={{ color: "rgba(255,32,78,0.6)", textDecoration: "none", fontFamily: "var(--font-tactical)" }}>hithaldiariviera@gmail.com</a>
            {" "}and we'll respond within 24 hours.
          </p>
          <a href="mailto:hithaldiariviera@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #FF204E, #A91032)", color: "#F5F5F5", fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", boxShadow: "0 4px 20px rgba(255,32,78,0.2)" }}>
            <Mail size={13} /> SEND TRANSMISSION
          </a>
        </motion.div>
      </div>
    </main>
  );
}