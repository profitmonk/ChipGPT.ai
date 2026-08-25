import { ManifestoHero } from "@/components/landing/manifesto-hero";
import {
  BottleneckSection,
  ProofSection,
  ShiftSection,
  WhySection,
} from "@/components/landing/manifesto-sections";
import { StackSection } from "@/components/landing/platform-stack";
import { FinalCta } from "@/components/landing/final-cta";

export default function HomePage() {
  return (
    <>
      <ManifestoHero />
      <WhySection />
      <BottleneckSection />
      <ShiftSection />
      <StackSection />
      <ProofSection />
      <FinalCta compact />
    </>
  );
}
