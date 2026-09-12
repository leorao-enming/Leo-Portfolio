// ─────────────────────────────────────────────────────────────────────────────
// Process canvas — node/edge model and geometry.
//
// The previous ProcessSchematicArt placed everything by hand, which produced
// four measurable defects: two instrument circles sat at cx=0 with r=21 (so
// 21 units of each hung outside the viewBox and rendered clipped), the main
// vertical line ran as one segment from y=20 to y=284 straight through all
// five equipment rects, content spanned x=-21..201 inside a 0..320 viewBox
// (70 units left of centre), and one instrument branched from a half-step
// between two rows.
//
// The fix is structural, not nudged pixels: nodes declare geometry, edges
// declare which PORT they leave from and arrive at, and a helper resolves
// ports to coordinates. A process edge can then only ever run between one
// node's bottom edge and the next node's top edge — passing through a box
// interior stops being expressible rather than being something to avoid by
// hand. Layout extents are derived from the nodes (see canvasViewBox below)
// so centring and clipping are computed, never eyeballed.
//
// Topology is illustrative — a generic feed-tank-to-reactor train. It is not
// a representation of any real or confidential plant system. Every instrument
// tag used (LT / FT / TT / PT) is one the internship's own documented focus
// areas name explicitly.
// ─────────────────────────────────────────────────────────────────────────────

import { COMPETENCIES, INTERNSHIP } from "../../../_data/engineering";

export type Port = "top" | "right" | "bottom" | "left";
export type NodeKind = "equipment" | "instrument";

export type DiagramNode = {
  id: string;
  /** Human-readable name, shown in the detail panel rather than on the canvas. */
  label: string;
  kind: NodeKind;
  /** Links to the honest self-assessment in _data/engineering.ts. */
  competency: string;
  /**
   * Verbatim strings from INTERNSHIP.focusAreas. Matched by value at render
   * time and dropped if absent, so this can never display a focus area the
   * source data no longer backs.
   */
  focusAreas: string[];
};

export type DiagramEdge = {
  id: string;
  from: { nodeId: string; port: Port };
  to: { nodeId: string; port: Port };
  style: "process" | "instrument";
};

/* ── Nodes ─────────────────────────────────────────────────────────── */

export const NODES: DiagramNode[] = [
  {
    id: "TK-101",
    label: "Feed tank",
    kind: "equipment",
    competency: "P&ID Reading",
    focusAreas: [
      "P&ID reading and interpretation",
      "Equipment and production line familiarity",
      "Plant inspection rounds",
    ],
  },
  {
    id: "FCV-101",
    label: "Flow control valve",
    kind: "equipment",
    competency: "P&ID Reading",
    focusAreas: [
      "Level, pressure, temperature and flow control",
      "P&ID reading and interpretation",
    ],
  },
  {
    id: "P-101",
    label: "Feed pump",
    kind: "equipment",
    competency: "P&ID Reading",
    focusAreas: [
      "Equipment and production line familiarity",
      "Plant inspection rounds",
    ],
  },
  {
    id: "HX-101",
    label: "Preheat exchanger",
    kind: "equipment",
    competency: "P&ID Reading",
    focusAreas: [
      "Equipment and production line familiarity",
      "Level, pressure, temperature and flow control",
    ],
  },
  {
    id: "R-101",
    label: "Reactor",
    kind: "equipment",
    competency: "P&ID Reading",
    focusAreas: [
      "Equipment and production line familiarity",
      "HSE safety standards",
    ],
  },
  {
    id: "LT-101",
    label: "Level transmitter",
    kind: "instrument",
    competency: "Process Instrumentation",
    focusAreas: [
      "Process instrumentation — PT / TT / LT / FT",
      "Level, pressure, temperature and flow control",
      "DCS and central control room operation",
    ],
  },
  {
    id: "FT-101",
    label: "Flow transmitter",
    kind: "instrument",
    competency: "Process Instrumentation",
    focusAreas: [
      "Process instrumentation — PT / TT / LT / FT",
      "Level, pressure, temperature and flow control",
      "DCS and central control room operation",
    ],
  },
  {
    id: "TT-101",
    label: "Temperature transmitter",
    kind: "instrument",
    competency: "Process Instrumentation",
    focusAreas: [
      "Process instrumentation — PT / TT / LT / FT",
      "Alarm response and handling",
      "DCS and central control room operation",
    ],
  },
  {
    id: "PT-101",
    label: "Pressure transmitter",
    kind: "instrument",
    competency: "Process Instrumentation",
    focusAreas: [
      "Process instrumentation — PT / TT / LT / FT",
      "Alarm response and handling",
      "DCS and central control room operation",
    ],
  },
];

