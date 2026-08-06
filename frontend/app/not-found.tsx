import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Route Not Found",
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="w-full max-w-md text-center">
        <p className="text-xs tracking-[0.4em] mb-4" style={{ color: "#333" }}>
          LEOLOGIC OS
        </p>
        <h1
          className="font-bold tracking-tight mb-3"
          style={{ fontSize: "clamp(2.5rem, 10vw, 4rem)", color: "#e0e0e0" }}
        >
          4<span className="terminal-text">0</span>4
        </h1>
        <p className="text-xs tracking-widest mb-8" style={{ color: "#555" }}>
          ROUTE NOT FOUND — NO SUBSYSTEM AT THIS ADDRESS
        </p>

        <div className="card-surface p-4 mb-8 font-mono text-xs text-left">
          <div style={{ color: "#555" }}>&gt; Resolving route...</div>
          <div className="terminal-red">&gt; ERROR: 404 — no handler registered.</div>
          <div style={{ color: "#555" }}>
            &gt; Returning to known-good state <span className="cursor-blink" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="text-xs tracking-[0.2em] px-5 py-3 transition-colors"
            style={{
              border: "1px solid var(--color-terminal-green)",
              color: "var(--color-terminal-green)",
            }}
          >
            ← RETURN HOME
          </Link>
          <Link
            href="/projects"
            className="text-xs tracking-[0.2em] px-5 py-3 transition-colors"
            style={{ border: "1px solid var(--color-border-dim)", color: "#71717a" }}
          >
            PROJECT REGISTRY
          </Link>
        </div>
      </div>
    </div>
  );
}
