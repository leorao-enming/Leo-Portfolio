"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Published on purpose. This gate scopes the demo — it protects nothing, and
 * the previous screen said so while still printing the token above the field
 * and making the reader retype it. That is a bounce point on the most
 * prominent CTA in the nav ("Enter OS") in exchange for zero security, so the
 * field now arrives filled and the whole thing is one click. The boot log
 * stays: that part is narrative, not friction.
 */
const DEMO_TOKEN = "leologic-demo-operator";

export default function LoginPage() {
  const router = useRouter();
  const [token, setToken] = useState(DEMO_TOKEN);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "> Initializing auth sequence...",
    "> Awaiting operator credentials.",
  ]);

  function appendLog(msg: string) {
    setLogs((prev) => [...prev, msg]);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    appendLog("> Validating token...");

    await new Promise((r) => setTimeout(r, 600));

    if (token === DEMO_TOKEN) {
      appendLog("> Token accepted. Access granted.");
      appendLog("> Routing to command center...");

      document.cookie = "auth-token=" + token + "; path=/; max-age=86400; SameSite=Strict";

      await new Promise((r) => setTimeout(r, 400));
      router.push("/dashboard");
    } else {
      appendLog("> ERROR: Invalid credentials. Access denied.");
      setError("INVALID TOKEN — access denied");
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--color-surface-0)" }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-xs tracking-[0.4em] mb-4" style={{ color: "#8a8a90" }}>
            LEOLOGIC OS
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-2" style={{ color: "#e0e0e0" }}>
            OPERATOR <span className="terminal-text">CONSOLE</span>
          </h1>
          <p className="text-xs leading-relaxed" style={{ color: "#9a9aa0" }}>
            The subsystem dashboards behind this screen are a read-only demo. The
            shared token is already filled in — there are no personal accounts and
            no private data here.
          </p>
        </div>

        {/* Terminal log — lines are appended as auth progresses, so announce them */}
        <div
          className="card-surface p-4 mb-6 font-mono text-xs"
          style={{ minHeight: "100px" }}
          aria-live="polite"
        >
          {logs.map((log, i) => (
            <div
              key={i}
              className="py-0.5"
              style={{
                color: log.includes("ERROR") ? "var(--color-terminal-red)" : log.includes("granted") || log.includes("Routing") ? "var(--color-accent)" : "#9a9aa0",
              }}
            >
              {log}
            </div>
          ))}
          {loading && (
            <div className="py-0.5 terminal-text cursor-blink" />
          )}
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs tracking-widest mb-2" style={{ color: "#8a8a90" }}>
              ACCESS TOKEN
            </label>
            {/* Deliberately not type="password". Masking a token that is
                published two lines below invites the browser to offer to save
                it as a credential, which is the one thing it is not. */}
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter operator token..."
              autoComplete="off"
              spellCheck={false}
              className="w-full px-4 py-3 text-sm font-mono transition-all"
              style={{
                backgroundColor: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                color: "#e0e0e0",
                borderRadius: "2px",
              }}
              disabled={loading}
            />
          </div>

          {error && (
            <p className="text-xs tracking-wider terminal-red">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !token}
            className="w-full py-3 text-xs tracking-[0.2em] font-medium transition-all"
            style={{
              backgroundColor: loading || !token ? "transparent" : "transparent",
              border: "1px solid",
              borderColor: loading || !token ? "#222" : "var(--color-accent)",
              color: loading || !token ? "#8a8a90" : "var(--color-accent)",
              cursor: loading || !token ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "AUTHENTICATING..." : "ENTER AS DEMO OPERATOR →"}
          </button>
        </form>

        {/* Kept as a statement of fact, not as a password to copy out. */}
        <div className="mt-8 pt-6" style={{ borderTop: "1px solid #111" }}>
          <p className="text-xs text-center" style={{ color: "#8a8a90" }}>
            One shared token, published and pre-filled. Nothing behind this screen
            is private.
          </p>
        </div>

        {/* Back link */}
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-xs tracking-widest transition-colors hover:text-white"
            style={{ color: "#8a8a90" }}
          >
            ← RETURN TO PUBLIC SITE
          </Link>
        </div>
      </div>
    </div>
  );
}
