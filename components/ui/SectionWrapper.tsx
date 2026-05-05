"use client";

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Show Arabian gold aura glow */
  withGlow?: boolean;
  /** Show geometric pattern overlay */
  withPattern?: boolean;
}

/**
 * Reusable section wrapper — consistent Arabian-themed spacing,
 * atmospheric effects, without animations.
 */
export default function SectionWrapper({
  id,
  children,
  className = "",
  withGlow = true,
  withPattern = false,
}: SectionWrapperProps) {

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Fog overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(180deg, var(--bg-primary) 0%, transparent 40%, transparent 60%, var(--bg-primary) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Atmospheric glow */}
      {withGlow && (
        <div className="bg-glow-arabian" />
      )}

      {/* Islamic geometric pattern */}
      {withPattern && <div className="bg-pattern-arabian" />}

      {/* Film noise texture */}
      <div className="absolute inset-0 bg-noise" aria-hidden="true" />

      {/* Section divider — gold gradient line at top */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--gold-dim), var(--gold-subtle), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="relative z-10 section-container section-py"
      >
        {children}
      </div>
    </section>
  );
}
