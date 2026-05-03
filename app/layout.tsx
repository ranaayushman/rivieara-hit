import "./globals.css";
import { Inter } from "next/font/google";
import { Cinzel } from "next/font/google";
import { El_Messiri } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/lib/theme";
import ParticleLayer from "@/components/ui/ParticleLayer";
import FogLayer from "@/components/ui/FogLayer";
import MouseGlow from "@/components/ui/MouseGlow";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const elMessiri = El_Messiri({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-messiri",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Riviera 2026 | Arabian Nights — HIT Haldia Tech & Cultural Fest",
  description:
    "Official website of Riviera 2026 — A mystical Arabian Nights techno-cultural experience at Haldia Institute of Technology. Register now for hackathons, workshops, cultural events, and more.",
  keywords: ["Riviera", "HIT", "Haldia", "tech fest", "cultural fest", "college fest 2026", "Arabian Nights"],
  openGraph: {
    title: "Riviera 2026 | Arabian Nights — HIT Haldia",
    description: "A mystical Arabian Nights techno-cultural digital experience — Where innovation meets magic.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth theme-night ${inter.variable} ${cinzel.variable} ${elMessiri.variable}`}
    >
      <body
        className="antialiased"
        style={{
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-body)",
        }}
      >
        <ThemeProvider>
          {/* Global atmospheric layers */}
          <FogLayer />
          <ParticleLayer />
          <MouseGlow />

          <Navbar />
          <main className="overflow-x-hidden relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
