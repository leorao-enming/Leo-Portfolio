import type { Metadata } from "next";
import { ProjectCard } from "../_components/ProjectCard";
import { REGISTRY_PROJECTS } from "../../_data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Technical project portfolio: quant systems, an evidence-grounded AI drawing assistant, and " +
    "local-first mobile apps, each documented at the same evidence standard as the code itself.",
};

const LIVE_COUNT = REGISTRY_PROJECTS.filter(
  (p) => p.registry.displayType === "Live System",
).length;
const ARCH_COUNT = REGISTRY_PROJECTS.filter(
  (p) => p.registry.displayType === "Architecture Only",
).length;

export default function ProjectsPage() {
  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "clamp(96px, 12vw, 140px) clamp(24px, 5vw, 64px) clamp(64px, 8vw, 96px)",
      }}
    >
      {/* ── Page header ─────────────────────────────────────────── */}
      <header className="mb-14">
        <p className="text-xs tracking-[0.35em] mb-5" style={{ color: "#8a8a90" }}>
          PROJECT REGISTRY — {REGISTRY_PROJECTS.length} ENTRIES
        </p>
        <h1
          className="font-bold tracking-tight leading-none mb-5"
          style={{ fontSize: "clamp(1.8rem, 6vw, 3.5rem)", color: "#e0e0e0" }}
        >
          TECHNICAL
          <br />
          <span className="terminal-text">PROJECTS</span>
        </h1>
        <div
          className="h-px w-full mb-6"
          style={{
            background:
              "linear-gradient(to right, var(--color-terminal-green), rgba(0,212,255,0.3), transparent)",
          }}
        />
        <p className="text-xs leading-relaxed max-w-2xl" style={{ color: "#9a9aa0" }}>
          Each system below is an active build or architectural design. Live System entries are
          connected to real APIs and can be interacted with directly. Architecture Only entries
          are proprietary or conceptual — source is restricted, but the full execution stack
          is documented here.
        </p>

        {/* ── Legend ──────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-5 mt-6">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono px-2 py-0.5"
              style={{
                color: "#00d4ff",
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.25)",
              }}
            >
              LIVE SYSTEM
            </span>
            <span className="text-xs text-zinc-400">{LIVE_COUNT} active</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono px-2 py-0.5"
              style={{
                color: "#ffb000",
                background: "rgba(255,176,0,0.06)",
                border: "1px solid rgba(255,176,0,0.22)",
              }}
            >
              PRIVATE CORE
            </span>
            <span className="text-xs text-zinc-400">{ARCH_COUNT} restricted</span>
          </div>
        </div>
      </header>

      {/* ── Project cards ───────────────────────────────────────── */}
      <div className="flex flex-col gap-8">
        {REGISTRY_PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* ── Footer note ─────────────────────────────────────────── */}
      <div className="mt-20 pt-8" style={{ borderTop: "1px solid #111" }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs" style={{ color: "#8a8a90" }}>
            <span style={{ color: "#8a8a90" }}>leologic@sys</span>
            <span style={{ color: "#8a8a90" }}> ~/projects </span>
            <span className="cursor-blink" />
          </p>
          <p className="text-xs tracking-wider" style={{ color: "#8a8a90" }}>
            {REGISTRY_PROJECTS.length} REGISTERED · {LIVE_COUNT} LIVE · {ARCH_COUNT} PRIVATE
          </p>
        </div>
      </div>
    </div>
  );
}
