"use client";

import { useState } from "react";

type EventItem = {
  time: string;
  title: string;
};

const scheduleData: Record<string, EventItem[]> = {
  "Day 1": [
    { time: "09:00 AM", title: "Opening Ceremony" },
    { time: "11:00 AM", title: "AI Workshop" },
    { time: "02:00 PM", title: "Coding Challenge" },
  ],
  "Day 2": [
    { time: "10:00 AM", title: "Hackathon Begins" },
    { time: "01:00 PM", title: "Tech Talks" },
    { time: "06:00 PM", title: "Cultural Night" },
  ],
  "Day 3": [
    { time: "09:30 AM", title: "Robotics Competition" },
    { time: "12:00 PM", title: "Gaming Finals" },
    { time: "05:00 PM", title: "Closing Ceremony" },
  ],
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState("Day 1");

  return (
    <section
      id="schedule"
      className="relative py-32 bg-[#0f0f0f] text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.25)_0%,rgba(15,15,15,1)_70%)]"></div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-20">
          Event <span className="text-red-500">Schedule</span>
        </h2>

        <div className="grid md:grid-cols-4 gap-12">

          {/* Day Selector */}
          <div className="flex md:flex-col gap-4 justify-center md:justify-start">
            {Object.keys(scheduleData).map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                  activeDay === day
                    ? "bg-red-600 border-red-600 shadow-[0_0_30px_rgba(239,68,68,0.6)]"
                    : "border-white/20 hover:border-red-500"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div
            key={activeDay}
            className="md:col-span-3 relative space-y-10 animate-fade"
          >
            {/* Vertical Line */}
            <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-red-500/30"></div>

            {scheduleData[activeDay].map((event, index) => (
              <div
                key={index}
                className="relative pl-12"
              >
                {/* Dot */}
                <div className="absolute left-[6px] top-2 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse"></div>

                {/* Card */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl hover:border-red-500 transition duration-300">
                  <p className="text-red-500 font-semibold">
                    {event.time}
                  </p>
                  <h3 className="text-lg font-bold mt-1">
                    {event.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
