import Link from "next/link";
import { SystemTopology } from "../../_components/project-art/SystemTopology";
import { EvidenceTags } from "./EvidenceTags";
import { LEOLOGIC_OS_EVIDENCE, leologicOs } from "./evidence";

const TAGS = ["Agent workflows", "Automation", "Personal systems"];

/**
 * Composition: spatial and centred. Statement centred at the top, the
 * topology given room as a large central object, thesis and evidence in
 * two columns beneath it. The homepage teaser is a side-by-side split
 * (topology left, text right); this is symmetrical and gives the diagram
 * the whole middle of the section.
 *
 * The one large dark field on this page, and the only project section
 * allowed to be predominantly dark — the archive below returns to a light
 * technical paper, so the page arc ends light rather than staying black.
 *
 * Server component — no interactivity, no JS shipped.
 */
export function GalleryLeoLogicOs() {
  return (
    <section aria-labelledby="gallery-leologic-os" style={{ background: "var(--surface-leologic)" }}>
      <div
        className="section-shell"
        style={{ paddingTop: "clamp(80px, 11vw, 140px)", paddingBottom: "clamp(80px, 11vw, 140px)" }}
      >
        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 72px)" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.24em",
              color: "var(--accent-leologic)",
              margin: "0 0 20px",
            }}
          >
            03 / LEOLOGIC OS
          </p>
          <h2
            id="gallery-leologic-os"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "var(--type-display-m)",
              lineHeight: 0.94,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "var(--text-on-dark-strong)",
              margin: 0,
            }}
          >
            <span style={{ display: "block" }}>Systems</span>
            <span style={{ display: "block", color: "var(--accent-leologic)" }}>for one.</span>
          </h2>
        </div>

        {/* The topology gets the centre of the section to itself. */}
        <div style={{ marginBottom: "clamp(44px, 6vw, 76px)" }}>
          <SystemTopology maxWidth={520} />
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]"
          style={{ gap: "clamp(32px, 5vw, 64px)", alignItems: "start" }}
        >
          <div>
            <p
              style={{
                fontSize: "var(--type-body-l)",
                lineHeight: 1.7,
                color: "var(--text-on-dark-body)",
                maxWidth: "46ch",
                margin: "0 0 20px",
              }}
            >
              A personal operating system for tasks, priorities, and agent workflows, with
              Obsidian as the knowledge layer beside it rather than duplicated inside it.
              The split is a documented scope boundary — neither system repeats what the
              other already does well.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0 6px", marginBottom: 28 }}>
              {TAGS.map((tag, i) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--text-on-dark-muted)",
                  }}
                >
                  {tag}{i < TAGS.length - 1 ? " ·" : ""}
                </span>
              ))}
            </div>
            <Link
              href={`/projects/${leologicOs.slug}`}
              className="group"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-display)",
                fontSize: 15,
                color: "var(--accent-leologic)",
                textDecoration: "none",
              }}
            >
              View the system
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </div>

          <EvidenceTags rows={LEOLOGIC_OS_EVIDENCE} tone="dark" />
        </div>
      </div>
    </section>
  );
}
