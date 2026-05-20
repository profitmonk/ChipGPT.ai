import { ArchitectureSection } from "@/components/landing/architecture-section";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { MoatSection } from "@/components/landing/moat-section";
import { Navbar } from "@/components/landing/navbar";
import { ProductModules } from "@/components/landing/product-modules";
import { RoiSection } from "@/components/landing/roi-section";
import { UseCasesSection } from "@/components/landing/use-cases-section";
import { WorkflowStrip } from "@/components/landing/workflow-strip";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WorkflowStrip />
        <ProductModules />
        <RoiSection />
        <ArchitectureSection />
        <UseCasesSection />
        <MoatSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
