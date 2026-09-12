import Link from "next/link";
import type { Project, ProjectRegistryDetail } from "../../_data/projects";

/**
 * Compact entry for the /projects index.
 *
 * The index used to render six fully-expanded cards — every metric, every
 * architecture layer, ~1,500 words in one scroll with nothing collapsed.
 * The full detail now lives at /projects/<slug>, so this only has to do
 * what an index does: identify the project and get out of the way.
 */
export function ProjectIndexCard({
  project,
}: {
  project: Project & { registry: ProjectRegistryDetail };
}) {
  const live = project.registry.displayType === "Live System";
  const tone = live ? "#00d4ff" : "#ffb000";

  return (
    <article
      style={{
        border: "1px solid var(--color-border)",
        borderTop: `2px solid ${tone}55`,
        borderRadius: 2,
        background: "var(--color-surface-1)",
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block group transition-colors hover:bg-white/[0.02] focus-visible:bg-white/[0.02]"
        style={{ padding: "clamp(18px, 2.6vw, 26px)", textDecoration: "none" }}
      >
        {/* Meta row */}
        <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
          <div className="flex items-center gap-3">
            {/* This card stays on the dark "system readout" surface used by
                /projects and its detail pages, deliberately distinct from the
                light editorial register around it — so its text colors are
                fixed light-on-dark values, not the shared --text-* tokens,
                which now point the other way for the rest of the site. */}
            <span className="text-xs font-mono" style={{ color: "#a1a1aa" }}>
              [{project.id}]
            </span>
            <span className="text-xs tracking-[0.25em] text-zinc-400">{project.codename}</span>
          </div>
          <span
            className="text-xs tracking-widest font-mono px-2 py-0.5 whitespace-nowrap"
            style={{
              color: tone,
              background: live ? "rgba(0,212,255,0.08)" : "rgba(255,176,0,0.06)",
              border: `1px solid ${tone}3d`,
            }}
          >
            {project.registry.displayType.toUpperCase()}
          </span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(19px, 2.2vw, 26px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            color: "#f4f4f5",
            marginBottom: 8,
          }}
        >
          {project.title}
        </h2>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.72)",
            maxWidth: "68ch",
            marginBottom: 16,
          }}
        >
          {project.summary}
        </p>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="text-xs font-mono px-2 py-0.5"
                style={{
                  color: "#a1a1aa",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
          <span
            className="text-xs tracking-widest font-mono transition-transform duration-200 group-hover:translate-x-0.5"
            style={{ color: tone }}
          >
            View project →
          </span>
        </div>
      </Link>
    </article>
  );
}
