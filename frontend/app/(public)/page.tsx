import { Hero } from "./_components/Hero";
import { AboutSection } from "./_components/AboutSection";
import { ProjectsSection } from "./_components/ProjectsSection";
import { CapabilitiesSection } from "./_components/CapabilitiesSection";
import { TimelineSection } from "./_components/TimelineSection";
import { ContactSection } from "./_components/ContactSection";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <CapabilitiesSection />
      <TimelineSection />
      <ContactSection />
    </>
  );
}
