"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  LAB_DISCLOSURE,
  LAB_ENTRIES,
  LAB_STATUS_TONE,
  type LabEntry,
} from "../../_data/lab";
import { FabTwinSpcArt } from "./FabTwinSpcArt";

const ease = [0.16, 1, 0.3, 1] as const;
// Darkened for AA text contrast on the light ground.
const ACCENT_TEXT = "#0369a1";

function StatusPill({ status }: { status: LabEntry["status"] }) {
  const color = LAB_STATUS_TONE[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
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
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: color,
          opacity: status === "QUEUED" ? 0.5 : 1,
        }}
      />
      {status}
    </span>
  );
}

function LabCard({ entry, index, reduced }: { entry: LabEntry; index: number; reduced: boolean | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : index * 0.1, ease }}
    >
      <div className="bezel-outer" style={{ height: "100%" }}>
        <div
          className="bezel-inner"
          style={{
            padding: "clamp(24px, 3.5vw, 34px)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontSize: 12,
                letterSpacing: "0.2em",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              [{entry.id}]
            </span>
            <StatusPill status={entry.status} />
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--type-heading-m)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "var(--color-text-primary)",
              marginBottom: 6,
            }}
          >
            {entry.title}
          </h2>
          <p
            style={{
              fontSize: 11,
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              lineHeight: 1.6,
              marginBottom: 18,
            }}
          >
            {entry.upstream}
          </p>

          <div style={{ marginBottom: 20 }}>
            {(typeof entry.objective === "string" ? [entry.objective] : entry.objective).map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: "var(--type-body-s)",
                  color: "var(--text-body)",
                  lineHeight: 1.7,
                  marginTop: i === 0 ? 0 : "0.9em",
                  marginBottom: 0,
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {entry.id === "L-03" && <FabTwinSpcArt />}

          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.22em",
              color: "var(--text-muted)",
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              marginBottom: 10,
              marginTop: entry.id === "L-03" ? 24 : 0,
            }}
          >
            Capabilities targeted
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 8px", marginBottom: 20 }}>
            {entry.capabilities.map((c) => (
              <span
                key={c}
                style={{
                  padding: "4px 10px",
                  borderRadius: 4,
                  background: "rgba(10, 12, 15,0.035)",
                  border: "1px solid rgba(10, 12, 15,0.07)",
                  fontSize: 11,
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {c}
              </span>
            ))}
          </div>

          <div
            style={{
              marginTop: "auto",
              paddingTop: 16,
              borderTop: "1px solid rgba(10, 12, 15,0.055)",
            }}
          >
            <p
              style={{
                fontSize: 12,
                letterSpacing: "0.22em",
                color: "var(--text-muted)",
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Why it transfers
            </p>
            <p
              style={{
                fontSize: 12,
                color: ACCENT_TEXT,
                fontFamily: "var(--font-mono)",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {entry.transfer}
            </p>
          </div>

          {entry.evidence && (
            <p
              style={{
                marginTop: 14,
                fontSize: 11,
                color: "var(--color-accent-ink)",
                fontFamily: "var(--font-mono)",
                lineHeight: 1.6,
              }}
            >
              {entry.evidence}
            </p>
          )}

          {entry.links && entry.links.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
              {entry.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target"
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function LabSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="lab"
      className="section-shell material-graphpaper"
    >
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduced ? 0 : 0.7, ease }}
        style={{ marginBottom: "clamp(40px, 6vw, 64px)" }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: "9999px",
            border: "1px solid rgba(10, 12, 15,0.1)",
            fontSize: 12,
            letterSpacing: "0.24em",
            color: "var(--text-muted)",
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Lab — Build Queue
        </span>
        <h1
          style={{
            fontSize: "var(--type-heading-l)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--color-text-primary)",
            margin: "0 0 18px",
          }}
        >
          What I&apos;m building next.
        </h1>
        <p
          style={{
            fontSize: "var(--type-body-m)",
            color: "var(--text-body)",
            lineHeight: 1.7,
            maxWidth: "58ch",
            margin: 0,
          }}
        >
          Open-source systems I intend to rebuild from source rather than read about.
          Each one is chosen for a specific capability it forces me to learn — and each
          of those capabilities points back at automated process control.
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gap: "clamp(16px, 2vw, 24px)",
        }}
        className="grid-cols-1 md:grid-cols-2"
      >
        {LAB_ENTRIES.map((entry, i) => (
          <LabCard key={entry.id} entry={entry} index={i} reduced={reduced} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.2, ease }}
        style={{
          marginTop: "clamp(24px, 3vw, 36px)",
          fontSize: 12,
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          lineHeight: 1.7,
          maxWidth: "62ch",
        }}
      >
        {LAB_DISCLOSURE}
      </motion.p>
    </section>
  );
}
