import type { Metadata } from "next";
import { ProjectIndexCard } from "../_components/ProjectIndexCard";
import { REGISTRY_PROJECTS } from "../../_data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Technical project portfolio: an evidence-grounded AI drawing assistant, local-first " +
    "mobile apps, a parked quant console, and a personal operating system — each documented " +
    "at the same evidence standard as the code itself.",
};

const LIVE_COUNT = REGISTRY_PROJECTS.filter(
  (p) => p.registry.displayType === "Live System",
).length;
const ARCH_COUNT = REGISTRY_PROJECTS.filter(
  (p) => p.registry.displayType === "Architecture Only",
).length;

export default function ProjectsPage() {
  return (
    <div className="page-shell">
      <header style={{ marginBottom: "clamp(32px, 5vw, 56px)" }}>
        <p
          className="text-xs tracking-[0.35em] font-mono"
          style={{ color: "var(--text-muted)", marginBottom: 16 }}
        >
          PROJECT REGISTRY — {REGISTRY_PROJECTS.length} ENTRIES
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5.5vw, 64px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--color-text-primary)",
            margin: "0 0 18px",
          }}
        >
          Technical projects
        </h1>
        <p
          style={{
            fontSize: "clamp(14px, 1.2vw, 16px)",
            lineHeight: 1.7,
            color: "var(--text-body)",
            maxWidth: "62ch",
          }}
        >
          Live System entries are connected to real APIs and can be interacted with
          directly. Architecture Only entries are private or conceptual — the source is
          restricted, but the execution stack is documented in full. Open any entry for
          the architecture, the specs, and what has and has not been verified.
        </p>

        <div className="flex flex-wrap gap-5 mt-6">
          <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
            <span style={{ color: "#00d4ff" }}>●</span> {LIVE_COUNT} live
          </span>
          <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
            <span style={{ color: "#ffb000" }}>●</span> {ARCH_COUNT} architecture only
          </span>
        </div>
      </header>

      <div className="flex flex-col gap-4">
        {REGISTRY_PROJECTS.map((project) => (
          <ProjectIndexCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
