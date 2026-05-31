import {
  LIFECYCLE_AGENTS,
  LIFECYCLE_STAGES,
} from "@/lib/content";

const STAGE_COUNT = LIFECYCLE_STAGES.length;

const STAGE_SHORT: Record<string, string> = {
  Specification: "Spec",
  Verification: "Verify",
  "Physical Design": "Phys",
  "Yield Learning": "Yield",
  Production: "Prod",
};

export function LifecycleDiagram() {
  return (
    <div className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[880px] p-6 lg:min-w-0 lg:p-8">
          <LifecycleDiagramInner />
        </div>
      </div>
    </div>
  );
}

function LifecycleDiagramInner() {
  const cols = STAGE_COUNT;

  return (
    <div className="relative">
      <div className="border border-green-900/35 bg-[#0a120a]">
        <div className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mono-label text-green-600">
              ChipGPT Intelligence Layer
            </p>
            <p className="mt-1 text-[13px] font-medium text-zinc-300">
              Knowledge Graph · Domain Engines · Agent Orchestration
            </p>
          </div>
          <p className="font-mono text-[10px] text-zinc-600">
            Full lifecycle span · Governed · Audit-logged
          </p>
        </div>
        <div
          className="grid border-t border-green-900/25"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {LIFECYCLE_STAGES.map((stage) => (
            <div
              key={stage}
              className="flex justify-center border-r border-green-900/15 last:border-r-0"
            >
              <span className="h-2 w-px bg-green-800/40" aria-hidden />
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-24">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${cols * 100} 96`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <line
            x1="50"
            y1="4"
            x2={cols * 100 - 50}
            y2="4"
            stroke="rgba(34,197,94,0.2)"
            strokeWidth="1"
          />
          {LIFECYCLE_AGENTS.map((agent) => {
            const xs = agent.stages.map((i) => i * 100 + 50);
            const agentX = xs.reduce((a, b) => a + b, 0) / xs.length;

            return (
              <g key={agent.id}>
                <line
                  x1={agentX}
                  y1="4"
                  x2={agentX}
                  y2="28"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                />
                {xs.map((sx, j) => (
                  <line
                    key={j}
                    x1={agentX}
                    y1="52"
                    x2={sx}
                    y2="88"
                    stroke="rgba(34,197,94,0.25)"
                    strokeWidth="1"
                  />
                ))}
              </g>
            );
          })}
          <line
            x1="50"
            y1="88"
            x2={cols * 100 - 50}
            y2="88"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        </svg>

        <div className="absolute inset-x-0 top-7 h-8">
          {LIFECYCLE_AGENTS.map((agent) => {
            const centerCol =
              agent.stages.reduce((sum, i) => sum + i, 0) /
              agent.stages.length;
            const leftPct = ((centerCol + 0.5) / cols) * 100;

            return (
              <div
                key={agent.id}
                className="absolute top-0 -translate-x-1/2"
                style={{ left: `${leftPct}%` }}
              >
                <span className="whitespace-nowrap border border-white/[0.1] bg-[#0f0f0f] px-2 py-1 font-mono text-[10px] text-green-700">
                  {agent.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="grid items-start gap-0"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {LIFECYCLE_STAGES.map((stage, index) => {
          const hasAgent = LIFECYCLE_AGENTS.some((a) =>
            a.stages.includes(index)
          );

          return (
            <div key={stage} className="relative flex flex-col items-center px-0.5">
              {index < STAGE_COUNT - 1 && (
                <span
                  className="absolute right-0 top-[22px] z-10 translate-x-1/2 font-mono text-[9px] text-zinc-700"
                  aria-hidden
                >
                  →
                </span>
              )}

              <div
                className={`relative z-20 w-full border bg-[#0a0a0a] px-1 py-2.5 text-center sm:py-3 ${
                  hasAgent ? "border-green-900/40" : "border-white/[0.1]"
                }`}
              >
                <span className="font-mono text-[9px] text-zinc-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 hidden text-[10px] font-medium leading-tight text-zinc-300 sm:block lg:text-[11px]">
                  {stage}
                </p>
                <p className="mt-1 text-[10px] font-medium leading-tight text-zinc-300 sm:hidden">
                  {STAGE_SHORT[stage] ?? stage}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
