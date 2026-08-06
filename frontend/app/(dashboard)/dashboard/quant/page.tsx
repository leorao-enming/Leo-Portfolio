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

const ENGINE_LAYERS = [
  {
    layer: "01",
    name: "DATA INGESTION LAYER",
    tech: "Python / asyncio / aiohttp",
    description:
      "Streams live OHLCV, order book depth, and macro event feeds. Normalises tick data into a unified internal schema before dispatch.",
    status: "HEALTHY",
    latency: "< 5ms",
  },
  {
    layer: "02",
    name: "SIGNAL PROCESSOR",
    tech: "Python / NumPy / pandas",
    description:
      "Runs configurable alpha models — momentum, mean-reversion, breakout, and statistical arbitrage. Outputs scored signal objects with confidence metrics.",
    status: "HEALTHY",
    latency: "< 12ms",
  },
  {
    layer: "03",
    name: "RISK MANAGER",
    tech: "Python / scipy",
    description:
      "Pre-trade risk gate. Enforces position limits, max drawdown thresholds, correlation constraints, and Kelly fraction sizing before any order is dispatched.",
    status: "HEALTHY",
    latency: "< 2ms",
  },
  {
    layer: "04",
    name: "EXECUTION ENGINE",
    tech: "Python / ib_insync / IBKR TWS API",
    description:
      "Translates approved signal objects into IBKR order types (MKT, LMT, VWAP). Handles partial fills, re-queuing, and execution confirmation acknowledgement.",
    status: "STANDBY",
    latency: "N/A",
  },
  {
    layer: "05",
    name: "PORTFOLIO TRACKER",
    tech: "Python / SQLite / FastAPI",
    description:
      "Maintains real-time P&L ledger, position register, and attribution analytics. Exposes internal REST API consumed by the LEOLOGIC OS dashboard.",
    status: "HEALTHY",
    latency: "< 8ms",
  },
  {
    layer: "06",
    name: "STRATEGY REGISTRY",
    tech: "Python / YAML config",
    description:
      "Version-controlled strategy library. Each strategy is a self-contained module with defined alpha logic, parameter space, and backtest metadata.",
    status: "HEALTHY",
    latency: "—",
  },
];

const IBKR_FLOW = [
  { step: "01", node: "MARKET FEED", type: "INPUT", detail: "IBKR TWS Market Data → ib_insync subscription → normalised tick/bar objects" },
  { step: "02", node: "DATA BUS", type: "INTERNAL", detail: "asyncio queue dispatches normalised data to Signal Processor and Portfolio Tracker concurrently" },
  { step: "03", node: "ALPHA MODEL", type: "COMPUTE", detail: "Strategy modules consume bar data → compute indicators → emit ScoredSignal(asset, dir, confidence, expiry)" },
  { step: "04", node: "RISK GATE", type: "CONTROL", detail: "RiskManager validates ScoredSignal against portfolio state, drawdown limits, and position caps" },
  { step: "05", node: "ORDER ROUTER", type: "OUTPUT", detail: "Approved signals → construct IBKR Order object → place via ib_insync placeOrder() → await fill event" },
  { step: "06", node: "FILL HANDLER", type: "CONFIRM", detail: "On execDetails event: update position ledger, log execution, emit to Portfolio Tracker" },
];

const STRATEGIES = [
  { name: "momentum_v3", version: "3.2.1", universe: "Crypto / Equities", lookback: "20 bars", params: "ema_fast=8, ema_slow=21", status: "ACTIVE" },
  { name: "mean_rev_zscore", version: "1.4.0", universe: "Equity Pairs", lookback: "60 bars", params: "z_entry=2.0, z_exit=0.5", status: "ACTIVE" },
  { name: "breakout_vol", version: "2.0.0", universe: "Equities", lookback: "14 bars", params: "atr_mult=1.5, vol_filter=True", status: "STAGED" },
  { name: "stat_arb_pairs", version: "0.9.0", universe: "Crypto", lookback: "120 bars", params: "coint_pval=0.05", status: "RESEARCH" },
];

const FLOW_TYPE_COLORS: Record<string, string> = {
  INPUT: "terminal-cyan",
  INTERNAL: "",
  COMPUTE: "terminal-amber",
  CONTROL: "terminal-text",
  OUTPUT: "terminal-amber",
  CONFIRM: "terminal-cyan",
};

const SIGNAL_TABLE = [
  { id: "SIG-001", type: "MOMENTUM", asset: "BTC/USD", direction: "LONG", confidence: "74%", status: "ACTIVE" },
  { id: "SIG-002", type: "MEAN-REV", asset: "ETH/USD", direction: "SHORT", confidence: "61%", status: "ACTIVE" },
  { id: "SIG-003", type: "BREAKOUT", asset: "SPY", direction: "LONG", confidence: "88%", status: "TRIGGERED" },
  { id: "SIG-004", type: "MOMENTUM", asset: "QQQ", direction: "LONG", confidence: "55%", status: "PENDING" },
  { id: "SIG-005", type: "ARB", asset: "BTC-ETH", direction: "NEUTRAL", confidence: "—", status: "SCANNING" },
];

