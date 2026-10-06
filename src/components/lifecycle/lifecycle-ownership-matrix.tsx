import { LIFECYCLE_AGENTS, LIFECYCLE_STAGES } from "@/lib/content";

export function LifecycleOwnershipMatrix() {
  return (
    <div className="panel overflow-hidden">
      <div className="border-b border-rule bg-surface px-5 py-3">
        <p className="mono-label text-ink-3">Agent Ownership Matrix</p>
        <p className="mt-1 text-[12px] text-ink-3">
          Active agent participation by lifecycle stage
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[880px] w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-rule bg-surface">
              <th className="sticky left-0 z-10 bg-surface px-4 py-3 font-mono text-[10px] font-normal uppercase tracking-wider text-ink-3">
                Agent
              </th>
              {LIFECYCLE_STAGES.map((stage, i) => (
                <th
                  key={stage}
                  className="px-2 py-3 text-center font-mono text-[9px] font-normal uppercase tracking-wide text-ink-3"
                >
                  <span className="block text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-0.5 block leading-tight">{stage}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LIFECYCLE_AGENTS.map((agent) => (
              <tr
                key={agent.id}
                className="border-b border-rule last:border-b-0"
              >
                <td className="sticky left-0 z-10 bg-surface px-4 py-2.5 font-mono text-[11px] text-accent">
                  {agent.label}
                </td>
                {LIFECYCLE_STAGES.map((_, stageIndex) => {
                  const active = agent.stages.includes(stageIndex);
                  return (
                    <td key={stageIndex} className="px-2 py-2.5 text-center">
                      {active ? (
                        <span
                          className="inline-block h-2 w-2 rounded-full bg-accent/60"
                          title={`${agent.label} · ${LIFECYCLE_STAGES[stageIndex]}`}
                        />
                      ) : (
                        <span className="inline-block h-px w-3 bg-rule" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-px border-t border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {LIFECYCLE_AGENTS.map((agent) => (
          <div key={agent.id} className="bg-surface px-4 py-3">
            <p className="font-mono text-[10px] text-accent">{agent.label}</p>
            <p className="mt-1 text-[11px] leading-snug text-ink-3">
              {agent.stages.map((i) => LIFECYCLE_STAGES[i]).join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
