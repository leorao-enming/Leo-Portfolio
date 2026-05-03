import React from "react";

type ManifestoItem = {
  id: string;
  title: React.ReactNode;
  body: React.ReactNode;
};

const MANIFESTO: ManifestoItem[] = [
  {
    id: "M-01",
    title: "Process-Driven Architecture",
    body: (
      <>
        Applying Chemical Engineering principles and{" "}
        <span className="terminal-amber">Six Sigma Black Belt</span>{" "}
        methodologies to build robust, deterministic systems.
      </>
    ),
  },
  {
    id: "M-02",
    title: (
      <span className="terminal-cyan">Absolute Logic Control</span>
    ),
    body: (
      <>
        Bypassing visual automation tools (e.g., n8n) in favor of{" "}
        <span className="tech-accent">pure Python</span>{" "}
        architectures. Advanced quantitative and biological engines demand the
        granular control that only code can provide.
      </>
    ),
  },
  {
    id: "M-03",
    title: "AI-Accelerated Workflows",
    body: "Utilizing AI-assisted environments (Cursor, LLMs) to drastically reduce boilerplate execution, while retaining strict authoritative oversight over the underlying architecture.",
  },
];

export function PhilosophyCard() {
  return (
    <div className="flex flex-col h-full">
      {/* Section label */}
      <p className="text-xs tracking-[0.3em] mb-1 text-secondary">
        ── ENGINEERING PHILOSOPHY
      </p>

      {/* Terminal-style header */}
      <div
        className="flex items-center gap-2 px-3 py-2 mb-5 font-mono text-xs"
        style={{
          background: "rgba(0,212,255,0.05)",
          border: "1px solid rgba(0,212,255,0.15)",
        }}
      >
        <span className="terminal-cyan" style={{ opacity: 0.6 }}>$</span>
        <span className="terminal-cyan tracking-[0.2em]">cat</span>
        <span className="text-zinc-400">system_manifesto.md</span>
        <span
          className="ml-auto text-xs tracking-widest"
          style={{ color: "rgba(0,212,255,0.45)" }}
        >
          [READ-ONLY]
        </span>
      </div>

      {/* Manifesto items */}
      <div className="flex flex-col gap-3 flex-1">
        {MANIFESTO.map((item) => (
          <div
            key={item.id}
            className="pl-4 pr-3 py-3 border-l-4"
            style={{
              borderLeftColor: "var(--color-terminal-cyan)",
              background: "rgba(0,212,255,0.03)",
              borderTop: "1px solid rgba(0,212,255,0.07)",
              borderRight: "1px solid rgba(0,212,255,0.07)",
              borderBottom: "1px solid rgba(0,212,255,0.07)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono dim-label shrink-0">
                {item.id}
              </span>
              <span className="text-xs tracking-wider font-semibold text-white">
                {item.title}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-300">{item.body}</p>
          </div>
        ))}
      </div>

      {/* Footer assertion */}
      <div
        className="mt-4 pt-3 font-mono text-xs"
        style={{ borderTop: "1px solid #27272a" }}
      >
        <span className="dim-label">// END MANIFESTO &nbsp;·&nbsp; </span>
        <span className="terminal-text">3 AXIOMS LOADED</span>
      </div>
    </div>
  );
}