const SYSTEM_MODULES = [
  { name: "DATA INGESTION", status: "HEALTHY", latency: "< 5ms" },
  { name: "SIGNAL PROCESSOR", status: "HEALTHY", latency: "< 12ms" },
  { name: "EXECUTION ENGINE", status: "STANDBY", latency: "N/A" },
  { name: "RISK MANAGER", status: "HEALTHY", latency: "< 2ms" },
  { name: "PORTFOLIO TRACKER", status: "HEALTHY", latency: "< 8ms" },
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
    STAGED: "terminal-cyan",
    RESEARCH: "",
  };
  const cls = map[status] ?? "";
  return (
    <span className={`text-xs tracking-wider ${cls}`} style={!cls ? { color: "#555" } : {}}>
      {status}
    </span>
  );
}

function LayerStatusDot({ status }: { status: string }) {
  if (status === "HEALTHY") return <span className="status-dot status-dot-online" />;
  if (status === "STANDBY") return <span className="status-dot status-dot-idle" />;
  return <span className="status-dot status-dot-offline" />;
}

export default function QuantPage() {
  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] mb-2" style={{ color: "#444" }}>
          SUBSYSTEM // LQC-CORE
        </p>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#e0e0e0" }}>
          QUANT <span className="terminal-text">TRADING ENGINE</span>
        </h1>
        <p className="text-xs mt-2 leading-relaxed max-w-xl" style={{ color: "#555" }}>
          LeoLogic Quantitative Core — Python-native signal generation, IBKR API execution routing,
          and real-time portfolio analytics. Placeholder state awaiting broker API integration.
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

      {/* Python engine architecture */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
          ── PYTHON ENGINE ARCHITECTURE
        </p>
        <div className="space-y-2">
          {ENGINE_LAYERS.map((layer) => (
            <div key={layer.layer} className="card-surface p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <span
                    className="text-xs font-mono tracking-widest shrink-0 mt-0.5"
                    style={{ color: "#3f3f46" }}
                  >
                    [{layer.layer}]
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <LayerStatusDot status={layer.status} />
                      <h3 className="text-xs font-semibold tracking-widest" style={{ color: "#ccc" }}>
                        {layer.name}
                      </h3>
                    </div>
                    <p className="text-xs font-mono mb-2 terminal-text tracking-wider">
                      {layer.tech}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "#555" }}>
                      {layer.description}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <StatusBadge status={layer.status} />
                  <p className="text-xs font-mono mt-1" style={{ color: "#3f3f46" }}>
                    {layer.latency}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IBKR API integration flow */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
          ── IBKR API INTEGRATION FLOW
        </p>
        <div className="card-surface overflow-hidden">
          <div
            className="px-5 py-3 flex items-center gap-3"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            <span className="status-dot status-dot-idle" />
            <span className="text-xs tracking-widest terminal-amber">
              ib_insync → TWS Paper / Live Gateway → Order Lifecycle
            </span>
          </div>
          <div>
            {IBKR_FLOW.map((item, i) => (
              <div
                key={item.step}
                className="px-5 py-4 flex items-start gap-5 hover:bg-zinc-900 transition-colors"
                style={{
                  borderBottom: i < IBKR_FLOW.length - 1 ? "1px solid #0d0d0d" : "none",
                }}
              >
                <span
                  className="text-xs font-mono tracking-widest shrink-0 mt-0.5"
                  style={{ color: "#3f3f46" }}
                >
                  {item.step}
                </span>
                <div className="w-32 shrink-0">
                  <p className="text-xs font-semibold tracking-wider" style={{ color: "#ccc" }}>
                    {item.node}
                  </p>
                  <span
                    className={`text-[10px] tracking-widest font-mono ${FLOW_TYPE_COLORS[item.type] ?? ""}`}
                    style={!FLOW_TYPE_COLORS[item.type] ? { color: "#555" } : {}}
                  >
                    {item.type}
                  </span>
                </div>
                <p className="text-xs leading-relaxed font-mono" style={{ color: "#555" }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 px-5 py-3 card-surface font-mono text-xs">
          <span style={{ color: "#444" }}>lqc@leologic:~# </span>
          <span className="terminal-text">
            ib_insync.connect(&apos;127.0.0.1&apos;, 7497, clientId=1)
          </span>
          <span style={{ color: "#444" }}> → </span>
          <span className="terminal-amber">awaiting TWS heartbeat...</span>
        </div>
      </div>

      {/* Strategy registry */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
          ── STRATEGY REGISTRY
        </p>
        <div className="card-surface overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["STRATEGY", "VERSION", "UNIVERSE", "LOOKBACK", "PARAMETERS", "STATUS"].map((h) => (
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
              {STRATEGIES.map((row, i) => (
                <tr
                  key={row.name}
                  style={{ borderBottom: i < STRATEGIES.length - 1 ? "1px solid #0d0d0d" : "none" }}
                  className="hover:bg-zinc-900 transition-colors"
                >
                  <td className="px-4 py-3 font-semibold terminal-text whitespace-nowrap">{row.name}</td>
                  <td className="px-4 py-3" style={{ color: "#555" }}>{row.version}</td>
                  <td className="px-4 py-3 tracking-wider whitespace-nowrap" style={{ color: "#666" }}>{row.universe}</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: "#555" }}>{row.lookback}</td>
                  <td className="px-4 py-3" style={{ color: "#555" }}>{row.params}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
