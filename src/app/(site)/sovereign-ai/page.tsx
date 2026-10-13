import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/landing/section-header";
import { SovereignBriefingForm } from "@/components/sovereign/briefing-form";
import { SovereignFaq } from "@/components/sovereign/faq";
import { SovereignPageTracking, TrackedAnchor } from "@/components/sovereign/tracking";
import {
  RLE_EVIDENCE,
  SOVEREIGN_ADVANTAGES,
  SOVEREIGN_DATA,
  SOVEREIGN_DESCRIPTION,
  SOVEREIGN_FORM_ID,
  SOVEREIGN_LOOP,
  SOVEREIGN_LAYERS,
  SOVEREIGN_PHASES,
  SOVEREIGN_RAIL,
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

/** Layered stack: interfaces on top, data at the base, model rail alongside. */
function ArchitectureDiagram() {
  return (
    <figure>
      <div className="grid gap-4 lg:grid-cols-[1fr_17rem]">
        <ol className="flex flex-col gap-2">
          {SOVEREIGN_LAYERS.map((l, i) => {
            const n = SOVEREIGN_LAYERS.length - i;
            const isData = n === 1;
            return (
              <li
                key={l.k}
                className={`grid gap-3 border px-4 py-4 md:grid-cols-[11rem_1fr] md:gap-5 ${
                  isData ? "border-accent/30 bg-accent-soft" : "border-rule bg-surface"
                }`}
              >
                <div>
                  <span className="font-sans text-[12px] tabular-nums text-ink-3">Layer {n}</span>
                  <h3 className="font-serif text-[1.2rem] leading-tight text-ink">{l.k}</h3>
                </div>
                <div>
                  <ul className="flex flex-wrap gap-1.5">
                    {l.items.map((it) => (
                      <li
                        key={it}
                        className="border border-rule bg-paper px-2 py-1 font-sans text-[12.5px] font-medium text-ink"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[15px] leading-snug text-ink-2">{l.v}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="flex flex-col gap-2">
          <p className="mono-label text-accent">Model routing</p>
          {SOVEREIGN_RAIL.map((r, i) => (
            <div
              key={r.k}
              className={`border px-4 py-4 ${i === 0 ? "border-ink/30 bg-surface" : "border-dashed border-rule-strong bg-paper"}`}
            >
              <h3 className="font-sans text-[14px] font-semibold text-ink">{r.k}</h3>
              <p className="mt-1 text-[14px] leading-snug text-ink-2">{r.v}</p>
            </div>
          ))}
          <div className="border border-accent/30 bg-accent-soft px-4 py-4">
            <h3 className="font-sans text-[14px] font-semibold text-ink">Learning loop</h3>
            <p className="mt-1 text-[14px] leading-snug text-ink-2">
              Empirical and synthetic tasks train the model in the RL environment. Evaluation gates
              every change.
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 max-w-3xl text-[14px] text-ink-3">
        Data flows up from your systems of record; engineers reach it through skills in the tools
        they already use. Every layer runs in your environment.
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
            A private stack that makes your engineering data AI-ready, turns your design knowledge
            into a reasoning graph and skills your teams own, and runs on a model you control,
            plugged into the orchestrators and tools your engineers already use.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" asChild>
              <TrackedAnchor href={`#${SOVEREIGN_FORM_ID}`} event="sovereign_primary_cta_click" placement="hero">
                Request a Briefing
              </TrackedAnchor>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={`#${SOVEREIGN_STACK_ID}`}>See the architecture</a>
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
            title="Most AI can't use what your organization knows."
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

      {/* Architecture */}
      <section id={SOVEREIGN_STACK_ID} className={`${section} scroll-mt-14 bg-paper-2`}>
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHeader
            descriptionClassName="text-ink-2"
            eyebrow="The architecture"
            title="Data is the blood. The graph is the brain. Skills are the body."
            description="Five layers, each one built on the one below. Agents bolted onto raw data skip the middle; this stack doesn't."
            className="mb-10"
          />
          <ArchitectureDiagram />
        </div>
      </section>

      {/* Data */}
      <section className={section}>
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHeader
            descriptionClassName="text-ink-2"
            eyebrow="Built on your data, and ours"
            title="Three kinds of data. Two jobs: run the work, and train the model."
            className="mb-10"
          />
          <div className="grid gap-px border border-rule bg-rule md:grid-cols-3">
            {SOVEREIGN_DATA.map((d) => (
              <div key={d.k} className="bg-surface px-6 py-7">
                <p className="mono-label text-accent">{d.use}</p>
                <h3 className="mt-2 font-serif text-[1.35rem] text-ink">{d.k}</h3>
                <p className={`mt-2 text-[16px] leading-relaxed ${sub}`}>{d.v}</p>
              </div>
            ))}
          </div>
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

      {/* Advantages */}
      <section className={section}>
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHeader
            descriptionClassName="text-ink-2"
            eyebrow="Why this design"
            title="Built so the advantage stays with you."
            className="mb-10"
          />
          <div className="grid gap-px border border-rule bg-rule md:grid-cols-3">
            {SOVEREIGN_ADVANTAGES.map((w) => (
              <div key={w.k} className="bg-surface px-6 py-7">
                <h3 className="font-sans text-[15px] font-semibold text-ink">{w.k}</h3>
                <p className={`mt-2 text-[16px] leading-relaxed ${sub}`}>{w.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof: Engineering RLE */}
      <section id="rle" className={`${section} scroll-mt-14 bg-paper-2`}>
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
      <section className={section}>
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
      <section className={`${section} bg-paper-2`}>
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
