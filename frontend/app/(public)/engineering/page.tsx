import type { Metadata } from "next";
import Link from "next/link";
import { EngineeringSection } from "../_components/EngineeringSection";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Process engineering track: internship focus areas, an honest competency matrix, " +
    "certification targets, and the role families this is built toward.",
};

export default function EngineeringPage() {
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(96px, 11vw, 128px) clamp(24px, 5vw, 80px) 0" }}>
      <Link
        href="/"
        className="text-xs tracking-widest font-mono inline-flex items-center gap-2"
        style={{ color: "rgba(255,255,255,0.32)" }}
      >
        ← LEOLOGIC.ORG
      </Link>
      <EngineeringSection />
    </div>
  );
}
