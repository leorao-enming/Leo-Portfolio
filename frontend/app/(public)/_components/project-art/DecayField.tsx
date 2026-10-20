"use client";

import { useEffect, useId, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";

/**
 * Half-Life's decay curve, shared by the homepage teaser and the /projects
 * gallery so both draw the same object instead of keeping two copies of the
 * same maths. Art direction lives here; composition (what sits beside it,
 * how much copy, which CTA) belongs to whichever section renders it.
 *
 * 200mg at 08:00, 38mg remaining by 23:00 (15h window) — solved for a
 * ~6.3h half-life, inside caffeine's real 3–7h range. Illustrative of the
 * model the app implements, not a measurement, which is the same framing
 * HalfLifeDecayArt uses on the project's own page.
 *
 * ── Why the labels are HTML, not <text> ─────────────────────────────────
 * They used to live inside the SVG. Text inside a viewBox is sized in user
 * units, so it scales with the drawing: this SVG is the widest on the site
 * (560 units), and at a 342px mobile container that put the axis labels at
 * a measured 6.7px — unreadable, and unfixable by a breakpoint because the
 * scale factor varies continuously with container width. As HTML they are
 * in real CSS pixels and never shrink below their set size, at any width.
 * They are also selectable and translatable, which SVG text is not.
 *
 * ── The draw ────────────────────────────────────────────────────────────
 * On first view the day plays out: the curve and its fill are uncovered
 * left to right, a marker rides the curve, and the readout below runs the
 * clock from 08:00 to 23:00 while the dose falls from 200 to 38 mg. The
 * app's whole premise is that this number moves while you are not looking;
 * this is the one place the site can show it moving.
 *
 * Server render and no-JS show the finished day, and reduced motion keeps
 * it that way; the figure is only reset to 08:00 on the client, below the
 * fold, before the reader reaches it.
 */

export const DOSE_MG = 200;
export const REMAINING_MG = 38;
const WINDOW_H = 15;
const DECAY_K = Math.log(DOSE_MG / REMAINING_MG) / WINDOW_H;

/* The SVG is now the plot only; padding just keeps strokes off the edge. */
const VIEW_W = 560;
const VIEW_H = 260;
const PAD = 6;
const PLOT_W = VIEW_W - PAD * 2;
const PLOT_H = VIEW_H - PAD * 2;

function remaining(tHours: number) {
  return DOSE_MG * Math.exp(-DECAY_K * tHours);
}
function xFor(t: number) {
  return PAD + (t / WINDOW_H) * PLOT_W;
}
function yFor(mg: number) {
  return PAD + PLOT_H - (mg / DOSE_MG) * PLOT_H;
}

const CURVE_POINTS = Array.from({ length: 61 }, (_, i) => {
  const t = (i / 60) * WINDOW_H;
  return { t, mg: remaining(t) };
});
const CURVE_PATH = CURVE_POINTS.map(
  (p, i) => `${i === 0 ? "M" : "L"} ${xFor(p.t).toFixed(1)} ${yFor(p.mg).toFixed(1)}`,
).join(" ");
const AREA_PATH =
  `${CURVE_PATH} L ${xFor(WINDOW_H).toFixed(1)} ${(PAD + PLOT_H).toFixed(1)}` +
  ` L ${xFor(0).toFixed(1)} ${(PAD + PLOT_H).toFixed(1)} Z`;

/** Seconds for the 15-hour day to play out. */
const DRAW_S = 2.6;

function clock(p: number) {
  const minutes = Math.round((8 + p * WINDOW_H) * 60);
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

const axisLabel: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.08em",
  color: "var(--text-muted)",
};

export function DecayField() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const clipId = useId();

  /* Fraction of the day elapsed. Starts complete (see the note above). */
  const progress = useMotionValue(1);
  const armed = useRef(false);

  useEffect(() => {
    if (reduced || reduced === null) return;
    if (!armed.current) {
      armed.current = true;
      progress.set(0);
    }
    if (!inView) return;
    const controls = animate(progress, 1, { duration: DRAW_S, ease: [0.45, 0, 0.25, 1] });
    return () => controls.stop();
  }, [inView, reduced, progress]);

  const clipW = useTransform(progress, (p) => xFor(p * WINDOW_H) + 4);
  /* Rounded: motion serialises style values to 4 places on the server and
     the client renders them unrounded, so a raw float here fails hydration. */
  const headLeft = useTransform(progress, (p) => `${((xFor(p * WINDOW_H) / VIEW_W) * 100).toFixed(2)}%`);
  const headTop = useTransform(progress, (p) => `${((yFor(remaining(p * WINDOW_H)) / VIEW_H) * 100).toFixed(2)}%`);
  const headOpacity = useTransform(progress, [0, 0.01, 0.98, 1], [0, 1, 1, 0]);
  const mgText = useTransform(progress, (p) => `${Math.round(remaining(p * WINDOW_H))}`);
  const timeText = useTransform(progress, clock);

  return (
    <figure ref={ref} style={{ margin: 0 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 15,
          fontWeight: 600,
          color: "var(--accent-half-life)",
          marginBottom: 6,
        }}
      >
        {DOSE_MG} mg
      </div>

      <div style={{ position: "relative" }}>
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          style={{ width: "100%", height: "clamp(150px, 26vw, 250px)", display: "block" }}
          role="img"
          aria-label="Line drawing of caffeine decaying from 200 milligrams at 8am to 38 milligrams remaining by 11pm, following a smooth exponential curve."
        >
          <defs>
            {/* A clip rather than pathLength: the curve uses
                non-scaling-stroke under preserveAspectRatio="none", and dash
                arithmetic does not survive that combination reliably. A
                widening clip uncovers the curve and its fill together. */}
            <clipPath id={clipId}>
              <motion.rect x="0" y="0" height={VIEW_H} width={clipW} />
            </clipPath>
          </defs>
          <line x1={PAD} y1={PAD} x2={PAD} y2={PAD + PLOT_H} stroke="var(--accent-half-life)" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" />
          <line x1={PAD} y1={PAD + PLOT_H} x2={VIEW_W - PAD} y2={PAD + PLOT_H} stroke="var(--accent-half-life)" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" />
          <g clipPath={`url(#${clipId})`}>
            <path d={AREA_PATH} fill="var(--accent-half-life-dim)" fillOpacity="0.14" />
            {/* non-scaling-stroke keeps the curve an even weight — with
                preserveAspectRatio="none" the x and y scales differ, which
                would otherwise render the stroke visibly thicker on one axis. */}
            <path
              d={CURVE_PATH}
              fill="none"
              stroke="var(--accent-half-life)"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>

        {/* The marker is HTML for the same reason the labels are: inside a
            non-uniformly scaled viewBox a circle renders as an ellipse. */}
        <motion.span
          aria-hidden
          style={{
            position: "absolute",
            left: headLeft,
            top: headTop,
            width: 9,
            height: 9,
            marginLeft: -4.5,
            marginTop: -4.5,
            borderRadius: "50%",
            background: "var(--accent-half-life)",
            boxShadow: "0 0 0 4px color-mix(in srgb, var(--accent-half-life) 18%, transparent)",
            opacity: headOpacity,
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <span style={axisLabel}>08:00</span>
        <span style={axisLabel}>23:00</span>
      </div>

      <figcaption
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          color: "var(--accent-half-life)",
          textAlign: "right",
          marginTop: 8,
        }}
      >
        <span className="sr-only">{REMAINING_MG} mg remaining at 23:00</span>
        <span aria-hidden>
          <motion.span style={{ color: "var(--text-muted)" }}>{timeText}</motion.span>
          {"  ·  "}
          <motion.span>{mgText}</motion.span> mg remaining
        </span>
      </figcaption>
    </figure>
  );
}
