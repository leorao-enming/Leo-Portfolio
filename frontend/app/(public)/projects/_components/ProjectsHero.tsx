import { PROJECTS } from "../../../_data/projects";

/**
 * A quiet opening. Deliberately not a dashboard panel and not six cards:
 * one line of metadata, one statement, one sentence, then whitespace. The
 * old header led with "PROJECT REGISTRY — 6 ENTRIES" plus a live/architecture
 * legend before the reader had seen a single project; that legend now belongs
 * to the archive further down, where the distinction is actually used.
 */
export function ProjectsHero() {
  return (
    <section style={{ background: "var(--surface-base)" }}>
      <div
        className="section-shell"
        style={{
          paddingTop: "clamp(120px, 16vh, 200px)",
          paddingBottom: "clamp(64px, 9vw, 120px)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.24em",
            color: "var(--text-muted)",
            margin: "0 0 24px",
          }}
        >
          PROJECT ARCHIVE — {PROJECTS.length} ENTRIES
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 500,
            fontSize: "clamp(44px, 8vw, 108px)",
            lineHeight: 0.98,
            letterSpacing: "-0.03em",
            color: "var(--color-text-primary)",
            margin: "0 0 28px",
            maxWidth: "16ch",
          }}
        >
          Selected systems, experiments and tools.
        </h1>
        <p
          style={{
            fontSize: "clamp(15px, 1.3vw, 18px)",
            lineHeight: 1.7,
            color: "var(--text-body)",
            maxWidth: "52ch",
            margin: 0,
          }}
        >
          Three works carried far enough to show in full, and the working archive
          behind them.
        </p>
      </div>
    </section>
  );
}
