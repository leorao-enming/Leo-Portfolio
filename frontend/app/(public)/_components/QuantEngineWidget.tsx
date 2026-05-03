"use client";

import { useEffect, useState } from "react";

const PROCESSES = [
  {
    name: "IBKR API",
    status: "CONNECTED",
    statusColor: "text-green-400",
    dot: "bg-green-500",
    pulse: true,
  },
  {
    name: "Catalyst Engine",
    status: "STANDBY",
    statusColor: "text-amber-400",
    dot: "bg-amber-500",
    pulse: true,
  },
  {
    name: "Risk Manager",
    status: "ACTIVE",
    statusColor: "text-green-400",
    dot: "bg-green-500",
    pulse: true,
  },
  {
    name: "Signal Processor",
    status: "IDLE",
    statusColor: "text-zinc-500",
    dot: "bg-zinc-600",
    pulse: false,
  },
];

const BOOT_LOG = [
  "> sys.boot → LeoLogic Quantitative Core v2.1",
  "> ibkr.connect() → OK [latency: 3ms]",
  "> catalyst.load_strategy('momentum_v3') → OK",
  "> risk.set_limits(max_dd=0.02) → OK",
  "> awaiting market signal...",
];

export function QuantEngineWidget() {
  const [execMs, setExecMs] = useState(2);

  useEffect(() => {
    const t = setInterval(() => setExecMs((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col h-full font-mono text-xs gap-3">
      {/* Live indicator header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
        <span className="tracking-[0.25em] text-green-400 text-[10px]">
          LIVE — ARCHITECTURE MODE
        </span>
      </div>

      {/* Process status rows */}
      <div className="space-y-1.5">
        {PROCESSES.map((p) => (
          <div
            key={p.name}
            className="flex items-center justify-between px-3 py-2"
            style={{
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <span className="text-zinc-500 tracking-wider">
              [ {p.name} ]
            </span>
            <div className="flex items-center gap-2">
              <span className={`tracking-wider ${p.statusColor}`}>
                {p.status}
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full inline-block ${p.dot} ${
                  p.pulse ? "animate-pulse" : ""
                }`}
              />
            </div>
          </div>
        ))}

        {/* Last execution row */}
        <div
          className="flex items-center justify-between px-3 py-2"
          style={{
            background: "rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span className="text-zinc-500 tracking-wider">
            [ Last Execution ]
          </span>
          <span className="text-green-400">
            {execMs}ms ago
          </span>
        </div>
      </div>

      {/* Boot log terminal */}
      <div
        className="flex-1 p-3 overflow-hidden"
        style={{
          background: "rgba(0,0,0,0.45)",
          border: "1px solid rgba(255,255,255,0.04)",
          borderTop: "1px solid rgba(0,255,65,0.1)",
        }}
      >
        {BOOT_LOG.map((line, i) => (
          <p
            key={i}
            className={`mb-1 ${
              i === BOOT_LOG.length - 1
                ? "text-green-400"
                : "text-zinc-600"
            }`}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
