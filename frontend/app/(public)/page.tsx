import { Hero }                from "./_components/Hero";
import { Manifesto }           from "./_components/Manifesto";
import { SelectedWorkIntro }   from "./_components/SelectedWorkIntro";
import { HalfLifeShowcase }    from "./_components/HalfLifeShowcase";
import { FabTwinShowcase }     from "./_components/FabTwinShowcase";
import { LeoLogicOsShowcase }  from "./_components/LeoLogicOsShowcase";
import { PhysicalEngineering } from "./_components/PhysicalEngineering";
import { ContactSection }      from "./_components/ContactSection";

// LeoLogic V2 homepage. Phase 1 set the structure (hero / manifesto /
// selected work / engineering / contact); Phase 2 replaced the single
// three-row Selected Work index with one viewport-scale chapter per
// flagship, each carrying its own surface tone and art direction —
// Half-Life warm cream, FabTwin cool titanium, LeoLogic OS the one
// deliberate dark moment. Trace moved out of the homepage into the
// /projects registry (its data is untouched).
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
      <HalfLifeShowcase />
      <FabTwinShowcase />
      <LeoLogicOsShowcase />
      <PhysicalEngineering />
      <ContactSection />
    </>
  );
}
