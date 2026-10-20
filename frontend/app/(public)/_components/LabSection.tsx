"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  LAB_DISCLOSURE,
  LAB_ENTRIES,
  LAB_STATUS_TONE,
  type LabEntry,
} from "../../_data/lab";
import { Eyebrow, MetaList, PageIntro } from "./editorial";
import { reveal } from "./motion";
import { FabTwinSpcArt } from "./FabTwinSpcArt";

function StatusMark({ status }: { status: LabEntry["status"] }) {
  const color = LAB_STATUS_TONE[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 12,
        letterSpacing: "0.2em",
        color,
        fontFamily: "var(--font-mono)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: status === "QUEUED" ? "transparent" : color,
          border: `1px solid ${color}`,
        }}
      />
      {status}
    </span>
  );
}

/** Entry id, status, title and upstream — the line every entry opens with. */
function EntryHead({ entry }: { entry: LabEntry }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <span style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          {entry.id}
        </span>
        <StatusMark status={entry.status} />
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--type-heading-m)",
          fontWeight: 600,
          letterSpacing: "-0.015em",
          lineHeight: 1.2,
          color: "var(--color-text-primary)",
          margin: "0 0 8px",
        }}
      >
        {entry.title}
      </h3>
      <p style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "var(--font-mono)", lineHeight: 1.6, margin: "0 0 20px" }}>
        {entry.upstream}
      </p>
    </>
  );
}

function Objective({ entry }: { entry: LabEntry }) {
  return (
    <div>
      {(typeof entry.objective === "string" ? [entry.objective] : entry.objective).map((para, i) => (
        <p
          key={i}
          style={{
            fontSize: "var(--type-body-m)",
            color: "var(--text-body)",
            lineHeight: 1.75,
            maxWidth: "60ch",
            margin: i === 0 ? 0 : "0.9em 0 0",
          }}
        >
          {para}
        </p>
      ))}
    </div>
  );
}

/** Capabilities, transfer note, evidence and repo links. */
function EntryFacts({ entry }: { entry: LabEntry }) {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div>
        <Eyebrow as="h4" style={{ marginBottom: 8 }}>Capabilities targeted</Eyebrow>
        <MetaList items={entry.capabilities} variant="prose" />
      </div>
      <div style={{ borderTop: "1px solid var(--color-hairline)", paddingTop: 16 }}>
        <Eyebrow as="h4" style={{ marginBottom: 8 }}>Why it transfers</Eyebrow>
        <p style={{ fontSize: "var(--type-body-s)", color: "var(--text-body)", lineHeight: 1.7, margin: 0 }}>
          {entry.transfer}
        </p>
      </div>
      {entry.evidence && (
        <p
          style={{
            fontSize: 13,
            color: "var(--color-accent-ink)",
            fontFamily: "var(--font-mono)",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {entry.evidence}
        </p>
      )}
      {entry.links && entry.links.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0 18px" }}>
          {entry.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target"
              style={{
                fontSize: 13,
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-mono)",
                textDecoration: "underline",
                textDecorationColor: "var(--color-hairline-bright)",
                textUnderlineOffset: 4,
              }}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * The in-progress build gets the full width: text on one side, its chart and
 * evidence on the other. In the old two-column card grid it sat alone in the
 * left column at three times the height of the queued cards beside it,
 * leaving a hole the size of a card on the right.
 */
function FeaturedEntry({ entry, reduced }: { entry: LabEntry; reduced: boolean | null }) {
  return (
    <motion.article
      {...reveal(reduced)}
      className="grid grid-cols-1 lg:grid-cols-2"
      style={{ gap: "clamp(28px, 5vw, 72px)", borderTop: "1px solid var(--color-hairline-bright)", paddingTop: "clamp(24px, 3vw, 36px)" }}
    >
      <div>
        <EntryHead entry={entry} />
        <Objective entry={entry} />
      </div>
      <div style={{ display: "grid", gap: 28, alignContent: "start" }}>
        {entry.id === "L-03" && <FabTwinSpcArt />}
        <EntryFacts entry={entry} />
      </div>
    </motion.article>
  );
}

function QueuedEntry({ entry, index, reduced }: { entry: LabEntry; index: number; reduced: boolean | null }) {
  return (
    <motion.article
      {...reveal(reduced, index)}
      style={{ borderTop: "1px solid var(--color-hairline-bright)", paddingTop: "clamp(24px, 3vw, 36px)", display: "grid", gap: 24, alignContent: "start" }}
    >
      <div>
        <EntryHead entry={entry} />
        <Objective entry={entry} />
      </div>
      <EntryFacts entry={entry} />
    </motion.article>
  );
}

export function LabSection() {
  const reduced = useReducedMotion();
  const active = LAB_ENTRIES.filter((e) => e.status !== "QUEUED");
  const queued = LAB_ENTRIES.filter((e) => e.status === "QUEUED");

  return (
    <>
      <PageIntro
        railLabel="Lab"
        eyebrow="Lab — build queue"
        title="What I'm building next."
        lead="Open-source systems I intend to rebuild from source rather than read about. Each one is chosen for a specific capability it forces me to learn — and each of those capabilities points back at automated process control."
      />

      <section
        id="lab"
        className="material-graphpaper"
        style={{ backgroundColor: "var(--surface-base)" }}
      >
        <div className="section-shell" style={{ display: "grid", gap: "clamp(56px, 8vw, 104px)" }}>
          {active.length > 0 && (
            <div>
              <Eyebrow as="h2" tone="accent" style={{ marginBottom: 20 }}>
                In progress — {active.length}
              </Eyebrow>
              <div style={{ display: "grid", gap: "clamp(48px, 6vw, 80px)" }}>
                {active.map((entry) => (
                  <FeaturedEntry key={entry.id} entry={entry} reduced={reduced} />
                ))}
              </div>
            </div>
          )}

          {queued.length > 0 && (
            <div>
              <Eyebrow as="h2" style={{ marginBottom: 20 }}>
                Queued — {queued.length}
              </Eyebrow>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(40px, 5vw, 72px)" }}>
                {queued.map((entry, i) => (
                  <QueuedEntry key={entry.id} entry={entry} index={i} reduced={reduced} />
                ))}
              </div>
            </div>
          )}

          <motion.p
            {...reveal(reduced)}
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              lineHeight: 1.7,
              maxWidth: "62ch",
              margin: 0,
            }}
          >
            {LAB_DISCLOSURE}
          </motion.p>
        </div>
      </section>
    </>
  );
}
