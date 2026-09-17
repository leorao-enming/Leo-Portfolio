import { PROJECTS_ON_RECORD } from "../../../_data/projects";

/**
 * A quiet opening. Deliberately not a dashboard panel and not six cards:
 * one line of metadata, one statement, one sentence, then whitespace. The
 * old header led with "PROJECT REGISTRY — 6 ENTRIES" plus a live/architecture
 * legend before the reader had seen a single project; that legend now belongs
 * to the archive further down, where the distinction is actually used.
 */
export function ProjectsHero() {
  return (
    /* surface-soft, not surface-base.
       base (#f3f0e8) against the Half-Life chapter's cream (#f5efe5) is a
       3/255 step — the one section boundary on the site that does not read
       as a boundary at all. Every other transition here runs 14 to 213.
       The homepage already solves this: the block immediately above its
       Half-Life chapter is surface-soft, giving a 13-step. Matching that
       fixes the seam and makes the two pages share one tonal rhythm into
       the same chapter, rather than repainting the palette to work around
       a single adjacency. */
    <section style={{ background: "var(--surface-soft)" }}>
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
          PROJECT ARCHIVE — {PROJECTS_ON_RECORD} ENTRIES
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 500,
            fontSize: "var(--type-display-l)",
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
            fontSize: "var(--type-body-l)",
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
