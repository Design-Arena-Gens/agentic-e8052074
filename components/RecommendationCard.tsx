import { motion } from "framer-motion";
import type { MatchInsights } from "@/lib/types";

interface RecommendationCardProps {
  recommendation: MatchInsights["recommendation"];
}

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="panel rounded-3xl p-6 shadow-lg shadow-abyss-950/20"
    >
      <p className="text-xs uppercase tracking-[0.32em] text-abyss-200/60">Omega-Bet Protocol</p>
      <h3 className="mt-3 font-heading text-2xl font-semibold text-abyss-50">{recommendation.label}</h3>
      <div className="mt-5 grid grid-cols-1 gap-4 text-sm">
        <div className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.28em] text-abyss-200/60">Rationale</p>
          <p className="mt-2 text-abyss-100">{recommendation.rationale}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/70">Confiance</p>
            <p className="mt-2 font-heading text-xl text-emerald-100">{recommendation.confidence.toFixed(1)}%</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70">Gestion de mise</p>
            <p className="mt-2 font-heading text-xl text-cyan-100">{recommendation.stake}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
