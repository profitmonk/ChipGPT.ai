import { COMMAND_CENTER } from "@/lib/content";

export function CommandCenterPanel() {
  const { program, status, metrics, debugWorkflows, activity, insights } =
    COMMAND_CENTER;

  return (
    <div className="panel w-full overflow-hidden">
      {/* System bar */}
      <div className="flex items-center justify-between border-b border-rule bg-surface px-4 py-2">
        <div className="flex items-center gap-4">
          <span className="mono-label text-ink-3">ChipGPT Ops</span>
          <span className="font-mono text-[11px] text-ink-3">{program}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-accent" />
          <span className="mono-label text-accent">{status}</span>
        </div>
      </div>

      {/* Primary metrics */}
      <div className="grid grid-cols-2 border-b border-rule lg:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="border-r border-rule px-4 py-3 last:border-r-0"
          >
            <p className="mono-label text-ink-3">{m.label}</p>
            <p className="mt-1 font-mono text-[15px] font-medium text-ink">
              {m.value}
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-ink-3">
              {m.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Debug workflows */}
        <div className="border-b border-r-0 border-rule lg:border-b-0 lg:border-r">
          <div className="border-b border-rule px-4 py-2">
            <span className="mono-label text-ink-3">Debug Workflows</span>
          </div>
          <div className="divide-y divide-rule">
            {debugWorkflows.map((wf) => (
              <div key={wf.id} className="px-4 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-ink-3">
                    {wf.id}
                  </span>
                  <span
                    className={`mono-label ${
                      wf.status === "Active"
                        ? "text-accent"
                        : wf.status === "Review"
                          ? "text-amber-800"
                          : "text-ink-3"
                    }`}
                  >
                    {wf.status}
                  </span>
                </div>
                <p className="mt-1 text-[12px] leading-snug text-ink-2">
                  {wf.subject}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-ink-3">
                  {wf.owner}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Agent activity */}
        <div>
          <div className="border-b border-rule px-4 py-2">
            <span className="mono-label text-ink-3">Agent Activity</span>
          </div>
          <div className="divide-y divide-rule">
            {activity.map((item) => (
              <div key={item.time} className="flex gap-3 px-4 py-2.5">
                <span className="shrink-0 font-mono text-[10px] text-ink-3">
                  {item.time}
                </span>
                <span className="shrink-0 mono-label text-accent">
                  {item.agent}
                </span>
                <p className="text-[11px] leading-snug text-ink-3">
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engineering insights footer */}
      <div className="grid grid-cols-2 border-t border-rule bg-surface">
        {insights.map((ins) => (
          <div
            key={ins.label}
            className="border-r border-rule px-4 py-2.5 last:border-r-0"
          >
            <p className="mono-label text-ink-3">{ins.label}</p>
            <div className="mt-0.5 flex items-baseline gap-2">
              <span className="font-mono text-sm text-ink">{ins.value}</span>
              <span className="font-mono text-[10px] text-accent">
                {ins.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
