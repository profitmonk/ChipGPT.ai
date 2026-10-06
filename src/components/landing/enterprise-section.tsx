import { SectionHeader } from "@/components/landing/section-header";
import { ENTERPRISE_FEATURES } from "@/lib/content";

function EnterpriseGrid() {
  return (
    <>
      <div className="grid gap-px border border-rule bg-rule md:grid-cols-2 lg:grid-cols-3">
        {ENTERPRISE_FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="flex min-h-full flex-col bg-surface px-7 py-8">
              <Icon className="mb-5 h-4 w-4 text-accent" strokeWidth={1.5} />
              <h3 className="text-[14px] font-semibold text-ink">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-ink-3">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-4">
        {[
          { label: "Deployment", value: "VPC · On-Prem · Air-Gap" },
          { label: "Compliance", value: "SOC 2 Type II Aligned" },
          { label: "Data Residency", value: "Customer-Controlled" },
          { label: "Model Isolation", value: "No Shared Training" },
        ].map((item) => (
          <div key={item.label} className="bg-surface px-5 py-4">
            <p className="mono-label text-ink-3">{item.label}</p>
            <p className="mt-1.5 text-[13px] font-medium text-ink">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export function EnterpriseSection({ embedded = false }: { embedded?: boolean }) {
  if (embedded) {
    return (
      <section className="border-b border-rule bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <SectionHeader
            eyebrow="Security & Governance"
            title="Enterprise Readiness"
            description="Built for semiconductor organizations that require security, governance, and auditability at tapeout scale."
          />
          <EnterpriseGrid />
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
        <SectionHeader
          eyebrow="Enterprise"
          title="Enterprise Readiness"
          description="Built for semiconductor organizations that require security, governance, and auditability at tapeout scale."
        />
        <EnterpriseGrid />
      </div>
    </section>
  );
}
