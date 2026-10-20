/**
 * Motion tokens for the public site.
 *
 * Every section used to carry its own copy of the same fade-up, and the
 * copies had drifted: rise distances of 12, 14, 16, 18, 20, 24 and 26px,
 * durations from 0.65s to 0.8s, staggers of 0.07 / 0.1 / 0.18 / 0.28s. None
 * of those differences was a decision — they read as a site that could not
 * agree with itself. One curve, two durations, one distance, one stagger.
 *
 * The one-shot reveal is deliberately quiet so that the few animations that
 * explain something (the manifesto's process line, the decay curve drawing
 * itself, the hero's flow field) are the ones the eye actually remembers.
 */

/** Expo-out: fast start, long settle. The only easing curve on the site. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  /** Reveals, hovers that move something. */
  base: 0.7,
  /** Drawn elements — curves, paths, counters. */
  draw: 1.6,
} as const;

/** Rise distance for a reveal, in px. */
export const RISE = 20;

/** Delay between siblings in a staggered reveal, in seconds. */
export const STAGGER = 0.08;

/** Shared viewport trigger so every reveal fires at the same scroll depth. */
export const VIEWPORT = { once: true, margin: "-60px" } as const;

/**
 * Props for a one-shot scroll reveal. Spread onto a motion element:
 *
 *   <motion.div {...reveal(reduced)} />
 *   <motion.div {...reveal(reduced, i)} />   // i-th sibling in a stagger
 *
 * Under reduced motion it still fades (opacity carries no vestibular cost)
 * but neither moves nor waits.
 */
export function reveal(reduced: boolean | null, index = 0) {
  return {
    initial: { opacity: 0, y: reduced ? 0 : RISE },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: {
      duration: reduced ? 0 : DURATION.base,
      delay: reduced ? 0 : index * STAGGER,
      ease: EASE,
    },
  } as const;
}
