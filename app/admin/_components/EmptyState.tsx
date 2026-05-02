import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Empty state — shown when a list has no items                       */
/* ------------------------------------------------------------------ */

interface EmptyStateProps {
  icon?: React.ReactNode;
  message: string;
  /** Optional CTA link */
  action?: {
    label: string;
    href: string;
  };
}

export default function EmptyState({ icon, message, action }: EmptyStateProps) {
  return (
    <div className="text-center py-16 bg-[#0f0404]/80 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl">
      {icon && <div className="mx-auto mb-4 text-white/20">{icon}</div>}
      <p className="text-white/50 text-sm font-medium">{message}</p>
      {action && (
        <Link
          href={action.href}
          className="mt-4 inline-block text-[#ff3333] text-sm font-semibold hover:text-red-400 hover:underline transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
