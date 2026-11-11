"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  CAREER_TARGET,
  CERTIFICATIONS,
  COMPETENCIES,
  HELD_CERTIFICATIONS,
  INTERNSHIP,
  LEVEL_STEPS,
  type Competency,
} from "../../_data/engineering";
import { PageIntro } from "./editorial";
import { reveal } from "./motion";
import { ProcessCanvas } from "./ProcessCanvas";

/* Module style: DATASHEET.
 *
 * Below the process canvas this page is set as an equipment datasheet —
 * hard rules, mono field labels over condensed values, numbered line
 * items, and the competency levels as a real matrix with one mark per row
 * instead of a row of meter bars. A datasheet is the document a process
 * engineer actually reads, and it is honest by construction: every field
 * is either filled in or visibly blank. */

const LEVELS = ["Beginner", "Developing", "Proficient", "Advanced"] as const;

const INK = "var(--color-text-primary)";
const RULE = `1px solid ${INK}`;
const HAIR = "1px solid rgba(10, 12, 15, 0.16)";

const fieldLabel = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "var(--text-muted)",
  margin: 0,
};

function formatMonth(iso: string): string {
  const [year, month] = iso.split("-");
  const names = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${names[Number(month) - 1]} ${year}`;
}

/** Sheet title bar: a heavy rule, the sheet name, and a sheet number. */
function SheetHead({ title, sheet }: { title: string; sheet: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 16,
        borderTop: `3px solid ${INK}`,
        borderBottom: RULE,
        padding: "10px 0",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(20px, 2.4vw, 28px)",
          letterSpacing: "-0.01em",
          lineHeight: 1,
          textTransform: "uppercase",
          color: INK,
          margin: 0,
        }}
      >
        {title}
      </h2>
      <span style={fieldLabel}>{sheet}</span>
    </div>
  );
}

/** One labelled field of a datasheet. */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[11rem_1fr]" style={{ gap: "4px 20px", padding: "12px 0", borderBottom: HAIR }}>
      <p style={fieldLabel}>{label}</p>
      <div style={{ fontSize: "var(--type-body-m)", lineHeight: 1.55, color: "var(--text-strong)" }}>{children}</div>
    </div>
  );
}

/**
 * The competency matrix as an actual matrix: one row per competency, one
 * column per level, a single filled mark where the level sits. The row's
 * level is also written out, so the grid is never the only carrier.
 */
function LevelCells({ level }: { level: Competency["level"] }) {
  const at = LEVEL_STEPS[level] - 1;
  return (
    <div
      role="img"
      aria-label={`${level} — level ${at + 1} of ${LEVELS.length}`}
      className="grid grid-cols-4"
      style={{ width: "100%", maxWidth: 320, border: HAIR, borderRight: "none" }}
    >
      {LEVELS.map((l, i) => (
        <span
          key={l}
          aria-hidden
          style={{
            height: 22,
            borderRight: HAIR,
            background: i === at ? INK : i < at ? "rgba(10, 12, 15, 0.1)" : "transparent",
          }}
        />
      ))}
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

      {/* ── Internship datasheet ───────────────────────────────────── */}
      <section id="internship" style={{ background: "var(--surface-base)" }}>
        <div className="section-shell">
          <motion.div {...reveal(reduced)}>
            <SheetHead title="Internship" sheet="Sheet 1 of 3" />
            <Field label="Company">
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 34px)", lineHeight: 1.05, letterSpacing: "-0.015em", color: INK }}>
                {INTERNSHIP.company}
              </span>
            </Field>
            <Field label="Department">{INTERNSHIP.department}</Field>
            <Field label="Period">{formatMonth(INTERNSHIP.startDate)} — Present</Field>
            <Field label="Scope">
              <span style={{ display: "block", maxWidth: "62ch", color: "var(--text-body)" }}>{INTERNSHIP.summary}</span>
            </Field>
          </motion.div>

          {/* Focus areas as numbered line items, two columns on desktop. */}
          <div style={{ marginTop: "clamp(24px, 3vw, 40px)" }}>
            <p style={{ ...fieldLabel, paddingBottom: 10, borderBottom: RULE }}>Focus areas — {INTERNSHIP.focusAreas.length} items</p>
            <ol className="grid grid-cols-1 md:grid-cols-2" style={{ listStyle: "none", margin: 0, padding: 0, columnGap: "clamp(24px, 4vw, 56px)" }}>
              {INTERNSHIP.focusAreas.map((area, i) => (
                <motion.li
                  key={area}
                  {...reveal(reduced, i % 4)}
                  style={{ display: "grid", gridTemplateColumns: "3.2rem 1fr", alignItems: "baseline", gap: 8, padding: "11px 0", borderBottom: HAIR }}
                >
                  <span style={{ ...fieldLabel, color: "var(--color-accent-ink)" }}>FA-{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: "var(--type-body-m)", color: "var(--text-strong)" }}>{area}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Competency matrix ──────────────────────────────────────── */}
      <section id="competency" style={{ background: "var(--surface-contact)" }}>
        <div className="section-shell">
          <SheetHead title="Competency matrix" sheet="Sheet 2 of 3 · self-assessed" />
          {/* Column key — desktop only; each row also names its level. */}
          <div
            className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1.2fr)]"
            style={{ gap: "0 28px", padding: "10px 0", borderBottom: RULE }}
          >
            <p style={fieldLabel}>Competency</p>
            <div className="grid grid-cols-4">
              {LEVELS.map((l) => (
                <p key={l} style={{ ...fieldLabel, fontSize: 9.5, letterSpacing: "0.04em", textAlign: "center" }}>{l}</p>
              ))}
            </div>
            <p style={fieldLabel}>Evidence → next proof</p>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {COMPETENCIES.map((c, i) => (
              <motion.li
                key={c.name}
                {...reveal(reduced, i % 4)}
                className="grid grid-cols-1 items-center lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1.2fr)]"
                style={{ gap: "10px 28px", padding: "16px 0", borderBottom: HAIR }}
              >
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: INK, margin: 0 }}>
                  {c.name}
                  <span className="lg:hidden" style={{ ...fieldLabel, display: "block", marginTop: 4 }}>{c.level}</span>
                </h3>
                <LevelCells level={c.level} />
                <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--text-body)", margin: 0 }}>
                  {c.evidence}
                  <span aria-hidden> → </span>
                  <span className="sr-only">; next step: </span>
                  <span style={{ color: "var(--color-accent-ink)" }}>{c.nextStep}</span>
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Credentials + target ───────────────────────────────────── */}
      <section id="trajectory" style={{ background: "var(--surface-base)" }}>
        <motion.div className="section-shell" {...reveal(reduced)}>
          <SheetHead title="Credentials" sheet="Sheet 3 of 3" />
          {HELD_CERTIFICATIONS.map((cert) => (
            <Field key={cert.name} label={`Held · ${formatMonth(cert.certifiedOn)}`}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: INK }}>{cert.name}</span>
              <span style={{ display: "block", color: "var(--text-body)" }}>
                {cert.body}
              </span>
              <span style={{ display: "block" }}>
                <a
                  href={cert.verifyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target"
                  style={{ color: "var(--color-accent-ink)", textDecoration: "underline", textUnderlineOffset: 4 }}
                >
                  verify with the issuer ↗
                </a>
              </span>
            </Field>
          ))}
          {CERTIFICATIONS.map((cert) => (
            <Field key={cert.name} label={`Planned · ${cert.target}`}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: INK }}>{cert.name}</span>
              <span style={{ display: "block", maxWidth: "70ch", color: "var(--text-body)" }}>
                {cert.body} — {cert.rationale}
              </span>
            </Field>
          ))}
          <Field label={`Target roles · class of ${CAREER_TARGET.graduationYear}`}>
            {CAREER_TARGET.roleFamilies.join(" · ")}
          </Field>
        </motion.div>
      </section>
    </>
  );
}
