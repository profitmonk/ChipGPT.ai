import { SectionHeader } from "@/components/landing/section-header";
import {
  ARCHITECTURE_INPUTS,
  ARCHITECTURE_OUTPUTS,
} from "@/lib/content";

export function PlatformArchitectureSection({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const content = (
    <>
      {!embedded && (
        <SectionHeader
          eyebrow="Architecture"
          title="Platform Architecture"
          description="Engineering data flows into a governed intelligence layer, routed to specialized agents, and returned as structured outputs with full provenance."
        />
      )}

      <div className="space-y-0">
        <ArchitectureLayer label="Engineering Data Sources">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {ARCHITECTURE_INPUTS.map((input) => (
              <div
                key={input}
                className="panel-inset px-4 py-3 text-center text-[13px] text-zinc-400"
              >
                {input}
              </div>
            ))}
          </div>
        </ArchitectureLayer>

        <FlowConnector />

        <ArchitectureLayer label="ChipGPT Intelligence Layer">
          <div className="panel border-green-900/30 bg-[#0a120a] px-6 py-5">
            <div className="grid gap-4 sm:grid-cols-3">
              {["Knowledge Graph", "Domain Engines", "Agent Orchestration"].map(
                (item) => (
                  <div key={item} className="text-center">
                    <p className="text-[13px] font-medium text-green-600">
                      {item}
                    </p>
                  </div>
                )
              )}
            </div>
            <p className="mt-4 text-center font-mono text-[10px] text-zinc-600">
              Secure ingestion · Permission gates · Audit logging
            </p>
          </div>
        </ArchitectureLayer>

        <FlowConnector />

        <ArchitectureLayer label="Specialized Engineering Agents">
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {[
              "RTL Agent",
              "Verification Agent",
              "Bring-Up Agent",
              "Yield Agent",
              "Failure Analysis Agent",
              "Knowledge Agent",
            ].map((agent) => (
              <div
                key={agent}
                className="panel-inset px-3 py-3 text-center text-[12px] text-zinc-400"
              >
                {agent}
              </div>
            ))}
          </div>
        </ArchitectureLayer>

        <FlowConnector />

        <ArchitectureLayer label="Structured Outputs">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {ARCHITECTURE_OUTPUTS.map((output) => (
              <div
                key={output}
                className="panel-inset px-4 py-3 text-center text-[13px] text-zinc-400"
              >
                {output}
              </div>
            ))}
          </div>
        </ArchitectureLayer>
      </div>
    </>
  );

  if (embedded) {
    return (
      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="System"
            title="Platform Data Flow"
            description="Engineering data flows into a governed intelligence layer, routed to specialized agents, and returned as structured outputs with full provenance."
          />
          {content}
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
        {content}
      </div>
    </section>
  );
}

function ArchitectureLayer({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mono-label mb-4 text-zinc-600">{label}</p>
      {children}
    </div>
  );
}

function FlowConnector() {
  return (
    <div className="flex justify-center py-3" aria-hidden>
      <div className="h-6 w-px flow-line" />
    </div>
  );
}
