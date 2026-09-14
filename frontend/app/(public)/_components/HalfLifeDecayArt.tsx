"use client";

import { useMemo, useState } from "react";

/**
 * Half-Life's own subject — first-order decay — as the page's visual
 * identity, rather than a generic phone-screenshot hero. Per the app's own
 * registry description: A(t) = A0 * e^(-0.693t / t half).
 *
 * Deliberately NOT live HealthKit data: real biometric samples have no
 * place on a public marketing page, and the brief itself asks to avoid
 * "generic health-app screenshots as the main art" in favor of the model
 * itself. A0=200mg / t half=5h are real, cited figures (this project's own
 * registry entry, and the standard literature half-life for caffeine) —
 * illustrative of the mechanic, not a measurement, and labelled as such.
 *
 * The interactive layer is a native range input rather than pointer-move
 * tracking or a scroll-hijack: keyboard, touch, and screen-reader support
 * come for free, and the brief explicitly rules out scroll hijacking.
 */

const DOSE_MG = 200;
const HALF_LIFE_H = 5;
const WINDOW_H = 12;
const DECAY_CONST = Math.LN2 / HALF_LIFE_H;

const VIEW_W = 720;
const VIEW_H = 300;
const PAD_L = 16;
const PAD_R = 16;
const PAD_T = 24;
const PAD_B = 16;
const PLOT_W = VIEW_W - PAD_L - PAD_R;
const PLOT_H = VIEW_H - PAD_T - PAD_B;

function remaining(tHours: number): number {
  return DOSE_MG * Math.exp(-DECAY_CONST * tHours);
}

function xFor(t: number): number {
  return PAD_L + (t / WINDOW_H) * PLOT_W;
}
function yFor(mg: number): number {
  return PAD_T + PLOT_H - (mg / DOSE_MG) * PLOT_H;
}

