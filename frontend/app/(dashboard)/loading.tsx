/**
 * Shown while a dashboard segment streams in.
 *
 * The dashboard pages await a network fetch against a free-tier backend that
 * sleeps when idle, so a cold start is a real several-second wait. Without a
 * boundary here, clicking "Enter OS" froze the UI for the whole timeout with
 * no feedback. The layout chrome (top bar, sidebar) stays interactive while
 * this renders.
 */
export default function DashboardLoading() {
  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] mb-2" style={{ color: "#444" }}>
          COMMAND CENTER
        </p>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#e0e0e0" }}>
          <span className="terminal-amber">CONNECTING…</span>
        </h1>
        <p className="text-xs mt-2 tracking-widest" style={{ color: "#444" }}>
          REQUESTING SUBSYSTEM DATA
        </p>
      </div>

      <div className="card-surface p-4 font-mono text-xs">
        <div
          className="flex items-center gap-3 pb-3 mb-3"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <span className="status-dot status-dot-idle" />
          <span className="tracking-wider" style={{ color: "#555" }}>
            AWAITING RESPONSE
          </span>
        </div>
        <div style={{ color: "#3f3f46" }}>
          &gt; Free-tier backends sleep when idle. A cold start can take a while.
        </div>
        <div className="mt-3">
          <span style={{ color: "#3f3f46" }}>root@leologic:~# </span>
          <span className="cursor-blink" />
        </div>
      </div>

      {/* Skeleton rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6" aria-hidden>
        {[0, 1].map((i) => (
          <div key={i} className="card-surface p-6">
            <div style={{ height: 10, width: "35%", background: "#1a1a1d", marginBottom: 14 }} />
            <div style={{ height: 8, width: "80%", background: "#141417", marginBottom: 8 }} />
            <div style={{ height: 8, width: "60%", background: "#141417" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