export const NODE_BY_ID: Record<string, DiagramNode> = Object.fromEntries(
  NODES.map((n) => [n.id, n]),
);

/* ── Edges ─────────────────────────────────────────────────────────────
   Process edges always run bottom -> top down the train, so each one
   occupies only the gap between two nodes. Instrument edges leave a side
   port and land on the facing side port of their transmitter, so they
   terminate on both node edges and never cross the train. */

export const EDGES: DiagramEdge[] = [
  { id: "e-tk-fcv", from: { nodeId: "TK-101", port: "bottom" }, to: { nodeId: "FCV-101", port: "top" }, style: "process" },
  { id: "e-fcv-p", from: { nodeId: "FCV-101", port: "bottom" }, to: { nodeId: "P-101", port: "top" }, style: "process" },
  { id: "e-p-hx", from: { nodeId: "P-101", port: "bottom" }, to: { nodeId: "HX-101", port: "top" }, style: "process" },
  { id: "e-hx-r", from: { nodeId: "HX-101", port: "bottom" }, to: { nodeId: "R-101", port: "top" }, style: "process" },

  { id: "e-tk-lt", from: { nodeId: "TK-101", port: "right" }, to: { nodeId: "LT-101", port: "left" }, style: "instrument" },
  { id: "e-hx-tt", from: { nodeId: "HX-101", port: "right" }, to: { nodeId: "TT-101", port: "left" }, style: "instrument" },
  { id: "e-p-ft", from: { nodeId: "P-101", port: "left" }, to: { nodeId: "FT-101", port: "right" }, style: "instrument" },
  { id: "e-r-pt", from: { nodeId: "R-101", port: "left" }, to: { nodeId: "PT-101", port: "right" }, style: "instrument" },
];

/* ── Layout ────────────────────────────────────────────────────────────
   Two layouts, one model. The compact layout is a genuine recomposition
   rather than the desktop one scaled down: at a 327px-wide mobile
   container, the wide layout's 11px tag text would render at ~5px. The
   compact layout narrows the horizontal spread instead, so its user units
   map to ~0.9 device px and the same text stays legible. */

export type Layout = {
  /** Centre line the equipment train sits on. */
  trainX: number;
  rect: { w: number; h: number };
  circleR: number;
  /** Node centre positions, keyed by node id. */
  pos: Record<string, { x: number; y: number }>;
  /** Where the outlet arrow below the last node terminates. */
  outletY: number;
  tagFontSize: number;
  /** Uniform breathing room added around the derived content extents. */
  margin: number;
};

export const WIDE: Layout = (() => {
  const trainX = 380;
  const rowGap = 120;
  const firstRowY = 60;
  const train = ["TK-101", "FCV-101", "P-101", "HX-101", "R-101"];
  const rowY = (i: number) => firstRowY + i * rowGap;

  const pos: Layout["pos"] = {};
  train.forEach((id, i) => { pos[id] = { x: trainX, y: rowY(i) }; });
  // Instruments sit on the row of the node they measure — never on a
  // half-step between two rows, which is what made the old FT branch read
  // as arbitrary. Two right, two left, so the composition stays balanced.
  pos["LT-101"] = { x: 600, y: rowY(0) };
  pos["FT-101"] = { x: 160, y: rowY(2) };
  pos["TT-101"] = { x: 600, y: rowY(3) };
  pos["PT-101"] = { x: 160, y: rowY(4) };

  return {
    trainX,
    rect: { w: 180, h: 64 },
    circleR: 44,
    pos,
    outletY: rowY(4) + 32 + 30,
    tagFontSize: 13,
    margin: 26,
  };
})();

