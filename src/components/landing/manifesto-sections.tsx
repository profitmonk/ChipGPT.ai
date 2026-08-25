import Link from "next/link";

function Band({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id}>
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-20">
        {children}
      </div>
    </section>
  );
}

/** Half-width centered green divider placed between homepage sections. */
export function SectionDivider() {
  return <div className="mx-auto h-px w-1/2 bg-green-500/35" aria-hidden />;
}

function Statement({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-[20ch] text-balance font-serif text-[2.15rem] font-medium leading-[1.1] tracking-[-0.015em] text-white sm:text-[2.75rem] lg:text-[3.25rem]">
      {children}
    </h2>
  );
}

export function WhySection() {
  return (
    <Band id="why">
      <Statement>Every wave of AI runs on silicon.</Statement>
      <p className="mt-8 max-w-xl text-[1.1rem] leading-[1.7] text-zinc-400">
        Physical AI, robotics, the way whole industries and societies are
        reorganizing around intelligence &mdash; all of it is built on silicon.
        Demand for it is compounding faster than any technology before it.
      </p>
    </Band>
  );
}

export function BottleneckSection() {
  return (
    <Band>
      <Statement>But designing silicon is a scarce, specialized craft.</Statement>
      <p className="mt-8 max-w-xl text-[1.1rem] leading-[1.7] text-zinc-400">
        There will never be enough high-quality silicon engineers to design all
        the chips the AI era needs &mdash; not fast enough, not affordably
        enough, not at the energy efficiency the world requires.
      </p>
      <p className="mt-4 max-w-xl text-[1.1rem] leading-[1.7] text-zinc-500">
        The binding constraint on the AI buildout isn&rsquo;t fabs or capital.
        It&rsquo;s engineering.
      </p>
    </Band>
  );
}

const OUTCOMES = [
  { k: "Productivity", v: "More design per engineer." },
  { k: "Quality", v: "Fewer defects reach silicon." },
  { k: "Shift-left", v: "Bugs caught at RTL, not after tapeout." },
  { k: "Speed", v: "From months to days." },
];

export function ShiftSection() {
  return (
    <Band>
      <Statement>
        So silicon has to be designed{" "}
        <em className="font-serif italic text-green-500">with</em> AI.
      </Statement>
      <p className="mt-8 max-w-xl text-[1.1rem] leading-[1.7] text-zinc-400">
        Not to replace the engineer &mdash; to multiply them. Four things have to
        change at once:
      </p>
      <div className="mt-12 grid gap-x-10 border-t border-white/[0.06] sm:grid-cols-2">
        {OUTCOMES.map((o) => (
          <div key={o.k} className="border-b border-white/[0.06] py-6">
            <span className="block text-[1.35rem] font-medium leading-tight text-white">
              {o.k}
            </span>
            <span className="mt-1.5 block text-[1.05rem] leading-[1.4] text-zinc-500">
              {o.v}
            </span>
          </div>
        ))}
      </div>
    </Band>
  );
}

const PROOFS = [
  {
    tag: "Formal",
    lead: "A virtual-address check off by one bit",
    rest: "— proven with a counterexample.",
  },
  {
    tag: "Structural",
    lead: "A missing clock-domain synchronizer",
    rest: "— the kind simulation can’t see.",
  },
  {
    tag: "Simulation",
    lead: "A counter that silently never increments",
    rest: "— reproduced in the target’s own testbench.",
  },
];

export function ProofSection() {
  return (
    <Band id="proof">
      <Statement>It already finds real bugs in real silicon.</Statement>
      <p className="mt-8 max-w-xl text-[1.1rem] leading-[1.7] text-zinc-400">
        The first co-workers run today on production open-source chips &mdash;
        every finding proven, formally or in simulation, before it&rsquo;s ever
        reported.
      </p>
      <div className="mt-10 max-w-2xl border-t border-white/[0.06]">
        {PROOFS.map((p) => (
          <div
            key={p.tag}
            className="flex items-baseline gap-4 border-b border-white/[0.06] py-4"
          >
            <span className="shrink-0 rounded-full border border-white/[0.12] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-green-600">
              {p.tag}
            </span>
            <p className="text-[1.05rem] leading-[1.5] text-zinc-400">
              <span className="text-white">{p.lead}</span> {p.rest}
            </p>
          </div>
        ))}
      </div>
      <Link
        href="/coworker"
        className="mt-10 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-wider text-green-600 transition-colors hover:text-green-500"
      >
        Watch it run at chipgpt.ai/coworker <span aria-hidden>&rarr;</span>
      </Link>
    </Band>
  );
}
