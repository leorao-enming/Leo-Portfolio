import Link from "next/link";
import type { Project } from "../../../../_data/projects";
import { identityFor } from "./identity";

/**
 * The editorial opening for a case study.
 *
 * Two jobs. First, carry the project's gallery identity onto its own page,
 * so "Open case study" does not land on a generic paper card that looks
 * nothing like the chapter it was clicked from. Second — and this is a
 * correctness fix, not styling — put the h1 FIRST.
 *
 * Previously /projects/half-life rendered HalfLifeDecayArt (which owns an
 * h2, "Decay, drawn.") above ProjectCard (which owns the h1), so the page's
 * first heading was an h2 and the h1 arrived second. Measured across all
 * six detail pages, half-life was the only one affected. Giving the page a
 * real hero that owns the h1 fixes it structurally: any project art now
 * renders below a heading that already exists, so the order cannot invert
 * again by adding art to another project.
 *
 * Server component — static markup, no JS.
 */
export function CaseStudyHero({ project }: { project: Project }) {
  const id = identityFor(project.slug);

  return (
    <section style={{ background: id.surface }}>
      <div
        className="section-shell"
        style={{
          paddingTop: "clamp(112px, 15vh, 180px)",
          paddingBottom: "clamp(48px, 7vw, 88px)",
        }}
      >
        <nav aria-label="Breadcrumb" style={{ marginBottom: "clamp(28px, 4vw, 44px)" }}>
          <Link
            href="/projects"
            className="group"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.14em",
              color: id.text.muted,
              textDecoration: "none",
            }}
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden>←</span>
            All projects
          </Link>
        </nav>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.24em",
            color: id.accent,
            margin: "0 0 20px",
          }}
        >
          {project.id} / {project.codename}
        </p>

        {/* The h1 is the project's real name — the statement below is a
            <p>, not a heading, so it cannot disturb the outline. */}
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 500,
            fontSize: "clamp(40px, 6.5vw, 84px)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: id.text.strong,
            margin: 0,
          }}
        >
          {project.title}
        </h1>

        {id.statement && (
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(24px, 3.4vw, 44px)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: id.accent,
              margin: "clamp(14px, 2vw, 20px) 0 0",
            }}
          >
            {id.statement}
          </p>
        )}

        <p
          style={{
            fontSize: "clamp(15px, 1.3vw, 18px)",
            lineHeight: 1.7,
            color: id.text.body,
            maxWidth: "58ch",
            margin: "clamp(22px, 3vw, 32px) 0 0",
          }}
        >
          {project.summary}
        </p>

        {/* Metadata strip — all real fields, set small and subordinate. */}
        <dl
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "18px 40px",
            margin: "clamp(28px, 4vw, 40px) 0 0",
            paddingTop: 20,
            borderTop: `1px solid ${id.rule}`,
          }}
        >
          {[
            { label: "Status", value: project.statusLabel },
            { label: "Domain", value: project.domain },
            { label: "Stack", value: project.stack.slice(0, 4).join(" / ") },
          ].map((row) => (
            <div key={row.label}>
              <dt
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: id.text.muted,
                  marginBottom: 6,
                }}
              >
                {row.label}
              </dt>
              <dd
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: id.text.body,
                  margin: 0,
                }}
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
