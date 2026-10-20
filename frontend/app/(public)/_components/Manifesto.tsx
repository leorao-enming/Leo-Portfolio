"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { DURATION, EASE, STAGGER, VIEWPORT } from "./motion";

/** The conceptual spine of the site, stated once, plainly — MATTER → DATA →
 * SYSTEM. Replaces the old generic "The System" intro. Everything else on
 * the homepage is evidence for this one transition, so it gets its own
 * quiet moment rather than sharing a section with anything else. */
const STEPS = ["Physical process", "Sensor", "Data", "Model", "Decision"];

/* Literal colours, not tokens: motion interpolates between these on every
   frame, and it cannot interpolate a var(). Same values as --color-bg,
   --color-accent, --text-muted and --text-strong. */
const NODE_IDLE = "#f2f1ed";
const NODE_LIT = "#ff7a18";
const LABEL_IDLE = "rgba(10, 12, 15, 0.6)";
const LABEL_LIT = "rgba(10, 12, 15, 0.92)";

function Statement({
  lines,
  align,
  reduced,
}: {
  lines: [string, string, string];
  align: "left" | "right";
  reduced: boolean | null;
}) {
  /* Line by line rather than as one block: the statement is a sequence
     (this, becomes, that), so it is set as one. Time-based, not tied to
     scroll — text left half-faded because a reader stopped scrolling at
     the wrong moment would be a legibility bug, not an effect. */
  const tones = ["var(--color-text-primary)", "var(--text-muted)", "var(--color-accent-ink)"];
  return (
    <div
      className={align === "left" ? "lg:self-start" : "lg:self-end"}
      style={{ alignSelf: "center" }}
    >
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 500,
          fontSize: "var(--type-display-m)",
          lineHeight: 1.04,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          color: "var(--color-text-primary)",
          margin: 0,
        }}
        className={align === "left" ? "text-center lg:text-left" : "text-center lg:text-right"}
      >
        {lines.map((line, i) => (
          <motion.span
            key={line}
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: reduced ? 0 : DURATION.base, delay: reduced ? 0 : i * STAGGER * 2, ease: EASE }}
            style={{ display: "block", color: tones[i] }}
          >
            {line}
          </motion.span>
        ))}
      </p>
    </div>
  );
}

/** One node on the transition line. Lights when the travelling head passes
 * its position; its own component so each node can own its transforms. */
function StepNode({
  label,
  index,
  cx,
  cy,
  fill,
}: {
  label: string;
  index: number;
  cx: number;
  cy: number;
  fill: MotionValue<number>;
}) {
  const at = index / (STEPS.length - 1);
  const lit = useTransform(fill, [Math.max(0, at - 0.04), at], [0, 1]);
  const nodeFill = useTransform(lit, [0, 1], [NODE_IDLE, NODE_LIT]);
  const labelFill = useTransform(lit, [0, 1], [LABEL_IDLE, LABEL_LIT]);

  /* The end nodes sit `pad` from the edge, so a centred label wider than
     2*pad hangs outside the viewBox — "Physical process" is 102 units wide
     against a 20-unit margin and was starting at x = -31, rendering past
     the left edge of its own graphic. Axis ends anchor to their edge
     instead; the interior labels have room on both sides and stay centred
     on their node. */
  const first = index === 0;
  const last = index === STEPS.length - 1;
  const anchor = first ? "start" : last ? "end" : "middle";
  const tx = first ? cx - 4 : last ? cx + 4 : cx;

  return (
    <g>
      <motion.circle cx={cx} cy={cy} r="4" style={{ fill: nodeFill }} stroke="var(--color-accent-ink)" strokeWidth="1.4" />
      <motion.text
        x={tx}
        y={cy - 14}
        textAnchor={anchor}
        fontSize="10"
        fontFamily="var(--font-mono)"
        letterSpacing="0.04em"
        style={{ fill: labelFill }}
      >
        {label}
      </motion.text>
    </g>
  );
}

/** Physical process → sensor → data → model → decision, drawn as a single
 * restrained instrumentation line — the same hairline/mono-tag vocabulary
 * ProcessCanvas already established, so it reads as one visual system
 * rather than a second, competing graphic language.
 *
 * The line fills as it is scrolled past, a head travelling along it and
 * lighting each stage in turn: the one place on the site where the
 * manifesto's claim is shown happening rather than stated. Scroll-linked
 * (not timed) because the reader is the one moving the material along.
 * Under reduced motion it renders complete and still. */
function TransitionLine({ reduced }: { reduced: boolean | null }) {
  const w = 640;
  const h = 64;
  const pad = 20;
  const step = (w - pad * 2) / (STEPS.length - 1);
  const ref = useRef<HTMLDivElement>(null);

  /* Starts as the line rises past 85% of the viewport and completes at
     35%, so the whole run happens while it is comfortably on screen. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.35"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });
  const still = useTransform(scrollYProgress, () => 1);
  const fill = reduced ? still : smooth;
  const headX = useTransform(fill, (f) => f * (w - pad * 2));
  const headOpacity = useTransform(fill, [0, 0.02, 0.97, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 640, margin: "0 auto" }}>
      <svg
        aria-hidden
        viewBox={`0 0 ${w} ${h}`}
        style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
      >
        <line x1={pad} y1={h / 2} x2={w - pad} y2={h / 2} stroke="var(--color-hairline-bright)" />
        <motion.line
          x1={pad}
          y1={h / 2}
          x2={w - pad}
          y2={h / 2}
          stroke="var(--color-accent)"
          strokeWidth="1.4"
          style={{ pathLength: fill }}
        />
        <path
          d={`M ${w - pad - 6} ${h / 2 - 5} L ${w - pad} ${h / 2} L ${w - pad - 6} ${h / 2 + 5}`}
          fill="none"
          stroke="var(--color-hairline-bright)"
          strokeWidth="1.4"
        />
        {STEPS.map((label, i) => (
          <StepNode key={label} label={label} index={i} cx={pad + i * step} cy={h / 2} fill={fill} />
        ))}
        {!reduced && (
          <motion.circle
            cx={pad}
            cy={h / 2}
            r="3"
            fill="var(--color-accent)"
            style={{ x: headX, opacity: headOpacity, filter: "drop-shadow(0 0 4px rgba(255,122,24,0.8))" }}
          />
        )}
      </svg>
    </div>
  );
}

export function Manifesto() {
  const reduced = useReducedMotion();

  return (
    /* Tone change carries the section boundary instead of the hairline
       rule that used to sit here — surface-base above, surface-soft from
       here through the Selected Work intro, so the two read as one
       continuous movement rather than two stacked blocks. */
    <section id="manifesto" style={{ background: "var(--surface-soft)" }}>
      <div
        className="section-shell"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(28px, 4vw, 44px)",
          paddingTop: "clamp(80px, 11vw, 132px)",
          paddingBottom: "clamp(80px, 11vw, 132px)",
        }}
      >
        <Statement lines={["Matter", "Becomes", "Data."]} align="left" reduced={reduced} />
        <TransitionLine reduced={reduced} />
        <Statement lines={["Data", "Becomes", "A system."]} align="right" reduced={reduced} />
      </div>
    </section>
  );
}
