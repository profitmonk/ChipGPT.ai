import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/site-shell";
import { DeploymentReadinessSection } from "@/components/enterprise/deployment-readiness-section";
import { SecurityArchitectureDiagram } from "@/components/enterprise/security-architecture-diagram";
import { DataOwnershipStatement } from "@/components/landing/data-ownership-statement";
import { SectionHeader } from "@/components/landing/section-header";
import { ENTERPRISE_FEATURES, PLATFORM_MOAT, SITE_DESCRIPTION } from "@/lib/content";

export const metadata: Metadata = {
  title: "Enterprise — ChipGPT",
  description: SITE_DESCRIPTION,
};

export default function EnterprisePage() {
  return (
    <>
      <PageHeader
        eyebrow="Enterprise"
        title="Built for Tapeout-Scale Organizations"
        description="Security, governance, and deployment architecture designed for semiconductor programs that cannot compromise on IP protection or auditability."
      />

      <section className="border-b border-white/[0.06] bg-[#060606]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="Security"
            title="Defense-in-Depth Architecture"
            description="Layered controls from network perimeter through agent runtime to immutable audit."
            className="mb-8"
          />
          <SecurityArchitectureDiagram />
        </div>
      </section>

      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="Governance"
            title="Enterprise Capability Matrix"
            description="Security, access control, and compliance capabilities required for tapeout-scale programs."
            className="mb-8"
          />
          <div className="grid gap-px border border-white/[0.07] bg-white/[0.07] md:grid-cols-2 lg:grid-cols-3">
            {ENTERPRISE_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex min-h-full flex-col bg-[#080808] px-6 py-6"
                >
                  <Icon className="mb-4 h-4 w-4 text-green-700" strokeWidth={1.5} />
                  <h3 className="text-[14px] font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid gap-px border border-white/[0.07] bg-white/[0.07] sm:grid-cols-4">
            {[
              { label: "Deployment", value: "VPC · On-Prem · Air-Gap" },
              { label: "Compliance", value: "SOC 2 Type II Aligned" },
              { label: "Data Residency", value: "Customer-Controlled" },
              { label: "Model Isolation", value: "No Shared Training" },
            ].map((item) => (
              <div key={item.label} className="bg-[#0a0a0a] px-5 py-4">
                <p className="mono-label text-zinc-600">{item.label}</p>
                <p className="mt-1.5 text-[13px] font-medium text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DataOwnershipStatement />

      <section>
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="Deployment"
            title="Deployment Readiness"
            description="Models, documentation, and configuration artifacts for enterprise rollout."
            className="mb-8"
          />
          <DeploymentReadinessSection />

          <div className="mt-6 panel p-6">
            <p className="mono-label text-green-600">{PLATFORM_MOAT.title}</p>
            <p className="mt-3 text-[14px] leading-relaxed text-zinc-400">
              {PLATFORM_MOAT.description}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
