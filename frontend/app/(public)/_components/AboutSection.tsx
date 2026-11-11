"use client";

import { motion, useReducedMotion } from "motion/react";
import { PROJECTS_ON_RECORD } from "../../_data/projects";
import { Eyebrow, PageIntro } from "./editorial";
import { reveal } from "./motion";

// Every numeral here has to be checkable against something else on the site.
// This row used to end on "∞ / Systems Mindset", which was the one unearned
// claim in a site whose credibility rests on the opposite habit — "Self-
// assessed: Beginner", "Synthetic — not a validated result", "Nothing here is
// finished". An un-backed ∞ does not add a fourth stat so much as cast doubt
// on the three real ones beside it, so it is now the count of works actually
// on the record, read from the project data rather than asserted. Likewise
// "1st" read as an ordinal ranking next to "3rd Year"; it is a plain count.
//
// One ink colour for all four. They used to be blue / rust / violet / orange,
// one hue per number, which made four facts look like four categories.
//
// `href` is where a figure can be checked. The Black Belt was the one entry
// with nothing to check it against; it now links to the issuer's own
// verification page (Six Sigma Lean Black Belt Professional, Management and
// Strategy Institute, certified 2025-12-26).
const stats: { value: string; label: string; href?: string }[] = [
  { value: "3rd", label: "Year ChemEng" },
  { value: "1", label: "Industry internship" },
  { value: "6σ", label: "Black Belt", href: "https://verify.msicertified.org/verify/297876242" },
  { value: String(PROJECTS_ON_RECORD), label: "Projects on record" },
];

export function AboutSection() {
  const reduced = useReducedMotion();

  return (
    <>
      <PageIntro
        railLabel="About"
        eyebrow="About — the system"
        title={
          <>
            Engineering meets{" "}
            <span style={{ color: "var(--color-accent-ink)" }}>intelligence.</span>
          </>
        }
        lead="I'm Leo — a Chemical Engineering student at the University of Toronto who builds systems at the boundary of science and software."
      >
        <p
          style={{
            fontSize: "var(--type-body-l)",
            lineHeight: 1.7,
            color: "var(--text-muted)",
            maxWidth: "52ch",
            margin: "16px 0 0",
          }}
        >
          From plant-floor process control to AI-powered lab tools, I design precision
          pipelines that turn data and theory into deployable systems.
        </p>
        <Eyebrow style={{ marginTop: 28 }}>University of Toronto · 3T7</Eyebrow>
      </PageIntro>

      <section id="about" style={{ background: "var(--surface-base)" }}>
        <div className="section-shell">
          {/* Hairline grid: the container's background shows through a 1px
              gap, so the rules sit between cells at any column count without
              per-cell border bookkeeping. */}
          <dl
            className="grid grid-cols-2 md:grid-cols-4"
            style={{
              gap: 1,
              background: "var(--color-hairline)",
              borderTop: "1px solid var(--color-hairline)",
              borderBottom: "1px solid var(--color-hairline)",
              margin: 0,
            }}
          >
            {stats.map((s, i) => (
              /* The cell itself is static; only its contents reveal. The cell
                 paints the ground over the hairline-coloured container, so
                 fading the CELL in (as this did) left the container showing
                 through as one solid grey slab until each cell arrived. */
              <div key={s.label} style={{ background: "var(--surface-base)" }}>
              <motion.div
                {...reveal(reduced, i)}
                style={{
                  padding: "clamp(24px, 3vw, 36px) clamp(16px, 2vw, 28px)",
                  display: "flex",
                  flexDirection: "column-reverse",
                  gap: 10,
                }}
              >
                <dt>
                  {s.href ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} — verify with the issuer (opens in a new tab)`}
                      className="group inline-flex items-center gap-1.5 underline decoration-[rgba(10,12,15,0.3)] underline-offset-4 hover:decoration-[var(--color-accent-ink)]"
                      style={{ minHeight: 24 }}
                    >
                      <Eyebrow as="span">{s.label}</Eyebrow>
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                        style={{ fontSize: 12, color: "var(--text-muted)" }}
                      >
                        ↗
                      </span>
                    </a>
                  ) : (
                    <Eyebrow as="span">{s.label}</Eyebrow>
                  )}
                </dt>
                <dd
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "var(--type-display-m)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.04em",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {s.value}
                </dd>
              </motion.div>
              </div>
            ))}
          </dl>

          <motion.div
            {...reveal(reduced, stats.length)}
            className="grid grid-cols-1 md:grid-cols-[minmax(180px,1fr)_3fr]"
            style={{ gap: "8px clamp(24px, 4vw, 56px)", paddingTop: "clamp(24px, 3vw, 36px)" }}
          >
            <Eyebrow tone="accent">Currently building</Eyebrow>
            <p
              style={{
                fontSize: "var(--type-body-m)",
                lineHeight: 1.7,
                color: "var(--text-body)",
                maxWidth: "62ch",
                margin: 0,
              }}
            >
              <span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>Trace</span>
              {" "}— an evidence-first AI for engineering drawings, now in gold-annotation
              review after its quality gate held a new pipeline back — and{" "}
              <span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>FabTwin</span>,
              a plasma-etch SPC simulator with its detection-scoring milestone under review.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
