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
        className="fixed top-4 inset-x-4 md:inset-x-8 z-50 transition-all duration-500 rounded-sm"
        style={{
          background: scrolled ? "rgba(5,5,7,0.85)" : "rgba(5,5,7,0.25)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(6px)",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(6px)",
          border: `1px solid ${scrolled ? "rgba(255,32,78,0.1)" : "rgba(255,32,78,0.03)"}`,
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.4), 0 0 20px rgba(255,32,78,0.03)"
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
                border: "1px solid rgba(255,32,78,0.15)",
                boxShadow: "0 0 10px rgba(255,32,78,0.06)",
              }}
            >
              <Image
                src="/logojjk.png"
                alt="Riviera Logo"
                fill
                className="object-cover"
                priority
                sizes="40px"
              />
            </div>
            <div className="flex flex-col">
              <span
                className="text-lg md:text-xl font-black tracking-tight"
                style={{ fontFamily: "var(--font-tactical)", color: "#F5F5F5" }}
              >
                RIVIERA
              </span>
              <span
                className="text-[7px] md:text-[8px] uppercase tracking-[0.3em] font-bold -mt-0.5"
                style={{ color: "rgba(255,32,78,0.45)", fontFamily: "var(--font-tactical)" }}
              >
                HIT HALDIA
              </span>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href, link.hash);
              return (
                <Link
                  key={`${link.href}-${link.hash}`}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium rounded-sm transition-colors duration-200"
                  style={{
                    color: active ? "#F5F5F5" : "rgba(245,245,245,0.45)",
                    fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = "rgba(245,245,245,0.75)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = "rgba(245,245,245,0.45)";
                  }}
                >
                  {/* Active indicator pill */}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-sm -z-10"
                      style={{
                        background: "rgba(255,32,78,0.08)",
                        border: "1px solid rgba(255,32,78,0.2)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ── Desktop CTA — Enter Games ── */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="culling-btn-primary group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-sm
                text-xs font-bold uppercase tracking-[0.12em] overflow-hidden
                transition-all duration-300"
              style={{
                background: "rgba(255,32,78,0.08)",
                border: "1px solid rgba(255,32,78,0.35)",
                color: "#F5F5F5",
                fontFamily: "var(--font-heading)",
                boxShadow: "0 0 15px rgba(255,32,78,0.06)",
              }}
            >
              <span className="relative z-10">Enter Games</span>
              <ExternalLink size={11} className="relative z-10 opacity-60" />
            </a>
          </div>

          {/* ── Mobile toggle ── */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-10 h-10 flex items-center justify-center rounded-sm transition-colors"
              style={{
                background: "rgba(255,32,78,0.04)",
                border: "1px solid rgba(255,32,78,0.12)",
                color: "rgba(245,245,245,0.6)",
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
              style={{ background: "rgba(5,5,7,0.75)" }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="absolute top-20 inset-x-4 md:inset-x-8 rounded-sm overflow-hidden"
              style={{
                background: "rgba(9,9,15,0.95)",
                border: "1px solid rgba(255,32,78,0.12)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 30px rgba(255,32,78,0.04)",
              }}
              initial={{ y: -16, opacity: 0, scale: 0.98 }}
              animate={{ y: 0,   opacity: 1, scale: 1    }}
              exit={{    y: -16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top crimson line */}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,32,78,0.3), transparent)" }}
              />

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
                        className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium
                          transition-all duration-200"
                        style={{
                          color:      active ? "#F5F5F5" : "rgba(245,245,245,0.4)",
                          background: active ? "rgba(255,32,78,0.06)" : "transparent",
                          borderLeft: active
                            ? "2px solid rgba(255,32,78,0.5)"
                            : "2px solid transparent",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {active && (
                          <span
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: "#FF204E", boxShadow: "0 0 6px rgba(255,32,78,0.5)" }}
                          />
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
                  style={{ borderTop: "1px solid rgba(255,32,78,0.08)" }}
                >
                  <a
                    href={REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="culling-btn-primary flex items-center justify-center gap-2 w-full py-3 rounded-sm
                      text-sm font-bold uppercase tracking-[0.1em] transition-all duration-200"
                    style={{
                      background: "rgba(255,32,78,0.08)",
                      border: "1px solid rgba(255,32,78,0.35)",
                      color: "#F5F5F5",
                      fontFamily: "var(--font-heading)",
                      boxShadow: "0 0 12px rgba(255,32,78,0.06)",
                    }}
                  >
                    Enter Games
                    <ExternalLink size={12} className="opacity-50" />
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