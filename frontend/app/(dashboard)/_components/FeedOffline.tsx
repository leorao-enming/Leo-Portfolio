/**
 * Rendered when a dashboard payload could not be fetched.
 *
 * Deliberately shows nothing but the failure. The alternative — falling back to
 * a bundled copy of the data — would reintroduce the duplicate-source-of-truth
 * problem and quietly present stale numbers as if they were live.
 */
export function FeedOffline({
  subsystem,
  error,
}: {
  subsystem: string;
  error: string;
}) {
  return (
    <div className="card-surface p-6 font-mono text-xs">
      <div
        className="flex items-center gap-3 pb-3 mb-3"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <span className="status-dot status-dot-offline" />
        <span className="tracking-widest terminal-red">DATA FEED OFFLINE</span>
      </div>

      <div style={{ color: "#555" }}>&gt; GET {subsystem}</div>
      <div className="terminal-red">&gt; ERROR: {error}</div>
      <div style={{ color: "#555" }}>
        &gt; The API is unreachable. Nothing is shown rather than stale data.
      </div>
      <div style={{ color: "#3f3f46" }} className="mt-3">
        Free-tier backends sleep when idle — a cold start can take up to a
        minute. Reload to retry.
      </div>
    </div>
  );
}
