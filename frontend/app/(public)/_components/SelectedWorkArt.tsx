/**
 * Small "shape signatures" for the three Selected Work flagships — enough
 * to make each row read as a structurally distinct composition rather than
 * three identical index rows, without pulling the full-size, page-specific
 * charts (HalfLifeDecayArt, FabTwinSpcArt) onto the homepage and undoing
 * the point of shortening it. Radically different art direction per
 * project comes later; this is the Phase 1 shell each of those directions
 * will eventually replace. Pure static SVG, aria-hidden — decorative only.
 */

const STROKE = "#0369a1";

/** Half-Life — organic / kinetic. The same decay-curve subject as
 * HalfLifeDecayArt, reduced to a bare sparkline. */
export function HalfLifeMotif() {
  return (
    <svg aria-hidden viewBox="0 0 160 64" style={{ width: 72, height: "auto", display: "block" }}>
      <path
        d="M 6 10 C 24 12, 34 30, 46 38 S 78 52, 100 55 S 140 58, 154 58"
        fill="none"
        stroke={STROKE}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="46" cy="38" r="3" fill={STROKE} />
    </svg>
  );
}

/** FabTwin — industrial / statistical. The same SPC-chart subject as
 * FabTwinSpcArt: control limits, a jagged run, one out-of-control point,
 * and the open/pending hatch that project's own art is built around. */
export function FabTwinMotif() {
  return (
    <svg aria-hidden viewBox="0 0 160 64" style={{ width: 72, height: "auto", display: "block" }}>
      <defs>
        <pattern id="selected-work-hatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-hairline)" strokeWidth="1" />
        </pattern>
      </defs>
      <line x1="4" y1="14" x2="156" y2="14" stroke="rgba(3,105,161,0.3)" />
      <line x1="4" y1="50" x2="156" y2="50" stroke="rgba(3,105,161,0.3)" />
      <rect x="98" y="6" width="58" height="52" fill="url(#selected-work-hatch)" />
      <path
        d="M 8 40 L 26 30 L 44 44 L 62 20 L 80 36"
        fill="none"
        stroke={STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="62" cy="20" r="4" fill="#b91c1c" />
    </svg>
  );
}

/** LeoLogic OS — systems / network. A small node-and-edge topology, the
 * same visual family as the project's own architecture layer diagram. */
export function LeoLogicOsMotif() {
  const nodes = [
    { x: 24, y: 14 },
    { x: 24, y: 50 },
    { x: 80, y: 32 },
    { x: 136, y: 14 },
    { x: 136, y: 50 },
  ];
  const edges: [number, number][] = [
    [0, 2],
    [1, 2],
    [2, 3],
    [2, 4],
  ];
  return (
    <svg aria-hidden viewBox="0 0 160 64" style={{ width: 72, height: "auto", display: "block" }}>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--color-hairline-bright)"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 2 ? 6 : 4}
          fill={i === 2 ? "var(--color-accent)" : "#fbfaf6"}
          stroke={STROKE}
          strokeWidth="1.4"
        />
      ))}
    </svg>
  );
}