/** Sampled once — the curve shape never changes, only the cursor on it. */
const CURVE_POINTS = Array.from({ length: 73 }, (_, i) => {
  const t = (i / 72) * WINDOW_H;
  return { t, mg: remaining(t) };
});
const CURVE_PATH = CURVE_POINTS.map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(p.t).toFixed(1)} ${yFor(p.mg).toFixed(1)}`).join(" ");

export function HalfLifeDecayArt() {
  const [t, setT] = useState(2);

  const mg = useMemo(() => remaining(t), [t]);
  const pct = mg / DOSE_MG;
  const cursorX = xFor(t);
  const cursorY = yFor(mg);

  return (
    <section
      aria-labelledby="half-life-decay-heading"
      style={{
        border: "1px solid var(--color-hairline)",
        borderTop: "2px solid #0369a1",
        /* Fluid diffusion — soft overlapping fronts, like a dose
           dispersing. The chemistry the whole chart is about. */
        background:
          "radial-gradient(circle at 12% 18%, rgba(3,105,161,0.05) 0%, transparent 42%), " +
          "radial-gradient(circle at 88% 78%, rgba(3,105,161,0.04) 0%, transparent 38%), " +
          "radial-gradient(circle at 65% 12%, rgba(255,122,24,0.03) 0%, transparent 30%), " +
          "#fbfaf6",
        padding: "clamp(24px, 4vw, 44px)",
        marginBottom: "clamp(24px, 4vw, 40px)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 20,
          flexWrap: "wrap",
          marginBottom: 8,
        }}
      >
        <h2
          id="half-life-decay-heading"
          style={{ fontSize: "clamp(20px, 2.4vw, 28px)", margin: 0 }}
        >
          Decay, drawn.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--text-muted)",
            margin: 0,
            textAlign: "right",
          }}
        >
          {/* Explicit size: the browser's default `smaller` put this at 9px
              against the site's 11px floor. Superscript still reads as
              superscript from the raised baseline alone. */}
          A(t) = {DOSE_MG}·e<sup style={{ fontSize: 11 }}>−0.693t/{HALF_LIFE_H}</sup>
        </p>
      </div>
      <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 20px", maxWidth: "62ch" }}>
        First-order decay — the mechanic the whole app is built on. Illustrative model
        (caffeine, {DOSE_MG}mg dose, t½ = {HALF_LIFE_H}h), not a measurement — drag the
        control below to move through time.
      </p>

      {/* Half-life tick labels, in HTML rather than <text> inside the SVG.
          This viewBox is 720 units wide and renders at ~293px on a phone, a
          scale of 0.41 — the labels used to be 9 user units, which measured
          3.7px on screen and was effectively invisible. As HTML they are
          real CSS pixels at every width. Positioned by the same xFor() the
          SVG uses, expressed as a percentage, so a label cannot drift away
          from the gridline it belongs to. */}
      <div style={{ position: "relative", height: 16, marginBottom: 2 }} aria-hidden>
        {[0, 1, 2].map((n) => {
          const th = HALF_LIFE_H * (n + 1);
          if (th > WINDOW_H) return null;
          return (
            <span
              key={n}
              style={{
                position: "absolute",
                left: `${(xFor(th) / VIEW_W) * 100}%`,
                transform: "translateX(-50%)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text-muted)",
                whiteSpace: "nowrap",
              }}
            >
              {n + 1}× t½
            </span>
          );
        })}
      </div>

      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        role="img"
        aria-label={`Exponential decay curve from ${DOSE_MG} milligrams at time zero to near zero by ${WINDOW_H} hours, following a five-hour half-life`}
      >
        {/* Reference lines at each half-life — the labels for these now sit
            above the chart in HTML (see the block above). */}
        {[0, 1, 2].map((n) => {
          const th = HALF_LIFE_H * (n + 1);
          if (th > WINDOW_H) return null;
          const x = xFor(th);
          return (
            <line key={n} x1={x} y1={PAD_T} x2={x} y2={PAD_T + PLOT_H} stroke="var(--color-hairline)" strokeDasharray="2 4" />
          );
        })}

        {/* Baseline */}
        <line x1={PAD_L} y1={PAD_T + PLOT_H} x2={PAD_L + PLOT_W} y2={PAD_T + PLOT_H} stroke="var(--color-hairline-bright)" />

        {/* The decay curve itself */}
        <path d={CURVE_PATH} fill="none" stroke="#0369a1" strokeWidth="2" />

        {/* Area under the curve up to the cursor, so "remaining" reads as a
            quantity, not just a point on a line. */}
        <path
          d={`${CURVE_POINTS.filter((p) => p.t <= t).map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(p.t).toFixed(1)} ${yFor(p.mg).toFixed(1)}`).join(" ")} L ${cursorX.toFixed(1)} ${(PAD_T + PLOT_H).toFixed(1)} L ${PAD_L} ${(PAD_T + PLOT_H).toFixed(1)} Z`}
          fill="rgba(3,105,161,0.08)"
        />

        {/* Cursor — position comes straight from React state on each range
            input event, so no animation layer is needed to keep it in sync. */}
        <g>
          <line x1={cursorX} y1={PAD_T} x2={cursorX} y2={PAD_T + PLOT_H} stroke="#0369a1" strokeOpacity="0.4" />
          <circle cx={cursorX} cy={cursorY} r="5" fill="#0369a1" />
        </g>
      </svg>

      {/* Native range input — keyboard, touch, and screen-reader support
          without hand-rolling any of the three. */}
      <div style={{ marginTop: 12 }}>
        <input
          type="range"
          min={0}
          max={WINDOW_H}
          step={0.1}
          value={t}
          onChange={(e) => setT(Number(e.target.value))}
          aria-label="Time since dose, in hours"
          aria-valuetext={`T plus ${t.toFixed(1)} hours, ${mg.toFixed(0)} milligrams remaining`}
          style={{ width: "100%", accentColor: "#0369a1" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 12 }}>
          <span style={{ color: "var(--text-muted)" }}>T+{t.toFixed(1)}h</span>
          <span style={{ color: "#0369a1", fontWeight: 600 }}>
            {mg.toFixed(0)}mg remaining ({(pct * 100).toFixed(0)}%)
          </span>
        </div>
      </div>
    </section>
  );
}
