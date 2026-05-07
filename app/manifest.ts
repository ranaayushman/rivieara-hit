import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Riviera 2026 — Arabian Nights | HIT Haldia Techno-Cultural Fest",
    short_name: "Riviera 2026",
    description:
      "Official website of Riviera 2026 — the premier Arabian Nights-themed techno-cultural fest of Haldia Institute of Technology. 18-20 May 2026.",
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
        src: "/riviera-logo.jpeg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
