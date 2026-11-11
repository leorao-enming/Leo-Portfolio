"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE, VIEWPORT, reveal } from "./motion";
import { PROJECTS } from "../../_data/projects";

/* Module style: BROADSHEET.
 *
 * Each homepage chapter carries its own design language. Trace is set as a
 * newspaper front page — masthead, double rule, a headline over a lede with
 * a drop cap, a captioned figure, and three briefs separated by column
 * rules. A broadsheet is the form built for reporting a result plainly,
 * including an unflattering one, and the story here is exactly that: the
 * new extraction pipeline missed its quality gate and was held back.
 *
 * This chapter was Half-Life's until that project was archived in October
 * 2026; Trace is the current flagship (landingFeatured in _data/projects).
 *
 * Every figure below comes from this project's registry entry or the
 * project's own benchmark record; nothing here is a new claim. */

const trace = PROJECTS.find((p) => p.slug === "trace")!;

const INK = "var(--color-text-primary)";
const ACCENT = "var(--accent-half-life)"; // the cream chapter's burgundy
const RULE = "1px solid rgba(10, 12, 15, 0.28)";

/* Pipeline v3 research run against its release gate. `value` and `gate`
   are both on a 0–1 scale. Two of three miss, which is the point. */
const GATE = [
  { metric: "Object F1", value: 0.25, gate: 0.85 },
  { metric: "Relation F1", value: 0.01, gate: 0.75 },
  { metric: "BBox IoU", value: 0.75, gate: 0.5 },
];

const BRIEFS = [
  {
    head: "Evidence",
    body:
      "Every answer is bound to evidence and highlight ids that link back to the exact region of the drawing. When evidence is insufficient, it says so.",
  },
  {
    head: "Cost control",
    body:
      "One AI router with per-request and daily budgets, circuit breakers and audited usage events sits in front of every model call.",
  },
  {
    head: "Next",
    body:
      "Gold annotations are still pending human double-review. Deterministic extraction fixes come before any further model training.",
  },
];

const mono = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "var(--text-muted)",
  margin: 0,
};

/** Score against gate, one row per metric. The bar grows with a transform
 * (scaleX) rather than a width change, so it animates on the compositor
 * and never reflows the rows around it. Pass/fail is carried by the word
 * as well as the colour. */
