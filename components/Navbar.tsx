"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";

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
  const router   = useRouter();

  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [activeHash,   setActiveHash]   = useState("");

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── IntersectionObserver: track which section is in view ─────────────────
  // FIX: uses IntersectionObserver so hash-based nav links (/#schedule etc.)
  // highlight correctly without relying on pathname (which never changes for
  // same-page hash navigation).
  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }

    // Sync from URL hash on direct load (e.g. /  #schedule)
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

  // ── FIX: Active check — handles hash sections AND real routes ─────────────
  // For hash links  (/#schedule):  active when on "/" AND that section is visible
  // For Home ("/"):                active when on "/" AND no section is highlighted
  // For real pages (/gallery etc): active when pathname starts with href
  const isActive = (href: string, hash: string): boolean => {
    if (hash)      return pathname === "/" && activeHash === hash;
    if (href === "/") return pathname === "/" && activeHash === "";
    return pathname.startsWith(href);
  };



  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  if (pathname.startsWith("/admin")) return null;



  return (
    <>
      <nav
        className="fixed top-4 inset-x-4 md:inset-x-8 z-50 transition-all duration-700 rounded-full"
        style={{
          background: scrolled ? "var(--surface-glass)" : "rgba(5, 5, 5, 0.2)",
          backdropFilter: scrolled ? "blur(24px)" : "blur(8px)",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(8px)",
          border: `1px solid ${scrolled ? "var(--border-gold)" : "rgba(212, 160, 23, 0.05)"}`,
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.3), 0 0 30px rgba(212,160,23,0.05)"
            : "none",
        }}
      >
        <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-6">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
            <div
              className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0 transition-all duration-300 group-hover:scale-105"
              style={{ border: "2px solid var(--border-gold)", boxShadow: "0 0 12px rgba(212,160,23,0.15)" }}
            >
              <Image src="/logo.png" alt="Riviera Logo" fill className="object-cover" priority sizes="40px" />
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

          {/* ── Desktop Links ── */}
          {/* FIX: layoutId="nav-indicator" is shared across all links so the
              gold pill slides smoothly between whichever link is active.
              Previously the pill could get "stuck" because each link rendered
              its own independent motion.div without a shared layoutId. */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href, link.hash);
              return (
                <Link
                  key={`${link.href}-${link.hash}`}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 hover:text-[var(--gold-primary)]"
                  style={{ color: active ? "var(--gold-primary)" : "var(--text-muted)" }}
                >
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



          {/* ── Mobile Toggle ── */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-10 h-10 flex items-center justify-center rounded-full transition-colors"
              style={{ background: "var(--gold-subtle)", border: "1px solid var(--border-gold)", color: "var(--gold-primary)" }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90,  opacity: 0 }} transition={{ duration: 0.2 }}><X    size={20} /></motion.span>
                  : <motion.span key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={20} /></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 backdrop-blur-sm"
              style={{ background: "rgba(5,5,5,0.6)" }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute top-20 inset-x-4 md:inset-x-8 rounded-3xl shadow-2xl"
              style={{ background: "var(--surface-primary)", border: "1px solid var(--border-gold)" }}
              initial={{ y: -20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-6 flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href, link.hash);
                  return (
                    <motion.div
                      key={`${link.href}-${link.hash}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200"
                        style={{
                          color:      active ? "var(--gold-primary)" : "var(--text-muted)",
                          background: active ? "var(--gold-dim)"     : "transparent",
                          borderLeft: active ? "2px solid var(--border-gold)" : "2px solid transparent",
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}


              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}