/* ------------------------------------------------------------------ */
/*  Loading state — pulsing text indicator                             */
/* ------------------------------------------------------------------ */

interface LoadingStateProps {
  /** Text shown while loading (default: "Loading…") */
  text?: string;
}

export default function LoadingState({ text = "Loading…" }: LoadingStateProps) {
  return <p className="text-gray-500 animate-pulse py-4">{text}</p>;
}
