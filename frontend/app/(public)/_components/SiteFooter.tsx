import Link from "next/link";

/**
 * Site-wide footer.
 *
 * Before this, four of the five public pages dead-ended: the only
 * footer-like element lived inside ContactSection and so existed on the
 * landing page alone, carrying two strings and no links at all. It also
 * replaces the three inconsistent "← LEOLOGIC.ORG" back-links, and gives
 * /projects — which previously had no way back from its body — a route out.
 *
 * A server component on purpose: it is static markup and has no reason to
 * ship JavaScript.
 */

const NAV = [
  { label: "Projects", href: "/projects" },
  { label: "Engineering", href: "/engineering" },
  { label: "Lab", href: "/lab" },
  { label: "About", href: "/about" },
];

const ELSEWHERE = [
  { label: "Email", href: "mailto:leorao2004@gmail.com" },
  { label: "GitHub", href: "https://github.com/leo-rao" },
  { label: "LinkedIn", href: "https://linkedin.com/in/leo-rao" },
];

const colHeading: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  fontFamily: "var(--font-mono)",
  marginBottom: 14,
};

/* 32px tall on a mouse. The `touch-target` class that every consumer of
   this style also carries lifts it to 44 under a coarse pointer, so the
   footer stays a tight index on desktop and a comfortable one on a phone. */
const linkStyle: React.CSSProperties = {
  /* display and min-height come from .touch-target — an inline `display:
     block` here would beat the class and leave the taller coarse-pointer
     target with its label stuck at the top of the box. */
  fontSize: 13,
  lineHeight: 1.4,
  color: "var(--text-body)",
  textDecoration: "none",
  paddingBlock: 7,
};

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-hairline)",
        marginTop: "clamp(48px, 8vw, 96px)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "clamp(40px, 6vw, 72px) var(--section-px) clamp(28px, 4vw, 44px)",
          display: "grid",
          gap: "clamp(28px, 4vw, 56px)",
        }}
        className="sm:grid-cols-[1.4fr_1fr_1fr]"
      >
        {/* Identity */}
        <div>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              minHeight: 24, /* WCAG 2.5.8 minimum target */
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: "-0.01em",
              color: "var(--color-accent-ink)",
              textDecoration: "none",
            }}
          >
            LeoLogic
          </Link>
          <p
            style={{
              marginTop: 10,
              fontSize: 13,
              lineHeight: 1.65,
              color: "var(--text-muted)",
              maxWidth: "34ch",
            }}
          >
            Leo Rao — chemical engineering at the University of Toronto, and the
            software built to measure it.
          </p>
        </div>

        {/* Site nav */}
        <nav aria-label="Footer">
          <h2 style={colHeading}>Sections</h2>
          {NAV.map(({ label, href }) => (
            <Link key={href} href={href} style={linkStyle} className="touch-target hover:underline">
              {label}
            </Link>
          ))}
        </nav>

        {/* Contact */}
        <div>
          <h2 style={colHeading}>Elsewhere</h2>
          {ELSEWHERE.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={linkStyle}
              className="touch-target hover:underline"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Baseline strip */}
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 var(--section-px) clamp(32px, 5vw, 56px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          LeoLogic © {new Date().getFullYear()}
        </span>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          Content synced from a private knowledge vault
        </span>
      </div>
    </footer>
  );
}
