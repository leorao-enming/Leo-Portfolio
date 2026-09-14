// ─────────────────────────────────────────────────────────────────────────────
// Case-study visual identity, keyed by slug.
//
// Art direction only — every FACT on the page still comes from
// _data/projects.ts. This file decides how a project looks, never what it
// claims, which is the same content/art-direction split the /projects
// gallery uses.
//
// Only the two flagships that already earned an identity in the gallery
// (Half-Life's cream/burgundy, LeoLogic OS's graphite/blue) carry one here;
// carrying it through is the whole point, so a reader who clicks "Open case
// study" lands somewhere that looks like where they came from. Everything
// else gets NEUTRAL deliberately — inventing a surface and a statement for
// a project that has never had one would be decoration pretending to be
// identity, and LQC in particular already says "parked" through the
// anodized header ProjectCard gives it.
//
// All values are existing V2 tokens. No new colours are introduced.
// ─────────────────────────────────────────────────────────────────────────────

export type CaseStudyIdentity = {
  /** Hero surface. */
  surface: string;
  /** Accent for the eyebrow, statement line, and rules. */
  accent: string;
  /** Heading / body / muted colours for this surface. */
  text: { strong: string; body: string; muted: string };
  /** Hairline that reads correctly on this surface. */
  rule: string;
  /**
   * The large editorial line under the title, carried over from the
   * gallery chapter. Omitted for projects without one — nothing is
   * invented to fill the slot.
   */
  statement?: string;
};

const LIGHT_TEXT = {
  strong: "var(--color-text-primary)",
  body: "var(--text-body)",
  muted: "var(--text-muted)",
};

const DARK_TEXT = {
  strong: "var(--text-on-dark-strong)",
  body: "var(--text-on-dark-body)",
  muted: "var(--text-on-dark-muted)",
};

const NEUTRAL: CaseStudyIdentity = {
  surface: "var(--surface-base)",
  accent: "var(--color-accent-ink)",
  text: LIGHT_TEXT,
  rule: "var(--color-hairline)",
};

const IDENTITIES: Record<string, CaseStudyIdentity> = {
  "half-life": {
    surface: "var(--surface-half-life)",
    accent: "var(--accent-half-life)",
    text: LIGHT_TEXT,
    rule: "var(--color-hairline)",
    statement: "What remains?",
  },
  "leologic-os": {
    surface: "var(--surface-leologic)",
    accent: "var(--accent-leologic)",
    text: DARK_TEXT,
    rule: "rgba(255,255,255,0.14)",
    statement: "Systems for one.",
  },
};

export function identityFor(slug: string): CaseStudyIdentity {
  return IDENTITIES[slug] ?? NEUTRAL;
}
