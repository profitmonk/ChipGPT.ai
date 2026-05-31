import { CapabilityPreviews } from "@/components/landing/capability-previews";
import { DataOwnershipStatement } from "@/components/landing/data-ownership-statement";
import { FinalCta } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { InstitutionalMemorySection } from "@/components/landing/institutional-memory-section";
import { UseCasesByRoleSection } from "@/components/landing/use-cases-by-role-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <InstitutionalMemorySection />
      <CapabilityPreviews />
      <UseCasesByRoleSection />
      <DataOwnershipStatement />
      <FinalCta compact />
    </>
  );
}
