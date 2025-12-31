import { clsx } from "clsx";

interface ProbabilityBarProps {
  label: string;
  value: number;
  accent?: "primary" | "secondary" | "success" | "alert";
  highlight?: boolean;
  hint?: string;
}

const accentMap: Record<NonNullable<ProbabilityBarProps["accent"]>, string> = {
  primary: "from-abyss-400 via-abyss-300 to-abyss-500",
  secondary: "from-cyan-400 via-cyan-300 to-abyss-200",
  success: "from-emerald-400 via-emerald-300 to-emerald-500",
  alert: "from-orange-400 via-amber-300 to-red-400"
};

const ProbabilityBar = ({ label, value, accent = "primary", highlight = false, hint }: ProbabilityBarProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className={clsx("text-sm font-medium", highlight && "text-abyss-100 font-semibold tracking-wide")}>
          {label}
        </span>
        <span className="font-heading text-lg">{value.toFixed(1)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className={clsx(
            "h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out",
            accentMap[accent],
            highlight && "shadow-lg shadow-abyss-400/40"
          )}
          style={{ width: `${value}%` }}
        />
      </div>
      {hint ? <p className="text-xs text-abyss-200/70">{hint}</p> : null}
    </div>
  );
};

export default ProbabilityBar;
