"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  CAREER_TARGET,
  CERTIFICATIONS,
  COMPETENCIES,
  INTERNSHIP,
  LEVEL_STEPS,
  type Competency,
} from "../../_data/engineering";
import { Eyebrow, MetaList, PageIntro } from "./editorial";
import { reveal } from "./motion";
import { ProcessCanvas } from "./ProcessCanvas";

const TOTAL_STEPS = 4;

function formatMonth(iso: string): string {
  const [year, month] = iso.split("-");
  const names = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${names[Number(month) - 1]} ${year}`;
}

/**
 * A four-step meter. Honest levels beat flattering ones on a portfolio.
 * Filled in the site accent rather than the violet this page used to run
 * on — the process canvas above already selects in orange, and two accents
 * on one page read as two unrelated systems.
 */
function LevelMeter({ level }: { level: Competency["level"] }) {
  const filled = LEVEL_STEPS[level];
  return (
    <span
      style={{ display: "inline-flex", gap: 3, alignItems: "center", flexShrink: 0 }}
      role="img"
      aria-label={`${level} — ${filled} of ${TOTAL_STEPS}`}
    >
      {Array.from({ length: TOTAL_STEPS }, (_, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            width: 16,
            height: 3,
            borderRadius: 1,
            background: i < filled ? "var(--color-accent)" : "rgba(10, 12, 15, 0.1)",
          }}
        />
      ))}
    </span>
  );
}

/** Serif sub-section heading, the h2 tier under the page title. */
function SectionHeading({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "clamp(20px, 3vw, 32px)" }}>
      <Eyebrow style={{ marginBottom: 14 }}>{eyebrow}</Eyebrow>
      <h2 style={{ fontSize: "var(--type-heading-l)", letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0 }}>
        {children}
      </h2>
    </div>
  );
}

export function EngineeringSection() {
  const reduced = useReducedMotion();

  return (
    <>
      <PageIntro
        railLabel="Engineering"
        eyebrow="Engineering — process"
        title="The other half of the stack."
        lead="Chemical engineering is the degree and the destination — software is how I make it measurable. Below is where that half actually stands today, graded honestly rather than generously."
      />

      {/* ── Process canvas ─────────────────────────────────────────── */}
      <section id="engineering" style={{ background: "var(--surface-engineering)" }}>
        <motion.div className="section-shell" {...reveal(reduced)}>
          <ProcessCanvas />
        </motion.div>
      </section>

      {/* ── Internship ─────────────────────────────────────────────── */}
      <section id="internship" style={{ background: "var(--surface-base)" }}>
        <div
          className="section-shell grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: "clamp(28px, 5vw, 80px)", alignItems: "start" }}
        >
          <motion.div {...reveal(reduced)}>
            <Eyebrow tone="accent" style={{ marginBottom: 14 }}>
              Internship · {formatMonth(INTERNSHIP.startDate)} — Present
            </Eyebrow>
            <h2 style={{ fontSize: "var(--type-heading-l)", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 14px" }}>
              {INTERNSHIP.company}
            </h2>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-muted)", margin: "0 0 4px" }}>
              {INTERNSHIP.companyLocal}
            </p>
            <p style={{ fontSize: "var(--type-body-m)", color: "var(--text-body)", margin: 0 }}>
              {INTERNSHIP.department} Department
            </p>
          </motion.div>

          <motion.div {...reveal(reduced, 1)} style={{ paddingTop: "clamp(0px, 2vw, 30px)" }}>
            <p style={{ fontSize: "var(--type-body-l)", color: "var(--text-body)", lineHeight: 1.7, maxWidth: "52ch", margin: "0 0 24px" }}>
              {INTERNSHIP.summary}
            </p>
            <Eyebrow as="h3" style={{ marginBottom: 8 }}>Focus areas</Eyebrow>
            <MetaList items={INTERNSHIP.focusAreas} variant="prose" />
          </motion.div>
        </div>
      </section>

      {/* ── Competency + trajectory ────────────────────────────────── */}
      <section id="trajectory" style={{ background: "var(--surface-contact)" }}>
        <div
          className="section-shell grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]"
          style={{ gap: "clamp(40px, 6vw, 96px)", alignItems: "start" }}
        >
          <motion.div {...reveal(reduced)}>
            <SectionHeading eyebrow="Self-assessed">Competency matrix</SectionHeading>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, borderBottom: "1px solid var(--color-hairline)" }}>
              {COMPETENCIES.map((c) => (
                <li key={c.name} style={{ borderTop: "1px solid var(--color-hairline)", padding: "16px 0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 6 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        margin: 0,
                      }}
                    >
                      {c.name}
                    </h3>
                    <LevelMeter level={c.level} />
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-muted)", margin: 0 }}>
                    {c.evidence}
                    <span aria-hidden> → </span>
                    <span className="sr-only">; next step: </span>
                    <span style={{ color: "var(--color-accent-ink)" }}>{c.nextStep}</span>
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...reveal(reduced, 1)}>
            <SectionHeading eyebrow="Certifications">Trajectory</SectionHeading>
            <ul style={{ listStyle: "none", margin: "0 0 clamp(28px, 4vw, 44px)", padding: 0, borderBottom: "1px solid var(--color-hairline)" }}>
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.name} style={{ borderTop: "1px solid var(--color-hairline)", padding: "16px 0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 6 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        margin: 0,
                      }}
                    >
                      {cert.name}
                    </h3>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-accent-ink)", whiteSpace: "nowrap" }}>
                      {cert.target}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-muted)", margin: 0 }}>
                    {cert.body} — {cert.rationale}
                  </p>
                </li>
              ))}
            </ul>

            <Eyebrow as="h3" style={{ marginBottom: 8 }}>
              Target roles — class of {CAREER_TARGET.graduationYear}
            </Eyebrow>
            <MetaList items={CAREER_TARGET.roleFamilies} style={{ color: "var(--text-body)" }} />
          </motion.div>
        </div>
      </section>
    </>
  );
}
