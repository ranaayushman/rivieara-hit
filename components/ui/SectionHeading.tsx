"use client";

interface SectionHeadingProps {
  /** Plain text part of the heading */
  text: string;
  /** Gold-accented part of the heading */
  accent: string;
  /** If true, accent comes first */
  accentFirst?: boolean;
  /** Optional subtitle */
  subtitle?: string;
  /** Optional decorative Arabian subtitle text */
  arabianText?: string;
}

/**
 * Cinematic section heading with Cinzel font, gold gradient accent,
 * and optional El Messiri decorative text. (Static Version)
 */
export default function SectionHeading({
  text,
  accent,
  accentFirst = false,
  subtitle,
  arabianText,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-16 md:mb-20">
      {/* Decorative Arabian text above heading */}
      {arabianText && (
        <p
          className="text-sm md:text-base tracking-[0.3em] uppercase mb-4"
          style={{
            fontFamily: "var(--font-arabian)",
            color: "var(--gold-primary)",
            opacity: 0.6,
          }}
        >
          {arabianText}
        </p>
      )}

      {/* Main heading — Cinzel font */}
      <h2
        className="section-heading"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {accentFirst ? (
          <>
            <span className="accent">{accent}</span> {text}
          </>
        ) : (
          <>
            {text} <span className="accent">{accent}</span>
          </>
        )}
      </h2>

      {/* Decorative gold line */}
      <div
        className="mx-auto mt-4 mb-2 h-[2px] rounded-full"
        style={{
          background: "var(--gradient-gold)",
          width: 80,
        }}
      />

      {/* Subtitle */}
      {subtitle && (
        <p
          className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-6"
          style={{ color: "var(--text-muted)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
