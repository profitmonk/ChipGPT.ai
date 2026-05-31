import { SectionHeader } from "@/components/landing/section-header";
import { PAYBACK_OUTCOMES } from "@/lib/content";

export function PaybackSection({ embedded = false }: { embedded?: boolean }) {
  const grid = (
    <div className="grid gap-px border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
      {PAYBACK_OUTCOMES.map((outcome) => (
        <div key={outcome} className="flex min-h-full items-center bg-[#080808] px-7 py-8">
          <p className="text-[14px] font-medium leading-snug text-zinc-300">
            {outcome}
          </p>
        </div>
      ))}
    </div>
  );

  if (embedded) {
    return (
      <section className="border-b border-white/[0.06] bg-[#060606]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <SectionHeader
            eyebrow="Outcomes"
            title="Where Teams See the Fastest Payback"
            description="Qualitative outcomes design-partner programs report across verification, design continuity, and engineering knowledge—without fabricated benchmarks."
          />
          {grid}
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
        <SectionHeader
          eyebrow="Outcomes"
          title="Where Teams See the Fastest Payback"
          description="Qualitative outcomes teams pursue with ChipGPT across the semiconductor lifecycle."
        />
        {grid}
      </div>
    </section>
  );
}
