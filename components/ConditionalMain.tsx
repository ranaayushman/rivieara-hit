"use client";

import { usePathname } from "next/navigation";

const FULLPAGE_ROUTES = ["/register", "/login"];

export default function ConditionalMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullPage = FULLPAGE_ROUTES.some((route) => pathname.startsWith(route));

  if (isFullPage) {
    // No extra classes — RegisterForm controls its own full-page layout
    return <>{children}</>;
  }

  return (
    <main className="overflow-x-hidden relative z-10">{children}</main>
  );
}