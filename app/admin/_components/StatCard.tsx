/* ------------------------------------------------------------------ */
/*  Stat card — coloured metric tile                                   */
/* ------------------------------------------------------------------ */

export type StatColor = "indigo" | "green" | "gray";

interface StatCardProps {
  label: string;
  value: number;
  color: StatColor;
}

const COLOR_MAP: Record<StatColor, string> = {
  indigo: "bg-indigo-50 text-indigo-700",
  green: "bg-green-50 text-green-700",
  gray: "bg-gray-100 text-gray-700",
};

export default function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div className={`rounded-xl p-5 ${COLOR_MAP[color]}`}>
      <p className="text-sm font-medium opacity-75">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
