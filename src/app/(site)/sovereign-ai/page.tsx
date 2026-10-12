import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/landing/section-header";
import { SovereignBriefingForm } from "@/components/sovereign/briefing-form";
import { SovereignFaq } from "@/components/sovereign/faq";
import { SovereignPageTracking, TrackedAnchor } from "@/components/sovereign/tracking";
import {
  RLE_EVIDENCE,
  SOVEREIGN_DATA,
  SOVEREIGN_DESCRIPTION,
  SOVEREIGN_FORM_ID,
  SOVEREIGN_LOOP,
  SOVEREIGN_PHASES,
  SOVEREIGN_STACK,
  SOVEREIGN_STACK_ID,
  SOVEREIGN_TITLE,
  SOVEREIGN_WHY,
} from "@/lib/sovereign-content";

export const metadata: Metadata = {
  title: SOVEREIGN_TITLE,
  description: SOVEREIGN_DESCRIPTION,
  alternates: { canonical: "/sovereign-ai" },
  openGraph: {
    title: SOVEREIGN_TITLE,
    description: SOVEREIGN_DESCRIPTION,
    type: "website",
    url: "/sovereign-ai",
  },
  twitter: {
    card: "summary_large_image",
    title: SOVEREIGN_TITLE,
    description: SOVEREIGN_DESCRIPTION,
  },
};

const container = "mx-auto max-w-7xl px-6 lg:px-10";
const section = "border-b border-rule";
const sub = "text-ink-2";

