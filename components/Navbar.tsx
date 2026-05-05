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
  avatar?: string;
}

/**
 * Floating cinematic glass navbar with Arabian gold accents,
 * animated active indicator, and premium mobile menu.
 */
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const p = JSON.parse(stored) as any;
        const normalized: UserInfo = {
          name: p.name,
          email: p.email,
          avatar: p.avatar || p.avatar_url || p.avatarUrl || undefined,
        };
        setUser(normalized);
      }
    } catch { /* ignore */ }

    const handleStorage = () => {
      try {
        const stored = localStorage.getItem("user");
        if (!stored) { setUser(null); return; }
        const p = JSON.parse(stored) as any;
        const normalized: UserInfo = {
          name: p.name,
          email: p.email,
          avatar: p.avatar || p.avatar_url || p.avatarUrl || undefined,
        };
        setUser(normalized);
      } catch { setUser(null); }
    };
    window.addEventListener("storage", handleStorage);

    // Also validate token with server-side /api/auth/me to ensure session is valid
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          // invalid token — clear local session
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          return;
        }
        const body = await res.json();
        if (body?.user) {
          const u = body.user as any;
          const normalized: UserInfo = {
            name: u.name,
            email: u.email,
            avatar: u.avatar || u.avatar_url || u.avatarUrl || undefined,
          };
          setUser(normalized);
          try { localStorage.setItem("user", JSON.stringify(normalized)); } catch {}
        }
      } catch {
        // network or other error — keep existing local user if any
      }
    })();

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

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

  function getInitials(name?: string) {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
    return (parts[0].slice(0, 1) + parts[1].slice(0, 1)).toUpperCase();
  }

  return (
    <>
      <nav
        className="fixed top-4 inset-x-4 md:inset-x-8 z-50 transition-all duration-700 rounded-full"
        style={{
          background: scrolled
            ? "var(--surface-glass)"
            : "rgba(5, 5, 5, 0.2)",
          backdropFilter: scrolled ? "blur(24px)" : "blur(8px)",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(8px)",
          border: `1px solid ${scrolled ? "var(--border-gold)" : "rgba(212, 160, 23, 0.05)"}`,
          boxShadow: scrolled
            ? "0 8px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(212, 160, 23, 0.05)"
            : "none",
        }}
      >
        <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-6">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
            <div
              className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden flex-shrink-0 transition-all duration-300"
              style={{
                border: "2px solid var(--border-gold)",
                boxShadow: "0 0 12px rgba(212, 160, 23, 0.1)",
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
                className="text-lg md:text-xl font-extrabold tracking-tight transition-all duration-300"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--text-primary)",
                }}
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
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200"
                style={{
                  color: isActive(link.href) ? "var(--gold-primary)" : "var(--text-muted)",
                }}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{
                      background: "var(--gold-dim)",
                      border: "1px solid var(--border-gold)",
                    }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* ── Desktop Actions ── */}
          <div className="hidden lg:flex items-center gap-4 border-l border-[rgba(212,160,23,0.2)] pl-6 ml-2">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center text-sm font-semibold"
                    style={{
                      background: user.avatar ? "transparent" : "var(--gold-subtle)",
                      border: user.avatar ? "1px solid var(--border-gold)" : "1px solid var(--border-gold)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {user.avatar ? (
                      <Image src={user.avatar} alt={user.name} width={36} height={36} className="object-cover" />
                    ) : (
                      <span style={{ color: "var(--gold-primary)" }}>{getInitials(user.name)}</span>
                    )}
                  </div>
                  <span className="max-w-[120px] truncate font-medium text-sm">{user.name}</span>
                </div>
                <button onClick={handleLogout} className="btn-outline-gold !py-2 !px-4 !text-sm flex items-center gap-2">
                  <LogOut size={14} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/register" className="btn-gold !py-2 !px-5 !text-sm">Register</Link>
                <Link href="/login" className="btn-outline-gold !py-2 !px-4 !text-sm">Log in</Link>
              </>
            )}
          </div>

          {/* ── Mobile Toggle ── */}
          <div className="lg:hidden flex items-center gap-3">
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
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div
              className="absolute inset-0 backdrop-blur-sm"
              style={{ background: "rgba(5, 5, 5, 0.6)" }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute top-20 inset-x-4 md:inset-x-8 rounded-3xl shadow-2xl"
              style={{
                background: "var(--surface-primary)",
                border: "1px solid var(--border-gold)",
              }}
              initial={{ y: -20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-6 flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link href={link.href} onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-xl text-base font-medium transition-colors"
                      style={{
                        color: isActive(link.href) ? "var(--gold-primary)" : "var(--text-muted)",
                        background: isActive(link.href) ? "var(--gold-dim)" : "transparent",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="flex gap-3 mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                  {user ? (
                    <>
                      <div
                        className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                        style={{
                          background: "var(--gold-subtle)",
                          border: "1px solid var(--border-gold)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {user.avatar ? (
                          <Image src={user.avatar} alt={user.name} width={28} height={28} className="rounded-full object-cover" />
                        ) : (
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold" style={{ background: "var(--gold-subtle)", color: "var(--gold-primary)" }}>
                            {getInitials(user.name)}
                          </div>
                        )}
                        <span className="truncate">{user.name}</span>
                      </div>
                      <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="btn-outline-gold !text-sm flex items-center gap-2 px-4">
                        <LogOut size={14} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-gold flex-1 justify-center !text-sm">Register</Link>
                      <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-outline-gold flex-1 justify-center !text-sm">Log in</Link>
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