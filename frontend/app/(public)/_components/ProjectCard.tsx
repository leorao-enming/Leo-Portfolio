"use client";

import { HalfLifeSimulator } from "./HalfLifeSimulator";

export type TechTag = {
  label: string;
  tone?: "green" | "cyan" | "amber";
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectCardProps = {
  id: string;
  codename: string;
  title: string;
  status: "ACTIVE" | "STABLE" | "ARCHIVED" | "WIP";
  displayType: "Live System" | "Architecture Only";
  description: string;
  longDescription: string;
  techStack: TechTag[];
  metrics: ProjectMetric[];
  architecture: {
    title: string;
    layers: { label: string; sublabel?: string; tone?: "green" | "cyan" | "amber" }[];
  };
  tags: string[];
  links?: ProjectLink[];
};

const TONE_CLASS: Record<string, string> = {
  green: "terminal-text",
  cyan: "terminal-cyan",
  amber: "terminal-amber",
};

// ─── Lock icon SVG (inline, no external dep) ──────────────────────────────────
function LockIcon() {
  return (
    <svg
      width="11"
      height="13"
      viewBox="0 0 11 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <rect x="1" y="5.5" width="9" height="7" rx="1" stroke="#ffb000" strokeWidth="1.2" />
      <path d="M3 5.5V3.5a2.5 2.5 0 0 1 5 0v2" stroke="#ffb000" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="5.5" cy="9" r="1" fill="#ffb000" />
    </svg>
  );
}

// ─── Live System card ──────────────────────────────────────────────────────────
function LiveSystemCard({ project }: { project: ProjectCardProps }) {
  return (
    <article
      className="group transition-colors duration-300 overflow-hidden"
      style={{
        background: "var(--color-surface-1)",
        border: "1px solid rgba(0,212,255,0.25)",
        borderRadius: "2px",
        borderTop: "2px solid rgba(0,212,255,0.55)",
        boxShadow:
          "inset 0 1px 0 rgba(0,212,255,0.06), 0 1px 3px rgba(0,0,0,0.4), 0 0 18px rgba(0,212,255,0.04)",
      }}
    >
      {/* ── Header bar ────────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid rgba(0,212,255,0.12)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono dim-label">[{project.id}]</span>
          <span className="text-xs tracking-[0.25em] text-zinc-400">{project.codename}</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Pulsing live dot */}
          <span className="status-dot status-dot-online" />
          <span
            className="text-xs tracking-widest font-mono px-2 py-0.5"
            style={{
              color: "#00d4ff",
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.25)",
              textShadow: "0 0 8px rgba(0,212,255,0.4)",
            }}
          >
            LIVE SYSTEM
          </span>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div className="p-5">
        <h2 className="text-base font-bold tracking-wide mb-2 text-white">{project.title}</h2>
        <p className="text-xs leading-relaxed mb-1 text-zinc-300">{project.description}</p>
        <p className="text-xs leading-relaxed mb-5 text-zinc-400">{project.longDescription}</p>

        {/* Two-column: stack + metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <TechStackPanel tags={project.techStack} />
          <MetricsPanel metrics={project.metrics} />
        </div>

        {/* Architecture */}
        <ArchitecturePanel arch={project.architecture} />

        {/* Half-Life decay simulator — embedded for the Bio-Metrics live showcase */}
        {project.id === "P-03" && <HalfLifeSimulator />}

        {/* ── CTA buttons ─────────────────────────────────────────────────── */}
        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-4" style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}>
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-xs tracking-widest font-mono px-4 py-2 transition-colors duration-150"
                style={{
                  background: i === 0 ? "#0891b2" : "transparent",
                  color: i === 0 ? "#ffffff" : "#00d4ff",
                  border: i === 0 ? "1px solid #06b6d4" : "1px solid rgba(0,212,255,0.3)",
                  borderRadius: "1px",
                }}
                onMouseEnter={(e) => {
                  if (i === 0) (e.currentTarget as HTMLAnchorElement).style.background = "#0e7490";
                }}
                onMouseLeave={(e) => {
                  if (i === 0) (e.currentTarget as HTMLAnchorElement).style.background = "#0891b2";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Tag strip */}
        <TagStrip tags={project.tags} mt={project.links && project.links.length > 0} />
      </div>
    </article>
  );
}

// ─── Architecture Only card ────────────────────────────────────────────────────
function ArchitectureOnlyCard({ project }: { project: ProjectCardProps }) {
  return (
    <article
      className="group transition-colors duration-300 overflow-hidden"
      style={{
        background: "var(--color-surface-1)",
        border: "1px solid rgba(255,176,0,0.18)",
        borderRadius: "2px",
        borderTop: "2px solid rgba(255,176,0,0.35)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.03), 0 1px 3px rgba(0,0,0,0.5)",
      }}
    >
      {/* ── Header bar ────────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid rgba(255,176,0,0.1)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono dim-label">[{project.id}]</span>
          <span className="text-xs tracking-[0.25em] text-zinc-500">{project.codename}</span>
        </div>
        <div className="flex items-center gap-2">
          <LockIcon />
          <span
            className="text-xs tracking-widest font-mono px-2 py-0.5"
            style={{
              color: "#ffb000",
              background: "rgba(255,176,0,0.06)",
              border: "1px solid rgba(255,176,0,0.22)",
              textShadow: "0 0 8px rgba(255,176,0,0.3)",
            }}
          >
            PRIVATE CORE
          </span>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2 gap-4">
          <h2 className="text-base font-bold tracking-wide text-zinc-200">{project.title}</h2>
          {/* Architecture-only badge */}
          <span
            className="text-xs tracking-wider font-mono whitespace-nowrap px-2 py-0.5 mt-0.5 shrink-0"
            style={{
              color: "#71717a",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid #3f3f46",
            }}
          >
            ARCHITECTURE ONLY
          </span>
        </div>

        <p className="text-xs leading-relaxed mb-1 text-zinc-400">{project.description}</p>
        <p className="text-xs leading-relaxed mb-5 text-zinc-500">{project.longDescription}</p>

        {/* Two-column: stack + metrics (slightly muted) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <TechStackPanel tags={project.techStack} muted />
          <MetricsPanel metrics={project.metrics} muted />
        </div>

        {/* Architecture — shown in full since that's the whole point */}
        <ArchitecturePanel arch={project.architecture} muted />

        {/* ── Ghost CTA buttons ────────────────────────────────────────────── */}
        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,176,0,0.08)" }}>
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-xs tracking-widest font-mono px-4 py-2 transition-colors duration-150"
                style={{
                  color: i === 0 ? "#a1a1aa" : "#71717a",
                  background: "transparent",
                  border: i === 0 ? "1px solid #52525b" : "1px solid #3f3f46",
                  borderRadius: "1px",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Tag strip */}
        <TagStrip tags={project.tags} mt={project.links && project.links.length > 0} muted />
      </div>
    </article>
  );
}

// ─── Shared sub-components ─────────────────────────────────────────────────────

function TechStackPanel({ tags, muted }: { tags: TechTag[]; muted?: boolean }) {
  return (
    <div
      className="p-4"
      style={{
        background: "var(--color-surface-2)",
        border: "1px solid var(--color-border-dim)",
        opacity: muted ? 0.75 : 1,
      }}
    >
      <p className="text-xs tracking-[0.2em] mb-3 text-zinc-500">TECH STACK</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag.label}
            className={`text-xs tracking-wider px-2 py-0.5 ${TONE_CLASS[tag.tone ?? "green"]}`}
            style={{
              background:
                tag.tone === "cyan"
                  ? "rgba(0,212,255,0.07)"
                  : tag.tone === "amber"
                  ? "rgba(255,176,0,0.07)"
                  : "rgba(0,255,65,0.05)",
              border:
                tag.tone === "cyan"
                  ? "1px solid rgba(0,212,255,0.2)"
                  : tag.tone === "amber"
                  ? "1px solid rgba(255,176,0,0.2)"
                  : "1px solid rgba(0,255,65,0.18)",
            }}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function MetricsPanel({ metrics, muted }: { metrics: ProjectMetric[]; muted?: boolean }) {
  return (
    <div
      className="p-4"
      style={{
        background: "var(--color-surface-2)",
        border: "1px solid var(--color-border-dim)",
        opacity: muted ? 0.75 : 1,
      }}
    >
      <p className="text-xs tracking-[0.2em] mb-3 text-zinc-500">SYSTEM SPECS</p>
      <div className="space-y-0">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="flex justify-between py-1.5"
            style={{
              borderBottom: i < metrics.length - 1 ? "1px solid #1f1f23" : "none",
            }}
          >
            <span className="text-xs tracking-wider text-zinc-400">{m.label}</span>
            <span className="text-xs font-mono tech-accent">{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArchitecturePanel({
  arch,
  muted,
}: {
  arch: ProjectCardProps["architecture"];
  muted?: boolean;
}) {
  return (
    <div
      className="p-4 mb-5"
      style={{
        background: "var(--color-surface-0)",
        border: "1px solid var(--color-border-dim)",
        opacity: muted ? 0.85 : 1,
      }}
    >
      <p className="text-xs tracking-[0.2em] mb-4 text-zinc-500">SYSTEM ARCHITECTURE</p>
      <div
        className="text-xs font-mono text-center py-2 mb-3 tracking-widest text-zinc-400"
        style={{ border: "1px solid var(--color-border-dim)" }}
      >
        {arch.title}
      </div>
      <div className="space-y-1">
        {arch.layers.map((layer, i) => {
          const toneClass = TONE_CLASS[layer.tone ?? "green"];
          return (
            <div key={i} className="flex items-stretch gap-1">
              <div className="text-xs font-mono w-5 shrink-0 flex items-center justify-center dim-label">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                className="flex-1 px-3 py-2 text-xs font-mono transition-colors duration-200"
                style={{
                  background: "var(--color-surface-1)",
                  border: "1px solid var(--color-border-dim)",
                  borderLeftWidth: "2px",
                  borderLeftColor:
                    layer.tone === "cyan"
                      ? "rgba(0,212,255,0.4)"
                      : layer.tone === "amber"
                      ? "rgba(255,176,0,0.4)"
                      : "rgba(0,255,65,0.3)",
                }}
              >
                <span className={`tracking-wider ${toneClass}`} style={{ opacity: 0.9 }}>
                  {layer.label}
                </span>
                {layer.sublabel && (
                  <span className="ml-3 text-zinc-500">— {layer.sublabel}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TagStrip({
  tags,
  mt,
  muted,
}: {
  tags: string[];
  mt?: boolean | null;
  muted?: boolean;
}) {
  return (
    <div
      className="flex flex-wrap gap-x-4 gap-y-1.5 pt-3"
      style={{
        borderTop: mt ? "none" : "1px solid #1f1f23",
        marginTop: mt ? "0" : undefined,
        opacity: muted ? 0.6 : 1,
      }}
    >
      {tags.map((tag) => (
        <span key={tag} className="text-xs tracking-wider text-zinc-600">
          #{tag}
        </span>
      ))}
    </div>
  );
}

// ─── Public export ─────────────────────────────────────────────────────────────
export function ProjectCard({ project }: { project: ProjectCardProps }) {
  if (project.displayType === "Live System") {
    return <LiveSystemCard project={project} />;
  }
  return <ArchitectureOnlyCard project={project} />;
}
