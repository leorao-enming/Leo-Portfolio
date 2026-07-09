"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
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

    if (token === "leologic-access-2024") {
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
          <p className="text-xs tracking-[0.4em] mb-4" style={{ color: "#333" }}>
            LEOLOGIC OS
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-2" style={{ color: "#e0e0e0" }}>
            AUTH<span className="terminal-text">_</span>GATE
          </h1>
          <p className="text-xs tracking-widest" style={{ color: "#444" }}>
            RESTRICTED ZONE — OPERATOR ACCESS ONLY
          </p>
        </div>

        {/* Terminal log */}
        <div
          className="card-surface p-4 mb-6 font-mono text-xs"
          style={{ minHeight: "100px" }}
        >
          {logs.map((log, i) => (
            <div
              key={i}
              className="py-0.5"
              style={{
                color: log.includes("ERROR") ? "var(--color-terminal-red)" : log.includes("granted") || log.includes("Routing") ? "var(--color-terminal-green)" : "#555",
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
            <label className="block text-xs tracking-widest mb-2" style={{ color: "#444" }}>
              ACCESS TOKEN
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter operator token..."
              autoComplete="current-password"
              className="w-full px-4 py-3 text-sm font-mono outline-none transition-all"
              style={{
                backgroundColor: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                color: "#e0e0e0",
                borderRadius: "2px",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--color-terminal-green)";
                e.target.style.boxShadow = "0 0 0 1px rgba(0,255,65,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--color-border)";
                e.target.style.boxShadow = "none";
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
              borderColor: loading || !token ? "#222" : "var(--color-terminal-green)",
              color: loading || !token ? "#333" : "var(--color-terminal-green)",
              cursor: loading || !token ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "AUTHENTICATING..." : "AUTHENTICATE →"}
          </button>
        </form>

        {/* Hint */}
        <div className="mt-8 pt-6" style={{ borderTop: "1px solid #111" }}>
          <p className="text-xs text-center" style={{ color: "#222" }}>
            DEMO TOKEN: leologic-access-2024
          </p>
        </div>

        {/* Back link */}
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-xs tracking-widest transition-colors hover:text-white"
            style={{ color: "#2a2a2a" }}
          >
            ← RETURN TO PUBLIC SITE
          </Link>
        </div>
      </div>
    </div>
  );
}
