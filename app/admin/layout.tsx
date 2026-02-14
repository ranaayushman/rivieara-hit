"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getToken } from "@/lib/admin-auth";
import NavBar from "./_components/NavBar";
import type { NavItem } from "./_components/NavBar";

/* ------------------------------------------------------------------ */
/*  Admin root layout — wraps all /admin/* pages                       */
/*  Redirects to /admin/login if no token is present.                  */
/* ------------------------------------------------------------------ */

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Events", href: "/admin/events" },
  { label: "Payments", href: "/admin/payments" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setReady(true);
      return;
    }

    const token = getToken();
    if (!token) {
      router.replace("/admin/login");
    } else {
      setReady(true);
    }
  }, [isLoginPage, router]);

  // Login page renders without the admin shell
  if (isLoginPage) return <>{children}</>;

  // Wait until auth check completes
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 animate-pulse">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar items={NAV_ITEMS} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
