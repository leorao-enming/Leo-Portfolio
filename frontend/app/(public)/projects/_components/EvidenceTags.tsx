import type { EvidenceLabel } from "./evidence";

/**
 * Inspection-tag annotations: a hairline-ruled label/value stack, closer to
 * a specimen tag than a metrics dashboard. Shared by all three gallery
 * chapters so evidence reads the same way everywhere, while the composition
 * around it stays project-specific.
 *
 * `tone` picks the label colour so this works on cream, titanium, and
 * graphite without each caller restating the palette.
 */
export function EvidenceTags({
  rows,
  tone = "light",
}: {
  rows: EvidenceLabel[];
  tone?: "light" | "dark";
}) {
  if (rows.length === 0) return null;

  const labelColor = tone === "dark" ? "var(--text-on-dark-muted)" : "var(--text-muted)";
  const valueColor = tone === "dark" ? "var(--text-on-dark-body)" : "var(--text-body)";
  const rule = tone === "dark" ? "rgba(255,255,255,0.12)" : "var(--color-hairline)";

  return (
    <dl style={{ margin: 0 }}>
      {rows.map((row) => (
        <div
          key={row.label}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(88px, auto) 1fr",
            gap: "0 16px",
            padding: "8px 0",
            borderTop: `1px solid ${rule}`,
          }}
        >
          <dt
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: labelColor,
              paddingTop: 2,
            }}
          >
            {row.label}
          </dt>
          <dd
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              lineHeight: 1.55,
              color: valueColor,
              margin: 0,
            }}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
