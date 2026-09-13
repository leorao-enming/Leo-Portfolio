/**
 * LeoLogic OS's system topology, extracted from LeoLogicOsShowcase so the
 * homepage teaser and the /projects gallery share one drawing.
 *
 * Drawn once and left alone — no animated nodes. The visual weight comes
 * from spacing and the branch/converge shape itself (one root, three
 * domains, one agent layer, one memory layer), not from decoration or node
 * count. Pure static SVG.
 */

type Node = { id: string; x: number; y: number };

const NODES: Node[] = [
  { id: "LIFE", x: 200, y: 26 },
  { id: "HEALTH", x: 70, y: 168 },
  { id: "PROJECTS", x: 200, y: 168 },
  { id: "CAREER", x: 330, y: 168 },
  { id: "AGENTS", x: 200, y: 292 },
  { id: "MEMORY", x: 200, y: 392 },
];
const byId = (id: string) => NODES.find((n) => n.id === id)!;
const BRANCH_Y = 100;
const CONVERGE_Y = 232;

export function SystemTopology({ maxWidth = 420 }: { maxWidth?: number }) {
  const life = byId("LIFE");
  const health = byId("HEALTH");
  const projects = byId("PROJECTS");
  const career = byId("CAREER");
  const agents = byId("AGENTS");
  const memory = byId("MEMORY");

  return (
    <svg
      viewBox="0 0 400 420"
      style={{ width: "100%", maxWidth, height: "auto", display: "block", margin: "0 auto" }}
      role="img"
      aria-label="System topology: Life branches into Health, Projects, and Career, which converge into Agents, which feeds Memory."
    >
      <g fill="none" stroke="var(--accent-leologic)" strokeOpacity="0.55">
        <line x1={life.x} y1={life.y + 10} x2={life.x} y2={BRANCH_Y} />
        <line x1={health.x} y1={BRANCH_Y} x2={career.x} y2={BRANCH_Y} />
        <line x1={health.x} y1={BRANCH_Y} x2={health.x} y2={health.y - 10} />
        <line x1={projects.x} y1={BRANCH_Y} x2={projects.x} y2={projects.y - 10} />
        <line x1={career.x} y1={BRANCH_Y} x2={career.x} y2={career.y - 10} />

        <line x1={health.x} y1={health.y + 10} x2={health.x} y2={CONVERGE_Y} />
        <line x1={career.x} y1={career.y + 10} x2={career.x} y2={CONVERGE_Y} />
        <line x1={health.x} y1={CONVERGE_Y} x2={career.x} y2={CONVERGE_Y} />
        <line x1={projects.x} y1={projects.y + 10} x2={projects.x} y2={agents.y - 12} />
        <line x1={agents.x} y1={CONVERGE_Y} x2={agents.x} y2={agents.y - 12} />

        <line x1={agents.x} y1={agents.y + 10} x2={memory.x} y2={memory.y - 12} />
      </g>

      {NODES.map((n) => {
        const isRoot = n.id === "LIFE";
        const isHub = n.id === "AGENTS";
        return (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r={isRoot || isHub ? 5 : 4}
              fill={isRoot || isHub ? "var(--accent-leologic)" : "var(--surface-leologic)"}
              stroke="var(--accent-leologic)"
              strokeWidth="1.4"
            />
            <text
              x={n.x}
              y={n.y - 14}
              textAnchor="middle"
              fontSize="13"
              fontFamily="var(--font-mono)"
              letterSpacing="0.1em"
              fill={isRoot || isHub ? "var(--text-on-dark-strong)" : "var(--text-on-dark-body)"}
            >
              {n.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
