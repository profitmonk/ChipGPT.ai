import { ManifestoHero } from "@/components/landing/manifesto-hero";
import {
  BottleneckSection,
  ProofSection,
  SectionDivider,
  ShiftSection,
  WhySection,
} from "@/components/landing/manifesto-sections";
import { StackSection } from "@/components/landing/platform-stack";
import { FinalCta } from "@/components/landing/final-cta";

export default function HomePage() {
  return (
    <>
      <ManifestoHero />
      <SectionDivider />
      <WhySection />
      <SectionDivider />
      <BottleneckSection />
      <SectionDivider />
      <ShiftSection />
      <SectionDivider />
      <StackSection />
      <SectionDivider />
      <ProofSection />
      <SectionDivider />
      <FinalCta compact />
    </>
  );
}
