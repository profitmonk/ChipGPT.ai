const LAYERS = [
  {
    n: "01 · base",
    h: "Data & memory",
    p: "Ingest a design org’s entire history — RTL, bugs, specs, reports — and make it recallable. Vectorized, chunked, and optimized for prompt-efficient retrieval.",
  },
  {
    n: "02",
    h: "Agent infrastructure",
    p: "The guardrails and harnesses to build silicon agents safely on top of that memory.",
  },
  {
    n: "03",
    h: "Agents",
    p: "Example co-workers we ship — and the tools for your own engineers to build theirs.",
  },
  {
    n: "04 · top",
    h: "Reliability",
    p: "Debug tooling, CI/CD, and benchmarks that keep AI-designed silicon trustworthy as it scales.",
  },
];

export function StackSection() {
  return (
    <section className="border-b border-white/[0.06]">
      <div className="mx-auto max-w-5xl px-6 py-24 lg:px-10 lg:py-32">
        <p className="mono-label mb-6 flex items-center gap-3 text-green-600">
          <span className="h-px w-6 bg-green-600/70" aria-hidden />
          What we&rsquo;re building
        </p>
        <h2 className="max-w-[20ch] text-balance font-serif text-[2rem] font-medium leading-[1.12] tracking-[-0.015em] text-white sm:text-[2.5rem] lg:text-[3rem]">
          A full-stack foundation for AI-designed silicon.
        </h2>
        <p className="mt-7 max-w-xl text-[1.05rem] leading-[1.7] text-zinc-400">
          Not a single tool, and not a fixed menu of agents. A stack &mdash;
          built from the memory up &mdash; that any design org can stand its own
          AI co-workers on.
        </p>

        {/* col-reverse so the base layer (memory) sits at the foundation. */}
        <div className="mt-12 flex flex-col-reverse overflow-hidden rounded-md border border-white/[0.08]">
          {LAYERS.map((l, i) => (
            <div
              key={l.h}
              className={`grid grid-cols-[4.5rem_1fr] gap-5 border-t border-white/[0.06] px-5 py-6 first:border-t-0 lg:grid-cols-[5.5rem_1fr] lg:px-8 ${
                i === 0 ? "bg-white/[0.02]" : ""
              }`}
            >
              <span className="pt-1 font-mono text-[11px] tracking-wide text-green-600">
                {l.n}
              </span>
              <div>
                <h3 className="font-serif text-[1.35rem] font-medium text-white">
                  {l.h}
                </h3>
                <p className="mt-1.5 max-w-[46ch] text-[0.98rem] leading-[1.5] text-zinc-500">
                  {l.p}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mono-label mt-4 text-zinc-500">
          Read bottom-up: memory is the foundation. Nothing runs until it holds.
        </p>
      </div>
    </section>
  );
}
