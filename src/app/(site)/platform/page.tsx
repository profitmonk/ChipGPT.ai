import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/site-shell";
import { CommandCenterPanel } from "@/components/landing/command-center-panel";
import { DataOwnershipStatement } from "@/components/landing/data-ownership-statement";
import { SectionHeader } from "@/components/landing/section-header";
import { AgentOutputCard } from "@/components/agents/agent-output-card";
import { HorizontalFlowPipeline } from "@/components/diagrams/horizontal-flow-pipeline";
import { OperatingLayerDiagram } from "@/components/platform/operating-layer-diagram";
import {
  AGENT_OUTPUTS,
  COMPETITIVE_POSITIONING,
  PLATFORM_HORIZONTAL_PIPELINE,
  PLATFORM_MOAT,
  SITE_DESCRIPTION,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Platform — ChipGPT",
  description: SITE_DESCRIPTION,
};

export default function PlatformPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="The Operating Layer for Semiconductor Engineering"
        description="ChipGPT is not application software. It is infrastructure—a governed intelligence layer that connects engineering data, orchestrates specialized agents, and compounds institutional knowledge across every tapeout program."
      />

      <section className="border-b border-white/[0.06] bg-[#060606]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="Operating Layer"
            title="Engineering Data to Governed Output"
            description="Horizontal flow from EDA systems through the intelligence layer to structured agent outputs."
            className="mb-8"
          />
          <HorizontalFlowPipeline
            nodes={PLATFORM_HORIZONTAL_PIPELINE}
            caption="Governed pipeline · Permission gates at every handoff · Full audit trail"
          />
        </div>
      </section>

      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="System Topology"
            title="Three-Tier Operating Architecture"
            description="Engineering applications consume structured outputs from a shared intelligence layer fed by connected data sources."
            className="mb-8"
          />
          <OperatingLayerDiagram />
        </div>
      </section>

      <DataOwnershipStatement />

      <section className="border-b border-white/[0.06] bg-[#060606]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="Operations Console"
            title="Engineering Command Center"
            description="Visibility into agent activity, engineering threads, recurring patterns, and program continuity across your workflow."
            className="mb-8"
          />
          <CommandCenterPanel />
        </div>
      </section>

      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="Outputs"
            title="Structured Agent Outputs"
            description="Every agent produces cited, reviewable outputs. Engineers approve before any tapeout-critical action."
            className="mb-8"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {AGENT_OUTPUTS.map((output) => (
              <AgentOutputCard key={output.title} output={output} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <div className="grid gap-px border border-white/[0.07] bg-white/[0.07] lg:grid-cols-2">
            <div className="bg-[#080808] p-7">
              <p className="mono-label text-green-600">Positioning</p>
              <p className="mt-4 text-[14px] leading-relaxed text-zinc-400">
                {COMPETITIVE_POSITIONING}
              </p>
            </div>
            <div className="bg-[#080808] p-7">
              <p className="mono-label text-green-600">{PLATFORM_MOAT.title}</p>
              <p className="mt-4 text-[14px] leading-relaxed text-zinc-400">
                {PLATFORM_MOAT.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
