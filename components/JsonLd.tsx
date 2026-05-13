export default function JsonLd() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Riviera Fest 2026 — Jujutsu Kaisen Culling Games",
    alternateName: [
      "Rivierafest",
      "Riviera Fest",
      "Riviera Fest 2026",
      "Rivierafest 2026",
      "riviera fest",
      "rivierafest",
      "Riviera HIT",
      "HIT Fest 2026",
      "Riviera Haldia",
      "HIT Haldia Fest",
      "Riveria fest",
      "Riveria",
      "Riverafest",
      "HIT Riviera fest",
      "Riviera fest HIT",
      "Riviera fest Haldia",
    ],
    description:
      "Riviera Fest 2026 (Rivierafest) is the premier Jujutsu Kaisen Culling Games-themed techno-cultural fest of Haldia Institute of Technology (HIT Haldia). Riviera fest features 50+ events including hackathons, coding competitions, workshops, robotics challenges, cultural nights, gaming tournaments, and more. Join 10,000+ students at the biggest college fest in West Bengal.",
    url: "https://www.rivierafest.online",
    startDate: "2026-05-18T00:00:00+05:30",
    endDate: "2026-05-20T23:59:00+05:30",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventType: ["TechEvent", "CulturalEvent"],
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
      geo: {
        "@type": "GeoCoordinates",
        latitude: "22.1697",
        longitude: "88.3697",
      },
    },
    image: ["https://www.rivierafest.online/logojjk.png"],
    organizer: {
      "@type": "Organization",
      name: "Haldia Institute of Technology",
      url: "https://www.rivierafest.online",
      logo: "https://www.rivierafest.online/logojjk.png",
    },
    performer: {
      "@type": "Organization",
      name: "Riviera 2026 Organizing Committee",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Riviera Pass - 3-Day Pass",
        url: "https://www.rivierafest.online",
        availability: "https://schema.org/InStock",
        priceCurrency: "INR",
        price: "599",
        validFrom: "2026-01-01T00:00:00+05:30",
        validThrough: "2026-05-18T00:00:00+05:30",
      },
      {
        "@type": "Offer",
        name: "Individual Event Entry",
        url: "https://www.rivierafest.online",
        availability: "https://schema.org/InStock",
        priceCurrency: "INR",
        price: "100",
        validFrom: "2026-01-01T00:00:00+05:30",
        validThrough: "2026-05-18T00:00:00+05:30",
      },
    ],
    potentialAction: [
      {
        "@type": "RegisterAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.rivierafest.online",
          actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
        },
        name: "Register for Riviera Fest 2026",
      },
      {
        "@type": "BuyAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.rivierafest.online",
          actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
        },
        name: "Get Riviera Pass",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "2400",
    },
    attendees: {
      "@type": "Audience",
      audienceType: "Students",
    },
    expectedAttendees: "10000",
    keywords:
      "Riviera fest, Rivierafest, Riviera Fest, riviera fest, rivierafest, Riviera, Riviera 2026, Riviera fest 2026, Rivierafest 2026, Riveria fest, Riveria, Riverafest, Riviera HIT, Riviera fest HIT, HIT fest, HIT Riviera, Haldia fest, college fest, tech fest, cultural fest, Jujutsu Kaisen, Culling Games, hackathon, workshop, robotics, gaming, West Bengal, biggest college fest",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Riviera Fest 2026 — Rivierafest | HIT Haldia",
    alternateName: [
      "Rivierafest",
      "Riviera Fest",
      "Riviera fest",
      "rivierafest",
      "riviera fest",
      "Riviera HIT",
      "HIT Fest",
      "Riviera Haldia Fest",
      "Riveria fest",
      "Riverafest",
      "HIT Riviera fest",
    ],
    url: "https://www.rivierafest.online",
    description:
      "Official website of Riviera 2026 — the biggest techno-cultural fest of Haldia Institute of Technology.",
    publisher: {
      "@type": "Organization",
      name: "Haldia Institute of Technology",
      logo: {
        "@type": "ImageObject",
        url: "https://www.rivierafest.online/logojjk.png",
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
    logo: "https://www.rivierafest.online/logojjk.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ICARE Complex, HIT Campus",
      addressLocality: "Haldia",
      addressRegion: "West Bengal",
      postalCode: "721657",
      addressCountry: "IN",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.rivierafest.online",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Gallery",
        item: "https://www.rivierafest.online/gallery",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Contact",
        item: "https://www.rivierafest.online/contact",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the Riviera Pass and what does it include?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Riviera Pass (₹599/-) gives you all-access entry to all events, cultural nights, tech expo, gaming arena, and exclusive fest merchandise for all 3 days of Riviera 2026.",
        },
      },
      {
        "@type": "Question",
        name: "Can I participate in individual events without the Riviera Pass?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! You can pay ₹100/- per event as an individual entry fee. However, the Riviera Pass is recommended for maximum value if you plan to attend multiple events.",
        },
      },
      {
        "@type": "Question",
        name: "Who can participate in Riviera 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Riviera 2026 is open to all undergraduate and postgraduate students from any recognized college or university across India.",
        },
      },
      {
        "@type": "Question",
        name: "How do I register for Riviera 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Click the 'Enter Games' button on the homepage. You will be redirected to our official registration portal.",
        },
      },
      {
        "@type": "Question",
        name: "Will accommodation be provided for outstation participants?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, limited accommodation is available on campus for outstation participants. Please mention your requirement during registration and our team will get back to you.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a team size limit for events like Hackathon?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Team sizes vary per event — Hackathon allows 2–4 members, while most technical events are solo or pairs. Specific details are mentioned on each event's registration page.",
        },
      },
      {
        "@type": "Question",
        name: "What is the last date for registration?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Early bird registration closes soon. We recommend registering as early as possible to secure your spot. Follow our Instagram for deadline announcements.",
        },
      },
      {
        "@type": "Question",
        name: "Where is HIT Haldia located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Haldia Institute of Technology is located in Haldia, West Bengal — approximately 125 km from Kolkata. The campus is well connected by road and rail.",
        },
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
