"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { LAB_ENTRIES, LAB_STATUS_TONE, type LabEntry } from "../../_data/lab";

const ease = [0.16, 1, 0.3, 1] as const;
const ACCENT = "#74d7ff";
// Darkened for AA text contrast on the light ground — the pale ACCENT
// above stays for borders/fills, which don't carry that requirement.
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
      <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: color, opacity: status === "QUEUED" ? 0.5 : 1 }} />
      {status}
    </span>
  );
}

export function LabTeaser() {
  const reduced = useReducedMotion();

  return (
    <section
      id="lab"
      className="section-shell"
    >
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduced ? 0 : 0.7, ease }}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: "clamp(28px, 4vw, 40px)" }}
      >
        <h2
          style={{
            fontSize: "clamp(26px, 3.6vw, 42px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.12,
            color: "var(--color-text-primary)",
            margin: 0,
          }}
        >
          What I&apos;m building next.
        </h2>

        <Link
          href="/lab"
          className="group"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 16px",
            borderRadius: "9999px",
            border: `1px solid ${ACCENT}33`,
            background: `${ACCENT}0d`,
            fontFamily: "var(--font-display)",
            fontSize: 12,
            letterSpacing: "0.02em",
            color: ACCENT_TEXT,
            whiteSpace: "nowrap",
          }}
        >
          View build queue
          <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>→</span>
        </Link>
      </motion.div>

      {/* Full-width numbered index — differs from Engineering's two-column
          split above it, so the two sections don't read as the same
          layout repeated twice. */}
      <div>
        {LAB_ENTRIES.map((entry, i) => (
          <motion.div
            key={entry.id}
            className="index-row"
            initial={{ opacity: 0, x: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : i * 0.06, ease }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              padding: "18px 4px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, minWidth: 0 }}>
              <span style={{ fontSize: 13, letterSpacing: "0.1em", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                {entry.id}
              </span>
              <span style={{ fontSize: "clamp(15px, 1.4vw, 17px)", color: "rgba(10, 12, 15,0.8)", fontWeight: 500 }}>
                {entry.title}
              </span>
            </div>
            <StatusPill status={entry.status} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
