"use client";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-white/10 text-gray-400 py-10">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Riviera 2026
          </h2>
          <p className="text-sm text-gray-500">
            Official Website of Riviera – Annual Tech & Cultural Fest.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-500 transition cursor-pointer">Home</li>
            <li className="hover:text-red-500 transition cursor-pointer">Schedule</li>
            <li className="hover:text-red-500 transition cursor-pointer">Activities</li>
            <li className="hover:text-red-500 transition cursor-pointer">Sponsors</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <p className="text-sm">Email: info@riviera2026.com</p>
          <p className="text-sm">Phone: +91 9142047263</p>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm text-gray-600 mt-10">
        © {new Date().getFullYear()} Riviera 2026. All rights reserved.
      </div>

    </footer>
  );
}
