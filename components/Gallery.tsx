"use client";

import Image from "next/image";

const images = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
  "/gallery5.jpg",
];

export default function Gallery() {
  return (
    <section className="relative py-32 bg-[#0f0f0f] overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.25)_0%,rgba(15,15,15,1)_70%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <h2 className="text-4xl md:text-6xl font-extrabold text-center text-white mb-20">
          Gallery
        </h2>

        <div className="overflow-hidden">

          <div className="flex gap-8 animate-scroll">

            {[...images, ...images].map((img, index) => (
              <div
                key={index}
                className="relative w-[350px] h-[450px] rounded-3xl overflow-hidden flex-shrink-0 group"
              >
                <Image
                  src={img}
                  alt="Gallery"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}
