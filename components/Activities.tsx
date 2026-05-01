"use client";

import { Code, Music, Gamepad2, Cpu } from "lucide-react";

const activities = [
  {
    title: "Hackathon",
    desc: "24-hour coding battle with exciting prizes and innovation.",
    icon: Code,
  },
  {
    title: "Cultural Night",
    desc: "Music, dance & electrifying performances.",
    icon: Music,
  },
  {
    title: "Gaming Arena",
    desc: "Competitive esports tournaments & challenges.",
    icon: Gamepad2,
  },
  {
    title: "Tech Expo",
    desc: "Showcasing futuristic projects & AI innovations.",
    icon: Cpu,
  },
];

export default function Activities() {
  return (
    <section
      id="activities"
      className="relative py-32 bg-[#0f0f0f] text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.25)_0%,rgba(15,15,15,1)_70%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-20">
          Fest <span className="text-red-500">Activities</span>
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <div
                key={index}
                className="group bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl hover:border-red-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] transition-all duration-300"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-600/20 mb-6 group-hover:bg-red-600 transition">
                  <Icon size={28} className="text-red-500 group-hover:text-white transition" />
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {activity.title}
                </h3>

                <p className="text-zinc-400 text-sm">
                  {activity.desc}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
