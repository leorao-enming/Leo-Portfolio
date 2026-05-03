import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bio-Metrics",
};

const METRIC_CARDS = [
  { label: "READINESS SCORE", value: "—", sub: "Awaiting biometric data", color: "terminal-cyan" },
  { label: "FATIGUE LOAD", value: "NOMINAL", sub: "Acute:Chronic ratio: —", color: "terminal-text" },
  { label: "METABOLIC AGE", value: "—", sub: "Half-life decay index", color: "terminal-amber" },
  { label: "RECOVERY STATUS", value: "UNKNOWN", sub: "HRV feed pending", color: "" },
];

const TRAINING_LOG: {
  date: string;
  type: string;
  duration: string;
  load: string;
  halfLife: string;
  decay: string;
}[] = [
  // Placeholder rows — will be populated from data integration
];

const HALFLIFE_PARAMS = [
  { param: "COMPOUND", halfLife: "48h", category: "CNS FATIGUE", notes: "Neurological recovery" },
  { param: "GLYCOGEN", halfLife: "24h", category: "METABOLIC", notes: "Full repletion with nutrition" },
  { param: "MUSCLE DAMAGE", halfLife: "72h", category: "STRUCTURAL", notes: "Eccentric-dominant sessions" },
  { param: "HORMONAL STRESS", halfLife: "6h", category: "ENDOCRINE", notes: "Cortisol acute response" },
  { param: "CARDIO FATIGUE", halfLife: "12h", category: "CARDIOVASCULAR", notes: "Aerobic system load" },
];

const BIO_MODULES = [
  { name: "HRV MONITOR", status: "PENDING" },
  { name: "TRAINING LOGGER", status: "ACTIVE" },
  { name: "METABOLIC DECAY MODEL", status: "ACTIVE" },
  { name: "SLEEP TRACKER (EXT)", status: "PENDING" },
  { name: "NUTRITION INTAKE (EXT)", status: "PENDING" },
  { name: "WEARABLE FEED (EXT)", status: "PENDING" },
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

export default function BiometricsPage() {
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
      </div>

      {/* Status cards */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
          ── PHYSIOLOGICAL METRICS
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {METRIC_CARDS.map((card) => (
            <div key={card.label} className="card-surface p-4">
              <p className="text-xs mb-3 tracking-wider" style={{ color: "#444" }}>
                {card.label}
              </p>
              <p
                className={`text-xl font-bold tracking-tight mb-1 ${card.color}`}
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
      </div>

      {/* Half-life model table */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
          ── HALF-LIFE DECAY PARAMETERS
        </p>
        <div className="card-surface overflow-hidden">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
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
        <p className="mt-3 text-xs" style={{ color: "#333" }}>
          Decay formula: R(t) = R₀ · e^(−λt) where λ = ln(2) / t½
        </p>
      </div>

      {/* Training log */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
          ── TRAINING LOG
        </p>
        {TRAINING_LOG.length === 0 ? (
          <div
            className="card-surface p-8 text-center"
          >
            <p className="text-xs tracking-widest mb-2" style={{ color: "#333" }}>
              NO ENTRIES LOGGED
            </p>
            <p className="text-xs" style={{ color: "#2a2a2a" }}>
              Training sessions will appear here once data ingestion is configured.
            </p>
          </div>
        ) : (
          <div className="card-surface overflow-hidden">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  {["DATE", "TYPE", "DURATION", "LOAD", "t½", "DECAY"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left tracking-widest font-medium" style={{ color: "#333" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRAINING_LOG.map((row) => (
                  <tr key={row.date} style={{ borderBottom: "1px solid #0d0d0d" }}>
                    <td className="px-4 py-3" style={{ color: "#666" }}>{row.date}</td>
                    <td className="px-4 py-3" style={{ color: "#ccc" }}>{row.type}</td>
                    <td className="px-4 py-3" style={{ color: "#777" }}>{row.duration}</td>
                    <td className="px-4 py-3" style={{ color: "#777" }}>{row.load}</td>
                    <td className="px-4 py-3 terminal-cyan">{row.halfLife}</td>
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
                <span className="text-xs tracking-wider" style={{ color: "#777" }}>
                  {mod.name}
                </span>
              </div>
              <StatusBadge status={mod.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
