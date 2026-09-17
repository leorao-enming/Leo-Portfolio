import Link from "next/link";

/**
 * One restrained next step, not a navigation dashboard. Projects and Lab
 * answer different questions — what gets built, versus how it gets tested —
 * so the page ends by naming that distinction and handing the reader over,
 * rather than repeating the site nav (which the header and footer already
 * carry on every page).
 */
export function ContinueToLab() {
  return (
    <section style={{ background: "var(--surface-contact)" }}>
      <div
        className="section-shell"
        style={{ paddingTop: "clamp(56px, 8vw, 96px)", paddingBottom: "clamp(56px, 8vw, 96px)" }}
      >
        <Link
          href="/lab"
          className="group"
          style={{ textDecoration: "none", display: "inline-block", maxWidth: "44ch" }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.24em",
              color: "var(--text-muted)",
              margin: "0 0 16px",
            }}
          >
            03 / NEXT
          </p>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "var(--type-heading-l)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
              margin: "0 0 16px",
            }}
          >
            Continue to Lab
            <span
              className="transition-transform duration-300 group-hover:translate-x-2 inline-block"
              style={{ marginLeft: 12, color: "var(--color-accent-ink)" }}
              aria-hidden
            >
              →
            </span>
          </p>
          <p style={{ fontSize: "var(--type-body-m)", lineHeight: 1.7, color: "var(--text-body)", margin: 0 }}>
            Experiments, validation, and the things still being tested.
          </p>
        </Link>
      </div>
    </section>
  );
}
