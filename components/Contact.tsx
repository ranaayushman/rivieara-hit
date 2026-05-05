"use client";

import { useState, FormEvent, useMemo } from "react";
import { ArrowRight, Mail, Phone, User, MessageSquare, Check } from "lucide-react";
import { motion } from "framer-motion";
import { generateStars, getPerformanceAdjustedParticles } from "@/lib/particleAnimations";

interface FormFieldProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function FormField({ label, icon, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm text-[var(--clr-text-muted)] font-medium">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyles =
  "w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-[var(--clr-text-dim)] focus:border-[var(--clr-primary)] focus:ring-2 focus:ring-[var(--clr-primary)]/20 outline-none transition-all duration-300 text-sm";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      setSuccess(true);
      setName(""); setEmail(""); setPhone(""); setMessage("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[var(--clr-bg)] text-white overflow-hidden pt-24 pb-16 px-4 sm:px-6">
      <div className="bg-glow" />

      {/* ── PARTICLE ANIMATIONS ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {useMemo(() => {
          const { starCount } = getPerformanceAdjustedParticles(false);
          const stars = generateStars(Math.floor(starCount / 2));
          return stars.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full"
              style={{
                width: s.size,
                height: s.size,
                left: s.x,
                top: s.y,
                background: "var(--gold-primary)",
                opacity: s.opacity,
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
            />
          ));
        }, [])}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-lg"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--clr-primary)] via-red-600 to-red-800" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.3),transparent_50%)]" />

          <div className="relative p-8 sm:p-10 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Contact Us</h2>
              <p className="text-white/60 text-sm">We&apos;d love to hear from you</p>
            </div>

            {success ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <Check size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/60 text-sm">Thank you! We&apos;ll get back to you soon.</p>
                <button onClick={() => setSuccess(false)} className="mt-6 px-6 py-2.5 rounded-xl bg-black/40 hover:bg-black/60 text-white text-sm font-medium transition-all">
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <FormField label="Your Name" icon={<User size={14} className="text-white/50" />}>
                  <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required className={inputStyles} style={{ background: "rgba(0,0,0,0.25)", borderColor: "rgba(255,255,255,0.2)" }} />
                </FormField>

                <FormField label="Phone Number" icon={<Phone size={14} className="text-white/50" />}>
                  <input type="tel" placeholder="+91 **********" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputStyles} style={{ background: "rgba(0,0,0,0.25)", borderColor: "rgba(255,255,255,0.2)" }} />
                </FormField>

                <FormField label="Email" icon={<Mail size={14} className="text-white/50" />}>
                  <input type="email" placeholder="yourname@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputStyles} style={{ background: "rgba(0,0,0,0.25)", borderColor: "rgba(255,255,255,0.2)" }} />
                </FormField>

                <FormField label="Query" icon={<MessageSquare size={14} className="text-white/50" />}>
                  <textarea rows={4} placeholder="Write your message..." value={message} onChange={(e) => setMessage(e.target.value)} required className={`${inputStyles} !rounded-2xl resize-none`} style={{ background: "rgba(0,0,0,0.25)", borderColor: "rgba(255,255,255,0.2)" }} />
                </FormField>

                {error && <div className="bg-red-900/30 border border-red-500/30 text-red-200 text-sm p-3 rounded-xl">{error}</div>}

                <button type="submit" disabled={submitting} className="w-full mt-4 py-3.5 rounded-xl bg-black/80 hover:bg-black text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 group shadow-lg hover:shadow-xl disabled:opacity-50">
                  {submitting ? "Sending..." : "Submit"}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
