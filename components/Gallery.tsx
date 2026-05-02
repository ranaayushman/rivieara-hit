"use client";

import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

const images = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
];

export default function Gallery() {
  // Duplicate for seamless infinite loop
  const scrollImages = [...images, ...images];

  return (
    <SectionWrapper>
      <SectionHeading
        text=""
        accent="Gallery"
        accentFirst
        subtitle="Relive the best moments from previous editions"
      />

      {/* Scrolling track */}
      <div className="relative -mx-[var(--container-px)] overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[var(--clr-bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[var(--clr-bg)] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-5 md:gap-8 animate-gallery-scroll px-4">
          {scrollImages.map((img, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] h-[360px] sm:h-[400px] md:h-[480px] rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={img}
                alt={`Gallery image ${(index % images.length) + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 380px"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Subtle border glow on hover */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl ring-1 ring-white/10 group-hover:ring-[var(--clr-primary)]/40 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
