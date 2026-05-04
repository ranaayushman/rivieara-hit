"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

const HIDE_NAV_ROUTES = ["/login"]; // register hataya — navbar register pe bhi dikhega

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const shouldHide = HIDE_NAV_ROUTES.some((route) => pathname.startsWith(route));

  if (shouldHide) return null;

  return <Navbar />;
}