import type { Metadata } from "next";
import Link from "next/link";
import { HalfLifeSimulator } from "../../(public)/_components/HalfLifeSimulator";

export const metadata: Metadata = {
  title: "Half-Life Bio-Metrics",
};

const METRIC_CARDS = [
  { label: "READINESS SCORE", value: "—", sub: "Awaiting biometric data", color: "terminal-cyan" },
  { label: "FATIGUE LOAD", value: "NOMINAL", sub: "Acute:Chronic ratio: —", color: "terminal-text" },
  { label: "METABOLIC AGE", value: "—", sub: "Half-life decay index", color: "terminal-amber" },
  { label: "RECOVERY STATUS", value: "UNKNOWN", sub: "HRV feed pending", color: "" },
];

const HALFLIFE_PARAMS = [
  { param: "COMPOUND", halfLife: "48h", category: "CNS FATIGUE", notes: "Neurological recovery window" },
  { param: "GLYCOGEN", halfLife: "24h", category: "METABOLIC", notes: "Full repletion with nutrition" },
  { param: "MUSCLE DAMAGE", halfLife: "72h", category: "STRUCTURAL", notes: "Eccentric-dominant sessions" },
  { param: "HORMONAL STRESS", halfLife: "6h", category: "ENDOCRINE", notes: "Cortisol acute response" },
  { param: "CARDIO FATIGUE", halfLife: "12h", category: "CARDIOVASCULAR", notes: "Aerobic system load" },
  { param: "CREATINE SATURATION", halfLife: "36h", category: "SUPPLEMENT", notes: "Phosphocreatine pool depletion" },
  { param: "VITAMIN D3", halfLife: "720h", category: "SUPPLEMENT", notes: "Stored in adipose; slow decay" },
];

const BIO_MODULES = [
  { name: "HRV MONITOR", status: "PENDING" },
  { name: "TRAINING LOGGER", status: "ACTIVE" },
  { name: "METABOLIC DECAY MODEL", status: "ACTIVE" },
  { name: "SUPPLEMENT TRACKER", status: "ACTIVE" },
  { name: "SLEEP TRACKER (EXT)", status: "PENDING" },
  { name: "NUTRITION INTAKE (EXT)", status: "PENDING" },
  { name: "WEARABLE FEED (EXT)", status: "PENDING" },
  { name: "BLOODWORK API (EXT)", status: "PENDING" },
];

const SUPPLEMENT_STACK = [
  { name: "Creatine Monohydrate", dose: "5000mg", freq: "Daily", tHalf: "36h", purpose: "ATP resynthesis, strength output" },
  { name: "Vitamin D3", dose: "5000 IU", freq: "Daily", tHalf: "720h", purpose: "Hormonal regulation, immune function" },
  { name: "Artichoke Extract", dose: "320mg", freq: "As needed", tHalf: "4h", purpose: "PDE4 inhibition, cAMP elevation" },
];

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    ACTIVE: "var(--color-terminal-green)",
    PENDING: "var(--color-terminal-amber)",
    ERROR: "var(--color-terminal-red)",
  };
  return (
    <span className="text-xs tracking-wider" style={{ color: colorMap[status] ?? "#555" }}>
      {status}
    </span>
  );
}

