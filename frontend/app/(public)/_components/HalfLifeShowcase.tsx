"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Decay field ─────────────────────────────────────────────────────
 * Editorial, not a dashboard: no legend, no card border, no axis ticks
 * beyond the two labels the brief's own mockup shows. 200mg at 08:00,
 * 38mg remaining by 23:00 (15h window) — solved for a ~6.3h half-life,
 * inside caffeine's real 3-7h range, same "illustrative, not measured"
 * framing HalfLifeDecayArt already uses on the project's own page. This
 * is a different, plainer drawing built specifically for the homepage;
 * that page keeps its own interactive slider version.
 */
const DOSE_MG = 200;
const REMAINING_MG = 38;
const WINDOW_H = 15;
const DECAY_K = Math.log(DOSE_MG / REMAINING_MG) / WINDOW_H;

const VIEW_W = 560;
const VIEW_H = 320;
const PAD_L = 8;
const PAD_R = 8;
const PAD_T = 28;
const PAD_B = 44;
const PLOT_W = VIEW_W - PAD_L - PAD_R;
const PLOT_H = VIEW_H - PAD_T - PAD_B;

function remaining(tHours: number) {
  return DOSE_MG * Math.exp(-DECAY_K * tHours);
}
function xFor(t: number) {
  return PAD_L + (t / WINDOW_H) * PLOT_W;
}
function yFor(mg: number) {
  return PAD_T + PLOT_H - (mg / DOSE_MG) * PLOT_H;
}

const CURVE_POINTS = Array.from({ length: 61 }, (_, i) => {
  const t = (i / 60) * WINDOW_H;
  return { t, mg: remaining(t) };
});
const CURVE_PATH = CURVE_POINTS.map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(p.t).toFixed(1)} ${yFor(p.mg).toFixed(1)}`).join(" ");
const AREA_PATH = `${CURVE_PATH} L ${xFor(WINDOW_H).toFixed(1)} ${(PAD_T + PLOT_H).toFixed(1)} L ${xFor(0).toFixed(1)} ${(PAD_T + PLOT_H).toFixed(1)} Z`;

function DecayField() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      style={{ width: "100%", height: "auto", display: "block" }}
      role="img"
      aria-label="Line drawing of caffeine decaying from 200 milligrams at 8am to 38 milligrams remaining by 11pm, following a smooth exponential curve."
    >
      <path d={AREA_PATH} fill="var(--accent-half-life-dim)" fillOpacity="0.14" />
      <line x1={PAD_L} y1={PAD_T - 6} x2={PAD_L} y2={PAD_T + PLOT_H} stroke="var(--accent-half-life)" strokeOpacity="0.3" />
      <line x1={PAD_L} y1={PAD_T + PLOT_H} x2={VIEW_W - PAD_R} y2={PAD_T + PLOT_H} stroke="var(--accent-half-life)" strokeOpacity="0.3" />
      <path d={CURVE_PATH} fill="none" stroke="var(--accent-half-life)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={xFor(0)} cy={yFor(DOSE_MG)} r="3.5" fill="var(--accent-half-life)" />
      <circle cx={xFor(WINDOW_H)} cy={yFor(REMAINING_MG)} r="3.5" fill="var(--accent-half-life)" />

      <text x={PAD_L} y={PAD_T - 12} fontSize="15" fontFamily="var(--font-mono)" fontWeight="600" fill="var(--accent-half-life)">
        {DOSE_MG} mg
      </text>
      <text x={PAD_L} y={PAD_T + PLOT_H + 22} fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em" fill="var(--text-muted)">
        08:00
      </text>
      <text x={VIEW_W - PAD_R} y={PAD_T + PLOT_H + 22} textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em" fill="var(--text-muted)">
        23:00
      </text>
    </svg>
  );
}

const TAGS = ["HealthKit", "Sleep", "First-order kinetics"];

export function HalfLifeShowcase() {
  const reduced = useReducedMotion();

  return (
    <section style={{ background: "var(--surface-half-life)" }}>
      {/* grid-template-columns lives in className only — an inline
          gridTemplateColumns always beats a responsive lg: class, so the
          two-column desktop layout would never engage. Text left, decay
          field right; stacks to curve-below-typography on mobile. */}
      <div
        className="section-shell grid grid-cols-1 items-center lg:grid-cols-[1fr_1.1fr]"
        style={{
          gap: "clamp(40px, 6vw, 80px)",
          paddingTop: "clamp(72px, 10vw, 120px)",
          paddingBottom: "clamp(72px, 10vw, 120px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduced ? 0 : 0.7, ease }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.24em",
              color: "var(--accent-half-life)",
              margin: "0 0 20px",
            }}
          >
            01 / HALF-LIFE
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(44px, 7vw, 92px)",
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "var(--color-text-primary)",
              margin: "0 0 24px",
            }}
          >
            <span style={{ display: "block" }}>What</span>
            <span style={{ display: "block", color: "var(--accent-half-life)" }}>remains?</span>
          </h2>
          <p
            style={{
              fontSize: "clamp(14px, 1.2vw, 16px)",
              lineHeight: 1.7,
              color: "var(--text-body)",
              maxWidth: "42ch",
              margin: "0 0 24px",
            }}
          >
            An iOS app that models caffeine in the body as first-order decay against real
            sleep timing — not a tracker that just logs a number.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 8px", marginBottom: 28 }}>
            {TAGS.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--accent-half-life)",
                }}
              >
                {tag}{tag !== TAGS[TAGS.length - 1] ? " ·" : ""}
              </span>
            ))}
          </div>
          <Link
            href="/projects/half-life"
            className="group"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-display)",
              fontSize: 14,
              color: "var(--accent-half-life)",
              textDecoration: "none",
            }}
          >
            Explore Half-Life
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.1, ease }}
        >
          <DecayField />
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--accent-half-life)",
              textAlign: "right",
              margin: "8px 0 0",
            }}
          >
            {REMAINING_MG} mg remaining
          </p>
        </motion.div>
      </div>
    </section>
  );
}
