import { Hero }                from "./_components/Hero";
import { Manifesto }           from "./_components/Manifesto";
import { SelectedWorkIntro }   from "./_components/SelectedWorkIntro";
import { TraceShowcase }       from "./_components/TraceShowcase";
import { FabTwinShowcase }     from "./_components/FabTwinShowcase";
import { LeoLogicOsShowcase }  from "./_components/LeoLogicOsShowcase";
import { PhysicalEngineering } from "./_components/PhysicalEngineering";
import { ContactSection }      from "./_components/ContactSection";

// LeoLogic V2 homepage. Phase 1 set the structure (hero / manifesto /
// selected work / engineering / contact); Phase 2 replaced the single
// three-row Selected Work index with one viewport-scale chapter per
// flagship, each carrying its own surface tone and design language —
// Trace as a broadsheet on warm cream, FabTwin as a board of technical
// labels on cool titanium, LeoLogic OS as a desktop, the one deliberate
// dark moment. Half-Life led this page until it was archived in October
// 2026; its case study remains in the /projects archive.
//
// The tone progression across the whole page is the point, so the order
// here is load-bearing: warm neutral -> soft neutral -> cream -> titanium
// -> graphite -> technical paper -> warm neutral.
export default function LandingPage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <SelectedWorkIntro />
      <TraceShowcase />
      <FabTwinShowcase />
      <LeoLogicOsShowcase />
      <PhysicalEngineering />
      <ContactSection />
    </>
  );
}
