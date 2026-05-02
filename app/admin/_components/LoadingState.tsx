/* ------------------------------------------------------------------ */
/*  Loading state — pulsing text indicator                             */
/* ------------------------------------------------------------------ */

interface LoadingStateProps {
  /** Text shown while loading (default: "Loading…") */
  text?: string;
}

export default function LoadingState({ text = "Loading…" }: LoadingStateProps) {
  return <p className="text-white/40 animate-pulse py-4 font-medium">{text}</p>;
}
