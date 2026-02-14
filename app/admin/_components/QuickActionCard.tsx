import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Quick-action card — icon + label + description link                */
/* ------------------------------------------------------------------ */

interface QuickActionCardProps {
  href: string;
  icon: React.ReactNode;
  /** Background colour class for the icon circle */
  iconBg: string;
  title: string;
  description: string;
}

export default function QuickActionCard({
  href,
  icon,
  iconBg,
  title,
  description,
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
    >
      <span
        className={`flex items-center justify-center w-10 h-10 rounded-lg ${iconBg}`}
      >
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </Link>
  );
}
