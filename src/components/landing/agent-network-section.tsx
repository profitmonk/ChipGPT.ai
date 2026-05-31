import { SectionHeader } from "@/components/landing/section-header";
import { AGENT_NETWORK } from "@/lib/content";

export function AgentNetworkSection({ embedded = false }: { embedded?: boolean }) {
  const { center, agents } = AGENT_NETWORK;

  const diagram = (
    <>
      <div className="relative mx-auto hidden h-[420px] max-w-3xl lg:block">
        <svg
          className="absolute inset-0 h-full w-full"
          aria-hidden
          viewBox="0 0 600 420"
          fill="none"
        >
          <line x1="300" y1="60" x2="300" y2="160" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="80" y1="210" x2="220" y2="210" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="380" y1="210" x2="520" y2="210" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="160" y1="320" x2="260" y2="260" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="440" y1="320" x2="340" y2="260" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </svg>

        <DiagramNode
          label={agents.find((a) => a.position === "top")!.label}
          className="absolute left-1/2 top-0 -translate-x-1/2"
        />
        <DiagramNode
          label={center}
          variant="center"
          className="absolute left-1/2 top-[38%] -translate-x-1/2"
        />
        <DiagramNode
          label={agents.find((a) => a.position === "left")!.label}
          className="absolute left-0 top-[42%]"
        />
        <DiagramNode
          label={agents.find((a) => a.position === "right")!.label}
          className="absolute right-0 top-[42%]"
        />
        <DiagramNode
          label={agents.find((a) => a.position === "bottom-left")!.label}
          className="absolute bottom-0 left-[8%]"
        />
        <DiagramNode
          label={agents.find((a) => a.position === "bottom-right")!.label}
          className="absolute bottom-0 right-[8%]"
        />
      </div>

      <div className="space-y-3 lg:hidden">
        <DiagramNode label={center} variant="center" className="w-full" />
        <div className="grid gap-3 sm:grid-cols-2">
          {agents.map((agent) => (
            <DiagramNode key={agent.id} label={agent.label} className="w-full" />
          ))}
        </div>
      </div>

      <p className="mt-12 max-w-2xl text-[13px] leading-relaxed text-zinc-600">
        All agents read from and write to a shared semiconductor knowledge graph—linking
        RTL hierarchies, verification artifacts, silicon data, yield records, and field
        failure history into a single reasoning context.
      </p>
    </>
  );

  if (embedded) {
    return (
      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <SectionHeader
            eyebrow="Agent Network"
            title="Interconnected Engineering Intelligence"
            description="Specialized agents share a unified knowledge layer. Insights compound across the lifecycle."
          />
          {diagram}
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-white/[0.06] bg-[#060606]">
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
        <SectionHeader
          eyebrow="Agent Network"
          title="Interconnected Engineering Intelligence"
          description="Specialized agents share a unified knowledge layer. Insights from verification inform bring-up. Yield learnings propagate to failure analysis. The system compounds."
        />
        {diagram}
      </div>
    </section>
  );
}

function DiagramNode({
  label,
  variant = "agent",
  className = "",
}: {
  label: string;
  variant?: "agent" | "center";
  className?: string;
}) {
  return (
    <div
      className={`panel px-5 py-3 text-center ${variant === "center" ? "border-green-900/40 bg-[#0a120a]" : ""} ${className}`}
    >
      <span
        className={`text-[13px] font-medium ${variant === "center" ? "text-green-500" : "text-zinc-300"}`}
      >
        {label}
      </span>
    </div>
  );
}
