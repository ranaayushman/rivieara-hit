import type { Metadata } from "next";
import DetailedGallery from "@/components/DetailedGallery";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gallery | Riviera Fest 2026 — Jujutsu Kaisen Culling Games | HIT Haldia",
  description:
    "Explore the stunning gallery of Riviera Fest 2026 at HIT Haldia. View photos and moments from our Jujutsu Kaisen Culling Games-themed techno-cultural festival. 50+ events, cultural nights, performances, and more captured in vibrant images.",
  keywords: [
    "Riviera Fest gallery",
    "HIT Haldia festival photos",
    "Rivierafest 2026 images",
    "Jujutsu Kaisen Culling Games fest gallery",
    "college fest photos",
    "techno cultural fest gallery",
    "Riviera 2026 moments",
    "HIT Haldia gallery",
    "West Bengal fest photography",
  ],
  alternates: {
    canonical: "https://www.rivierafest.online/gallery",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.rivierafest.online/gallery",
    siteName: "Riviera Fest 2026 — Gallery",
    title: "Gallery | Riviera Fest 2026 — Jujutsu Kaisen Culling Games | HIT Haldia",
    description:
      "Explore stunning photos and moments from Riviera Fest 2026 at HIT Haldia. Cultural nights, performances, and festival highlights captured in vibrant images.",
    images: [
      {
        url: "/logojjk.png",
        width: 1200,
        height: 630,
        alt: "Riviera Fest 2026 Gallery — Jujutsu Kaisen Culling Games Techno-Cultural Festival Photos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Riviera Fest 2026",
    description: "Explore stunning photos and moments from Riviera Fest 2026",
    images: ["/logojjk.png"],
  },
};

export default function GalleryPage() {
  return (
    <>
      <div className="pt-20" />
      <DetailedGallery />
      <Footer />
    </>
  );
}
