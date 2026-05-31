export type FlowPipelineNode = {
  label: string;
  items?: string[];
  variant?: "source" | "core" | "intelligence" | "orchestration" | "output";
};

const variantStyles: Record<NonNullable<FlowPipelineNode["variant"]>, string> = {
  source: "border-white/[0.1] bg-[#080808] text-zinc-400",
  core: "border-white/[0.12] bg-[#0a0a0a] text-zinc-300",
  intelligence: "border-green-900/35 bg-[#0a120a] text-green-700/90",
  orchestration: "border-green-900/25 bg-[#0c100c] text-zinc-300",
  output: "border-white/[0.1] bg-[#0a0a0a] text-zinc-400",
};

export function HorizontalFlowPipeline({
  nodes,
  caption,
}: {
  nodes: FlowPipelineNode[];
  caption?: string;
}) {
  return (
    <div className="panel overflow-hidden">
      <div className="overflow-x-auto">
        <div className="flex min-w-[720px] items-stretch gap-0 p-5 sm:min-w-0 sm:p-6">
          {nodes.map((node, index) => (
            <div key={node.label} className="flex min-w-0 flex-1 items-stretch">
              <div
                className={`flex min-h-[88px] w-full flex-col justify-center border px-3 py-3 sm:px-4 ${
                  variantStyles[node.variant ?? "core"]
                }`}
              >
                <p className="text-center text-[11px] font-medium leading-tight sm:text-[12px]">
                  {node.label}
                </p>
                {node.items && node.items.length > 0 && (
                  <ul className="mt-2 space-y-0.5">
                    {node.items.map((item) => (
                      <li
                        key={item}
                        className="text-center font-mono text-[9px] leading-snug text-zinc-600"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {index < nodes.length - 1 && (
                <div
                  className="flex w-6 shrink-0 items-center justify-center sm:w-8"
                  aria-hidden
                >
                  <span className="font-mono text-[10px] text-green-800/60">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {caption && (
        <div className="border-t border-white/[0.06] bg-[#080808] px-5 py-2.5">
          <p className="font-mono text-[10px] text-zinc-600">{caption}</p>
        </div>
      )}
    </div>
  );
}
