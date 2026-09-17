"use client";

import { HalfLifeSimulator } from "../../_components/HalfLifeSimulator";
import type {
  Project,
  ProjectRegistryDetail,
  ProjectMetric,
  TechTag,
} from "../../_data/projects";

/** A registry project flattened into the shape this card renders. */
export type ProjectCardProps = Project & { registry: ProjectRegistryDetail };

// Inline color rather than the shared .terminal-* classes: those are tuned
// for the dashboard's dark surfaces (pale cyan/amber text) and fail AA on
// this page's light ground. #0369a1/#8a5a00 are the same ink-safe tones
// used throughout the rest of the site's light-mode conversion.
const TONE_COLOR: Record<string, string> = {
  green: "var(--color-accent-ink)",
  cyan: "#0369a1",
  amber: "#8a5a00",
};

// ─── Lock icon SVG (inline, no external dep) ──────────────────────────────────
function LockIcon({ color = "#8a5a00" }: { color?: string }) {
  return (
    <svg
      width="11"
      height="13"
      viewBox="0 0 11 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <rect x="1" y="5.5" width="9" height="7" rx="1" stroke={color} strokeWidth="1.2" />
      <path d="M3 5.5V3.5a2.5 2.5 0 0 1 5 0v2" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="5.5" cy="9" r="1" fill={color} />
    </svg>
  );
}

