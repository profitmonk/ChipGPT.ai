import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/site-shell";
import { AgentCapabilityGrid } from "@/components/agents/agent-capability-grid";
import { AgentOutputCard } from "@/components/agents/agent-output-card";
import { SectionHeader } from "@/components/landing/section-header";
import { AGENT_DETAILS, AGENT_OUTPUTS, SITE_DESCRIPTION } from "@/lib/content";

export const metadata: Metadata = {
  title: "Agents — ChipGPT",
  description: SITE_DESCRIPTION,
};

const OUTPUT_BY_AGENT: Record<string, (typeof AGENT_OUTPUTS)[0] | undefined> = {
  verification: AGENT_OUTPUTS.find((o) => o.agent === "Verification Agent"),
  failure: AGENT_OUTPUTS.find((o) => o.agent === "Failure Analysis Agent"),
  yield: AGENT_OUTPUTS.find((o) => o.agent === "Yield Learning Agent"),
  knowledge: AGENT_OUTPUTS.find((o) => o.agent === "Engineering Knowledge Retrieval"),
};

export default function AgentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Agents"
        title="Specialized Engineering Co-Workers"
        description="Six lifecycle-specific agents with governed inputs, structured outputs, and mandatory human review for tapeout-critical actions."
      />

      <section className="border-b border-rule bg-paper-2">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="Agent Network"
            title="Capability Overview"
            description="Inputs, outputs, and lifecycle scope for each specialized agent."
            className="mb-8"
          />
          <AgentCapabilityGrid />
        </div>
      </section>

      <div className="divide-y divide-rule">
        {AGENT_DETAILS.map((agent, index) => {
          const Icon = agent.icon;
          const sampleOutput = OUTPUT_BY_AGENT[agent.id];

          return (
            <section
              key={agent.id}
              id={agent.id}
              className={index % 2 === 1 ? "bg-paper-2" : ""}
            >
              <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
                  <div>
                    <div className="flex items-center gap-3">
                      <Icon
                        className="h-5 w-5 text-accent"
                        strokeWidth={1.5}
                      />
                      <p className="mono-label text-accent">{agent.label}</p>
                    </div>
                    <h2 className="mt-4 text-xl tracking-tight text-ink">
                      {agent.tagline}
                    </h2>
                    <p className="mt-4 text-[14px] leading-relaxed text-ink-3">
                      {agent.description}
                    </p>

                    <ul className="mt-6 space-y-2 border-t border-rule pt-5">
                      {agent.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex gap-2.5 text-[13px] text-ink-3"
                        >
                          <span className="mt-2 h-px w-3 shrink-0 bg-accent/60" />
                          {cap}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <div>
                        <p className="mono-label mb-3 text-ink-3">Inputs</p>
                        <ul className="space-y-1.5">
                          {agent.inputs.map((input) => (
                            <li
                              key={input}
                              className="font-mono text-[11px] text-ink-3"
                            >
                              {input}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mono-label mb-3 text-ink-3">Outputs</p>
                        <ul className="space-y-1.5">
                          {agent.outputs.map((output) => (
                            <li
                              key={output}
                              className="font-mono text-[11px] text-accent"
                            >
                              {output}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="mono-label mb-3 text-ink-3">Workflow</p>
                      <ol className="space-y-2">
                        {agent.workflow.map((step, i) => (
                          <li
                            key={step}
                            className="flex gap-3 text-[13px] text-ink-3"
                          >
                            <span className="font-mono text-[10px] text-ink-3">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <p className="mt-5 font-mono text-[10px] text-ink-3">
                      Lifecycle: {agent.lifecycleStages.join(" · ")}
                    </p>
                  </div>

                  <div>
                    {sampleOutput ? (
                      <AgentOutputCard output={sampleOutput} />
                    ) : (
                      <AgentConsoleMock agent={agent.label} />
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

function AgentConsoleMock({ agent }: { agent: string }) {
  return (
    <div className="panel overflow-hidden">
      <div className="border-b border-rule bg-surface px-4 py-2">
        <p className="mono-label text-accent">{agent}</p>
        <p className="mt-0.5 font-mono text-[11px] text-ink-3">
          chipgpt / agents / {agent.toLowerCase().replace(/\s+/g, "-")}
        </p>
      </div>
      <div className="space-y-2 p-4 font-mono text-[11px]">
        <p className="text-ink-3">STATUS · Connected · awaiting engineering query</p>
        <p className="text-ink-2">Awaiting engineering query...</p>
        <p className="text-accent">
          → Agent ready. All outputs require human approval.
        </p>
      </div>
    </div>
  );
}