export const COMPACT: Layout = (() => {
  const trainX = 180;
  const rowGap = 100;
  const firstRowY = 50;
  const train = ["TK-101", "FCV-101", "P-101", "HX-101", "R-101"];
  const rowY = (i: number) => firstRowY + i * rowGap;

  const pos: Layout["pos"] = {};
  train.forEach((id, i) => { pos[id] = { x: trainX, y: rowY(i) }; });
  pos["LT-101"] = { x: 300, y: rowY(0) };
  pos["FT-101"] = { x: 60, y: rowY(2) };
  pos["TT-101"] = { x: 300, y: rowY(3) };
  pos["PT-101"] = { x: 60, y: rowY(4) };

  return {
    trainX,
    rect: { w: 150, h: 56 },
    circleR: 34,
    pos,
    outletY: rowY(4) + 28 + 26,
    tagFontSize: 13,
    margin: 16,
  };
})();

/* ── Geometry helpers ──────────────────────────────────────────────── */

/** Half-extent of a node in each axis — the single place shape maps to size. */
export function halfExtent(node: DiagramNode, layout: Layout): { hx: number; hy: number } {
  return node.kind === "equipment"
    ? { hx: layout.rect.w / 2, hy: layout.rect.h / 2 }
    : { hx: layout.circleR, hy: layout.circleR };
}

/**
 * Resolves a port to an absolute point on the node's boundary. Edges are
 * drawn between these, which is what structurally prevents a line from
 * terminating at (or running through) a node's interior.
 */
export function portPoint(nodeId: string, port: Port, layout: Layout): { x: number; y: number } {
  const node = NODE_BY_ID[nodeId];
  const c = layout.pos[nodeId];
  const { hx, hy } = halfExtent(node, layout);
  switch (port) {
    case "top":    return { x: c.x, y: c.y - hy };
    case "bottom": return { x: c.x, y: c.y + hy };
    case "left":   return { x: c.x - hx, y: c.y };
    case "right":  return { x: c.x + hx, y: c.y };
  }
}

/**
 * Derives the viewBox from the union of every node's bounding box plus the
 * outlet arrow, then pads it uniformly. Centring and "nothing is clipped"
 * are therefore properties of the layout rather than hand-tuned constants —
 * the two clipped circles in the old diagram were only possible because its
 * viewBox was a literal.
 */
export function canvasViewBox(layout: Layout): { x: number; y: number; w: number; h: number; str: string } {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const node of NODES) {
    const c = layout.pos[node.id];
    const { hx, hy } = halfExtent(node, layout);
    minX = Math.min(minX, c.x - hx);
    maxX = Math.max(maxX, c.x + hx);
    minY = Math.min(minY, c.y - hy);
    maxY = Math.max(maxY, c.y + hy);
  }
  maxY = Math.max(maxY, layout.outletY);

  const m = layout.margin;
  // Expand the narrower side so the train's centre line is also the
  // viewBox's centre line — side instruments alone would otherwise bias it.
  const leftSpan = layout.trainX - minX;
  const rightSpan = maxX - layout.trainX;
  const halfSpan = Math.max(leftSpan, rightSpan);

  const x = layout.trainX - halfSpan - m;
  const w = (halfSpan + m) * 2;
  const y = minY - m;
  const h = maxY - minY + m * 2;
  return { x, y, w, h, str: `${x} ${y} ${w} ${h}` };
}

/** Edges touching a node — drives the hover/focus path highlight. */
export function edgesForNode(nodeId: string): DiagramEdge[] {
  return EDGES.filter((e) => e.from.nodeId === nodeId || e.to.nodeId === nodeId);
}

/** The competency record backing a node, if the source data still has it. */
export function competencyFor(node: DiagramNode) {
  return COMPETENCIES.find((c) => c.name === node.competency);
}

/** Focus areas filtered to those the source data still lists — see the type. */
export function focusAreasFor(node: DiagramNode): string[] {
  return node.focusAreas.filter((f) => INTERNSHIP.focusAreas.includes(f));
}
