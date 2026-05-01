"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const images = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
];

export default function Gallery3D() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  const next = () =>
    setCurrent((prev) => (prev + 1) % images.length);

  return (
    <section className="relative py-32 bg-[#0f0f0f] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.25)_0%,rgba(15,15,15,1)_70%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-6xl font-extrabold mb-20">
          Gallery
        </h2>

        {/* 3D Perspective Container */}
        <div className="relative flex items-center justify-center perspective-[2000px]">

          <div className="relative w-full max-w-5xl h-[500px]">

            {images.map((img, index) => {
              const offset = index - current;

              let style = "opacity-0 scale-75";

              if (offset === 0)
                style = "z-30 scale-100 translate-x-0 rotate-y-0";
              else if (offset === -1 || offset === images.length - 1)
                style = "z-20 -translate-x-[60%] scale-90 rotate-y-[25deg] opacity-70";
              else if (offset === 1 || offset === -images.length + 1)
                style = "z-20 translate-x-[60%] scale-90 rotate-y-[-25deg] opacity-70";

              return (
                <div
                  key={index}
                  className={`absolute w-full h-full transition-all duration-700 ease-in-out ${style}`}
                >
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(239,68,68,0.4)]">
                    <Image
                      src={img}
                      alt="Gallery"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })}

          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-10 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-red-600 transition"
          >
            <ArrowLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-10 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-red-600 transition"
          >
            <ArrowRight />
          </button>

        </div>

      </div>
    </section>
  );
}

