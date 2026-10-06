import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/site-shell";
import { LifecycleDiagram } from "@/components/lifecycle/lifecycle-diagram";
import { LifecycleOwnershipMatrix } from "@/components/lifecycle/lifecycle-ownership-matrix";
import { SectionHeader } from "@/components/landing/section-header";
import { LIFECYCLE_STAGE_DETAILS, SITE_DESCRIPTION } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lifecycle — ChipGPT",
  description: SITE_DESCRIPTION,
};

export default function LifecyclePage() {
  return (
    <>
      <PageHeader
        eyebrow="Lifecycle"
        title="Semiconductor Lifecycle Coverage"
        description="The entire semiconductor engineering process is powered by ChipGPT. A unified intelligence layer spans specification through production—specialized agents engage at each critical stage."
      />

      <section className="border-b border-rule bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="Lifecycle Flow"
            title="Intelligence Layer Above the Pipeline"
            description="ChipGPT is not a stage in the workflow. It is the operating layer above it—routing data and orchestrating agents across every tapeout phase."
            className="mb-8"
          />
          <LifecycleDiagram />
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="Agent Ownership"
            title="Lifecycle Participation by Agent"
            description="Which specialized agents are active at each engineering stage."
            className="mb-8"
          />
          <LifecycleOwnershipMatrix />
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="Stages"
            title="Lifecycle Stage Reference"
            description="Deep coverage of each engineering phase and ChipGPT's role within it."
            className="mb-8"
          />
          <div className="space-y-px border border-rule bg-rule">
            {LIFECYCLE_STAGE_DETAILS.map((detail, index) => (
              <div
                key={detail.stage}
                className="grid gap-6 bg-surface p-6 lg:grid-cols-[200px_1fr]"
              >
                <div>
                  <span className="font-mono text-[10px] text-ink-3">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-[15px] font-semibold text-ink">
                    {detail.stage}
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-[13px] leading-relaxed text-ink-3">
                    {detail.summary}
                  </p>
                  <div>
                    <p className="mono-label mb-2 text-ink-3">
                      Engineering Focus
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {detail.engineeringFocus.map((f) => (
                        <span
                          key={f}
                          className="border border-rule bg-surface px-2 py-1 text-[11px] text-ink-2"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="border-l border-accent/25 pl-4">
                    <p className="mono-label mb-1 text-accent">ChipGPT</p>
                    <p className="text-[13px] leading-relaxed text-ink-3">
                      {detail.chipgptRole}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
