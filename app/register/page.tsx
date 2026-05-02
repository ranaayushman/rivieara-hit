import type { Metadata } from "next";
import RegistrationSection from "@/components/RegistrationSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Register | Riviera 2026",
  description: "Register for Riviera 2026 — HIT Haldia's annual tech & cultural fest.",
};

export default function RegisterPage() {
  return (
    <>
      <div className="pt-20" />
      <RegistrationSection />
      <Footer />
    </>
  );
}
