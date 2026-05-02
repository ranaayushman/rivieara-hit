import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gallery | Riviera 2026",
  description: "Explore photos and moments from Riviera — HIT Haldia's annual fest.",
};

export default function GalleryPage() {
  return (
    <>
      <div className="pt-20" />
      <Gallery />
      <Footer />
    </>
  );
}
