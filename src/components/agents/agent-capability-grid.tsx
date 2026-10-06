import Link from "next/link";
import { AGENT_DETAILS } from "@/lib/content";

export function AgentCapabilityGrid() {
  return (
    <div className="grid gap-px border border-rule bg-rule md:grid-cols-2 lg:grid-cols-3">
      {AGENT_DETAILS.map((agent) => {
        const Icon = agent.icon;
        return (
          <Link
            key={agent.id}
            href={`#${agent.id}`}
            className="group flex min-h-full flex-col bg-surface p-5 transition-colors hover:bg-surface"
          >
            <div className="flex items-start justify-between gap-3">
              <Icon
                className="h-4 w-4 shrink-0 text-accent"
                strokeWidth={1.5}
              />
              <span className="font-mono text-[9px] text-ink-3 group-hover:text-accent">
                {agent.lifecycleStages.length === 1 &&
                agent.lifecycleStages[0] === "All lifecycle stages"
                  ? "Full lifecycle"
                  : `${agent.lifecycleStages.length} stages`}
              </span>
            </div>
            <h3 className="mt-3 text-[14px] font-semibold text-ink">
              {agent.label}
            </h3>
            <p className="mt-1.5 text-[12px] leading-relaxed text-ink-3">
              {agent.tagline}
            </p>
            <ul className="mt-4 space-y-1.5 border-t border-rule pt-4">
              {agent.capabilities.map((cap) => (
                <li
                  key={cap}
                  className="flex gap-2 text-[11px] leading-snug text-ink-3"
                >
                  <span className="mt-1.5 h-px w-2 shrink-0 bg-accent/60" />
                  {cap}
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-rule pt-3">
              <div>
                <p className="mono-label text-ink-3">Inputs</p>
                <p className="mt-1 font-mono text-[10px] text-ink-3">
                  {agent.inputs.length} sources
                </p>
              </div>
              <div>
                <p className="mono-label text-ink-3">Outputs</p>
                <p className="mt-1 font-mono text-[10px] text-accent">
                  {agent.outputs.length} types
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
