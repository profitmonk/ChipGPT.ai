import type { AgentOutput } from "@/lib/content";

const lineStyles = {
  header: "font-mono text-[11px] text-ink-3",
  data: "font-mono text-[11px] text-ink-2",
  insight: "font-mono text-[11px] text-accent",
  source: "font-mono text-[10px] text-ink-3",
};

export function AgentOutputCard({ output }: { output: AgentOutput }) {
  return (
    <article className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-rule bg-surface px-4 py-2">
        <div>
          <p className="mono-label text-accent">{output.agent}</p>
          <p className="mt-0.5 text-[12px] font-medium text-ink">
            {output.title}
          </p>
        </div>
        <span className="font-mono text-[10px] text-ink-3">
          {output.timestamp}
        </span>
      </div>
      <div className="space-y-2 px-4 py-4">
        {output.lines.map((line, i) => (
          <p key={i} className={lineStyles[line.type]}>
            {line.text}
          </p>
        ))}
      </div>
      <div className="border-t border-rule bg-surface px-4 py-2">
        <span className="mono-label text-ink-3">Pending engineer review</span>
      </div>
    </article>
  );
}
