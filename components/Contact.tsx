"use client";

import { ArrowRight, Mail, Phone, User, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

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
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[var(--clr-bg)] text-white overflow-hidden pt-24 pb-16 px-4 sm:px-6">
      {/* Background */}
      <div className="bg-glow" />

      <motion.div
        className="relative z-10 w-full max-w-lg"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Card */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--clr-primary)] via-red-600 to-red-800" />

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.3),transparent_50%)]" />

          <div className="relative p-8 sm:p-10 md:p-12">
            {/* Heading */}
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                Contact Us
              </h2>
              <p className="text-white/60 text-sm">
                We&apos;d love to hear from you
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              <FormField
                label="Your Name"
                icon={<User size={14} className="text-white/50" />}
              >
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={inputStyles}
                  style={{ background: "rgba(0,0,0,0.25)", borderColor: "rgba(255,255,255,0.2)" }}
                />
              </FormField>

              <FormField
                label="Phone Number"
                icon={<Phone size={14} className="text-white/50" />}
              >
                <input
                  type="tel"
                  placeholder="+91 **********"
                  className={inputStyles}
                  style={{ background: "rgba(0,0,0,0.25)", borderColor: "rgba(255,255,255,0.2)" }}
                />
              </FormField>

              <FormField
                label="Email"
                icon={<Mail size={14} className="text-white/50" />}
              >
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  className={inputStyles}
                  style={{ background: "rgba(0,0,0,0.25)", borderColor: "rgba(255,255,255,0.2)" }}
                />
              </FormField>

              <FormField
                label="Query"
                icon={<MessageSquare size={14} className="text-white/50" />}
              >
                <textarea
                  rows={4}
                  placeholder="Write your message..."
                  className={`${inputStyles} !rounded-2xl resize-none`}
                  style={{ background: "rgba(0,0,0,0.25)", borderColor: "rgba(255,255,255,0.2)" }}
                />
              </FormField>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl bg-black/80 hover:bg-black text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                Submit
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
