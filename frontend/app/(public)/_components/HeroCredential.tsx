"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CardFront, CardBack } from "./EmployeeIdCard";

/**
 * The credential as a HERO OBJECT — a resting artifact placed in the
 * composition, not the lanyard-drop Easter egg NavBar still owns. Reuses
 * CardFront/CardBack (identical visual faces) but drops the drag-swing
 * physics rig entirely: a hero object sits still, it doesn't hang and
 * swing. The one interaction kept is click-to-flip, because that's
 * specifically the interaction three recent commits stabilized — nothing
 * new is added on top of it.
 */
export function HeroCredential() {
  const [flipped, setFlipped] = useState(false);
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: reduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ flexShrink: 0 }}
    >
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={flipped ? "Show front of employee credential" : "Show back of employee credential"}
        onClick={() => setFlipped((f) => !f)}
        style={{
          /* Matches CardFront/CardBack's authored box exactly — both faces
             use fixed px values throughout (padding, font sizes, the photo
             placeholder), not percentages, so resizing this button would
             either crop or leave dead space rather than scale cleanly. */
          width: 252,
          height: 400,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: reduced ? "none" : "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
          padding: 0,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          font: "inherit",
          color: "inherit",
          textAlign: "inherit",
          filter: "drop-shadow(0 24px 48px rgba(10,12,15,0.18))",
        }}
      >
        <CardFront />
        <CardBack />
      </button>
    </motion.div>
  );
}
