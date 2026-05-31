import { COMMAND_CENTER } from "@/lib/content";

export function CommandCenterPanel() {
  const { program, status, metrics, debugWorkflows, activity, insights } =
    COMMAND_CENTER;

  return (
    <div className="panel w-full overflow-hidden">
      {/* System bar */}
      <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#0a0a0a] px-4 py-2">
        <div className="flex items-center gap-4">
          <span className="mono-label text-zinc-600">ChipGPT Ops</span>
          <span className="font-mono text-[11px] text-zinc-500">{program}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-green-500" />
          <span className="mono-label text-green-600">{status}</span>
        </div>
      </div>

      {/* Primary metrics */}
      <div className="grid grid-cols-2 border-b border-white/[0.07] lg:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="border-r border-white/[0.07] px-4 py-3 last:border-r-0"
          >
            <p className="mono-label text-zinc-600">{m.label}</p>
            <p className="mt-1 font-mono text-[15px] font-medium text-white">
              {m.value}
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-zinc-600">
              {m.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Debug workflows */}
        <div className="border-b border-r-0 border-white/[0.07] lg:border-b-0 lg:border-r">
          <div className="border-b border-white/[0.07] px-4 py-2">
            <span className="mono-label text-zinc-600">Debug Workflows</span>
          </div>
          <div className="divide-y divide-white/[0.05]">
            {debugWorkflows.map((wf) => (
              <div key={wf.id} className="px-4 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-zinc-600">
                    {wf.id}
                  </span>
                  <span
                    className={`mono-label ${
                      wf.status === "Active"
                        ? "text-green-600"
                        : wf.status === "Review"
                          ? "text-amber-600"
                          : "text-zinc-600"
                    }`}
                  >
                    {wf.status}
                  </span>
                </div>
                <p className="mt-1 text-[12px] leading-snug text-zinc-400">
                  {wf.subject}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-zinc-700">
                  {wf.owner}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Agent activity */}
        <div>
          <div className="border-b border-white/[0.07] px-4 py-2">
            <span className="mono-label text-zinc-600">Agent Activity</span>
          </div>
          <div className="divide-y divide-white/[0.05]">
            {activity.map((item) => (
              <div key={item.time} className="flex gap-3 px-4 py-2.5">
                <span className="shrink-0 font-mono text-[10px] text-zinc-700">
                  {item.time}
                </span>
                <span className="shrink-0 mono-label text-green-700">
                  {item.agent}
                </span>
                <p className="text-[11px] leading-snug text-zinc-500">
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engineering insights footer */}
      <div className="grid grid-cols-2 border-t border-white/[0.07] bg-[#0a0a0a]">
        {insights.map((ins) => (
          <div
            key={ins.label}
            className="border-r border-white/[0.07] px-4 py-2.5 last:border-r-0"
          >
            <p className="mono-label text-zinc-600">{ins.label}</p>
            <div className="mt-0.5 flex items-baseline gap-2">
              <span className="font-mono text-sm text-white">{ins.value}</span>
              <span className="font-mono text-[10px] text-green-700">
                {ins.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