// ─── Live System card ──────────────────────────────────────────────────────────
function LiveSystemCard({ project }: { project: ProjectCardProps }) {
  const { registry } = project;
  const hasLinks = Boolean(registry.links?.length);
  return (
    <article
      className="group transition-colors duration-300 overflow-hidden"
      style={{
        background: "#fbfaf6",
        border: "1px solid rgba(3,105,161,0.25)",
        borderRadius: "2px",
        borderTop: "2px solid rgba(3,105,161,0.55)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 3px rgba(10,12,15,0.06), 0 0 18px rgba(3,105,161,0.05)",
      }}
    >
      {/* ── Header bar ────────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid rgba(3,105,161,0.12)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>[{project.id}]</span>
          <span className="text-xs tracking-[0.25em] text-[var(--text-muted)]">{project.codename}</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Pulsing live dot */}
          <span className="status-dot status-dot-online" />
          <span
            className="text-xs tracking-widest font-mono px-2 py-0.5"
            style={{
              color: "#0369a1",
              background: "rgba(3,105,161,0.08)",
              border: "1px solid rgba(3,105,161,0.25)",
              textShadow: "0 0 8px rgba(3,105,161,0.4)",
            }}
          >
            LIVE SYSTEM
          </span>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div className="p-5">
        {/* No fontFamily/color override — inherits serif + ink from
            .public-shell h1, matching every other heading on the site. */}
        <h2 className="tracking-tight mb-2" style={{ fontSize: "var(--type-heading-l)", letterSpacing: "-0.025em", lineHeight: 1.15 }}>Technical record</h2>
        <LongDescription text={registry.longDescription} />

        {/* Two-column: stack + metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <TechStackPanel tags={registry.techStack} />
          <MetricsPanel metrics={registry.metrics} />
        </div>

        {/* Architecture */}
        <ArchitecturePanel arch={registry.architecture} />

        {/* Half-Life decay simulator — embedded for the Bio-Metrics live showcase */}
        {project.codename === "HALFLIFE" && <HalfLifeSimulator />}

        {/* ── CTA buttons ─────────────────────────────────────────────────── */}
        {registry.links && registry.links.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-4" style={{ borderTop: "1px solid rgba(3,105,161,0.1)" }}>
            {registry.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                /* Hover lives in CSS so it also fires on keyboard focus and
                   cannot leave a stuck state on touch. */
                className={
                  "text-xs tracking-widest font-mono px-4 py-2 transition-colors duration-150 " +
                  (i === 0
                    ? "bg-[#0369a1] hover:bg-[#04568a] focus-visible:bg-[#04568a] text-white"
                    : "hover:bg-[#0369a1]/10 focus-visible:bg-[#0369a1]/10")
                }
                style={{
                  color: i === 0 ? undefined : "#0369a1",
                  border: i === 0 ? "1px solid #0369a1" : "1px solid rgba(3,105,161,0.3)",
                  borderRadius: "1px",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Tag strip */}
        <TagStrip tags={registry.tags} mt={hasLinks} />
      </div>
    </article>
  );
}

// ─── Architecture Only card ────────────────────────────────────────────────────
function ArchitectureOnlyCard({ project }: { project: ProjectCardProps }) {
  const { registry } = project;
  const hasLinks = Boolean(registry.links?.length);
  /* LQC is the one PARKED project. A cooler, matte, "powered down" header
     is an honest material way to say so, without leaning on another text
     badge — kept to the header only, not the whole card, so this doesn't
     reopen the dark-island problem the rest of the site just fixed. */
  const isLQC = project.slug === "lqc";
  return (
    <article
      className="group transition-colors duration-300 overflow-hidden"
      style={{
        background: "#fbfaf6",
        border: "1px solid rgba(138,90,0,0.18)",
        borderRadius: "2px",
        borderTop: "2px solid rgba(138,90,0,0.35)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 3px rgba(10,12,15,0.06)",
      }}
    >
      {/* ── Header bar ────────────────────────────────────────────────────── */}
      <div
        className={`flex items-center justify-between px-5 py-3${isLQC ? " material-anodized" : ""}`}
        style={{ borderBottom: isLQC ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(138,90,0,0.1)" }}
      >
        <div className="flex items-center gap-3">
          {/* 0.4 measured ~3.6:1 against this dark gradient by hand (the
              contrast script can't check text over a gradient background
              at all) -- 0.65 clears AA at ~7.3:1. */}
          <span className="text-xs font-mono" style={{ color: isLQC ? "rgba(255,255,255,0.65)" : "var(--text-muted)" }}>[{project.id}]</span>
          <span className="text-xs tracking-[0.25em]" style={{ color: isLQC ? "rgba(255,255,255,0.65)" : "var(--text-muted)" }}>{project.codename}</span>
        </div>
        <div className="flex items-center gap-2">
          <LockIcon color={isLQC ? "#f2b84b" : "#8a5a00"} />
          <span
            className="text-xs tracking-widest font-mono px-2 py-0.5"
            style={
              isLQC
                ? {
                    color: "#f2b84b",
                    background: "rgba(242,184,75,0.1)",
                    border: "1px solid rgba(242,184,75,0.3)",
                  }
                : {
                    color: "#8a5a00",
                    background: "rgba(138,90,0,0.06)",
                    border: "1px solid rgba(138,90,0,0.22)",
                  }
            }
          >
            PRIVATE CORE
          </span>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2 gap-4">
          <h2 className="tracking-tight" style={{ fontSize: "var(--type-heading-l)", letterSpacing: "-0.025em", lineHeight: 1.15 }}>Technical record</h2>
          {/* Architecture-only badge */}
          <span
            className="text-xs tracking-wider font-mono whitespace-nowrap px-2 py-0.5 mt-0.5 shrink-0"
            style={{
              color: "var(--text-muted)",
              background: "rgba(10,12,15,0.03)",
              border: "1px solid var(--color-hairline-bright)",
            }}
          >
            ARCHITECTURE ONLY
          </span>
        </div>

        <LongDescription text={registry.longDescription} />

        {/* Two-column: stack + metrics (slightly muted) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <TechStackPanel tags={registry.techStack} muted />
          <MetricsPanel metrics={registry.metrics} muted />
        </div>

        {/* Architecture — shown in full since that's the whole point */}
        <ArchitecturePanel arch={registry.architecture} muted />

        {/* ── Ghost CTA buttons ────────────────────────────────────────────── */}
        {registry.links && registry.links.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-4" style={{ borderTop: "1px solid rgba(138,90,0,0.08)" }}>
            {registry.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-xs tracking-widest font-mono px-4 py-2 transition-colors duration-150"
                style={{
                  color: "var(--text-muted)",
                  background: "transparent",
                  border: i === 0 ? "1px solid var(--color-hairline-bright)" : "1px solid var(--color-hairline)",
                  borderRadius: "1px",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Tag strip */}
        <TagStrip tags={registry.tags} mt={hasLinks} muted />
      </div>
    </article>
  );
}

// ─── Shared sub-components ─────────────────────────────────────────────────────

/** Renders longDescription as one paragraph or several — see the field's doc. */
function LongDescription({ text }: { text: string | readonly string[] }) {
  const paras = typeof text === "string" ? [text] : text;
  return (
    <div className="mb-5">
      {paras.map((para, i) => (
        <p
          key={i}
          className="text-xs leading-relaxed text-[var(--text-muted)]"
          style={{ marginTop: i === 0 ? 0 : "0.9em" }}
        >
          {para}
        </p>
      ))}
    </div>
  );
}

function TechStackPanel({ tags, muted }: { tags: TechTag[]; muted?: boolean }) {
  return (
    <div
      className="p-4"
      style={{
        background: "#f2f1ed",
        border: "1px solid var(--color-hairline)",
        opacity: muted ? 0.75 : 1,
      }}
    >
      <p className="text-xs tracking-[0.2em] mb-3 text-[var(--text-muted)]">TECH STACK</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag.label}
            className="text-xs tracking-wider px-2 py-0.5"
            style={{
              color: TONE_COLOR[tag.tone ?? "green"],
              background:
                tag.tone === "cyan"
                  ? "rgba(3,105,161,0.07)"
                  : tag.tone === "amber"
                  ? "rgba(138,90,0,0.07)"
                  : "rgba(255,122,24,0.05)",
              border:
                tag.tone === "cyan"
                  ? "1px solid rgba(3,105,161,0.2)"
                  : tag.tone === "amber"
                  ? "1px solid rgba(138,90,0,0.2)"
                  : "1px solid rgba(255,122,24,0.18)",
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
        background: "#f2f1ed",
        border: "1px solid var(--color-hairline)",
        opacity: muted ? 0.75 : 1,
      }}
    >
      <p className="text-xs tracking-[0.2em] mb-3 text-[var(--text-muted)]">SYSTEM SPECS</p>
      <div className="space-y-0">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="flex justify-between py-1.5"
            style={{
              borderBottom: i < metrics.length - 1 ? "1px solid var(--color-hairline)" : "none",
            }}
          >
            <span className="text-xs tracking-wider text-[var(--text-muted)]">{m.label}</span>
            <span className="text-xs font-mono" style={{ color: "#0369a1", fontWeight: 500 }}>{m.value}</span>
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
  arch: ProjectRegistryDetail["architecture"];
  muted?: boolean;
}) {
  return (
    <div
      className="p-4 mb-5"
      style={{
        background: "#f2f1ed",
        border: "1px solid var(--color-hairline)",
        opacity: muted ? 0.85 : 1,
      }}
    >
      <p className="text-xs tracking-[0.2em] mb-4 text-[var(--text-muted)]">SYSTEM ARCHITECTURE</p>
      <div
        className="text-xs font-mono text-center py-2 mb-3 tracking-widest text-[var(--text-muted)]"
        style={{ border: "1px solid var(--color-hairline)" }}
      >
        {arch.title}
      </div>
      <div className="space-y-1">
        {arch.layers.map((layer, i) => {
          const toneColor = TONE_COLOR[layer.tone ?? "green"];
          return (
            <div key={i} className="flex items-stretch gap-1">
              <div className="text-xs font-mono w-5 shrink-0 flex items-center justify-center" style={{ color: "var(--text-muted)" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                className="flex-1 px-3 py-2 text-xs font-mono transition-colors duration-200"
                style={{
                  background: "#fbfaf6",
                  border: "1px solid var(--color-hairline)",
                  borderLeftWidth: "2px",
                  borderLeftColor:
                    layer.tone === "cyan"
                      ? "rgba(3,105,161,0.4)"
                      : layer.tone === "amber"
                      ? "rgba(138,90,0,0.4)"
                      : "rgba(255,122,24,0.3)",
                }}
              >
                <span className="tracking-wider" style={{ color: toneColor }}>
                  {layer.label}
                </span>
                {layer.sublabel && (
                  <span className="ml-3 text-[var(--text-muted)]">— {layer.sublabel}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Domain tags, in the site's one tag vocabulary.
 *
 * These used to render as "#IOS #REACT_NATIVE" — a social-media convention
 * that appeared nowhere else and sat on the same page as two other tag
 * treatments (the dot-separated caps in the gallery, the chips in TECH
 * STACK). Three vocabularies for one kind of information reads as three
 * different authors. This is now the gallery's treatment, so the case study
 * and the gallery that links to it label things the same way.
 *
 * Underscores become spaces on the way out: the screaming-snake form is a
 * data-key convention and has no business being visible as prose.
 */
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
      className="flex flex-wrap gap-x-2 gap-y-1.5 pt-3"
      style={{
        borderTop: mt ? "none" : "1px solid var(--color-hairline)",
        marginTop: mt ? "0" : undefined,
        opacity: muted ? 0.6 : 1,
      }}
    >
      {tags.map((tag, i) => (
        <span
          key={tag}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {tag.replace(/_/g, " ")}
          {i < tags.length - 1 ? " ·" : ""}
        </span>
      ))}
    </div>
  );
}

// ─── Public export ─────────────────────────────────────────────────────────────
export function ProjectCard({ project }: { project: ProjectCardProps }) {
  if (project.registry.displayType === "Live System") {
    return <LiveSystemCard project={project} />;
  }
  return <ArchitectureOnlyCard project={project} />;
}
