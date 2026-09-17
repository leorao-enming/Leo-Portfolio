import Link from "next/link";
import { REGISTRY_PROJECTS, type Project } from "../../../_data/projects";

/**
 * The registry, kept — moved into its correct role rather than removed.
 *
 * Everything that made the old /projects index read as a system readout is
 * still here: monospace, [P-0n] ids, status vocabulary, dense rows, a
 * live/architecture distinction. What changed is the surface. The previous
 * ProjectIndexCard sat on --color-surface-1 (#18181b) with light-on-dark
 * text, which is what made the whole page read as one continuous black
 * field. On a light technical paper the same information reads as a
 * specification sheet instead, and the page arc can end light after the
 * graphite LeoLogic OS chapter.
 *
 * No hover state is load-bearing: the id, title, domain, status and summary
 * are all rendered up front. Hover and focus only add an accent rule and a
 * small title shift, so the archive is fully usable by keyboard, by touch,
 * and by anyone who never triggers a hover at all.
 *
 * Server component — no client JS, no hover state machine.
 */

/**
 * Controlled status vocabulary. Maps the data model's own `status` union to
 * display text; it introduces no state the data does not already assert.
 * `statusLabel` (the fuller human sentence) is shown alongside it, so
 * normalising here loses nothing.
 */
const STATUS_TEXT: Record<Project["status"], string> = {
  ACTIVE: "ACTIVE",
  STABLE: "STABLE",
  WIP: "IN DEVELOPMENT",
  ARCHIVED: "ARCHIVED",
  PARKED: "PAUSED",
};

function ArchiveRow({ project }: { project: Project }) {
  const live = project.registry?.displayType === "Live System";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="archive-row group"
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-[74px_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.9fr)]"
        style={{ gap: "4px 20px", alignItems: "baseline" }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
          }}
        >
          {project.id}
        </span>

        <span
          className="transition-transform duration-200 group-hover:translate-x-1"
          style={{
            display: "block",
            fontFamily: "var(--font-display)",
            fontSize: "var(--type-heading-m)",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--color-text-primary)",
          }}
        >
          {project.title}
        </span>

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {project.domain}
        </span>

        {/* Status is text, never a bare colour chip — it has to survive
            being read in greyscale. */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "var(--color-accent-ink)",
            whiteSpace: "nowrap",
          }}
        >
          {STATUS_TEXT[project.status]}
        </span>
      </div>

      {/* Always rendered, not revealed on hover — this is the row's real
          content, and hiding it behind a pointer would make the archive
          unusable by keyboard and touch. */}
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.6,
          color: "var(--text-body)",
          margin: "8px 0 0",
          maxWidth: "72ch",
        }}
      >
        {project.summary}
      </p>

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.04em",
          color: "var(--text-muted)",
          margin: "8px 0 0",
        }}
      >
        {project.statusLabel}
        {" · "}
        {live ? "Live system" : "Architecture only"}
        {" · "}
        {project.stack.slice(0, 3).join(" / ")}
      </p>
    </Link>
  );
}

export function ProjectArchive({ excludeSlugs = [] }: { excludeSlugs?: string[] }) {
  const rows = REGISTRY_PROJECTS.filter((p) => !excludeSlugs.includes(p.slug));

  return (
    <section aria-labelledby="project-archive" style={{ background: "var(--surface-engineering)" }}>
      <div
        className="section-shell"
        style={{ paddingTop: "clamp(72px, 10vw, 120px)", paddingBottom: "clamp(72px, 10vw, 120px)" }}
      >
        <div style={{ marginBottom: "clamp(32px, 4vw, 48px)", maxWidth: "56ch" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.24em",
              color: "var(--text-muted)",
              margin: "0 0 18px",
            }}
          >
            02 / ARCHIVE — {rows.length} ENTRIES
          </p>
          <h2
            id="project-archive"
            style={{
              fontSize: "var(--type-heading-l)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--color-text-primary)",
              margin: "0 0 16px",
            }}
          >
            Project registry.
          </h2>
          <p style={{ fontSize: "var(--type-body-m)", lineHeight: 1.7, color: "var(--text-body)", margin: 0 }}>
            Everything else on the record. Live system entries are wired to real APIs;
            architecture only entries are private or conceptual, with the execution stack
            documented in full.
          </p>
        </div>

        {/* Column header — desktop only. It labels a grid that has collapsed
            to stacked rows below md, where it would describe nothing. */}
        <div
          className="hidden md:grid md:grid-cols-[74px_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.9fr)]"
          style={{
            gap: "0 20px",
            padding: "0 0 10px",
            borderBottom: "1px solid var(--color-hairline-bright)",
          }}
          aria-hidden
        >
          {["ID", "PROJECT", "DOMAIN", "STATUS"].map((h) => (
            <span
              key={h}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "var(--text-muted)",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        <div>
          {rows.map((project) => (
            <ArchiveRow key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
