import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Riviera Fest 2026 — Jujutsu Kaisen Culling Games | HIT Haldia",
  description:
    "Get in touch with the Riviera Fest 2026 team. Contact us for queries about events, registration, accommodation, and sponsorships. FAQs and support available for HIT Haldia's Jujutsu Kaisen Culling Games techno-cultural festival.",
  keywords: [
    "Riviera Fest contact",
    "HIT Haldia contact",
    "Rivierafest 2026 support",
    "festival contact information",
    "Haldia fest queries",
    "event registration help",
    "festival accommodation",
    "sponsorship opportunities",
    "HIT Haldia contact details",
  ],
  alternates: {
    canonical: "https://www.rivierafest.online/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.rivierafest.online/contact",
    siteName: "Riviera Fest 2026 — Contact",
    title: "Contact Us | Riviera Fest 2026 — Jujutsu Kaisen Culling Games | HIT Haldia",
    description:
      "Get in touch with Riviera Fest 2026 team. Contact for queries, registration help, accommodation, and sponsorships at HIT Haldia.",
    images: [
      {
        url: "/logojjk.png",
        width: 1200,
        height: 630,
        alt: "Riviera Fest 2026 Contact — HIT Haldia Techno-Cultural Festival",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Riviera Fest 2026",
    description:
      "Get in touch with Riviera Fest 2026 team for queries and support",
    images: ["/logojjk.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