function GateChart({ reduced }: { reduced: boolean | null }) {
  return (
    <div role="img" aria-label="Pipeline v3 scores against the release gate: Object F1 0.25 against a gate of 0.85, Relation F1 0.01 against 0.75, bounding-box IoU 0.75 against 0.50. Two of three miss the gate.">
      <p style={{ ...mono, color: ACCENT, marginBottom: 18 }}>Pipeline v3 — score against release gate</p>
      <div style={{ display: "grid", gap: 22 }}>
        {GATE.map((row, i) => {
          const pass = row.value >= row.gate;
          return (
            <div key={row.metric}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 18, color: INK }}>{row.metric}</span>
                <span style={{ ...mono, color: pass ? "var(--text-body)" : ACCENT, fontVariantNumeric: "tabular-nums" }}>
                  {row.value.toFixed(2)} / gate {row.gate.toFixed(2)} · {pass ? "pass" : "miss"}
                </span>
              </div>
              <div style={{ position: "relative", height: 14, background: "rgba(10,12,15,0.07)" }}>
                <motion.div
                  initial={{ scaleX: reduced ? 1 : 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: reduced ? 0 : DURATION.draw, delay: reduced ? 0 : 0.15 + i * 0.12, ease: EASE }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: `${Math.max(row.value * 100, 0.8)}%`,
                    transformOrigin: "left center",
                    background: pass ? INK : ACCENT,
                  }}
                />
                {/* Gate marker */}
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: `${row.gate * 100}%`,
                    top: -5,
                    bottom: -5,
                    width: 0,
                    borderLeft: `2px dashed ${INK}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TraceShowcase() {
  const reduced = useReducedMotion();

  return (
    <section style={{ background: "var(--surface-half-life)" }}>
      <div
        className="section-shell"
        style={{
          paddingTop: "clamp(64px, 9vw, 112px)",
          paddingBottom: "clamp(64px, 9vw, 112px)",
        }}
      >
        {/* ── Masthead ─────────────────────────────────────────── */}
        <motion.header {...reveal(reduced)}>
          <div
            className="grid grid-cols-1 items-end sm:grid-cols-[1fr_auto_1fr]"
            style={{ gap: 12, paddingBottom: 14 }}
          >
            <p style={mono}>No. 01 — Selected work</p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 600,
                fontSize: "clamp(34px, 5.4vw, 68px)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: INK,
                margin: 0,
              }}
              className="sm:text-center"
            >
              {trace.title}
            </p>
            <p style={mono} className="sm:text-right">
              {trace.statusLabel}
            </p>
          </div>
          <div
            style={{
              borderTop: `3px double ${INK}`,
              borderBottom: RULE,
              padding: "8px 0",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "4px 20px",
            }}
          >
            <span style={mono}>{trace.domain}</span>
            <span style={mono}>{trace.stack.join(" · ")}</span>
            <span style={mono}>PDF drawings</span>
          </div>
        </motion.header>

        {/* ── Front page ───────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"
          style={{ gap: "clamp(28px, 4vw, 48px)", paddingTop: "clamp(28px, 4vw, 44px)" }}
        >
          <motion.div {...reveal(reduced, 1)}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                fontSize: "var(--type-display-m)",
                lineHeight: 0.94,
                letterSpacing: "-0.03em",
                color: INK,
                margin: "0 0 20px",
              }}
            >
              Show the <span style={{ color: ACCENT }}>evidence.</span>
            </h2>
            <p
              className="broadsheet-lede"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(16px, 1.5vw, 19px)",
                lineHeight: 1.55,
                color: "var(--text-strong)",
                margin: "0 0 24px",
              }}
            >
              An AI system for engineering drawings that answers from the drawing itself:
              upload a PDF, and every answer highlights the exact region it came from — or
              says it does not know.
            </p>
            <Link
              href="/projects/trace"
              className="group"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                minHeight: 44,
                fontFamily: "var(--font-serif)",
                fontSize: 17,
                color: ACCENT,
                textDecoration: "underline",
                textUnderlineOffset: 5,
                textDecorationThickness: 1,
              }}
            >
              Continued in the case study
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </motion.div>

          {/* Column rule on desktop, top rule when stacked. */}
          <motion.figure
            {...reveal(reduced, 2)}
            className="border-t border-[rgba(10,12,15,0.28)] pt-7 lg:border-l lg:border-t-0 lg:pl-[clamp(28px,4vw,48px)] lg:pt-0"
            style={{ margin: 0 }}
          >
            <GateChart reduced={reduced} />
            <figcaption
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 14,
                lineHeight: 1.5,
                color: "var(--text-body)",
                marginTop: 22,
                paddingTop: 10,
                borderTop: RULE,
              }}
            >
              <strong style={{ fontWeight: 600, color: INK }}>Fig. 1.</strong> A 30-drawing
              research run of the new extraction pipeline. Two of three scores missed the
              gate, so the rollout returned <em>rollback required</em> and production stays
              on the previous pipeline.
            </figcaption>
          </motion.figure>
        </div>

        {/* ── Briefs ───────────────────────────────────────────── */}
        <motion.div
          {...reveal(reduced, 3)}
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ marginTop: "clamp(28px, 4vw, 44px)", borderTop: `3px double ${INK}` }}
        >
          {BRIEFS.map((b, i) => (
            <div
              key={b.head}
              className={
                i === 0
                  ? "py-5 md:pr-6"
                  : "border-t border-[rgba(10,12,15,0.28)] py-5 md:border-l md:border-t-0 md:px-6"
              }
            >
              <p style={{ ...mono, color: ACCENT, marginBottom: 8 }}>{b.head}</p>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "var(--text-body)",
                  margin: 0,
                }}
              >
                {b.body}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
