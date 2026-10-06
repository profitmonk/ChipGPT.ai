import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/site-shell";
import { HorizontalFlowPipeline } from "@/components/diagrams/horizontal-flow-pipeline";
import { DeploymentReadinessSection } from "@/components/enterprise/deployment-readiness-section";
import { AgentNetworkSection } from "@/components/landing/agent-network-section";
import { DataOwnershipStatement } from "@/components/landing/data-ownership-statement";
import { PlatformArchitectureSection } from "@/components/landing/platform-architecture-section";
import { SectionHeader } from "@/components/landing/section-header";
import {
  ARCHITECTURE_INTEGRATIONS,
  DATA_FLOW_STEPS,
  SITE_DESCRIPTION,
  SYSTEM_DATA_FLOW_PIPELINE,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Architecture — ChipGPT",
  description: SITE_DESCRIPTION,
};

export default function ArchitecturePage() {
  return (
    <>
      <PageHeader
        eyebrow="Architecture"
        title="Enterprise Engineering Infrastructure"
        description="Technical system architecture for secure ingestion, governed reasoning, and structured output across the semiconductor lifecycle."
      />

      <section className="border-b border-rule bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="System Data Flow"
            title="End-to-End Engineering Pipeline"
            description="From semiconductor data sources through ingestion and the knowledge graph to governed agent outputs."
            className="mb-8"
          />
          <HorizontalFlowPipeline
            nodes={SYSTEM_DATA_FLOW_PIPELINE}
            caption="All records include source, retrieved_at, as_of, and raw_hash · Permission gates at agent boundary"
          />
        </div>
      </section>

      <PlatformArchitectureSection embedded />

      <DataOwnershipStatement />

      <section className="border-b border-rule bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="Pipeline Stages"
            title="Ingestion Through Output"
            description="Canonical processing stages for every engineering artifact."
            className="mb-8"
          />
          <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {DATA_FLOW_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="flex min-h-full flex-col bg-surface p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-accent">
                      0{i + 1}
                    </span>
                    <Icon className="h-4 w-4 text-ink-3" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-3 text-[14px] font-semibold text-ink">
                    {step.step}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-3">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <AgentNetworkSection embedded />

      <section className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="Integrations"
            title="EDA & Enterprise Integrations"
            description="Native connectors for the systems your engineering teams already operate."
            className="mb-8"
          />
          <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {ARCHITECTURE_INTEGRATIONS.map((group) => (
              <div
                key={group.category}
                className="flex min-h-full flex-col bg-surface p-5"
              >
                <p className="mono-label text-ink-3">{group.category}</p>
                <ul className="mt-3 space-y-2">
                  {group.systems.map((sys) => (
                    <li
                      key={sys}
                      className="border border-rule bg-surface px-3 py-2 text-[13px] text-ink-2"
                    >
                      {sys}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="Deployment"
            title="Enterprise Deployment Architecture"
            description="Deployment models and readiness artifacts for IP-sensitive semiconductor programs."
            className="mb-8"
          />
          <DeploymentReadinessSection />
        </div>
      </section>
    </>
  );
}
