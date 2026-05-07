import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Riviera Fest 2026 — Rivierafest | Arabian Nights | HIT Haldia Techno-Cultural Fest",
    short_name: "Riviera Fest 2026",
    description:
      "Riviera Fest 2026 (Rivierafest) — the premier Arabian Nights-themed techno-cultural fest of Haldia Institute of Technology. 18-20 May 2026. 50+ events, hackathons, workshops, cultural nights & more.",
    start_url: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#FFB547",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
