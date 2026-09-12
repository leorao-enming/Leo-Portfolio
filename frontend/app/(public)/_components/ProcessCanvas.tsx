"use client";

import { useState } from "react";
import {
  NODES,
  EDGES,
  NODE_BY_ID,
  WIDE,
  COMPACT,
  type DiagramNode,
  type DiagramEdge,
  type Layout,
  portPoint,
  halfExtent,
  canvasViewBox,
  edgesForNode,
  competencyFor,
  focusAreasFor,
} from "./process-diagram/topology";

/**
 * Interactive process canvas. Replaces ProcessSchematicArt, which drew the
 * same topology by hand and shipped four measured geometry defects (numbers
 * in the header of process-diagram/topology.ts).
 *
 * One SVG, one coordinate system, one derived viewBox. Nodes and edges come
 * from the topology module; this file renders them and owns selection state.
 *
 * ── Why the controls are HTML buttons, not the SVG groups ───────────────
 * The obvious approach — <g role="button" tabIndex={0}> — was implemented
 * first and measured as broken: focus() does move document.activeElement to
 * the <g>, but NO focus or focusin event is dispatched for it in this
 * engine, so React's onFocus never ran and keyboard users could tab onto a
 * node with nothing happening. Rather than paper over that, the interactive
 * layer is a row of real <button>s (the tag index below the diagram): real
 * focus events, real Enter/Space, the global :focus-visible ring, and
 * comfortably-sized tap targets on mobile where 34px circles are fiddly.
 * The SVG is then a single labelled image with a full text description, and
 * pointer hover over its nodes still drives the same selection for mouse
 * users. One piece of state, three input paths.
 */

const ACCENT = "var(--accent-engineering)";
const ACCENT_TEXT = "var(--color-accent-ink)";
const NEUTRAL_LINE = "var(--color-hairline-bright)";
const NODE_FILL = "#fbfaf6";

/* ── Edge ──────────────────────────────────────────────────────────────
   Process edges are solid and heavier, instrument edges dashed and
   lighter — a real drafting distinction (a dashed line is a signal line),
   which also keeps the two kinds distinguishable without relying on
   colour. */
function Edge({ edge, layout, active }: { edge: DiagramEdge; layout: Layout; active: boolean }) {
  const a = portPoint(edge.from.nodeId, edge.from.port, layout);
  const b = portPoint(edge.to.nodeId, edge.to.port, layout);
  const isProcess = edge.style === "process";
  return (
    <line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke={active ? ACCENT : NEUTRAL_LINE}
      strokeWidth={isProcess ? (active ? 2.6 : 2) : active ? 1.8 : 1.2}
      strokeDasharray={isProcess ? undefined : "5 4"}
      strokeLinecap="round"
    />
  );
}

/* ── Node ──────────────────────────────────────────────────────────────
   Presentational. Selection shows as stroke weight + fill + label weight
   as well as colour, so it never depends on colour alone. */
