import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MatchSelectPanel from "@/components/MatchSelectPanel";
import ProbabilityBar from "@/components/ProbabilityBar";
import MetricPill from "@/components/MetricPill";
import RecommendationCard from "@/components/RecommendationCard";
import { matches } from "@/lib/matches";
import { generateInsights } from "@/lib/prediction";

const omegaPrelude = [
  "SYSTÈME OMEGA-TITAN : EN LIGNE. 👽",
  "PROTOCOLE X DÉCLENCHÉ.",
  "RECHERCHE GLOBALE IMMÉDIATE : ACTIVÉE.",
  "DONNEZ-MOI LA CIBLE. JE VAIS DISSÉQUER LE FUTUR TERRESTRE."
];

const App = () => {
  const [selectedId, setSelectedId] = useState(matches[0]?.id ?? "");

  const selectedMatch = useMemo(() => matches.find((match) => match.id === selectedId) ?? matches[0], [selectedId]);
  const insights = useMemo(() => generateInsights(selectedMatch), [selectedMatch]);

  const isFootball = selectedMatch.sport === "football";
  const expectationLabel = isFootball ? "xGoals projetés" : "Points projetés";

  return (
    <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-6 py-12 sm:px-12 lg:px-16 text-white">
      <div className="absolute inset-0 -z-10 bg-grid bg-grid-size opacity-10" />
      <section className="aurora rounded-3xl border border-white/10 bg-gradient-to-br from-abyss-900/80 via-abyss-950/80 to-black/60 p-8 sm:p-12 shadow-lg shadow-abyss-900/40">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs uppercase tracking-[0.32em] text-abyss-200/70">Predixor · Oracle omnisports</p>
            <h1 className="font-heading text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              Dieu Expert Ultime des <span className="text-abyss-200">Prédictions Sportives</span>
            </h1>
            <p className="text-lg text-abyss-100/80 sm:text-xl">
              Intelligence omega fusionnant données historiques, métriques temps réel, blessures, tactiques et
              micro-variables pour disséquer chaque issue football &amp; basketball avec une précision divine.
            </p>
            <div className="flex flex-wrap gap-2">
              <MetricPill label="Fiabilité moteur" value={`${insights.recommendation.confidence.toFixed(1)}%`} tone="positive" />
              <MetricPill label="Intégrité analytique" value={`${(insights.integrityScore * 100).toFixed(1)}%`} tone="positive" />
              <MetricPill label="Mode" value="Protocole X" />
            </div>
          </div>
          <div className="space-y-2 rounded-2xl border border-abyss-500/30 bg-abyss-900/60 p-4 font-mono text-xs leading-relaxed text-abyss-200/70 sm:w-72">
            {omegaPrelude.map((line) => (
              <div key={line} className="flex items-start gap-2">
                <span className="mt-0.5 h-1 w-1 rounded-full bg-emerald-400/80" />
                <p>{line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[28rem,1fr]">
        <aside>
          <h2 className="mb-4 font-heading text-xl font-semibold text-abyss-100">Cibles actives</h2>
          <MatchSelectPanel matches={matches} selectedId={selectedMatch.id} onSelect={setSelectedId} />
        </aside>

        <section className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMatch.id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="panel rounded-3xl p-6 md:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-abyss-200/70">
                    {selectedMatch.competition} · {selectedMatch.stage}
                  </p>
                  <h2 className="mt-2 text-3xl font-heading font-semibold">
                    {selectedMatch.homeTeam} <span className="text-abyss-200/70">vs</span> {selectedMatch.awayTeam}
                  </h2>
                  <p className="mt-1 text-sm text-abyss-200/75">
                    {new Date(selectedMatch.date).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}{" "}
                    · {selectedMatch.location}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-abyss-200/60">Cotes marché 1x2</p>
                  <p className="mt-2 font-mono text-sm text-abyss-100">
                    {selectedMatch.oddsBaseline.home.toFixed(2)} /{" "}
                    {selectedMatch.oddsBaseline.draw ? selectedMatch.oddsBaseline.draw.toFixed(2) : "—"} /{" "}
                    {selectedMatch.oddsBaseline.away.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <h3 className="text-sm uppercase tracking-[0.3em] text-abyss-200/70">1x2 Prognostic</h3>
                  <ProbabilityBar label={`${selectedMatch.homeTeam}`} value={insights.winProbabilities.home} accent="primary" highlight />
                  {isFootball && insights.winProbabilities.draw !== null ? (
                    <ProbabilityBar label="Match nul" value={insights.winProbabilities.draw} accent="secondary" />
                  ) : null}
                  <ProbabilityBar label={`${selectedMatch.awayTeam}`} value={insights.winProbabilities.away} accent="alert" />
                  <p className="text-xs text-abyss-200/65">
                    Fiabilité 1x2 : {insights.winProbabilities.confidence.toFixed(1)}% · Modèle intégrité{" "}
                    {(insights.integrityScore * 100).toFixed(1)}%
                  </p>
                </div>

                <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <h3 className="text-sm uppercase tracking-[0.3em] text-abyss-200/70">{expectationLabel}</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-abyss-400/20 bg-abyss-900/60 px-4 py-3 text-center">
                      <p className="text-xs uppercase tracking-[0.28em] text-abyss-200/60">Home</p>
                      <p className="mt-2 font-heading text-xl text-abyss-100">
                        {insights.expectedGoals.home.toFixed(isFootball ? 2 : 0)}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-abyss-400/20 bg-abyss-900/60 px-4 py-3 text-center">
                      <p className="text-xs uppercase tracking-[0.28em] text-abyss-200/60">Away</p>
                      <p className="mt-2 font-heading text-xl text-abyss-100">
                        {insights.expectedGoals.away.toFixed(isFootball ? 2 : 0)}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-center">
                      <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/70">Total</p>
                      <p className="mt-2 font-heading text-xl text-emerald-100">
                        {insights.expectedGoals.total.toFixed(isFootball ? 2 : 0)}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {insights.overUnder.map((line) => (
                      <ProbabilityBar
                        key={line.label}
                        label={`${line.label} (Over)`}
                        value={line.over}
                        accent="primary"
                        hint={`Under ${line.threshold.toFixed(1)} : ${line.under.toFixed(1)}% · Confiance ${line.confidence.toFixed(1)}%`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {isFootball && insights.bttsProbability !== null ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <h3 className="text-sm uppercase tracking-[0.3em] text-abyss-200/70">BTTS</h3>
                    <ProbabilityBar label="BTTS - Oui" value={insights.bttsProbability} accent="primary" highlight />
                    <ProbabilityBar label="BTTS - Non" value={100 - insights.bttsProbability} accent="alert" />
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-abyss-200/70 backdrop-blur-sm">
                    <h3 className="text-sm uppercase tracking-[0.3em] text-abyss-200/70">Pression dans la raquette</h3>
                    <p className="mt-3">
                      Pression intérieure {Math.round((insights.tacticalFactors.paintPressure ?? 0) * 100)}% · Transition{" "}
                      {Math.round(insights.tacticalFactors.transitionSpeed * 100)}% · Shot quality{" "}
                      {Math.round(insights.tacticalFactors.shotQuality * 100)}%
                    </p>
                  </div>
                )}

                {isFootball && insights.yellowCards ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <h3 className="text-sm uppercase tracking-[0.3em] text-abyss-200/70">Cartons</h3>
                    <p className="text-sm text-abyss-200/75">
                      Moyenne projetée {insights.yellowCards.avg.toFixed(1)} · Seuil clé{" "}
                      {insights.yellowCards.threshold.toFixed(1)}
                    </p>
                    <ProbabilityBar label="Over cartons" value={insights.yellowCards.over} accent="alert" />
                    <ProbabilityBar label="Under cartons" value={insights.yellowCards.under} accent="secondary" />
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-abyss-200/70 backdrop-blur-sm">
                    <h3 className="text-sm uppercase tracking-[0.3em] text-abyss-200/70">Rythme & possessions</h3>
                    <p className="mt-3">
                      Tempo projeté {Math.round(selectedMatch.metrics.tempo * 100)}% · Fatigue combinée{" "}
                      {Math.round(((selectedMatch.metrics.fatigueHome + selectedMatch.metrics.fatigueAway) / 2) * 100)}% · Variance
                      blessure{" "}
                      {(
                        Math.round(
                          (selectedMatch.metrics.injuryImpactHome + selectedMatch.metrics.injuryImpactAway) * 50
                        ) / 10
                      ).toFixed(1)}
                      %
                    </p>
                  </div>
                )}

                {isFootball && insights.corners ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <h3 className="text-sm uppercase tracking-[0.3em] text-abyss-200/70">Corners</h3>
                    <p className="text-sm text-abyss-200/75">
                      Volume anticipé {insights.corners.avg.toFixed(1)} · Seuil {insights.corners.threshold.toFixed(1)}
                    </p>
                    <ProbabilityBar label="Over corners" value={insights.corners.over} accent="primary" />
                    <ProbabilityBar label="Under corners" value={insights.corners.under} accent="secondary" />
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-abyss-200/70 backdrop-blur-sm">
                    <h3 className="text-sm uppercase tracking-[0.3em] text-abyss-200/70">Adjustement Omega</h3>
                    <p className="mt-3">
                      Intégrité moteur {(insights.integrityScore * 100).toFixed(1)}% · Pressing index{" "}
                      {Math.round(insights.tacticalFactors.pressingIndex * 100)}% · Ligne défensive{" "}
                      {Math.round(insights.tacticalFactors.defensiveLineHeight * 100)}%
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <RecommendationCard recommendation={insights.recommendation} />
        </section>
      </section>
    </div>
  );
};

export default App;
