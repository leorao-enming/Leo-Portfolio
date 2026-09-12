import { Hero }               from "./_components/Hero";
import { Manifesto }          from "./_components/Manifesto";
import { SelectedWork }       from "./_components/SelectedWork";
import { PhysicalEngineering } from "./_components/PhysicalEngineering";
import { ContactSection }     from "./_components/ContactSection";

// LeoLogic V2 homepage structure: 01 Hero / 02 Manifesto / 03 Selected work /
// 04 Physical engineering / 05 Contact. Previously carried a full
// competency grid, a build queue, and a three-card capability breakdown —
// the homepage behaved like a sitemap. This pass folds the leftover
// About/Lab index and capability summary out entirely (both already live
// in SiteFooter and their own pages), narrows Selected Work to the three
// flagships the brief names, and replaces the competency-card lead with a
// dedicated physical-engineering section built around the existing P&ID.
export default function LandingPage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <SelectedWork />
      <PhysicalEngineering />
      <ContactSection />
    </>
  );
}
