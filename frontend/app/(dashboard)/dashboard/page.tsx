import type { Metadata } from "next";
import Link from "next/link";

import { FeedOffline } from "../_components/FeedOffline";
import {
  getSystemOverview,
  TONE_CLASS,
  TONE_COLOR,
  type ActivityEntry,
} from "../../_lib/dashboard";

export const metadata: Metadata = {
  title: "Command Center",
  robots: { index: false, follow: false },
};

const LEVEL_COLOR: Record<ActivityEntry["level"], string> = {
  INFO: "var(--color-terminal-dim)",
  WARN: "var(--color-terminal-amber)",
  ERROR: "var(--color-terminal-red)",
};

export default async function DashboardPage() {
  const overview = await getSystemOverview();

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
          {overview.ok
            ? `${overview.data.subsystems.length} SUBSYSTEMS REGISTERED`
            : "SUBSYSTEM REGISTRY UNAVAILABLE"}
        </p>
      </div>

      {!overview.ok ? (
        <FeedOffline subsystem="/system/overview" error={overview.error} />
      ) : (
        <>
          {/* Subsystem cards */}
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
              ── ACTIVE SUBSYSTEMS
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {overview.data.subsystems.map((sys) => (
                <Link
                  key={sys.id}
                  href={sys.href}
                  className="card-surface p-6 group block"
                  style={{ textDecoration: "none" }}
                >
                  <div className="flex items-start justify-between mb-4 gap-4">
                    <div>
                      <p className="text-xs tracking-widest mb-1" style={{ color: "#444" }}>
                        [{sys.id}]
                      </p>
                      <h2 className="text-sm font-semibold tracking-wider" style={{ color: "#ccc" }}>
                        {sys.label}
                      </h2>
                    </div>
                    <span
                      className={`text-xs tracking-widest whitespace-nowrap ${TONE_CLASS[sys.tone]}`}
                      style={sys.tone === "neutral" ? { color: TONE_COLOR.neutral } : undefined}
                    >
                      ● {sys.status_label}
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
                        <p className="text-xs mb-1" style={{ color: "#3f3f46" }}>
                          {m.key}
                        </p>
                        <p className="text-xs font-medium tracking-wider" style={{ color: "#777" }}>
                          {m.value}
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

          {/* Activity feed */}
          <div>
            <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#444" }}>
              ── RECENT ACTIVITY
            </p>
            <div className="card-surface p-4 font-mono text-xs">
              <div
                className="flex items-center gap-3 pb-3 mb-3"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <span className="status-dot status-dot-online" />
                <span className="tracking-wider" style={{ color: "#555" }}>
                  ACTIVITY LOG — {overview.data.activity.length} ENTRIES
                </span>
              </div>

              {overview.data.activity.length === 0 ? (
                <p style={{ color: "#3f3f46" }}>No activity recorded yet.</p>
              ) : (
                overview.data.activity.map((evt) => (
                  <div
                    key={`${evt.date}-${evt.title}`}
                    className="py-2"
                    style={{ borderBottom: "1px solid #0d0d0d" }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="shrink-0" style={{ color: "#3f3f46" }}>
                        {evt.date}
                      </span>
                      <span
                        className="shrink-0 w-16 tracking-wider"
                        style={{ color: LEVEL_COLOR[evt.level] }}
                      >
                        {evt.category}
                      </span>
                      <span style={{ color: "#ccc" }}>{evt.title}</span>
                    </div>
                    {evt.detail && (
                      <p
                        className="mt-1 leading-relaxed"
                        style={{ color: "#555", paddingLeft: "12.5rem" }}
                      >
                        {evt.detail}
                      </p>
                    )}
                  </div>
                ))
              )}

              <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--color-border)" }}>
                <span style={{ color: "#3f3f46" }}>root@leologic:~# </span>
                <span className="cursor-blink" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
