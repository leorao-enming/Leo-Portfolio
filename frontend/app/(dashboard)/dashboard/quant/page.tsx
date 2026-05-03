import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quant Engine",
};

const STATUS_CARDS = [
  { label: "ENGINE STATUS", value: "STANDBY", sub: "Awaiting live feed integration", color: "terminal-amber" },
  { label: "ACTIVE SIGNALS", value: "14", sub: "Momentum + Mean-Reversion", color: "terminal-text" },
  { label: "OPEN POSITIONS", value: "3", sub: "Risk-managed exposure", color: "terminal-text" },
  { label: "RISK MODE", value: "CONSERVATIVE", sub: "Max drawdown: 2% per session", color: "terminal-cyan" },
];

const SIGNAL_TABLE = [
  { id: "SIG-001", type: "MOMENTUM", asset: "BTC/USD", direction: "LONG", confidence: "74%", status: "ACTIVE" },
  { id: "SIG-002", type: "MEAN-REV", asset: "ETH/USD", direction: "SHORT", confidence: "61%", status: "ACTIVE" },
  { id: "SIG-003", type: "BREAKOUT", asset: "SPY", direction: "LONG", confidence: "88%", status: "TRIGGERED" },
  { id: "SIG-004", type: "MOMENTUM", asset: "QQQ", direction: "LONG", confidence: "55%", status: "PENDING" },
  { id: "SIG-005", type: "ARB", asset: "BTC-ETH", direction: "NEUTRAL", confidence: "—", status: "SCANNING" },
];

const SYSTEM_MODULES = [
  { name: "DATA INGESTION", status: "HEALTHY", latency: "—" },
  { name: "SIGNAL PROCESSOR", status: "HEALTHY", latency: "—" },
  { name: "EXECUTION ENGINE", status: "STANDBY", latency: "—" },
  { name: "RISK MANAGER", status: "HEALTHY", latency: "—" },
  { name: "PORTFOLIO TRACKER", status: "HEALTHY", latency: "—" },
  { name: "LIVE FEED (EXT)", status: "PENDING", latency: "N/A" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    ACTIVE: "terminal-text",
    TRIGGERED: "terminal-amber",
    PENDING: "",
    SCANNING: "terminal-cyan",
    HEALTHY: "terminal-text",
    STANDBY: "terminal-amber",
  };
  const cls = map[status] ?? "";
  return (
    <span className={`text-xs tracking-wider ${cls}`} style={!cls ? { color: "#555" } : {}}>
      {status}
    </span>
  );
}

export default function QuantPage() {
  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] mb-2" style={{ color: "#444" }}>
          SUBSYSTEM // CATALYST
        </p>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#e0e0e0" }}>
          QUANT <span className="terminal-text">TRADING ENGINE</span>
        </h1>
        <p className="text-xs mt-2 leading-relaxed max-w-xl" style={{ color: "#555" }}>
          Project Catalyst — Systematic signal generation, execution routing, and live portfolio
          performance analytics. Placeholder state awaiting broker API integration.
        </p>
      </div>

      {/* Status cards */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
          ── SYSTEM METRICS
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATUS_CARDS.map((card) => (
            <div key={card.label} className="card-surface p-4">
              <p className="text-xs mb-3 tracking-wider" style={{ color: "#444" }}>
                {card.label}
              </p>
              <p className={`text-xl font-bold tracking-tight mb-1 ${card.color}`}>
                {card.value}
              </p>
              <p className="text-xs" style={{ color: "#444" }}>
                {card.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Signal table */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
          ── ACTIVE SIGNAL REGISTRY
        </p>
        <div className="card-surface overflow-hidden">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["SIGNAL ID", "TYPE", "ASSET", "DIRECTION", "CONFIDENCE", "STATUS"].map((h) => (
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
              {SIGNAL_TABLE.map((row, i) => (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: i < SIGNAL_TABLE.length - 1 ? "1px solid #0d0d0d" : "none",
                  }}
                  className="hover:bg-zinc-900 transition-colors"
                >
                  <td className="px-4 py-3 tracking-wider" style={{ color: "#666" }}>
                    {row.id}
                  </td>
                  <td className="px-4 py-3 tracking-wider" style={{ color: "#555" }}>
                    {row.type}
                  </td>
                  <td className="px-4 py-3 font-semibold" style={{ color: "#ccc" }}>
                    {row.asset}
                  </td>
                  <td
                    className="px-4 py-3 tracking-wider"
                    style={{ color: row.direction === "LONG" ? "var(--color-terminal-green)" : row.direction === "SHORT" ? "var(--color-terminal-red)" : "#666" }}
                  >
                    {row.direction}
                  </td>
                  <td className="px-4 py-3" style={{ color: "#777" }}>
                    {row.confidence}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Module health */}
      <div>
        <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
          ── MODULE HEALTH
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {SYSTEM_MODULES.map((mod) => (
            <div
              key={mod.name}
              className="card-surface px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`status-dot ${
                    mod.status === "HEALTHY"
                      ? "status-dot-online"
                      : mod.status === "STANDBY"
                      ? "status-dot-idle"
                      : "status-dot-offline"
                  }`}
                />
                <span className="text-xs tracking-wider" style={{ color: "#777" }}>
                  {mod.name}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <StatusBadge status={mod.status} />
                <span className="text-xs" style={{ color: "#333" }}>
                  {mod.latency}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
