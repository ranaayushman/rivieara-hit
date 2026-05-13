import "./globals.css";
import { Inter } from "next/font/google";
import { Cinzel } from "next/font/google";
import { El_Messiri } from "next/font/google";
import { Poppins } from "next/font/google";
import { Rajdhani } from "next/font/google";
import localFont from "next/font/local";
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
  metadataBase: new URL("https://www.rivierafest.online"),
  title: {
    default: "Riviera Fest 2026 | Rivierafest — Jujutsu Kaisen Culling Games | HIT Haldia Techno-Cultural Fest",
    template: "%s | Riviera Fest 2026 — HIT Haldia",
  },
  description:
    "Riviera Fest 2026 (Rivierafest) — the premier Jujutsu Kaisen Culling Games-themed techno-cultural fest of Haldia Institute of Technology (HIT Haldia). 18-20 May 2026. Riviera fest features 50+ events: hackathons, coding competitions, workshops, robotics, cultural nights, gaming tournaments. Join 10,000+ students at the biggest college fest in West Bengal. Register now at rivierafest.online!",
  keywords: [
    /* Primary brand keywords — with & without space */
    "Riviera fest",
    "Rivierafest",
    "riviera fest",
    "rivierafest",
    "Riviera Fest",
    "RIVIERA FEST",
    "Riviera",
    "Riviera 2026",
    "Riviera fest 2026",
    "Rivierafest 2026",
    "riviera fest 2026",
    "rivierafest 2026",
    /* Common misspellings */
    "Riveria fest",
    "Riveria",
    "Riveria fest 2026",
    "riveria fest",
    "Riverafest",
    "riverafest",
    "Riveria HIT",
    /* Institution-linked keywords */
    "Riviera HIT",
    "Riviera Haldia",
    "Riviera fest HIT",
    "Rivierafest HIT",
    "Riviera fest Haldia",
    "HIT fest",
    "HIT fest 2026",
    "HIT Haldia fest",
    "HIT Riviera",
    "HIT Riviera fest",
    "Haldia fest",
    "Haldia fest 2026",
    "Haldia Institute of Technology fest",
    "Haldia tech fest",
    "Haldia cultural fest",
    "HIT techno cultural fest",
    /* Theme keywords */
    "Jujutsu Kaisen Culling Games fest",
    "Riviera Jujutsu Kaisen",
    "Riviera fest Jujutsu Kaisen",
    /* Generic college fest keywords */
    "college fest 2026",
    "college fest West Bengal",
    "tech fest India 2026",
    "cultural fest India 2026",
    "biggest college fest",
    "biggest college fest West Bengal",
    "techno cultural fest 2026",
    /* Event-specific keywords */
    "hackathon 2026",
    "coding competition college",
    "robotics competition",
    "gaming tournament college",
    "college workshops 2026",
    "cultural night college",
    /* Domain keyword */
    "rivierafest.online",
  ],
  authors: [{ name: "Riviera Fest 2026 — Haldia Institute of Technology" }],
  creator: "Haldia Institute of Technology",
  publisher: "Riviera Fest 2026 Organizing Committee",
  alternates: {
    canonical: "https://www.rivierafest.online",
  },
  icons: {
    icon: [
      { url: "/favicon-jjk.ico", sizes: "any" },
      { url: "/icon-jjk-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon-jjk.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.rivierafest.online",
    siteName: "Riviera Fest 2026 — Rivierafest | HIT Haldia",
    title: "Riviera Fest 2026 | Rivierafest — Jujutsu Kaisen Culling Games | HIT Haldia Techno-Cultural Fest",
    description:
      "Riviera Fest (Rivierafest) — the biggest techno-cultural fest of Haldia Institute of Technology. 18-20 May 2026. 50+ events, hackathons, workshops, cultural nights & more. Register now!",
    images: [
      {
        url: "/logojjk.png",
        width: 1200,
        height: 630,
        alt: "Riviera Fest 2026 — Rivierafest Jujutsu Kaisen Culling Games Techno-Cultural Fest at HIT Haldia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riviera Fest 2026 | Rivierafest — Jujutsu Kaisen Culling Games | HIT Haldia",
    description:
      "Riviera Fest (Rivierafest) — the premier Jujutsu Kaisen Culling Games techno-cultural fest of HIT Haldia. 18-20 May 2026. Register now!",
    images: ["/logojjk.png"],
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
  other: {
    "referrer": "strict-origin-when-cross-origin",
    "color-scheme": "dark light",
    "mobile-web-app-capable": "yes",
    "mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#FFB547",
    "format-detection": "telephone=no",
  },
  verification: {
    google: "google-site-verification-code",
    other: {
      "msvalidate.01": "msvalidate-code",
    },
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
      className={`theme-night ${inter.variable} ${cinzel.variable} ${elMessiri.variable} ${poppins.variable} ${rajdhani.variable} ${jujutsuKaisen.variable}`}
    >
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Structured data and SEO */}
        <JsonLd />
        
        {/* Web app meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
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
