"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── System topology ───────────────────────────────────────────────
 * The brief's own diagram, drawn once and left alone — no animated
 * nodes, the visual weight comes from spacing and the branch/converge
 * shape itself (one root, three domains, one agent layer, one memory
 * layer), not from decoration on top of it. */
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

function Topology() {
  const life = byId("LIFE");
  const health = byId("HEALTH");
  const projects = byId("PROJECTS");
  const career = byId("CAREER");
  const agents = byId("AGENTS");
  const memory = byId("MEMORY");

  return (
    <svg
      viewBox="0 0 400 420"
      style={{ width: "100%", maxWidth: 420, height: "auto", display: "block", margin: "0 auto" }}
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
              fontSize="11"
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

const TAGS = ["Agent workflows", "Automation", "Personal systems"];

export function LeoLogicOsShowcase() {
  const reduced = useReducedMotion();

  return (
    <section style={{ background: "var(--surface-leologic)" }}>
      {/* Columns in className only, same reason as the other two
          showcases. Topology left / text right on desktop (the order
          classes below flip it), vertical topology under the text on
          mobile. */}
      <div
        className="section-shell grid grid-cols-1 items-center lg:grid-cols-[1fr_1fr]"
        style={{
          gap: "clamp(40px, 6vw, 80px)",
          paddingTop: "clamp(80px, 11vw, 130px)",
          paddingBottom: "clamp(80px, 11vw, 130px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduced ? 0 : 0.7, ease }}
          /* order lives only in className — an inline order would always
             beat the responsive class regardless of breakpoint, the same
             bug already fixed once in Hero.tsx. */
          className="order-2 lg:order-1"
        >
          <Topology />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.1, ease }}
          className="order-1 lg:order-2"
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.24em",
              color: "var(--accent-leologic)",
              margin: "0 0 20px",
            }}
          >
            03 / LEOLOGIC OS
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(44px, 7vw, 92px)",
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "var(--text-on-dark-strong)",
              margin: "0 0 24px",
            }}
          >
            <span style={{ display: "block" }}>Systems</span>
            <span style={{ display: "block", color: "var(--accent-leologic)" }}>for one.</span>
          </h2>
          <p
            style={{
              fontSize: "clamp(14px, 1.2vw, 16px)",
              lineHeight: 1.7,
              color: "var(--text-on-dark-body)",
              maxWidth: "44ch",
              margin: "0 0 24px",
            }}
          >
            A personal operating system for tasks, priorities, and agent workflows —
            with Obsidian as the knowledge layer beside it, not duplicated inside it.
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
                  color: "var(--text-on-dark-muted)",
                }}
              >
                {tag}{tag !== TAGS[TAGS.length - 1] ? " ·" : ""}
              </span>
            ))}
          </div>
          <Link
            href="/projects/leologic-os"
            className="group"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-display)",
              fontSize: 14,
              color: "var(--accent-leologic)",
              textDecoration: "none",
            }}
          >
            Explore LeoLogic OS
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
