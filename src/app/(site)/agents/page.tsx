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

      <section className="border-b border-white/[0.06] bg-[#060606]">
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

      <div className="divide-y divide-white/[0.06]">
        {AGENT_DETAILS.map((agent, index) => {
          const Icon = agent.icon;
          const sampleOutput = OUTPUT_BY_AGENT[agent.id];

          return (
            <section
              key={agent.id}
              id={agent.id}
              className={index % 2 === 1 ? "bg-[#060606]" : ""}
            >
              <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
                  <div>
                    <div className="flex items-center gap-3">
                      <Icon
                        className="h-5 w-5 text-green-700"
                        strokeWidth={1.5}
                      />
                      <p className="mono-label text-green-600">{agent.label}</p>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold tracking-tight text-white">
                      {agent.tagline}
                    </h2>
                    <p className="mt-4 text-[14px] leading-relaxed text-zinc-500">
                      {agent.description}
                    </p>

                    <ul className="mt-6 space-y-2 border-t border-white/[0.06] pt-5">
                      {agent.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex gap-2.5 text-[13px] text-zinc-500"
                        >
                          <span className="mt-2 h-px w-3 shrink-0 bg-green-800/50" />
                          {cap}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <div>
                        <p className="mono-label mb-3 text-zinc-600">Inputs</p>
                        <ul className="space-y-1.5">
                          {agent.inputs.map((input) => (
                            <li
                              key={input}
                              className="font-mono text-[11px] text-zinc-500"
                            >
                              {input}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mono-label mb-3 text-zinc-600">Outputs</p>
                        <ul className="space-y-1.5">
                          {agent.outputs.map((output) => (
                            <li
                              key={output}
                              className="font-mono text-[11px] text-green-700/80"
                            >
                              {output}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="mono-label mb-3 text-zinc-600">Workflow</p>
                      <ol className="space-y-2">
                        {agent.workflow.map((step, i) => (
                          <li
                            key={step}
                            className="flex gap-3 text-[13px] text-zinc-500"
                          >
                            <span className="font-mono text-[10px] text-zinc-700">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <p className="mt-5 font-mono text-[10px] text-zinc-700">
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
      <div className="border-b border-white/[0.07] bg-[#0a0a0a] px-4 py-2">
        <p className="mono-label text-green-700">{agent}</p>
        <p className="mt-0.5 font-mono text-[11px] text-zinc-600">
          chipgpt / agents / {agent.toLowerCase().replace(/\s+/g, "-")}
        </p>
      </div>
      <div className="space-y-2 p-4 font-mono text-[11px]">
        <p className="text-zinc-500">STATUS · Connected · awaiting engineering query</p>
        <p className="text-zinc-400">Awaiting engineering query...</p>
        <p className="text-green-700">
          → Agent ready. All outputs require human approval.
        </p>
      </div>
    </div>
  );
}
