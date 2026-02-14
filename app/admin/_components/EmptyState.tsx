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
    <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
      {icon && <div className="mx-auto mb-3 text-gray-300">{icon}</div>}
      <p className="text-gray-500 text-sm">{message}</p>
      {action && (
        <Link
          href={action.href}
          className="mt-3 inline-block text-indigo-600 text-sm font-medium hover:underline"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
