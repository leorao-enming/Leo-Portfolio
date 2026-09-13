import Link from "next/link";
import { DecayField, REMAINING_MG } from "../../_components/project-art/DecayField";
import { EvidenceTags } from "./EvidenceTags";
import { HALF_LIFE_EVIDENCE, halfLife } from "./evidence";

const TAGS = ["Health", "iOS", "HealthKit", "Kinetics"];

/**
 * Composition: headline banded across the full width, then an EXPANSIVE
 * decay field spanning the container, with thesis and evidence sitting
 * beneath it in two columns.
 *
 * Deliberately not the homepage arrangement (text left / curve right at
 * half width). Same typographic system and the same DecayField object; a
 * different composition, and more depth — evidence tags and a fuller
 * thesis that the teaser does not carry.
 *
 * Server component: no interactivity here, so it ships no JS.
 */
export function GalleryHalfLife() {
  return (
    <section
      aria-labelledby="gallery-half-life"
      style={{ background: "var(--surface-half-life)" }}
    >
      <div
        className="section-shell"
        style={{ paddingTop: "clamp(72px, 10vw, 128px)", paddingBottom: "clamp(72px, 10vw, 128px)" }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.24em",
            color: "var(--accent-half-life)",
            margin: "0 0 20px",
          }}
        >
          01 / HALF-LIFE
        </p>
        <h2
          id="gallery-half-life"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 500,
            fontSize: "clamp(48px, 9vw, 128px)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            color: "var(--color-text-primary)",
            margin: "0 0 clamp(36px, 5vw, 56px)",
          }}
        >
          <span style={{ display: "block" }}>What</span>
          <span style={{ display: "block", color: "var(--accent-half-life)" }}>remains?</span>
        </h2>

        {/* The decay system is the primary visual — given the full container
            width rather than a half column, which is the main departure from
            the homepage teaser. */}
        <div style={{ marginBottom: 8 }}>
          <DecayField />
        </div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--accent-half-life)",
            textAlign: "right",
            margin: "0 0 clamp(40px, 5vw, 64px)",
          }}
        >
          {REMAINING_MG} mg remaining
        </p>

        <div
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]"
          style={{ gap: "clamp(32px, 5vw, 64px)", alignItems: "start" }}
        >
          <div>
            <p
              style={{
                fontSize: "clamp(15px, 1.3vw, 17px)",
                lineHeight: 1.7,
                color: "var(--text-body)",
                maxWidth: "46ch",
                margin: "0 0 20px",
              }}
            >
              An iOS app that models caffeine in the body as first-order decay and reads it
              against real sleep timing. HealthKit access only ever feeds suggestions — it
              never silently overwrites a time you set yourself, and raw sleep samples are
              never synced off the device.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0 6px", marginBottom: 28 }}>
              {TAGS.map((tag, i) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--accent-half-life)",
                  }}
                >
                  {tag}{i < TAGS.length - 1 ? " ·" : ""}
                </span>
              ))}
            </div>
            <Link
              href={`/projects/${halfLife.slug}`}
              className="group"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-display)",
                fontSize: 15,
                color: "var(--accent-half-life)",
                textDecoration: "none",
              }}
            >
              Open case study
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </div>

          <EvidenceTags rows={HALF_LIFE_EVIDENCE} />
        </div>
      </div>
    </section>
  );
}
