/**
 * FabTwin's visual identity — a plasma-etch SPC control chart that visibly
 * stops partway across, rather than a polished chart implying the work is
 * done. FabTwin is Lab entry L-03, status IN PROGRESS: the simulator core
 * is real (42/42 tests passing, CI clean), but validation against the two
 * public fab datasets this project is actually built to prove itself
 * against (SECOM, LAM9600) hasn't run yet. Drawing a complete-looking chart
 * would overstate that by exactly the amount the open half here doesn't.
 *
 * Synthetic data, clearly captioned — this illustrates the chart shape the
 * simulator produces, not a result. No interactivity: unlike Half-Life
 * there's no live model behind this yet to make interactive, and pretending
 * otherwise would be the same overstatement in a different form.
 */

const MU = 100;
const SIGMA = 2.5;
const UCL = MU + 3 * SIGMA;
const LCL = MU - 3 * SIGMA;

// Hand-set, not randomly generated, so the render is deterministic across
// server and client — one deliberate excursion past UCL, which is what a
// fault-detection chart exists to catch.
const SUBGROUPS = [99.2, 100.8, 98.5, 101.3, 99.9, 100.4, 97.8, 102.1, 100.6, 98.9, 109.4, 100.1, 99.5, 100.7];
const FAULT_INDEX = 10;

const VIEW_W = 720;
const VIEW_H = 260;
const PAD_L = 40;
const PAD_R = 16;
const PAD_T = 20;
const PAD_B = 24;
const PLOT_W = VIEW_W - PAD_L - PAD_R;
const PLOT_H = VIEW_H - PAD_T - PAD_B;

// The resolved (plotted) zone runs to here; the rest is the open half.
const RESOLVED_FRACTION = 0.62;
const RESOLVED_X = PAD_L + PLOT_W * RESOLVED_FRACTION;

const Y_MIN = MU - 4.5 * SIGMA;
const Y_MAX = MU + 4.5 * SIGMA;

function xForIndex(i: number): number {
  // Subgroups occupy the resolved zone only.
  return PAD_L + (i / (SUBGROUPS.length - 1)) * (RESOLVED_X - PAD_L);
}
function yForValue(v: number): number {
  return PAD_T + PLOT_H - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_H;
}

const LINE_PATH = SUBGROUPS.map((v, i) => `${i === 0 ? "M" : "L"} ${xForIndex(i).toFixed(1)} ${yForValue(v).toFixed(1)}`).join(" ");

export function FabTwinSpcArt() {
  return (
    <section
      aria-labelledby="fabtwin-spc-heading"
      style={{
        border: "1px solid var(--color-hairline)",
        borderTop: "2px solid #0369a1",
        /* The parent LabCard is already #fbfaf6 — matching it here would
           read as a flat duplicate rather than a distinct panel. #f2f1ed
           is the same recessed-inset convention ProjectCard's
           TechStackPanel/MetricsPanel already use against that same
           #fbfaf6 card background. */
        background: "#f2f1ed",
        padding: "clamp(20px, 3.5vw, 36px)",
        marginTop: 20,
        marginBottom: 4,
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
        <h4
          id="fabtwin-spc-heading"
          style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, margin: 0, color: "var(--color-text-primary)" }}
        >
          SPC — chamber pressure, individuals chart
        </h4>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", margin: 0, textAlign: "right" }}>
          UCL/LCL = μ ± 3σ
        </p>
      </div>
      <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "0 0 18px", maxWidth: "64ch", lineHeight: 1.6 }}>
        Synthetic — illustrates the chart FabTwin&apos;s simulator produces, not a validated result.
        The right half is drawn open on purpose: cross-validation against the SECOM and LAM9600
        public fab datasets hasn&apos;t run yet (Gate T1: 2026-09-07 – 2026-10-04). At this project&apos;s
        real 1:14 fault/normal class ratio, raw accuracy is structurally uninformative regardless
        of the run — precision, recall, and F1 are the actual gate.
      </p>

      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        role="img"
        aria-label="Statistical process control chart for a plasma-etch chamber pressure signal. Fourteen subgroups plotted in control, with one point flagged above the upper control limit. The remaining span of the chart is deliberately left open, marked pending validation against public fab datasets."
      >
        {/* Control limit reference lines span the full width — the limits
            are a property of the historical baseline, established even
            though the fault-detection validation on top of them isn't. */}
        {[
          { y: UCL, label: "UCL" },
          { y: MU, label: "CL" },
          { y: LCL, label: "LCL" },
        ].map(({ y, label }) => (
          <g key={label}>
            <line
              x1={PAD_L}
              y1={yForValue(y)}
              x2={PAD_L + PLOT_W}
              y2={yForValue(y)}
              stroke={label === "CL" ? "var(--color-hairline-bright)" : "rgba(3,105,161,0.35)"}
              strokeDasharray={label === "CL" ? "2 4" : undefined}
            />
            <text x={PAD_L - 6} y={yForValue(y) + 3} textAnchor="end" fontSize="9" fontFamily="var(--font-mono)" fill="var(--text-muted)">
              {label}
            </text>
          </g>
        ))}

        {/* Open / unresolved zone — 45deg hatching is a real drafting
            convention for "not yet documented," not decoration invented
            for this chart. */}
        <defs>
          <pattern id="pending-hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="var(--color-hairline)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect
          x={RESOLVED_X}
          y={PAD_T}
          width={PAD_L + PLOT_W - RESOLVED_X}
          height={PLOT_H}
          fill="url(#pending-hatch)"
        />
        <rect
          x={RESOLVED_X}
          y={PAD_T}
          width={PAD_L + PLOT_W - RESOLVED_X}
          height={PLOT_H}
          fill="none"
          stroke="var(--color-hairline-bright)"
          strokeDasharray="3 3"
        />
        <text
          x={RESOLVED_X + (PAD_L + PLOT_W - RESOLVED_X) / 2}
          y={PAD_T + PLOT_H / 2}
          textAnchor="middle"
          fontSize="10"
          fontFamily="var(--font-mono)"
          fill="var(--text-muted)"
          transform={`rotate(-90 ${RESOLVED_X + (PAD_L + PLOT_W - RESOLVED_X) / 2} ${PAD_T + PLOT_H / 2})`}
        >
          VALIDATION PENDING
        </text>

        {/* The resolved data itself */}
        <path d={LINE_PATH} fill="none" stroke="#0369a1" strokeWidth="1.5" />
        {SUBGROUPS.map((v, i) => {
          const out = v > UCL || v < LCL;
          return (
            <circle
              key={i}
              cx={xForIndex(i)}
              cy={yForValue(v)}
              r={out ? 5 : 3}
              fill={out ? "#b91c1c" : "#0369a1"}
            />
          );
        })}
        <text
          x={xForIndex(FAULT_INDEX)}
          y={yForValue(SUBGROUPS[FAULT_INDEX]) - 10}
          textAnchor="middle"
          fontSize="9"
          fontFamily="var(--font-mono)"
          fontWeight="700"
          fill="#b91c1c"
        >
          OUT OF CONTROL
        </text>

        {/* Boundary between resolved and open zones */}
        <line x1={RESOLVED_X} y1={PAD_T - 6} x2={RESOLVED_X} y2={PAD_T + PLOT_H + 6} stroke="var(--color-hairline-bright)" />
      </svg>
    </section>
  );
}
