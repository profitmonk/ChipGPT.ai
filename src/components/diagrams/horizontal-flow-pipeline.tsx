export type FlowPipelineNode = {
  label: string;
  items?: string[];
  variant?: "source" | "core" | "intelligence" | "orchestration" | "output";
};

const variantStyles: Record<NonNullable<FlowPipelineNode["variant"]>, string> = {
  source: "border-rule-strong bg-surface text-ink-2",
  core: "border-rule-strong bg-surface text-ink",
  intelligence: "border-accent/25 bg-accent-soft text-accent",
  orchestration: "border-accent/25 bg-accent-soft text-ink",
  output: "border-rule-strong bg-surface text-ink-2",
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
                        className="text-center font-mono text-[9px] leading-snug text-ink-3"
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
                  <span className="font-mono text-[10px] text-accent">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {caption && (
        <div className="border-t border-rule bg-surface px-5 py-2.5">
          <p className="font-mono text-[10px] text-ink-3">{caption}</p>
        </div>
      )}
    </div>
  );
}
