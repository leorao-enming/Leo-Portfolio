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
    <div className="page-shell">
      <Link
        href="/"
        className="text-xs tracking-widest font-mono inline-flex items-center gap-2"
        style={{ color: "var(--text-muted)" }}
      >
        ← LEOLOGIC.ORG
      </Link>
      <EngineeringSection />
    </div>
  );
}
