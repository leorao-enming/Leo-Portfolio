import type { Metadata } from "next";
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
      <EngineeringSection />
    </div>
  );
}
