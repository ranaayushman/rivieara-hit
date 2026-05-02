import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Riviera 2026 | HIT Haldia — Annual Tech & Cultural Fest",
  description:
    "Official website of Riviera 2026 — the premier techno-cultural fest of Haldia Institute of Technology. Register now for hackathons, workshops, cultural events, and more.",
  keywords: ["Riviera", "HIT", "Haldia", "tech fest", "cultural fest", "college fest 2026"],
  openGraph: {
    title: "Riviera 2026 | HIT Haldia",
    description: "The Ultimate Tech & Cultural Fest — Where innovation meets creativity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="bg-[var(--clr-bg)] text-white antialiased font-[var(--font-sans)]">
        <Navbar />
        <main className="overflow-x-hidden">{children}</main>
      </body>
    </html>
  );
}
