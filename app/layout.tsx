import "./globals.css";
import { Inter } from "next/font/google";
import { Cinzel } from "next/font/google";
import { El_Messiri } from "next/font/google";
import type { Metadata } from "next";
import ParticleLayer from "@/components/ui/ParticleLayer";
import FogLayer from "@/components/ui/FogLayer";
import MouseGlow from "@/components/ui/MouseGlow";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalMain from "@/components/ConditionalMain";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

/* ── Poppins — body text ── */
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

/* ── Bebas Neue — sub-headings / labels ── */
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas",
  weight: "400",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
});

const jujutsuKaisen = localFont({
  src: "./Jujutsu Kaisen.ttf",
  display: "swap",
  variable: "--font-jjk",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Riviera 2026 | Arabian Nights — HIT Haldia Tech & Cultural Fest",
  description:
    "Official website of Riviera 2026 — A mystical Arabian Nights techno-cultural experience at Haldia Institute of Technology. Register now for hackathons, workshops, cultural events, and more.",
  keywords: ["Riviera", "HIT", "Haldia", "tech fest", "cultural fest", "college fest 2026", "Arabian Nights"],
  openGraph: {
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
      className={`theme-night ${inter.variable} ${cinzel.variable} ${elMessiri.variable}`}
    >
      <body
        className="antialiased"
        style={{
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-poppins)",
        }}
      >
        <SmoothScrollProvider>
          <PageLoader />

          {/* Global atmospheric layers */}
          <FogLayer />
          <ParticleLayer />
          <MouseGlow />

          <ConditionalNavbar />
          <ConditionalMain>{children}</ConditionalMain>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}