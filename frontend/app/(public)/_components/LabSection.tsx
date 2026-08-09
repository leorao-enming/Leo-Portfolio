"use client";

import { motion, useReducedMotion } from "motion/react";
import { TiltCard } from "./TiltCard";
import {
  LAB_DISCLOSURE,
  LAB_ENTRIES,
  LAB_STATUS_TONE,
  type LabEntry,
} from "../../_data/lab";

const ease = [0.16, 1, 0.3, 1] as const;
const ACCENT = "#74d7ff";

function StatusPill({ status }: { status: LabEntry["status"] }) {
  const color = LAB_STATUS_TONE[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 10,
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
      <TiltCard intensity={5} className="bezel-outer" style={{ height: "100%" }}>
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
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.26)",
                fontFamily: "var(--font-mono)",
              }}
            >
              [{entry.id}]
            </span>
            <StatusPill status={entry.status} />
          </div>

          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(18px, 2.2vw, 24px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "var(--color-text-primary)",
              marginBottom: 6,
            }}
          >
            {entry.title}
          </h3>
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
              fontFamily: "var(--font-mono)",
              lineHeight: 1.6,
              marginBottom: 18,
            }}
          >
            {entry.upstream}
          </p>

          <p
            style={{
              fontSize: "clamp(13px, 1.1vw, 15px)",
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            {entry.objective}
          </p>

          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              marginBottom: 10,
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
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.5)",
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
              borderTop: "1px solid rgba(255,255,255,0.055)",
            }}
          >
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.3)",
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
                color: ACCENT,
                opacity: 0.75,
                fontFamily: "var(--font-mono)",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {entry.transfer}
            </p>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function LabSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="lab"
      style={{
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)",
        maxWidth: "1280px",
        margin: "0 auto",
        width: "100%",
      }}
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
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: 10,
            letterSpacing: "0.24em",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Lab — Build Queue
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--color-text-primary)",
            margin: "0 0 18px",
          }}
        >
          What I&apos;m building next.
        </h2>
        <p
          style={{
            fontSize: "clamp(14px, 1.2vw, 16px)",
            color: "rgba(255,255,255,0.45)",
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
          gridTemplateColumns: "1fr",
          gap: "clamp(16px, 2vw, 24px)",
        }}
        className="md:grid-cols-2"
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
          color: "rgba(255,255,255,0.3)",
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
