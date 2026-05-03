import Link from "next/link";

const SUBSYSTEMS = [
  {
    id: "CATALYST",
    label: "QUANT TRADING ENGINE",
    description: "Project Catalyst — Systematic execution, signal routing, and live portfolio metrics.",
    href: "/dashboard/quant",
    statusLabel: "LIVE",
    statusClass: "terminal-text",
    metrics: [
      { key: "SIGNALS", val: "14 ACTIVE" },
      { key: "POSITIONS", val: "3 OPEN" },
      { key: "DRAWDOWN", val: "—" },
    ],
  },
  {
    id: "HALFLIFE",
    label: "BIO-METRICS TRACKER",
    description: "Half-Life protocol — Metabolic decay modeling, training stress load, and physiological optimization.",
    href: "/dashboard/biometrics",
    statusLabel: "TRACKING",
    statusClass: "terminal-cyan",
    metrics: [
      { key: "FATIGUE", val: "NOMINAL" },
      { key: "READINESS", val: "—" },
      { key: "LAST LOG", val: "—" },
    ],
  },
];

const RECENT_EVENTS = [
  { time: "00:00:00", level: "INFO", msg: "System boot sequence complete." },
  { time: "00:00:01", level: "INFO", msg: "Auth middleware loaded. Dashboard routes protected." },
  { time: "00:00:02", level: "INFO", msg: "Subsystem: CATALYST initialized." },
  { time: "00:00:02", level: "INFO", msg: "Subsystem: HALFLIFE initialized." },
  { time: "00:00:03", level: "WARN", msg: "Live data feeds: awaiting external integrations." },
];

export default function DashboardPage() {
  const now = new Date();
  const timestamp = now.toISOString().replace("T", " ").slice(0, 19);

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] mb-2" style={{ color: "#444" }}>
          COMMAND CENTER // OVERVIEW
        </p>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#e0e0e0" }}>
          SYSTEM <span className="terminal-amber">DASHBOARD</span>
        </h1>
        <p className="text-xs mt-2 tracking-widest" style={{ color: "#444" }}>
          SESSION START — {timestamp} UTC
        </p>
      </div>

      {/* Subsystem cards */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
          ── ACTIVE SUBSYSTEMS
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {SUBSYSTEMS.map((sys) => (
            <Link key={sys.id} href={sys.href} className="card-surface p-6 group block" style={{ textDecoration: "none" }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs tracking-widest mb-1" style={{ color: "#444" }}>
                    [{sys.id}]
                  </p>
                  <h2 className="text-sm font-semibold tracking-wider" style={{ color: "#ccc" }}>
                    {sys.label}
                  </h2>
                </div>
                <span className={`text-xs tracking-widest ${sys.statusClass}`}>
                  ● {sys.statusLabel}
                </span>
              </div>

              <p className="text-xs leading-relaxed mb-5" style={{ color: "#555" }}>
                {sys.description}
              </p>

              <div
                className="grid grid-cols-3 gap-3 pt-4"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                {sys.metrics.map((m) => (
                  <div key={m.key}>
                    <p className="text-xs mb-1" style={{ color: "#333" }}>
                      {m.key}
                    </p>
                    <p className="text-xs font-medium tracking-wider" style={{ color: "#777" }}>
                      {m.val}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs terminal-text tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                OPEN MODULE →
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* System event log */}
      <div>
        <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
          ── SYSTEM EVENT LOG
        </p>
        <div className="card-surface p-4 font-mono text-xs">
          <div className="flex items-center gap-3 pb-3 mb-3" style={{ borderBottom: "1px solid #111" }}>
            <span className="status-dot status-dot-online" />
            <span className="tracking-wider" style={{ color: "#555" }}>
              KERNEL LOG — LIVE
            </span>
          </div>
          {RECENT_EVENTS.map((evt, i) => (
            <div key={i} className="flex items-start gap-4 py-1">
              <span className="shrink-0" style={{ color: "#333" }}>
                {evt.time}
              </span>
              <span
                className="shrink-0 w-10"
                style={{
                  color:
                    evt.level === "WARN"
                      ? "var(--color-terminal-amber)"
                      : evt.level === "ERROR"
                      ? "var(--color-terminal-red)"
                      : "var(--color-terminal-dim)",
                }}
              >
                {evt.level}
              </span>
              <span style={{ color: "#666" }}>{evt.msg}</span>
            </div>
          ))}
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid #111" }}>
            <span style={{ color: "#333" }}>root@leologic:~# </span>
            <span className="cursor-blink" style={{ color: "#444" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
