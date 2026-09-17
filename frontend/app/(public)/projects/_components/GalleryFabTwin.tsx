import Link from "next/link";
import { Wafer, SpcPanel } from "../../_components/project-art/FabTwinArt";
import { EvidenceTags } from "./EvidenceTags";
import { FAB_TWIN_EVIDENCE, fabTwin } from "./evidence";

const TAGS = ["SPC", "PCA", "Hotelling T²", "Fault detection"];

/**
 * Composition: visual-object-centric. The wafer is the dominant form —
 * oversized and bled to the left of the type — with the statement set
 * against it and the SPC panel offset below. The homepage teaser instead
 * centres its type and puts wafer + chart in a balanced row; this one is
 * deliberately asymmetric and object-led.
 *
 * FabTwin is Lab entry L-03, not a registered project — it has no
 * /projects/<slug> page. Rather than fabricate one or link somewhere that
 * 404s, the CTA points at its canonical Lab entry, and the status line
 * reads from LAB_ENTRIES so it cannot drift from the real build state.
 *
 * Server component — no interactivity, no JS shipped.
 */
export function GalleryFabTwin() {
  return (
    <section aria-labelledby="gallery-fabtwin" style={{ background: "var(--surface-fabtwin)" }}>
      <div
        className="section-shell"
        style={{ paddingTop: "clamp(72px, 10vw, 128px)", paddingBottom: "clamp(72px, 10vw, 128px)" }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr]"
          style={{ gap: "clamp(32px, 5vw, 72px)", alignItems: "center" }}
        >
          {/* The object leads. Sized noticeably larger than the teaser's
              wafer so it reads as the composition's subject, not an
              illustration beside the text. */}
          <div style={{ order: 1 }}>
            <Wafer idPrefix="gallery-wafer" />
          </div>

          <div style={{ order: 2 }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.24em",
                color: "var(--accent-fabtwin-ink)",
                margin: "0 0 20px",
              }}
            >
              02 / FABTWIN
            </p>
            <h2
              id="gallery-fabtwin"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                fontSize: "var(--type-display-m)",
                lineHeight: 0.96,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "var(--color-text-primary)",
                margin: "0 0 24px",
              }}
            >
              <span style={{ display: "block" }}>Process</span>
              <span style={{ display: "block", color: "var(--accent-fabtwin-ink)" }}>under control.</span>
            </h2>
            <p
              style={{
                fontSize: "var(--type-body-l)",
                lineHeight: 1.7,
                color: "var(--text-body)",
                maxWidth: "46ch",
                margin: "0 0 20px",
              }}
            >
              A plasma-etch SPC and fault-detection simulator. The differentiator is not the
              model — it is validating that model against two real public fab datasets with
              the correct statistics, including a deliberate reproduction of the common
              evaluation mistakes as a documented contrast.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0 6px" }}>
              {TAGS.map((tag, i) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--accent-fabtwin-ink)",
                  }}
                >
                  {tag}{i < TAGS.length - 1 ? " ·" : ""}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Chart offset below the object rather than beside it. */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]"
          style={{ gap: "clamp(32px, 5vw, 64px)", alignItems: "start", marginTop: "clamp(40px, 6vw, 72px)" }}
        >
          <SpcPanel />

          <div>
            <EvidenceTags rows={FAB_TWIN_EVIDENCE} />
            <Link
              href="/lab"
              className="group"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 24,
                fontFamily: "var(--font-display)",
                fontSize: 15,
                color: "var(--accent-fabtwin-ink)",
                textDecoration: "none",
              }}
            >
              View the validation record in Lab
              <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>↗</span>
            </Link>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                lineHeight: 1.6,
                letterSpacing: "0.04em",
                color: "var(--text-muted)",
                margin: "12px 0 0",
                maxWidth: "40ch",
              }}
            >
              {/* Says out loud why this one link leaves /projects. */}
              FabTwin lives in the Lab as entry {fabTwin.id} — it is an experiment under
              validation, not a shipped project, and its record stays there.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
