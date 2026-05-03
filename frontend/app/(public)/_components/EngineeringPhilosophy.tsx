const COMPARISON = [
  {
    axis: "EXECUTION MODEL",
    visual: "Node-graph abstraction. Logic encoded in drag-and-drop wiring — execution path is implicit, invisible.",
    code: "Explicit call graph in source. Every branch, loop, and I/O operation is a legible, reviewable line of code.",
    verdict: "code",
  },
  {
    axis: "ERROR HANDLING",
    visual: "Platform-level retries with generic error nodes. No stack trace ownership. Failures are opaque events.",
    code: "try/except at every fault boundary. Custom exception classes, structured logging, alerting wired to domain logic.",
    verdict: "code",
  },
  {
    axis: "PERFORMANCE CEILING",
    visual: "Throughput bounded by the platform runtime. Concurrency model non-negotiable. No profiling surface.",
    code: "asyncio, multiprocessing, or C-extension where the bottleneck demands. Profiled, benchmarked, tuned.",
    verdict: "code",
  },
  {
    axis: "STATE MANAGEMENT",
    visual: "State lives in opaque node memory or third-party stores. Handoff semantics are platform-defined.",
    code: "State is an explicit Python object with typed fields. Lifecycle, mutation, and persistence are all owned.",
    verdict: "code",
  },
  {
    axis: "VENDOR DEPENDENCY",
    visual: "Workflow is married to the vendor runtime. Migrating means rebuilding logic in a new visual paradigm.",
    code: "Zero runtime vendor lock-in. A Python script runs on any POSIX host, container, or serverless cold start.",
    verdict: "code",
  },
  {
    axis: "TESTABILITY",
    visual: "Integration-only testing. Unit isolation is structurally impossible at the node level.",
    code: "Every function is a unit test target. pytest + mocks + fixtures. Deterministic, repeatable, CI-compatible.",
    verdict: "code",
  },
];

const PRINCIPLES = [
  {
    id: "P-01",
    label: "CONTROL OVER CONVENIENCE",
    body: "Visual tooling optimises for speed-to-first-run. I optimise for correctness at scale. When a workflow handles real capital, real physiological data, or real API rate limits, convenience is a liability.",
  },
  {
    id: "P-02",
    label: "FAULT SURFACES ARE DESIGN DECISIONS",
    body: "Every point where a system can fail is a choice the architect must own. I enumerate failure modes before writing production logic — not after the first 3AM page.",
  },
  {
    id: "P-03",
    label: "ABSTRACTION HAS A COST BASIS",
    body: "A layer of abstraction is a loan against future debuggability. I take that loan only when the interest is justified — i.e. when the abstraction ships a concrete performance or maintainability gain.",
  },
  {
    id: "P-04",
    label: "LATENCY IS A FIRST-CLASS METRIC",
    body: "In quant execution and physiological monitoring alike, timing is semantics. Code that is correct but slow is a bug category. Profiling is a standard phase, not a hotfix step.",
  },
];

export function EngineeringPhilosophy() {
  return (
    <section>
      <p className="text-xs tracking-[0.3em] mb-6 text-secondary">
        ── ENGINEERING PHILOSOPHY
      </p>

      {/* ── Section title */}
      <div className="mb-8">
        <h2
          className="font-bold tracking-tight mb-2 text-white"
          style={{ fontSize: "clamp(1.1rem, 3vw, 1.6rem)" }}
        >
          WHY I ABANDONED <span className="terminal-amber">VISUAL WORKFLOWS</span>
        </h2>
        <p className="text-xs leading-relaxed max-w-2xl text-zinc-300">
          Tools like n8n, Zapier, and Make solve the right problem for the wrong constraints.
          When system correctness, latency, and failure semantics become non-negotiable requirements,
          the abstraction inverts from asset to liability. Below is the precise breakdown.
        </p>
      </div>

      {/* ── Comparison table */}
      <div className="mb-4">
        <div
          className="grid grid-cols-[1fr_1fr_1fr] text-xs tracking-widest mb-1 px-4 text-zinc-600"
        >
          <span>AXIS</span>
          <span className="terminal-amber" style={{ opacity: 0.7 }}>VISUAL WORKFLOWS</span>
          <span className="terminal-text" style={{ opacity: 0.7 }}>CODE-DRIVEN CONTROL</span>
        </div>

        <div className="card-surface overflow-hidden">
          {COMPARISON.map((row, i) => (
            <div
              key={row.axis}
              className="grid grid-cols-[1fr_1fr_1fr] text-xs"
              style={{
                borderBottom: i < COMPARISON.length - 1 ? "1px solid #1f1f23" : "none",
              }}
            >
              {/* Axis label */}
              <div
                className="px-4 py-3 flex items-start"
                style={{ borderRight: "1px solid #1f1f23" }}
              >
                <span className="tracking-wider leading-relaxed text-zinc-400">
                  {row.axis}
                </span>
              </div>

              {/* Visual side */}
              <div
                className="px-4 py-3 leading-relaxed text-zinc-400"
                style={{
                  borderRight: "1px solid #1f1f23",
                  background: "rgba(255,176,0,0.02)",
                }}
              >
                {row.visual}
              </div>

              {/* Code side */}
              <div
                className="px-4 py-3 leading-relaxed text-zinc-200"
                style={{
                  background: "rgba(0,255,65,0.02)",
                }}
              >
                {row.code}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Verdict bar */}
      <div
        className="flex items-center gap-3 px-4 py-2 mb-10 text-xs"
        style={{
          background: "rgba(0,255,65,0.05)",
          border: "1px solid rgba(0,255,65,0.15)",
        }}
      >
        <span className="text-zinc-500">VERDICT</span>
        <span className="text-zinc-700">──</span>
        <span className="terminal-text">
          CODE-DRIVEN CONTROL wins on every axis that matters at production scale.
        </span>
        <span className="ml-auto tracking-widest text-zinc-500">6 / 6</span>
      </div>

      {/* ── Principles manifest */}
      <div className="mb-2">
        <p className="text-xs tracking-[0.25em] mb-4 text-secondary">
          ── DESIGN PRINCIPLES MANIFEST
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PRINCIPLES.map((p) => (
            <div
              key={p.id}
              className="card-surface p-5 border-l-2"
              style={{ borderLeftColor: "var(--color-terminal-green)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono dim-label">{p.id}</span>
                <span className="text-xs tracking-wider terminal-text">{p.label}</span>
              </div>
              <p className="text-xs leading-relaxed text-zinc-300">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Closing assertion */}
      <div
        className="mt-4 px-5 py-4 text-xs leading-relaxed"
        style={{
          background: "var(--color-surface-2)",
          border: "1px solid #27272a",
          borderLeft: "2px solid var(--color-terminal-amber)",
        }}
      >
        <span className="text-zinc-500">ASSERTION &nbsp;·&nbsp; </span>
        <span className="text-zinc-300">
          Visual automation tools are engineering training wheels. They lower the barrier to entry
          and raise the ceiling on technical debt simultaneously. For systems where execution
          correctness is load-bearing — trading, biomonitoring, data pipelines at scale —
          the only viable substrate is code you fully own, can fully instrument,
          and can fully reason about under pressure.
        </span>
      </div>
    </section>
  );
}
