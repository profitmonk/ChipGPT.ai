import type { AgentOutput } from "@/lib/content";

const lineStyles = {
  header: "font-mono text-[11px] text-zinc-500",
  data: "font-mono text-[11px] text-zinc-400",
  insight: "font-mono text-[11px] text-green-700",
  source: "font-mono text-[10px] text-zinc-700",
};

export function AgentOutputCard({ output }: { output: AgentOutput }) {
  return (
    <article className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#0a0a0a] px-4 py-2">
        <div>
          <p className="mono-label text-green-700">{output.agent}</p>
          <p className="mt-0.5 text-[12px] font-medium text-zinc-300">
            {output.title}
          </p>
        </div>
        <span className="font-mono text-[10px] text-zinc-700">
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
      <div className="border-t border-white/[0.07] bg-[#0a0a0a] px-4 py-2">
        <span className="mono-label text-zinc-700">Pending engineer review</span>
      </div>
    </article>
  );
}
