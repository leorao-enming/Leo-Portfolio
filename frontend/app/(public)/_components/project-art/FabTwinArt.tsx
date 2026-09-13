/**
 * FabTwin's two visual objects, extracted from FabTwinShowcase so the
 * homepage teaser and the /projects gallery share one drawing each.
 *
 * Pure static SVG — no client JS.
 */

/* ── Silicon wafer ──────────────────────────────────────────────────
 * The section's one violet moment — thin-film interference on a wafer
 * surface, restrained rather than a rainbow-holo effect. Concentric
 * process rings + a flat notch (a real wafer-orientation feature, not
 * invented detail) keep it reading as an object, not an abstract disc.
 *
 * idPrefix exists because the gradient needs a document-unique id: two
 * wafers on one page would otherwise both reference the same <defs> id
 * and the second would silently inherit the first's gradient.
 */
export function Wafer({ idPrefix = "wafer" }: { idPrefix?: string }) {
  const sheenId = `${idPrefix}-sheen`;
  return (
    <svg viewBox="0 0 280 280" style={{ width: "100%", maxWidth: 300, height: "auto", display: "block" }} aria-hidden>
      <defs>
        <radialGradient id={sheenId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="var(--accent-fabtwin)" stopOpacity="0.28" />
          <stop offset="45%" stopColor="var(--accent-fabtwin)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--surface-fabtwin-dark)" stopOpacity="0.08" />
        </radialGradient>
      </defs>
      <circle cx="140" cy="140" r="124" fill={`url(#${sheenId})`} stroke="var(--accent-fabtwin-ink)" strokeOpacity="0.4" />
      {[96, 68, 40].map((r) => (
        <circle key={r} cx="140" cy="140" r={r} fill="none" stroke="var(--accent-fabtwin-ink)" strokeOpacity="0.18" />
      ))}
      {/* Orientation notch */}
      <path
        d="M 128 262 A 124 124 0 0 0 152 262 L 148 250 A 108 108 0 0 1 132 250 Z"
        fill="var(--surface-fabtwin)"
        stroke="var(--accent-fabtwin-ink)"
        strokeOpacity="0.4"
      />
    </svg>
  );
}

/* ── SPC chart ───────────────────────────────────────────────────────
 * A dark instrument panel set inside the light titanium section — dark
 * elements inside the section rather than a second full-dark canvas.
 * Synthetic subgroups, hand-set so the render is deterministic across
 * server and client, with one deliberate excursion past the upper control
 * limit: catching that is what a fault-detection chart exists to do. */
const SUBGROUPS = [0.42, 0.3, 0.58, 0.22, 0.5, 0.86, 0.34, 0.46];
const FAULT_INDEX = 5;

export function SpcPanel() {
  const w = 360;
  const h = 220;
  const padX = 30;
  const topY = 44;
  const bottomY = h - 44;
  const stepX = (w - padX * 2) / (SUBGROUPS.length - 1);

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      style={{ width: "100%", height: "auto", display: "block", background: "var(--surface-fabtwin-dark)", borderRadius: 12 }}
      role="img"
      aria-label="Statistical process control chart for chamber 03. Eight subgroups plotted between the upper and lower control limits, with one point flagged as a fault above the upper limit."
    >
      <text x={padX} y={26} fontSize="13" fontFamily="var(--font-mono)" letterSpacing="0.14em" fill="var(--text-on-dark-strong)">
        CHAMBER 03
      </text>

      <line x1={padX} y1={topY} x2={w - padX} y2={topY} stroke="var(--accent-fabtwin)" strokeOpacity="0.5" strokeDasharray="3 4" />
      <text x={w - padX} y={topY - 6} textAnchor="end" fontSize="12" fontFamily="var(--font-mono)" fill="var(--text-on-dark-muted)">UCL</text>

      <line x1={padX} y1={bottomY} x2={w - padX} y2={bottomY} stroke="var(--accent-fabtwin)" strokeOpacity="0.5" strokeDasharray="3 4" />
      <text x={padX} y={bottomY + 18} fontSize="12" fontFamily="var(--font-mono)" fill="var(--text-on-dark-muted)">LCL</text>

      {SUBGROUPS.map((v, i) => {
        const x = padX + i * stepX;
        const y = topY + (1 - v) * (bottomY - topY);
        const isFault = i === FAULT_INDEX;
        return (
          <g key={i}>
            {i > 0 && (
              <line
                x1={padX + (i - 1) * stepX}
                y1={topY + (1 - SUBGROUPS[i - 1]) * (bottomY - topY)}
                x2={x}
                y2={y}
                stroke="var(--text-on-dark-body)"
                strokeOpacity="0.5"
              />
            )}
            {/* The fault is marked by SHAPE (a cross) as well as colour, so
                it stays identifiable without relying on the red. */}
            {isFault ? (
              <g stroke="#e08a7a" strokeWidth="2" strokeLinecap="round">
                <line x1={x - 5} y1={y - 5} x2={x + 5} y2={y + 5} />
                <line x1={x - 5} y1={y + 5} x2={x + 5} y2={y - 5} />
              </g>
            ) : (
              <circle cx={x} cy={y} r="3.5" fill="var(--text-on-dark-strong)" />
            )}
          </g>
        );
      })}

      <text x={padX} y={h - 14} fontSize="12" fontFamily="var(--font-mono)" letterSpacing="0.1em" fill="#e08a7a">
        FAULT DETECTED
      </text>
    </svg>
  );
}
