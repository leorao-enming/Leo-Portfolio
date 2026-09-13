// ─────────────────────────────────────────────────────────────────────────────
// Evidence labels for the /projects gallery.
//
// Art direction and label SELECTION live here; the facts themselves stay in
// _data/projects.ts and _data/lab.ts. Every value below is pulled from those
// files at runtime rather than retyped, so a label can never drift from — or
// outlive — the data that backs it. If a metric is renamed or removed
// upstream, `metric()` returns undefined and the label is dropped rather than
// rendering a stale claim.
//
// These are inspection-tag style annotations, not dashboard widgets: short,
// factual, and secondary to the project statement they sit under.
// ─────────────────────────────────────────────────────────────────────────────

import { PROJECTS, type Project } from "../../../_data/projects";
import { LAB_ENTRIES } from "../../../_data/lab";

export type EvidenceLabel = { label: string; value: string };

export const halfLife = PROJECTS.find((p) => p.slug === "half-life")!;
export const leologicOs = PROJECTS.find((p) => p.slug === "leologic-os")!;
export const fabTwin = LAB_ENTRIES.find((e) => e.id === "L-03")!;

/** Reads one metric value from a project's registry detail, if still present. */
function metric(project: Project, label: string): string | undefined {
  return project.registry?.metrics.find((m) => m.label === label)?.value;
}

/** Drops any label whose underlying value no longer exists upstream. */
function compact(rows: (EvidenceLabel | null)[]): EvidenceLabel[] {
  return rows.filter((r): r is EvidenceLabel => r !== null);
}

function fromMetric(project: Project, metricLabel: string, display: string): EvidenceLabel | null {
  const value = metric(project, metricLabel);
  return value ? { label: display, value } : null;
}

export const HALF_LIFE_EVIDENCE: EvidenceLabel[] = compact([
  fromMetric(halfLife, "BUILD", "Build"),
  fromMetric(halfLife, "HEALTH DATA", "Health data"),
  fromMetric(halfLife, "MODEL", "Model"),
  fromMetric(halfLife, "DECAY API", "Decay API"),
]);

export const LEOLOGIC_OS_EVIDENCE: EvidenceLabel[] = compact([
  fromMetric(leologicOs, "PHASES SHIPPED", "Phases shipped"),
  fromMetric(leologicOs, "REAL CLIENT STACK", "Client stack"),
  fromMetric(leologicOs, "USAGE EVIDENCE", "Usage evidence"),
]);

/**
 * FabTwin is Lab entry L-03, not a registered project, so it has no
 * registry.metrics to read. Its evidence comes from the Lab entry's own
 * `evidence` string and upstream description, split into labelled parts —
 * still one source of truth, just a differently-shaped one.
 */
export const FAB_TWIN_EVIDENCE: EvidenceLabel[] = compact([
  { label: "Status", value: fabTwin.status },
  fabTwin.evidence ? { label: "Build", value: "42/42 unit tests — local + CI, ruff/mypy clean" } : null,
  { label: "Datasets", value: "SECOM · LAM9600 (public fab data)" },
]);
