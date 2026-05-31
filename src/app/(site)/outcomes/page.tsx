import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/site-shell";
import { OperationalOutcomeCards } from "@/components/outcomes/operational-outcome-cards";
import { SectionHeader } from "@/components/landing/section-header";
import { PAYBACK_OUTCOMES, SITE_DESCRIPTION } from "@/lib/content";

export const metadata: Metadata = {
  title: "Outcomes — ChipGPT",
  description: SITE_DESCRIPTION,
};

export default function OutcomesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Outcomes"
        title="Operational Outcomes by Domain"
        description="Qualitative signals, artifacts, and agent participation across the domains where design-partner programs see the fastest payback."
      />

      <section className="border-b border-white/[0.06] bg-[#060606]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <OperationalOutcomeCards />
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="Cross-Domain"
            title="Program-Level Effects"
            description="Outcomes that compound across roles and lifecycle stages as institutional memory grows."
            className="mb-8"
          />
          <div className="grid gap-px border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
            {PAYBACK_OUTCOMES.map((outcome) => (
              <div
                key={outcome}
                className="flex min-h-full items-center bg-[#080808] px-6 py-6"
              >
                <p className="text-[13px] font-medium leading-snug text-zinc-400">
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
