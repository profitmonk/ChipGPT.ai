import Link from "next/link";

const LAYERS = [
  {
    h: "Data & memory",
    p: "Ingest a design org’s entire history — RTL, bugs, specs, reports — and make it recallable. Vectorized, chunked, and optimized for prompt-efficient retrieval.",
    foundation: true,
  },
  {
    h: "Agent infrastructure",
    p: "The guardrails and harnesses to build silicon agents safely on top of that memory.",
  },
  {
    h: "Agents",
    p: "Example co-workers we ship — and the tools for your own engineers to build theirs.",
  },
  {
    h: "Reliability",
    p: "Debug tooling, CI/CD, and benchmarks that keep AI-designed silicon trustworthy as it scales.",
    link: { href: "/rle", label: "Engineering RLE: how we evaluate agents" },
  },
];

export function StackSection() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-20">
        <h2 className="max-w-[20ch] text-balance font-serif text-[2.15rem] leading-[1.1] tracking-[-0.015em] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">
          A full-stack foundation for AI-designed silicon.
        </h2>
        <p className="mt-8 max-w-xl text-[1.1rem] leading-[1.7] text-ink-2">
          Not a single tool, and not a fixed menu of agents. A stack &mdash;
          built from the memory up &mdash; that any design org can stand its own
          AI co-workers on.
        </p>

        {/* col-reverse so the foundation (memory) sits visually at the base. */}
        <div className="mt-12 flex flex-col-reverse overflow-hidden rounded-md border border-rule">
          {LAYERS.map((l) => (
            <div
              key={l.h}
              className={`border-t border-rule px-6 py-7 first:border-t-0 lg:px-9 ${
                l.foundation ? "border-l-2 border-l-accent/50 bg-ink/[0.03]" : ""
              }`}
            >
              {l.foundation && (
                <span className="mb-2 block font-mono text-[12px] uppercase tracking-wider text-accent">
                  The foundation
                </span>
              )}
              <h3 className="font-serif text-[1.5rem] font-medium text-ink">
                {l.h}
              </h3>
              <p className="mt-2 max-w-[54ch] text-[1.02rem] leading-[1.55] text-ink-3">
                {l.p}
              </p>
              {"link" in l && l.link && (
                <Link
                  href={l.link.href}
                  className="mt-3 inline-flex items-center gap-1.5 font-sans text-[15px] font-medium text-accent underline decoration-current/30 underline-offset-4 transition-colors hover:decoration-current hover:text-accent-strong"
                >
                  {l.link.label} <span aria-hidden>&rarr;</span>
                </Link>
              )}
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-xl text-[1rem] leading-[1.6] text-ink-3">
          Read it bottom-up: memory is the foundation &mdash; nothing runs until
          it holds &mdash; and reliability wraps everything above it.
        </p>
      </div>
    </section>
  );
}
