"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Activities", href: "/#activities" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

interface UserInfo {
  name: string;
  email: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  /* Track scroll for navbar transparency */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Check user login state from localStorage */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch { /* ignore */ }

    // Listen for storage changes (login/logout in other tabs)
    const handleStorage = () => {
      try {
        const stored = localStorage.getItem("user");
        setUser(stored ? JSON.parse(stored) : null);
      } catch { setUser(null); }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Do not render the public navbar on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.replace("/#", "/"));
  };

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  }

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="section-container flex items-center justify-between h-[4.5rem] md:h-20">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-[var(--clr-primary)]/60 transition-all duration-300 flex-shrink-0">
              <Image
                src="/riviera-logo.jpeg"
                alt="Riviera Logo"
                fill
                className="object-cover"
                priority
                sizes="48px"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent group-hover:from-[var(--clr-primary)] group-hover:to-red-400 transition-all duration-300">
                Riviera
              </span>
              <span className="text-[9px] md:text-[10px] text-[var(--clr-text-dim)] uppercase tracking-[0.25em] font-semibold -mt-0.5">
                HIT Haldia
              </span>
            </div>
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-[var(--clr-text-muted)] hover:text-white"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-white/[0.06] rounded-lg -z-10"
                    transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* ── Desktop Actions ── */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/10">
                  <User size={16} className="text-[var(--clr-primary)]" />
                  <span className="text-sm text-white/80 font-medium max-w-[120px] truncate">{user.name}</span>
                </div>
                <button onClick={handleLogout} className="btn-outline !py-2.5 !px-4 !text-sm flex items-center gap-2">
                  <LogOut size={14} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/register" className="btn-primary !py-2.5 !px-6 !text-sm">Register</Link>
                <Link href="/login" className="btn-outline !py-2.5 !px-5 !text-sm">Log in</Link>
              </>
            )}
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div className="absolute top-[4.5rem] inset-x-0 bg-[var(--clr-surface)] border-b border-white/[0.08] shadow-2xl" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
              <div className="section-container py-6 flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link href={link.href} onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive(link.href) ? "text-white bg-white/[0.06]" : "text-[var(--clr-text-muted)] hover:text-white hover:bg-white/[0.04]"}`}>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="flex gap-3 mt-4 pt-4 border-t border-white/[0.06]">
                  {user ? (
                    <>
                      <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white/80">
                        <User size={16} className="text-[var(--clr-primary)]" />
                        <span className="truncate">{user.name}</span>
                      </div>
                      <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="btn-outline !text-sm flex items-center gap-2 px-4">
                        <LogOut size={14} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-primary flex-1 justify-center !text-sm">Register</Link>
                      <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-outline flex-1 justify-center !text-sm">Log in</Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}