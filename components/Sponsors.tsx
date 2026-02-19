"use client";

import Image from "next/image";

export default function Sponsors() {
  return (
    <section
      id="sponsors"
      className="relative py-32 bg-[#0f0f0f] text-white overflow-hidden"
    >
      {/* Red Radial Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.3)_0%,rgba(15,15,15,1)_70%)]"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-extrabold mb-20">
          Our <span className="text-red-500">Sponsors</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-8 place-items-center">

          {/* Fanta */}
          <div className="relative bg-orange-500 rounded-2xl w-64 h-40 shadow-xl hover:scale-105 transition duration-300">
            <div className="relative w-full h-full p-6">
              <Image
                src="/fanta.png"
                alt="Fanta"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Pepsi */}
          <div className="relative bg-white rounded-2xl w-64 h-40 shadow-xl hover:scale-105 transition duration-300">
            <div className="relative w-full h-full p-6">
              <Image
                src="/pepsi.png"
                alt="Pepsi"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* SBI */}
          <div className="relative bg-red-600 rounded-2xl w-64 h-40 shadow-xl hover:scale-105 transition duration-300">
            <div className="relative w-full h-full p-6">
              <Image
                src="/sbi.png"
                alt="SBI"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* ICICI */}
          <div className="relative bg-green-600 rounded-2xl w-64 h-40 shadow-xl hover:scale-105 transition duration-300">
            <div className="relative w-full h-full p-8">
              <Image
                src="/ici.png"
                alt="ICICI Bank"
                fill
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
