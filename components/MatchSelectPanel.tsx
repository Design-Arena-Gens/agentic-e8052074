import { motion } from "framer-motion";
import type { MatchInput } from "@/lib/types";

interface MatchSelectPanelProps {
  matches: MatchInput[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const sportLabel: Record<MatchInput["sport"], string> = {
  football: "Football",
  basketball: "Basketball"
};

const MatchSelectPanel = ({ matches, selectedId, onSelect }: MatchSelectPanelProps) => {
  return (
    <div className="space-y-4">
      {matches.map((match) => {
        const isSelected = selectedId === match.id;
        return (
          <motion.button
            key={match.id}
            onClick={() => onSelect(match.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`w-full text-left rounded-2xl px-5 py-4 transition ${
              isSelected ? "panel card-glow ring-2 ring-abyss-300/60" : "panel-dark hover:ring-abyss-500/20"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-abyss-200/70 font-semibold">
                  {sportLabel[match.sport]} · {match.competition}
                </p>
                <p className="mt-2 text-lg font-heading font-semibold">
                  {match.homeTeam} <span className="text-abyss-200/70">vs</span> {match.awayTeam}
                </p>
                <p className="mt-1 text-sm text-abyss-200/75">
                  {match.stage} · {new Date(match.date).toLocaleString("fr-FR", { weekday: "short", hour: "2-digit", minute: "2-digit" })} ·{" "}
                  {match.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-abyss-200/60">Cotes de base 1x2</p>
                <p className="mt-1 font-mono text-sm text-abyss-100">
                  {match.oddsBaseline.home.toFixed(2)} /{" "}
                  {match.oddsBaseline.draw ? match.oddsBaseline.draw.toFixed(2) : "—"} /{" "}
                  {match.oddsBaseline.away.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default MatchSelectPanel;
