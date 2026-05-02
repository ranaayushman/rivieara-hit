import type { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Register | Riviera 2026",
  description: "Register for Riviera 2026 — HIT Haldia's annual tech & cultural fest.",
};

export default function RegisterPage() {
  return (
    <main>
      <RegisterForm />
    </main>
  );
}
