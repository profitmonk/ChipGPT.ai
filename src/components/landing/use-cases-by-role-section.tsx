import { SectionHeader } from "@/components/landing/section-header";
import { USE_CASES_BY_ROLE } from "@/lib/content";

export function UseCasesByRoleSection() {
  return (
    <section className="border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
        <SectionHeader
          eyebrow="Use Cases"
          title="By Engineering Role"
          description="Co-workers that preserve context, continuity, and institutional knowledge across the programs your teams run."
        />
        <div className="grid gap-px border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 lg:grid-cols-3">
          {USE_CASES_BY_ROLE.map((role) => (
            <div
              key={role.persona}
              className="flex min-h-full flex-col bg-[#080808] p-7"
            >
              <h3 className="text-[14px] font-semibold text-white">
                {role.persona}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {role.cases.map((c) => (
                  <li
                    key={c}
                    className="flex gap-2.5 text-[13px] leading-relaxed text-zinc-500"
                  >
                    <span className="mt-2 h-px w-3 shrink-0 bg-green-800/50" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
