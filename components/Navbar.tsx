"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink } from "lucide-react";

/* ── Update this URL with your actual Google Form link ── */
const REGISTER_URL = "https://forms.gle/dipySsXuGrTjJLfB8";

const NAV_LINKS = [
  { label: "Home",       href: "/",            hash: ""           },
  { label: "Schedule",   href: "/#schedule",   hash: "schedule"   },
  { label: "Activities", href: "/#activities", hash: "activities" },
  { label: "Sponsors",   href: "/#sponsors",   hash: "sponsors"   },
  { label: "Gallery",    href: "/gallery",     hash: ""           },
  { label: "Contact",    href: "/contact",     hash: ""           },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [activeHash, setActiveHash] = useState("");

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── IntersectionObserver: track visible section ── */
  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }

    const urlHash = window.location.hash.replace("#", "");
    if (urlHash) setActiveHash(urlHash);

    const sectionIds = ["schedule", "activities", "sponsors"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHash(id); },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    // Reset to Home when hero is back in view
    const heroEl =
      document.getElementById("hero") ??
      (document.querySelector("main > section:first-child") as Element | null);
    if (heroEl) {
      const topObs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHash(""); },
        { threshold: 0.5 }
      );
      topObs.observe(heroEl);
      observers.push(topObs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  /* ── Active check ── */
  const isActive = (href: string, hash: string): boolean => {
    if (hash)        return pathname === "/" && activeHash === hash;
    if (href === "/") return pathname === "/" && activeHash === "";
    return pathname.startsWith(href);
  };

  /* ── Close mobile menu on route change ── */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  /* ── Hide on admin routes ── */
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* ════════════════════════════════════════
          DESKTOP + TABLET NAVBAR
      ════════════════════════════════════════ */}
      <nav
        className="fixed top-4 inset-x-4 md:inset-x-8 z-50 transition-all duration-500 rounded-full"
        style={{
          background: scrolled ? "var(--surface-glass)" : "rgba(5, 5, 5, 0.20)",
          backdropFilter: scrolled ? "blur(24px)" : "blur(8px)",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(8px)",
          border: `1px solid ${scrolled ? "var(--border-gold)" : "rgba(212,160,23,0.05)"}`,
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.3), 0 0 30px rgba(212,160,23,0.05)"
            : "none",
        }}
      >
        <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-6">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={() => setMobileOpen(false)}
          >
            <div
              className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0
                transition-all duration-300 group-hover:scale-105"
              style={{
                border: "2px solid var(--border-gold)",
                boxShadow: "0 0 12px rgba(212,160,23,0.15)",
              }}
            >
              <Image
                src="/logo.png"
                alt="Riviera Logo"
                fill
                className="object-cover"
                priority
                sizes="40px"
              />
            </div>
            <div className="flex flex-col">
              <span
                className="text-lg md:text-xl font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
              >
                Riviera
              </span>
              <span
                className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] font-semibold -mt-0.5"
                style={{ color: "var(--text-dim)" }}
              >
                HIT Haldia
              </span>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href, link.hash);
              return (
                <Link
                  key={`${link.href}-${link.hash}`}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200
                    hover:text-[var(--gold-primary)]"
                  style={{ color: active ? "var(--gold-primary)" : "var(--text-muted)" }}
                >
                  {/* Shared layoutId pill — slides between active links */}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{
                        background: "var(--gold-dim)",
                        border: "1px solid var(--border-gold)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ── Desktop CTA — Register Now ── */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                text-xs font-semibold uppercase tracking-[0.10em] overflow-hidden
                transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #F6AD55, #FFB547, #FFC857)",
                color: "#0a0805",
                boxShadow: "0 0 20px rgba(255,181,71,0.20)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 35px rgba(255,181,71,0.40)";
                e.currentTarget.style.transform = "translateY(-1px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(255,181,71,0.20)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              {/* Shimmer sweep */}
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
                  transition-transform duration-700"
                style={{
                  background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)",
                }}
              />
              <span className="relative z-10">Register Now</span>
              <ExternalLink size={12} className="relative z-10 opacity-70" />
            </a>
          </div>

          {/* ── Mobile toggle ── */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-10 h-10 flex items-center justify-center rounded-full transition-colors"
              style={{
                background: "var(--gold-subtle)",
                border: "1px solid var(--border-gold)",
                color: "var(--gold-primary)",
              }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{    rotate:  90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate:  90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{    rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════
          MOBILE MENU
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 backdrop-blur-sm"
              style={{ background: "rgba(5,5,5,0.65)" }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="absolute top-20 inset-x-4 md:inset-x-8 rounded-3xl overflow-hidden"
              style={{
                background: "var(--surface-primary)",
                border: "1px solid var(--border-gold)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,160,23,0.06)",
              }}
              initial={{ y: -16, opacity: 0, scale: 0.98 }}
              animate={{ y: 0,   opacity: 1, scale: 1    }}
              exit={{    y: -16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-5 flex flex-col gap-1">

                {/* Nav links */}
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href, link.hash);
                  return (
                    <motion.div
                      key={`${link.href}-${link.hash}`}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0   }}
                      transition={{ delay: i * 0.04, duration: 0.22, ease: [0.16,1,0.3,1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                          transition-all duration-200"
                        style={{
                          color:      active ? "var(--gold-primary)" : "var(--text-muted)",
                          background: active ? "rgba(255,181,71,0.10)" : "transparent",
                          borderLeft: active
                            ? "2px solid rgba(255,181,71,0.55)"
                            : "2px solid transparent",
                        }}
                      >
                        {active && (
                          <span style={{ color: "var(--gold-primary)", fontSize: "8px" }}>✦</span>
                        )}
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Register CTA — bottom of mobile menu */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.04 + 0.05, duration: 0.22 }}
                  className="mt-3 pt-4"
                  style={{ borderTop: "1px solid rgba(255,181,71,0.10)" }}
                >
                  <a
                    href={REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                      text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-200"
                    style={{
                      background: "linear-gradient(135deg, #F6AD55, #FFB547, #FFC857)",
                      color: "#0a0805",
                      boxShadow: "0 0 20px rgba(255,181,71,0.18)",
                    }}
                  >
                    Register Now
                    <ExternalLink size={13} className="opacity-70" />
                  </a>
                </motion.div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}