function Node({
  node,
  layout,
  selected,
  onHover,
}: {
  node: DiagramNode;
  layout: Layout;
  selected: boolean;
  onHover: (id: string) => void;
}) {
  const c = layout.pos[node.id];
  const { hx, hy } = halfExtent(node, layout);

  const stroke = selected ? ACCENT : NEUTRAL_LINE;
  const fill = selected ? "color-mix(in srgb, var(--accent-engineering) 10%, #fbfaf6)" : NODE_FILL;

  return (
    <g onMouseEnter={() => onHover(node.id)} style={{ cursor: "pointer" }}>
      {node.kind === "equipment" ? (
        <rect x={c.x - hx} y={c.y - hy} width={hx * 2} height={hy * 2} rx="3" fill={fill} stroke={stroke} strokeWidth={selected ? 2 : 1} />
      ) : (
        <circle cx={c.x} cy={c.y} r={layout.circleR} fill={fill} stroke={stroke} strokeWidth={selected ? 2 : 1} />
      )}
      {/* dominantBaseline centres the tag in the node box without a
          hand-tuned y offset, which is how the old version did it. */}
      <text
        x={c.x}
        y={c.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={layout.tagFontSize}
        fontFamily="var(--font-mono)"
        fontWeight={selected ? 700 : 500}
        fill={selected ? ACCENT_TEXT : "var(--color-text-primary)"}
        style={{ pointerEvents: "none" }}
      >
        {node.id}
      </text>
    </g>
  );
}

function Canvas({
  layout,
  selectedId,
  onHover,
  descId,
}: {
  layout: Layout;
  selectedId: string;
  onHover: (id: string) => void;
  descId: string;
}) {
  const vb = canvasViewBox(layout);
  const activeEdgeIds = new Set(edgesForNode(selectedId).map((e) => e.id));
  const outletFrom = portPoint("R-101", "bottom", layout);

  return (
    <svg
      viewBox={vb.str}
      style={{ width: "100%", height: "auto", display: "block" }}
      role="img"
      aria-describedby={descId}
      aria-label="Simplified process and instrumentation diagram"
    >
      {/* Outlet stub below the last node, so the train reads as a path
          with a direction rather than a closed stack. */}
      <line x1={outletFrom.x} y1={outletFrom.y} x2={outletFrom.x} y2={layout.outletY} stroke={NEUTRAL_LINE} strokeWidth="2" />
      <path
        d={`M ${outletFrom.x - 5} ${layout.outletY - 8} L ${outletFrom.x} ${layout.outletY} L ${outletFrom.x + 5} ${layout.outletY - 8}`}
        fill="none"
        stroke={NEUTRAL_LINE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {EDGES.map((edge) => (
        <Edge key={edge.id} edge={edge} layout={layout} active={activeEdgeIds.has(edge.id)} />
      ))}
      {NODES.map((node) => (
        <Node key={node.id} node={node} layout={layout} selected={selectedId === node.id} onHover={onHover} />
      ))}
    </svg>
  );
}

/* ── Tag index — the real interactive layer ────────────────────────── */
function TagIndex({
  selectedId,
  onSelect,
  panelId,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  panelId: string;
}) {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          margin: "0 0 10px",
        }}
      >
        Tag index
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {NODES.map((node) => {
          const selected = node.id === selectedId;
          return (
            <button
              key={node.id}
              type="button"
              aria-pressed={selected}
              aria-controls={panelId}
              onClick={() => onSelect(node.id)}
              onMouseEnter={() => onSelect(node.id)}
              onFocus={() => onSelect(node.id)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.06em",
                /* 32px min height keeps these comfortable tap targets. */
                minHeight: 32,
                padding: "6px 11px",
                borderRadius: 4,
                cursor: "pointer",
                color: selected ? ACCENT_TEXT : "var(--text-body)",
                background: selected ? "color-mix(in srgb, var(--accent-engineering) 12%, transparent)" : "transparent",
                border: `1px solid ${selected ? "color-mix(in srgb, var(--accent-engineering) 45%, transparent)" : "var(--color-hairline)"}`,
                fontWeight: selected ? 700 : 400,
                transition: "background 160ms ease, border-color 160ms ease",
              }}
            >
              {node.id}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Detail panel ──────────────────────────────────────────────────── */
function DetailPanel({ node, id }: { node: DiagramNode; id: string }) {
  const competency = competencyFor(node);
  const focusAreas = focusAreasFor(node);

  return (
    <div id={id} aria-live="polite">
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.2em",
          color: "var(--text-muted)",
          margin: "0 0 6px",
        }}
      >
        {node.id}
      </p>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(20px, 2.2vw, 26px)",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
          color: "var(--color-text-primary)",
          margin: "0 0 6px",
        }}
      >
        {node.label}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          margin: "0 0 20px",
        }}
      >
        {node.kind === "instrument" ? "Field instrument" : "Process equipment"} · {node.competency}
      </p>

      {focusAreas.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
          {focusAreas.map((area) => (
            <li
              key={area}
              style={{
                display: "flex",
                gap: 10,
                fontSize: 13,
                lineHeight: 1.6,
                color: "var(--text-body)",
                paddingBlock: 4,
              }}
            >
              <span aria-hidden style={{ color: ACCENT_TEXT, flexShrink: 0 }}>—</span>
              {area}
            </li>
          ))}
        </ul>
      )}

      {competency && (
        <div style={{ borderTop: "1px solid var(--color-hairline)", paddingTop: 14 }}>
          {/* Level stays the honest self-assessment from the source data —
              Beginner across the plant-facing competencies. Stating it
              plainly is the point; inflating it would not survive one
              follow-up question. */}
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", margin: "0 0 4px" }}>
            Self-assessed: <span style={{ color: ACCENT_TEXT }}>{competency.level}</span>
          </p>
          <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--text-muted)", margin: 0 }}>
            Evidence — {competency.evidence}. Next step — {competency.nextStep}.
          </p>
        </div>
      )}
    </div>
  );
}

export function ProcessCanvas() {
  const [selectedId, setSelectedId] = useState<string>("TK-101");
  const node = NODE_BY_ID[selectedId];

  const descId = "process-canvas-desc";
  const panelId = "process-canvas-detail";

  return (
    <div
      className="grid grid-cols-1 items-start lg:grid-cols-[1.2fr_1fr]"
      style={{ gap: "clamp(28px, 4vw, 56px)" }}
    >
      <div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            margin: "0 0 18px",
          }}
        >
          Process line — feed to reactor (illustrative)
        </p>
        <p id={descId} className="sr-only">
          A vertical process train runs from feed tank TK-101 through flow control valve
          FCV-101, feed pump P-101, preheat exchanger HX-101, to reactor R-101. Level
          transmitter LT-101 measures TK-101, flow transmitter FT-101 measures P-101,
          temperature transmitter TT-101 measures HX-101, and pressure transmitter PT-101
          measures R-101. Use the tag index below the diagram to read the competency and
          plant exposure behind each tag.
        </p>

        {/* Two layouts, one selection state. The compact layout is a real
            recomposition (narrower spread, larger relative type), not the
            wide one scaled down — at a 327px container the wide layout's
            tag text would render around 5px. display:none also keeps the
            inactive copy out of the accessibility tree. */}
        <div className="hidden lg:block">
          <Canvas layout={WIDE} selectedId={selectedId} onHover={setSelectedId} descId={descId} />
        </div>
        <div className="lg:hidden">
          <Canvas layout={COMPACT} selectedId={selectedId} onHover={setSelectedId} descId={descId} />
        </div>

        <div style={{ marginTop: 22 }}>
          <TagIndex selectedId={selectedId} onSelect={setSelectedId} panelId={panelId} />
        </div>
      </div>

      <DetailPanel node={node} id={panelId} />
    </div>
  );
}
