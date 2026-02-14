import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Page header with title + optional action button                    */
/* ------------------------------------------------------------------ */

interface PageHeaderProps {
  title: string;
  /** Optional CTA button rendered on the right */
  action?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
}

export default function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>

      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center justify-center gap-1.5 bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-semibold
                     hover:bg-indigo-700 transition-colors"
        >
          {action.icon}
          {action.label}
        </Link>
      )}
    </div>
  );
}
