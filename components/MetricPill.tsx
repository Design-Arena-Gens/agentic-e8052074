interface MetricPillProps {
  label: string;
  value: string;
  tone?: "default" | "positive" | "warning";
}

const toneStyles: Record<NonNullable<MetricPillProps["tone"]>, string> = {
  default: "bg-white/5 text-abyss-100",
  positive: "bg-emerald-500/15 text-emerald-200",
  warning: "bg-amber-500/15 text-amber-200"
};

const MetricPill = ({ label, value, tone = "default" }: MetricPillProps) => {
  return (
    <div className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] ${toneStyles[tone]}`}>
      <span className="text-white/60">{label}</span> · <span>{value}</span>
    </div>
  );
};

export default MetricPill;
