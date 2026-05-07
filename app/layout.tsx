import "./globals.css";
import { Inter } from "next/font/google";
import { Cinzel } from "next/font/google";
import { El_Messiri } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ParticleLayer from "@/components/ui/ParticleLayer";
import FogLayer from "@/components/ui/FogLayer";
import MouseGlow from "@/components/ui/MouseGlow";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalMain from "@/components/ConditionalMain";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import PageLoader from "@/components/PageLoader";
import JsonLd from "@/components/JsonLd";

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
  metadataBase: new URL("https://www.rivierafest.online"),
  title: {
    default: "Riviera 2026 | Arabian Nights — HIT Haldia Techno-Cultural Fest",
    template: "%s | Riviera 2026 — HIT Haldia",
  },
  description:
    "Official website of Riviera 2026 — the premier Arabian Nights-themed techno-cultural fest of Haldia Institute of Technology (HIT). 18-20 May 2026. Register for hackathons, coding competitions, workshops, robotics, cultural nights, gaming tournaments, and 50+ events. Join 10,000+ students at the biggest college fest in West Bengal.",
  keywords: [
    "Riviera",
    "Riviera 2026",
    "Riviera fest",
    "Riviera HIT",
    "Riviera Haldia",
    "rivierafest",
    "riviera fest 2026",
    "HIT fest",
    "HIT fest 2026",
    "HIT Haldia fest",
    "Haldia fest",
    "Haldia Institute of Technology fest",
    "Haldia tech fest",
    "Haldia cultural fest",
    "HIT techno cultural fest",
    "Arabian Nights fest",
    "college fest 2026",
    "college fest West Bengal",
    "tech fest India 2026",
    "cultural fest India 2026",
    "hackathon 2026",
    "coding competition college",
    "robotics competition",
    "gaming tournament college",
    "Riviera Arabian Nights",
    "HIT Riviera",
    "biggest college fest",
  ],
  authors: [{ name: "Riviera 2026 — Haldia Institute of Technology" }],
  creator: "Haldia Institute of Technology",
  publisher: "Riviera 2026 Organizing Committee",
  alternates: {
    canonical: "https://www.rivierafest.online",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.rivierafest.online",
    siteName: "Riviera 2026 — HIT Haldia",
    title: "Riviera 2026 | Arabian Nights — HIT Haldia Techno-Cultural Fest",
    description:
      "The biggest techno-cultural fest of Haldia Institute of Technology. 18-20 May 2026. 50+ events, hackathons, workshops, cultural nights & more. Register now!",
    images: [
      {
        url: "/riviera-logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Riviera 2026 — Arabian Nights Techno-Cultural Fest at HIT Haldia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riviera 2026 | Arabian Nights — HIT Haldia Fest",
    description:
      "Official website of Riviera 2026 — the premier Arabian Nights techno-cultural fest of HIT Haldia. 18-20 May 2026. Register now!",
    images: ["/riviera-logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "education",
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
      <head>
        <JsonLd />
      </head>
      <body
        className="antialiased"
        style={{
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-body)",
        }}
      >
        <SmoothScrollProvider>
          <PageLoader />

          {/* Global atmospheric layers */}
          <FogLayer />
          <ParticleLayer />
          <MouseGlow />

          <Navbar />
          <main className="overflow-x-hidden relative z-10">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
