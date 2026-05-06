import dynamic from "next/dynamic";

const UpcomingEventsCarousel = dynamic(() => import("./UpcomingEventsCarousel"));

export default function UpcomingEvents() {
  return (
    <section
      id="events"
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center py-24 sm:py-32"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      {/* 1. Deep Arabian Night Sky */}
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at top center, var(--bg-deep) 0%, var(--bg-primary) 80%)" }} />

      {/* 2. Giant Glowing Moon */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-15 pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, var(--moon-glow) 0%, transparent 60%)" }}
      />
      <div
        className="absolute top-[5%] right-[5%] w-[150px] h-[150px] md:w-[250px] md:h-[250px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, var(--moon-light) 0%, transparent 60%)", opacity: 0.2 }}
      />

      {/* 4. Desert Horizon Gradient */}
      <div
        className="absolute bottom-0 inset-x-0 h-[40%] z-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--bg-primary) 0%, var(--surface-glass) 30%, transparent 100%)",
        }}
      />

      {/* 5. Static Fog Reveal Layer */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--surface-glass) 100%)" }}
      />

      {/* 6. Foreground Hanging Lanterns */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[10, 25, 75, 90].map((left, i) => (
          <div key={i} className="absolute top-[-20px]" style={{ left: `${left}%` }}>
            <div className="w-[2px] h-[120px] md:h-[180px] bg-gradient-to-b from-black to-[rgba(212,160,23,0.4)] mx-auto" />
            <div className="w-8 h-12 md:w-10 md:h-14 rounded-lg relative flex items-center justify-center shadow-[0_0_20px_var(--gold-glow)]" style={{ background: "var(--surface-glass)", border: "1px solid var(--border-gold)" }}>
              <div className="w-3 h-5 md:w-4 md:h-6 bg-[var(--gold-light)] rounded-full blur-[2px]" />
              <div className="absolute inset-0 rounded-full w-[120px] h-[120px] md:w-[200px] md:h-[200px] -left-[44px] -top-[44px] md:-left-[80px] md:-top-[80px]" style={{ background: "radial-gradient(circle, rgba(212,160,23,0.3) 0%, transparent 60%)" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Client Component */}
      <UpcomingEventsCarousel />
    </section>
  );
}