export default function BioSystemPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Top bar */}
      <header
        className="sticky top-0 z-50 px-8 py-3 flex items-center justify-between"
        style={{
          backgroundColor: "var(--color-surface-1, #0d0d0d)",
          borderBottom: "1px solid var(--color-border, #1a1a1a)",
        }}
      >
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs tracking-widest transition-colors"
            style={{ color: "#555" }}
          >
            <span>←</span>
            <span>BACK TO DASHBOARD</span>
          </Link>
          <span style={{ color: "#222" }}>|</span>
          <span className="text-xs tracking-widest terminal-cyan">HALFLIFE // BIO-METRICS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="status-dot status-dot-online" />
          <span className="text-xs tracking-widest" style={{ color: "#444" }}>
            SUBSYSTEM ONLINE
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-10">
        {/* Page header */}
        <div className="mb-12">
          <p className="text-xs tracking-[0.35em] mb-3" style={{ color: "#333" }}>
            LEOLOGIC OS // SUBSYSTEM // HALFLIFE
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-3" style={{ color: "#e0e0e0" }}>
            HALF-LIFE{" "}
            <span className="terminal-cyan">BIO-METRICS</span>
          </h1>
          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "#555" }}>
            Physiological optimization engine — Models fatigue, recovery, and supplement pharmacokinetics
            as exponential decay functions. All biological stressors expressed as half-life equations.
          </p>
          <p className="mt-3 text-xs font-mono" style={{ color: "#333" }}>
            R(t) = R₀ · e^(−λt) &nbsp;·&nbsp; λ = ln(2) / t½ &nbsp;·&nbsp; bone_weight_modifier = 4.5
          </p>
        </div>

        {/* Metrics grid */}
        <section className="mb-12">
          <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
            ── PHYSIOLOGICAL METRICS
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {METRIC_CARDS.map((card) => (
              <div key={card.label} className="card-surface p-5">
                <p className="text-xs mb-3 tracking-wider" style={{ color: "#444" }}>
                  {card.label}
                </p>
                <p
                  className={`text-2xl font-bold tracking-tight mb-1 ${card.color}`}
                  style={!card.color ? { color: "#555" } : {}}
                >
                  {card.value}
                </p>
                <p className="text-xs" style={{ color: "#444" }}>
                  {card.sub}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive decay simulator */}
        <section className="mb-12">
          <p className="text-xs tracking-[0.3em] mb-2" style={{ color: "#444" }}>
            ── DECAY SIMULATOR
          </p>
          <HalfLifeSimulator />
        </section>

        {/* Supplement stack */}
        <section className="mb-12">
          <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
            ── ACTIVE SUPPLEMENT STACK
          </p>
          <div className="card-surface overflow-hidden">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border, #1a1a1a)" }}>
                  {["COMPOUND", "DOSE", "FREQUENCY", "t½", "PURPOSE"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left tracking-widest font-medium"
                      style={{ color: "#333" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SUPPLEMENT_STACK.map((row, i) => (
                  <tr
                    key={row.name}
                    style={{
                      borderBottom: i < SUPPLEMENT_STACK.length - 1 ? "1px solid #0d0d0d" : "none",
                    }}
                    className="hover:bg-zinc-900 transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold tracking-wider" style={{ color: "#ccc" }}>
                      {row.name}
                    </td>
                    <td className="px-4 py-3 terminal-cyan font-bold">{row.dose}</td>
                    <td className="px-4 py-3 tracking-wider" style={{ color: "#555" }}>
                      {row.freq}
                    </td>
                    <td className="px-4 py-3 terminal-amber font-bold">{row.tHalf}</td>
                    <td className="px-4 py-3" style={{ color: "#444" }}>
                      {row.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Fatigue half-life model */}
        <section className="mb-12">
          <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
            ── FATIGUE HALF-LIFE PARAMETERS
          </p>
          <div className="card-surface overflow-hidden">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border, #1a1a1a)" }}>
                  {["STRESSOR", "t½", "CATEGORY", "NOTES"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left tracking-widest font-medium"
                      style={{ color: "#333" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HALFLIFE_PARAMS.map((row, i) => (
                  <tr
                    key={row.param}
                    style={{
                      borderBottom: i < HALFLIFE_PARAMS.length - 1 ? "1px solid #0d0d0d" : "none",
                    }}
                    className="hover:bg-zinc-900 transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold tracking-wider" style={{ color: "#ccc" }}>
                      {row.param}
                    </td>
                    <td className="px-4 py-3 terminal-cyan font-bold">{row.halfLife}</td>
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
          <p className="mt-3 text-xs font-mono" style={{ color: "#333" }}>
            Decay formula: R(t) = R₀ · e^(−λt) where λ = ln(2) / t½
          </p>
        </section>

        {/* Module status */}
        <section>
          <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
            ── MODULE STATUS
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {BIO_MODULES.map((mod) => (
              <div key={mod.name} className="card-surface px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`status-dot ${
                      mod.status === "ACTIVE"
                        ? "status-dot-online"
                        : mod.status === "PENDING"
                        ? "status-dot-idle"
                        : "status-dot-offline"
                    }`}
                  />
                  <span className="text-xs tracking-wider" style={{ color: "#666" }}>
                    {mod.name}
                  </span>
                </div>
                <StatusBadge status={mod.status} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
