"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="w-full max-w-md text-center">
        <p className="text-xs tracking-[0.4em] mb-4" style={{ color: "#8a8a90" }}>
          LEOLOGIC OS
        </p>
        <h1
          className="font-bold tracking-tight mb-3"
          style={{ fontSize: "clamp(1.8rem, 7vw, 2.75rem)", color: "#e0e0e0" }}
        >
          SUBSYSTEM <span className="terminal-red">FAULT</span>
        </h1>
        <p className="text-xs tracking-widest mb-8" style={{ color: "#9a9aa0" }}>
          AN UNHANDLED EXCEPTION INTERRUPTED THIS ROUTE
        </p>

        <div className="card-surface p-4 mb-8 font-mono text-xs text-left">
          <div style={{ color: "#9a9aa0" }}>&gt; Executing route handler...</div>
          <div className="terminal-red break-words">
            &gt; ERROR: {error.message || "Unknown exception."}
          </div>
          {error.digest && (
            <div style={{ color: "#8a8a90" }}>&gt; digest: {error.digest}</div>
          )}
          <div style={{ color: "#9a9aa0" }}>
            &gt; Awaiting operator input <span className="cursor-blink" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={reset}
            className="text-xs tracking-[0.2em] px-5 py-3 transition-colors"
            style={{
              border: "1px solid var(--color-accent)",
              color: "var(--color-accent)",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            RETRY →
          </button>
          <Link
            href="/"
            className="text-xs tracking-[0.2em] px-5 py-3 transition-colors"
            style={{ border: "1px solid var(--color-border-dim)", color: "#a1a1aa" }}
          >
            RETURN HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
