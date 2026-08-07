import type { Metadata } from "next";

import { HalfLifeSimulator } from "../../../_components/HalfLifeSimulator";
import { FeedOffline } from "../../_components/FeedOffline";
import {
  getBioDashboard,
  statusColor,
  statusDotClass,
  TONE_CLASS,
  TONE_COLOR,
} from "../../../_lib/dashboard";

export const metadata: Metadata = {
  title: "Bio-Metrics",
  robots: { index: false, follow: false },
};

export default async function BiometricsPage() {
  const result = await getBioDashboard();

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] mb-2" style={{ color: "#444" }}>
          SUBSYSTEM // HALFLIFE
        </p>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#e0e0e0" }}>
          BIO-METRICS <span className="terminal-cyan">TRACKER</span>
        </h1>
        <p className="text-xs mt-2 leading-relaxed max-w-xl" style={{ color: "#555" }}>
          Half-Life protocol — Models physiological fatigue as exponential decay functions.
          Tracks metabolic stressors, training load, and recovery state across time.
        </p>
        <p className="mt-3 text-xs font-mono" style={{ color: "#3f3f46" }}>
          R(t) = R₀ · e^(−λt) &nbsp;·&nbsp; λ = ln(2) / t½ &nbsp;·&nbsp; bone_weight_modifier = 4.5
        </p>
      </div>

      {!result.ok ? (
        <FeedOffline subsystem="/bio/dashboard" error={result.error} />
      ) : (
        <>
          {/* Metric cards */}
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
              ── PHYSIOLOGICAL METRICS
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {result.data.metric_cards.map((card) => (
                <div key={card.label} className="card-surface p-4">
                  <p className="text-xs mb-3 tracking-wider" style={{ color: "#444" }}>
                    {card.label}
                  </p>
                  <p
                    className={`text-xl font-bold tracking-tight mb-1 ${TONE_CLASS[card.tone]}`}
                    style={card.tone === "neutral" ? { color: TONE_COLOR.neutral } : undefined}
                  >
                    {card.value}
                  </p>
                  <p className="text-xs" style={{ color: "#444" }}>
                    {card.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive decay simulator */}
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] mb-2" style={{ color: "#444" }}>
              ── DECAY SIMULATOR
            </p>
            <HalfLifeSimulator />
          </div>

          {/* Active supplement stack */}
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
              ── ACTIVE SUPPLEMENT STACK
            </p>
            <div className="card-surface overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                    {["COMPOUND", "DOSE", "FREQUENCY", "t½", "PURPOSE"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left tracking-widest font-medium whitespace-nowrap"
                        style={{ color: "#333" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.data.supplements.map((row, i) => (
                    <tr
                      key={row.name}
                      style={{
                        borderBottom:
                          i < result.data.supplements.length - 1 ? "1px solid #0d0d0d" : "none",
                      }}
                      className="hover:bg-zinc-900 transition-colors"
                    >
                      <td
                        className="px-4 py-3 font-semibold tracking-wider whitespace-nowrap"
                        style={{ color: "#ccc" }}
                      >
                        {row.name}
                      </td>
                      <td className="px-4 py-3 terminal-cyan font-bold whitespace-nowrap">
                        {row.dose}
                      </td>
                      <td
                        className="px-4 py-3 tracking-wider whitespace-nowrap"
                        style={{ color: "#555" }}
                      >
                        {row.frequency}
                      </td>
                      <td className="px-4 py-3 terminal-amber font-bold">{row.half_life}</td>
                      <td className="px-4 py-3" style={{ color: "#555" }}>
                        {row.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Half-life parameters */}
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
              ── HALF-LIFE DECAY PARAMETERS
            </p>
            <div className="card-surface overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                    {["STRESSOR", "t½", "CATEGORY", "NOTES"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left tracking-widest font-medium whitespace-nowrap"
                        style={{ color: "#333" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.data.halflife_params.map((row, i) => (
                    <tr
                      key={row.param}
                      style={{
                        borderBottom:
                          i < result.data.halflife_params.length - 1 ? "1px solid #0d0d0d" : "none",
                      }}
                      className="hover:bg-zinc-900 transition-colors"
                    >
                      <td
                        className="px-4 py-3 font-semibold tracking-wider whitespace-nowrap"
                        style={{ color: "#ccc" }}
                      >
                        {row.param}
                      </td>
                      <td className="px-4 py-3 terminal-cyan font-bold">{row.half_life}</td>
                      <td className="px-4 py-3 tracking-wider" style={{ color: "#555" }}>
                        {row.category}
                      </td>
                      <td className="px-4 py-3" style={{ color: "#444" }}>
                        {row.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs" style={{ color: "#3f3f46" }}>
              Decay formula: R(t) = R₀ · e^(−λt) where λ = ln(2) / t½
            </p>
          </div>

          {/* Training log */}
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
              ── TRAINING LOG
            </p>
            {result.data.training_log.length === 0 ? (
              <div className="card-surface p-8 text-center">
                <p className="text-xs tracking-widest mb-2" style={{ color: "#3f3f46" }}>
                  NO ENTRIES LOGGED
                </p>
                <p className="text-xs" style={{ color: "#2a2a2a" }}>
                  Sessions appear here once they are recorded in the training log.
                </p>
              </div>
            ) : (
              <div className="card-surface overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                      {["DATE", "TYPE", "DURATION", "LOAD", "t½", "DECAY"].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left tracking-widest font-medium whitespace-nowrap"
                          style={{ color: "#333" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.data.training_log.map((row, i) => (
                      <tr
                        key={`${row.date}-${row.type}`}
                        style={{
                          borderBottom:
                            i < result.data.training_log.length - 1 ? "1px solid #0d0d0d" : "none",
                        }}
                        className="hover:bg-zinc-900 transition-colors"
                      >
                        <td className="px-4 py-3 whitespace-nowrap" style={{ color: "#666" }}>
                          {row.date}
                        </td>
                        <td className="px-4 py-3" style={{ color: "#ccc" }}>
                          {row.type}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap" style={{ color: "#777" }}>
                          {row.duration}
                        </td>
                        <td className="px-4 py-3" style={{ color: "#777" }}>
                          {row.load}
                        </td>
                        <td className="px-4 py-3 terminal-cyan">{row.half_life}</td>
                        <td className="px-4 py-3 terminal-amber">{row.decay}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Module status */}
          <div>
            <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
              ── MODULE STATUS
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {result.data.modules.map((mod) => (
                <div
                  key={mod.name}
                  className="card-surface px-4 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className={`status-dot ${statusDotClass(mod.status)}`} />
                    <span className="text-xs tracking-wider" style={{ color: "#777" }}>
                      {mod.name}
                    </span>
                  </div>
                  <span
                    className="text-xs tracking-wider"
                    style={{ color: statusColor(mod.status) }}
                  >
                    {mod.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
