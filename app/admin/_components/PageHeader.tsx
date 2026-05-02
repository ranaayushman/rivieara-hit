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
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{title}</h1>

      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center justify-center gap-2 bg-[#ff3333] text-white rounded-full px-5 py-2.5 text-sm font-semibold
                     hover:bg-[#cc0000] shadow-[0_0_15px_rgba(255,51,51,0.3)] hover:shadow-[0_0_25px_rgba(255,51,51,0.5)] transition-all duration-300 group"
        >
          {action.icon}
          {action.label}
        </Link>
      )}
    </div>
  );
}
