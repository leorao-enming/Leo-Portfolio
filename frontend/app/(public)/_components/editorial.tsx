import type { CSSProperties, ReactNode } from "react";

/**
 * Shared editorial primitives.
 *
 * The homepage and /projects were built in one language — full-bleed tonal
 * sections, a mono index line, a serif headline, hairline rules — while
 * /about, /engineering and /lab were still in an earlier one: bordered pill
 * badges, double-bezel cards, sans headlines, a different accent per page.
 * These three pieces are the homepage language extracted, so the inner
 * pages can be rebuilt from the same parts instead of imitating them.
 */

/**
 * The mono index line above a heading ("01 / HALF-LIFE", "PHYSICAL
 * SYSTEMS"). Replaces the bordered pill badges the inner pages used.
 */
export function Eyebrow({
  children,
  tone = "muted",
  as: Tag = "p",
  style,
}: {
  children: ReactNode;
  tone?: "muted" | "accent";
  as?: "p" | "span" | "h2" | "h3" | "h4";
  style?: CSSProperties;
}) {
  return (
    <Tag
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: "0.24em",
        lineHeight: 1.5,
        textTransform: "uppercase",
        color: tone === "accent" ? "var(--color-accent-ink)" : "var(--text-muted)",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Inline, dot-separated metadata — the homepage's tag treatment. Used
 * wherever the inner pages had rows of bordered chips.
 *
 * `label` is the homepage's short uppercase tag line. `prose` is for lists
 * whose items are phrases rather than keywords: eight capabilities in
 * tracked uppercase mono turn into a block nobody reads, so prose drops
 * to the body face.
 */
export function MetaList({
  items,
  variant = "label",
  style,
}: {
  items: readonly string[];
  variant?: "label" | "prose";
  style?: CSSProperties;
}) {
  const prose = variant === "prose";
  return (
    <p
      style={{
        fontFamily: prose ? "var(--font-sans)" : "var(--font-mono)",
        fontSize: prose ? 14 : 12,
        letterSpacing: prose ? "0.01em" : "0.08em",
        lineHeight: 1.8,
        textTransform: prose ? "none" : "uppercase",
        color: prose ? "var(--text-body)" : "var(--text-muted)",
        margin: 0,
        ...style,
      }}
    >
      {items.join(" · ")}
    </p>
  );
}

/**
 * The opening of every standalone page: one index line, one serif
 * statement, one lead paragraph, on its own tonal band. /projects already
 * opened this way; /about, /engineering and /lab now do too, so moving
 * between pages keeps one rhythm instead of switching design systems at
 * the nav.
 *
 * surface-soft so the band reads as distinct from whatever tone the first
 * content section uses (see ProjectsHero's note on the 3/255 seam).
 */
export function PageIntro({
  railLabel,
  eyebrow,
  title,
  lead,
  children,
}: {
  /** Name shown on the margin rail while this band is being read. */
  railLabel: string;
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section id="intro" data-rail-label={railLabel} style={{ background: "var(--surface-soft)" }}>
      <div
        className="section-shell"
        style={{
          paddingTop: "clamp(120px, 16vh, 200px)",
          paddingBottom: "clamp(56px, 8vw, 104px)",
        }}
      >
        <Eyebrow style={{ marginBottom: 24 }}>{eyebrow}</Eyebrow>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 500,
            fontSize: "var(--type-display-l)",
            lineHeight: 0.98,
            letterSpacing: "-0.03em",
            color: "var(--color-text-primary)",
            margin: "0 0 28px",
            maxWidth: "16ch",
          }}
        >
          {title}
        </h1>
        {lead && (
          <p
            style={{
              fontSize: "var(--type-body-l)",
              lineHeight: 1.7,
              color: "var(--text-body)",
              maxWidth: "52ch",
              margin: 0,
            }}
          >
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