/** Sources → private infrastructure → learning loop → owned model → co-workers. */
function DataFlowDiagram() {
  const node = "border border-rule bg-surface px-4 py-3";
  const arrow = (
    <div aria-hidden className="flex items-center justify-center py-2 font-sans text-[15px] text-accent lg:px-3 lg:py-0">
      <span className="lg:hidden">↓</span>
      <span className="hidden lg:inline">→</span>
    </div>
  );
  return (
    <figure>
      <div className="grid items-stretch lg:grid-cols-[1.3fr_auto_1.4fr_auto_1fr]">
        {/* Sources */}
        <div className="flex flex-col gap-2">
          <p className="mono-label mb-1 text-ink-3">Data</p>
          {SOVEREIGN_DATA.map((d) => (
            <div key={d.k} className={node}>
              <h3 className="font-sans text-[14px] font-semibold text-ink">{d.k}</h3>
              <p className="mt-1 text-[14px] leading-snug text-ink-2">{d.v}</p>
            </div>
          ))}
        </div>
        {arrow}
        {/* Infrastructure + learning loop */}
        <div className="flex flex-col border border-accent/30 bg-accent-soft p-4">
          <p className="mono-label text-accent">Private infrastructure</p>
          <p className="mt-1 font-sans text-[13px] text-ink-2">Ingest · store · govern · train · serve — in your environment</p>
          <div className="my-auto grid gap-2 py-4 sm:grid-cols-3">
            {["Goal-driven tasks", "RL environment", "Evaluation"].map((k) => (
              <div key={k} className={`${node} flex min-h-[64px] items-center justify-center text-center`}>
                <p className="font-sans text-[13px] font-medium text-ink">{k}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center font-sans text-[12px] text-ink-3">
            measure → generate → train → re-verify, continuously
          </p>
        </div>
        {arrow}
        {/* Outputs */}
        <div className="flex flex-col gap-2">
          <p className="mono-label mb-1 text-ink-3">Yours</p>
          <div className={`${node} border-ink/30`}>
            <p className="font-sans text-[14px] font-medium text-ink">Owned model</p>
            <p className="mt-1 font-sans text-[12px] text-ink-3">Weights you train stay yours</p>
          </div>
          <div className={node}>
            <p className="font-sans text-[14px] font-medium text-ink">AI co-workers</p>
            <p className="mt-1 font-sans text-[12px] text-ink-3">RTL, DV, bring-up, and more</p>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-[14px] text-ink-3">
        Real-time, historical, and expert-generated data flow into infrastructure you control,
        where tasks, the learning environment, and evaluations improve a model you own.
      </figcaption>
    </figure>
  );
}

export default function SovereignAiPage() {
  return (
    <>
      <SovereignPageTracking />

      {/* Hero */}
      <header className="border-b border-rule bg-paper-2 pt-14">
        <div className={`${container} py-16 lg:py-24`}>
          <p className="mono-label mb-5 text-accent">Sovereign AI</p>
          <h1 className="max-w-4xl text-balance text-[2.3rem] leading-[1.08] sm:text-[3rem] lg:text-[3.75rem]">
            AI your engineering organization <em className="italic text-accent">owns</em>.
          </h1>
          <p className={`mt-7 max-w-2xl text-[1.15rem] leading-[1.7] ${sub}`}>
            Your own model, trained in a learning environment built around your goals, measured by
            evaluations you control, and running on private infrastructure that ingests and manages
            all of your engineering data.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" asChild>
              <TrackedAnchor href={`#${SOVEREIGN_FORM_ID}`} event="sovereign_primary_cta_click" placement="hero">
                Request a Briefing
              </TrackedAnchor>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={`#${SOVEREIGN_STACK_ID}`}>See the stack</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Why */}
      <section className={section}>
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHeader
            descriptionClassName="text-ink-2"
            eyebrow="Why sovereign"
            title="Rented intelligence can't learn your silicon."
            className="mb-10"
          />
          <div className="grid gap-px border border-rule bg-rule md:grid-cols-3">
            {SOVEREIGN_WHY.map((w) => (
              <div key={w.k} className="bg-surface px-6 py-7">
                <h3 className="font-sans text-[15px] font-semibold text-ink">{w.k}</h3>
                <p className={`mt-2 text-[16px] leading-relaxed ${sub}`}>{w.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section id={SOVEREIGN_STACK_ID} className={`${section} scroll-mt-14 bg-paper-2`}>
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHeader
            descriptionClassName="text-ink-2"
            eyebrow="The stack"
            title="Five parts, one system you control."
            description="Each part is useful alone. Together they form a loop that makes your AI measurably better at your work."
            className="mb-10"
          />
          <ol className="border-t border-rule">
            {SOVEREIGN_STACK.map((c, i) => (
              <li key={c.k} className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[3rem_14rem_1fr] sm:gap-6">
                <span className="font-sans text-[13px] tabular-nums text-ink-3">0{i + 1}</span>
                <h3 className="font-serif text-[1.35rem] leading-tight text-ink">{c.k}</h3>
                <p className={`max-w-[62ch] text-[16px] leading-relaxed ${sub}`}>{c.v}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Data foundation */}
      <section className={section}>
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHeader
            descriptionClassName="text-ink-2"
            eyebrow="Built on your data — and ours"
            title="Three sources of learning signal."
            className="mb-10"
          />
          <DataFlowDiagram />
        </div>
      </section>

      {/* Loop */}
      <section className={`${section} bg-paper-2`}>
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHeader
            descriptionClassName="text-ink-2"
            eyebrow="How it compounds"
            title="Every cycle aims at a real gap."
            description="Correctness is verified by executable checks, not opinion. An improvement only counts after protected grading passes."
            className="mb-10"
          />
          <ol className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-5">
            {SOVEREIGN_LOOP.map((s, i) => (
              <li key={s.k} className="bg-surface px-5 py-6">
                <span className="font-sans text-[12px] tabular-nums text-ink-3">0{i + 1}</span>
                <h3 className="mt-1 font-serif text-[1.25rem] text-ink">{s.k}</h3>
                <p className={`mt-2 text-[15px] leading-relaxed ${sub}`}>{s.v}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Proof: Engineering RLE */}
      <section id="rle" className={`${section} scroll-mt-14`}>
        <div className={`${container} py-16 lg:py-24`}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <SectionHeader
              descriptionClassName="text-ink-2"
              eyebrow="Running today"
              title="Engineering RLE: the learning environment, validated."
              description="The reinforcement-learning environment is the first part of the stack built and validated end to end: executable silicon-engineering tasks with protected graders."
              className="mb-0"
            />
            <div>
              <ul className="border-t border-rule">
                {RLE_EVIDENCE.map((e) => (
                  <li key={e} className={`flex gap-4 border-b border-rule py-4 text-[16px] ${sub}`}>
                    <span aria-hidden className="font-sans text-[13px] leading-[1.7] text-accent">✓</span>
                    {e}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[14px] text-ink-3">
                These results validate task construction and grading, not any model&rsquo;s score.
                Full multi-model calibration is pending.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className={`${section} bg-paper-2`}>
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHeader
            descriptionClassName="text-ink-2"
            eyebrow="How an engagement works"
            title="Foundation first. Nothing is trusted until it's proven on your data."
            className="mb-10"
          />
          <ol className="grid gap-px border border-rule bg-rule md:grid-cols-3">
            {SOVEREIGN_PHASES.map((p, i) => (
              <li key={p.k} className="bg-surface px-6 py-7">
                <span className="font-sans text-[12px] tabular-nums text-ink-3">Phase {i + 1}</span>
                <h3 className="mt-1 font-serif text-[1.35rem] text-ink">{p.k}</h3>
                <p className={`mt-2 text-[16px] leading-relaxed ${sub}`}>{p.v}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-ink-2">
            <span className="text-ink">You stay in control.</span> The weights you train are yours,
            your data stays in your environment, and ChipGPT never trains shared models on it.
            Deployment is scoped per program during security design.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className={section}>
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHeader eyebrow="FAQ" title="Questions we hear first." className="mb-10" />
          <div className="max-w-3xl">
            <SovereignFaq />
          </div>
        </div>
      </section>

      {/* CTA + form */}
      <section id={SOVEREIGN_FORM_ID} className={`${section} scroll-mt-14`} aria-labelledby="cta-title">
        <div className={`${container} py-16 lg:py-24`}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 id="cta-title" className="max-w-[18ch] text-balance text-[2rem] leading-[1.12] sm:text-[2.5rem]">
                Build the AI your silicon deserves.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-2">
                We work with a small number of design-partner programs each cycle. Tell us what you
                want your AI to get better at, and we&rsquo;ll walk through what the foundation phase
                would look like for your organization.
              </p>
            </div>
            <SovereignBriefingForm />
          </div>
        </div>
      </section>
    </>
  );
}
