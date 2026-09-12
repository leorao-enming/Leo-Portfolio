"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";

/**
 * Drawing-sheet margin apparatus.
 *
 * The layout caps at --container-max, leaving ~240px of dead margin either
 * side at desktop width doing nothing for the whole scroll. This fills it the
 * way a drafted sheet does — ISO 5457 frames every technical drawing with a
 * zone-reference border, and ISO 7200 adds registration marks — so the page
 * gains an outer frame that is real ornament from this discipline rather than
 * decoration borrowed from another one.
 *
 * Left rail is a scale rule: hierarchical graduations (minor every 8px, major
 * every 40px) with zone letters, static like the printed edge of a sheet.
 *
 * Right rail is a live document map. Every section owns a proportional segment
 * of the rail, so the rail is a true scale drawing of the page: segment
 * boundaries sit where the sections actually sit. A cursor rides it at the
 * current reading position and the active section is named alongside.
 *
 * Cursor, fill and segments all share ONE coordinate space — fraction of total
 * document height — so they cannot drift out of agreement with each other.
 *
 * Decorative and aria-hidden: every label duplicates the nav, so a screen
 * reader gains nothing and loses a lot of noise.
 */

/** Zone letters, as a drawing sheet numbers its grid down the edge. */
const ZONE_REFS = ["A", "B", "C", "D", "E", "F", "G", "H"];

/** Where down the viewport the "reading line" sits, as a fraction. */
const READ_LINE = 0.17;

type Segment = { id: string; start: number; span: number };

export function MarginRails() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [active, setActive] = useState("");
  const reduced = useReducedMotion();

  /* Cached so the scroll transforms below never touch layout. Reading
     scrollHeight inside a transform would force reflow on every frame. */
  const docHeight = useRef(1);
  const viewHeight = useRef(0);

  const { scrollY } = useScroll();

  /* Fraction of the document above the reading line. This is the single
     coordinate every part of the right rail is drawn in. */
  const readFraction = useTransform(scrollY, (y) =>
    Math.min(1, Math.max(0, (y + viewHeight.current * READ_LINE) / docHeight.current)),
  );

  /* A spring is what separates "tracks the scrollbar" from the Apple feel:
     the indicator settles into position instead of snapping to each delta.
     Under reduced motion it becomes effectively rigid — this is a position
     readout, so it must stay accurate rather than stop working. */
  const springCfg = reduced
    ? { stiffness: 1000, damping: 100, restDelta: 0.001 }
    : { stiffness: 90, damping: 24, restDelta: 0.0005 };

  const smooth = useSpring(readFraction, springCfg);
  const cursorTop = useTransform(smooth, (f) => `${f * 100}%`);

  const visible = useRef<Set<string>>(new Set());

  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("main section[id]")];
    if (els.length === 0) return;

    /* No manual priming of `active` here — observe() itself queues an
       initial callback with the current intersection state for every
       newly-observed target, so the IntersectionObserver below sets the
       right section on mount without an extra synchronous setState. */

    /* Measure each section's true document position, as a fraction of the
       whole page, so the rail is a scale drawing rather than an even split. */
    const measure = () => {
      const docH = document.documentElement.scrollHeight || 1;
      docHeight.current = docH;
      viewHeight.current = window.innerHeight;
      setSegments(
        els.map((el) => {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          return { id: el.id, start: top / docH, span: rect.height / docH };
        }),
      );
    };

    measure();

    /* Section heights shift with viewport width (clamp(), wrapping), and
       images/fonts settle after mount — so re-measure on both. */
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);

    /* A thin detection band at the reading line, so "current" is the section
       being read rather than whichever happens to be largest.
       IntersectionObserver, not a scroll handler: no work on frames where
       nothing crossed the band. */
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.current.add(entry.target.id);
          else visible.current.delete(entry.target.id);
        }
        const first = els.find((el) => visible.current.has(el.id));
        if (first) setActive(first.id);
      },
      { rootMargin: `-${READ_LINE * 100}% 0px -${100 - READ_LINE * 100 - 10}% 0px` },
    );
    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div aria-hidden className="margin-rails">
      {/* Registration marks, as on a drawing sheet's corners. */}
      <span className="sheet-corner sheet-corner-tl" />
      <span className="sheet-corner sheet-corner-tr" />
      <span className="sheet-corner sheet-corner-bl" />
      <span className="sheet-corner sheet-corner-br" />

      {/* Left — the sheet's static scale rule. */}
      <div className="margin-rail margin-rail-left">
        <div className="rail-line" />
        <div className="rail-grad" />
        <div className="rail-zones">
          {ZONE_REFS.map((ref) => (
            <span key={ref}>{ref}</span>
          ))}
        </div>
      </div>

      {/* Right — live document map. */}
      <div className="margin-rail margin-rail-right">
        <div className="rail-line" />
        <div className="rail-grad" />

        {/* Traversed portion of the document. */}
        <motion.div className="rail-fill" style={{ scaleY: smooth }} />

        {/* One segment per section, at its true proportional position. */}
        {segments.map((seg) => (
          <div
            key={seg.id}
            className={`rail-seg${seg.id === active ? " rail-seg-active" : ""}`}
            style={{ top: `${seg.start * 100}%`, height: `${seg.span * 100}%` }}
          >
            <span className="rail-seg-tick" />
          </div>
        ))}

        {/* Cursor riding the rail at the reading position. */}
        <motion.div className="rail-cursor" style={{ top: cursorTop }}>
          <span className="rail-cursor-node" />
          {active && <span className="rail-cursor-label">{active}</span>}
        </motion.div>
      </div>
    </div>
  );
}
