export default function JsonLd() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Riviera 2026 — Arabian Nights",
    alternateName: [
      "Riviera Fest 2026",
      "Riviera HIT",
      "HIT Fest 2026",
      "Riviera Haldia",
      "HIT Haldia Fest",
    ],
    description:
      "Riviera 2026 is the premier Arabian Nights-themed techno-cultural fest of Haldia Institute of Technology (HIT). Featuring 50+ events including hackathons, coding competitions, workshops, robotics challenges, cultural nights, gaming tournaments, and more. Join 10,000+ students at the biggest college fest in West Bengal.",
    url: "https://www.rivierafest.online",
    startDate: "2026-05-18T00:00:00+05:30",
    endDate: "2026-05-20T23:59:00+05:30",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Haldia Institute of Technology (HIT)",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ICARE Complex, HIT Campus",
        addressLocality: "Haldia",
        addressRegion: "West Bengal",
        postalCode: "721657",
        addressCountry: "IN",
      },
    },
    image: ["https://www.rivierafest.online/riviera-logo.jpeg"],
    organizer: {
      "@type": "Organization",
      name: "Haldia Institute of Technology",
      url: "https://www.rivierafest.online",
    },
    performer: {
      "@type": "Organization",
      name: "Riviera 2026 Organizing Committee",
    },
    offers: {
      "@type": "Offer",
      url: "https://www.rivierafest.online",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      price: "0",
      validFrom: "2026-01-01T00:00:00+05:30",
    },
    keywords:
      "Riviera, Riviera 2026, Riviera fest, Riviera HIT, HIT fest, Haldia fest, college fest, tech fest, cultural fest, Arabian Nights, hackathon, workshop, robotics, gaming, West Bengal",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Riviera 2026 — HIT Haldia",
    alternateName: [
      "Riviera Fest",
      "Riviera HIT",
      "HIT Fest",
      "Riviera Haldia Fest",
    ],
    url: "https://www.rivierafest.online",
    description:
      "Official website of Riviera 2026 — the biggest techno-cultural fest of Haldia Institute of Technology.",
    publisher: {
      "@type": "Organization",
      name: "Haldia Institute of Technology",
      logo: {
        "@type": "ImageObject",
        url: "https://www.rivierafest.online/riviera-logo.jpeg",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.rivierafest.online/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Haldia Institute of Technology",
    alternateName: "HIT Haldia",
    url: "https://www.rivierafest.online",
    logo: "https://www.rivierafest.online/riviera-logo.jpeg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ICARE Complex, HIT Campus",
      addressLocality: "Haldia",
      addressRegion: "West Bengal",
      postalCode: "721657",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </>
  );
}
