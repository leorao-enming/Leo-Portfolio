import type { Metadata } from "next";

import { FeedOffline } from "../../_components/FeedOffline";
import {
  getQuantDashboard,
  statusColor,
  statusDotClass,
  TONE_CLASS,
  TONE_COLOR,
  type FlowStepType,
  type ModuleStatus,
  type Strategy,
} from "../../../_lib/dashboard";

export const metadata: Metadata = {
  title: "Quant Engine",
  robots: { index: false, follow: false },
};

const FLOW_TYPE_CLASS: Record<FlowStepType, string> = {
  INPUT: "terminal-cyan",
  INTERNAL: "",
  COMPUTE: "terminal-amber",
  CONTROL: "terminal-text",
  OUTPUT: "terminal-amber",
  CONFIRM: "terminal-cyan",
};

const STRATEGY_CLASS: Record<Strategy["status"], string> = {
  ACTIVE: "terminal-text",
  STAGED: "terminal-cyan",
  RESEARCH: "",
  RETIRED: "",
};

function Badge({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={`text-xs tracking-wider ${className}`}
      style={!className ? { color: "#555" } : undefined}
    >
      {label}
    </span>
  );
}

function ModuleBadge({ status }: { status: ModuleStatus }) {
  return (
    <span className="text-xs tracking-wider" style={{ color: statusColor(status) }}>
      {status}
    </span>
  );
}

export default async function QuantPage() {
  const result = await getQuantDashboard();

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
          LeoLogic Quantitative Core — a private Discord bot as the remote operator
          console for Interactive Brokers. Market data, signals, and backtests all run
          from a chat command. Runs paper only: live order execution is gated off until
          the strategy set clears validation.
        </p>
      </div>

      {!result.ok ? (
        <FeedOffline subsystem="/quant/dashboard" error={result.error} />
      ) : (
        <>
          {/* Status cards */}
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
              ── SYSTEM METRICS
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {result.data.status_cards.map((card) => (
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

          {/* Live-execution interlock */}
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
              ── LIVE EXECUTION INTERLOCK
            </p>
            <div
              className="card-surface p-5"
              style={{ borderLeft: "2px solid var(--color-terminal-amber)" }}
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                <span className="status-dot status-dot-idle" />
                <code className="text-xs font-mono terminal-amber">
                  {result.data.safety_gate.flag}={result.data.safety_gate.flag_value}
                </code>
                <span className="text-xs tracking-widest" style={{ color: "#555" }}>
                  MODE: {result.data.safety_gate.mode}
                </span>
              </div>

              <p className="text-xs leading-relaxed mb-5 max-w-3xl" style={{ color: "#666" }}>
                {result.data.safety_gate.summary}
              </p>

              <p className="text-xs tracking-[0.2em] mb-3" style={{ color: "#444" }}>
                UNLOCK CONDITIONS
              </p>
              <ul className="space-y-2 mb-4">
                {result.data.safety_gate.conditions.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-start gap-3 text-xs"
                    style={{ color: "#777" }}
                  >
                    <span
                      className="font-mono shrink-0 mt-px"
                      style={{ color: c.met ? TONE_COLOR.green : "#3f3f46" }}
                      aria-hidden
                    >
                      [{c.met ? "x" : " "}]
                    </span>
                    <span className="flex-1 min-w-0">
                      <span style={{ color: "#ccc" }}>{c.label}</span>
                      <span style={{ color: "#555" }}> — {c.target}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <p
                className="text-xs pt-3"
                style={{ color: "#444", borderTop: "1px solid var(--color-border)" }}
              >
                Next review: {result.data.safety_gate.review_date}
              </p>
            </div>
          </div>

          {/* Python engine architecture */}
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
              ── REMOTE OPERATOR ARCHITECTURE
            </p>
            <div className="space-y-2">
              {result.data.engine_layers.map((layer) => (
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
                          <span className={`status-dot ${statusDotClass(layer.status)}`} />
                          <h3
                            className="text-xs font-semibold tracking-widest"
                            style={{ color: "#ccc" }}
                          >
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
                      <ModuleBadge status={layer.status} />
                      <p className="text-xs font-mono mt-1" style={{ color: "#3f3f46" }}>
                        {layer.implementation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operator command flow */}
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
              ── OPERATOR COMMAND FLOW
            </p>
            <div className="card-surface overflow-hidden">
              <div
                className="px-5 py-3 flex items-center gap-3"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <span className="status-dot status-dot-idle" />
                <span className="text-xs tracking-widest terminal-amber">
                  Discord message → command router → IBKR paper gateway → journal
                </span>
              </div>
              <div>
                {result.data.ibkr_flow.map((item, i) => (
                  <div
                    key={item.step}
                    className="px-5 py-4 flex items-start gap-5 hover:bg-zinc-900 transition-colors"
                    style={{
                      borderBottom:
                        i < result.data.ibkr_flow.length - 1 ? "1px solid #0d0d0d" : "none",
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
                        className={`text-[10px] tracking-widest font-mono ${FLOW_TYPE_CLASS[item.type]}`}
                        style={!FLOW_TYPE_CLASS[item.type] ? { color: "#555" } : undefined}
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
                    {["STRATEGY", "VERSION", "UNIVERSE", "LOOKBACK", "PARAMETERS", "STATUS"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left tracking-widest font-medium whitespace-nowrap"
                          style={{ color: "#333" }}
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {result.data.strategies.map((row, i) => (
                    <tr
                      key={row.name}
                      style={{
                        borderBottom:
                          i < result.data.strategies.length - 1 ? "1px solid #0d0d0d" : "none",
                      }}
                      className="hover:bg-zinc-900 transition-colors"
                    >
                      <td className="px-4 py-3 font-semibold terminal-text whitespace-nowrap">
                        {row.name}
                      </td>
                      <td className="px-4 py-3" style={{ color: "#555" }}>
                        {row.version}
                      </td>
                      <td
                        className="px-4 py-3 tracking-wider whitespace-nowrap"
                        style={{ color: "#666" }}
                      >
                        {row.universe}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: "#555" }}>
                        {row.lookback}
                      </td>
                      <td className="px-4 py-3" style={{ color: "#555" }}>
                        {row.params}
                      </td>
                      <td className="px-4 py-3">
                        <Badge label={row.status} className={STRATEGY_CLASS[row.status]} />
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
                  <div className="flex items-center gap-6">
                    <ModuleBadge status={mod.status} />
                    <span className="text-xs font-mono" style={{ color: "#3f3f46" }}>
                      {mod.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
