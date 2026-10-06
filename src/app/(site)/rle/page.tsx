import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/landing/section-header";
import { RleBriefingForm } from "@/components/rle/rle-briefing-form";
import { RleFaq } from "@/components/rle/rle-faq";
import { RlePageTracking, TrackedAnchor } from "@/components/rle/rle-tracking";
import {
  RLE_BENCHMARK_GAPS,
  RLE_CONTROLS,
  RLE_DESCRIPTION,
  RLE_EVIDENCE,
  RLE_EVIDENCE_STRIP,
  RLE_FLOW,
  RLE_FORM_ID,
  RLE_GRADING_ID,
  RLE_LEARNINGS,
  RLE_PILOT_INCLUDES,
  RLE_PORTFOLIO,
  RLE_TITLE,
} from "@/lib/rle-content";

export const metadata: Metadata = {
  title: RLE_TITLE,
  description: RLE_DESCRIPTION,
  alternates: { canonical: "/rle" },
  openGraph: {
    title: RLE_TITLE,
    description: RLE_DESCRIPTION,
    type: "website",
    url: "/rle",
  },
  twitter: {
    card: "summary_large_image",
    title: RLE_TITLE,
    description: RLE_DESCRIPTION,
  },
};

const container = "mx-auto max-w-7xl px-6 lg:px-10";
const section = "border-b border-rule";

export default function RlePage() {
  const total = RLE_PORTFOLIO.reduce((n, l) => n + l.count, 0);

  return (
    <>
      <RlePageTracking />

      {/* 1. Hero */}
      <header className="border-b border-rule bg-paper-2 pt-14">
        <div className={`${container} py-16 lg:py-24`}>
          <p className="mono-label mb-5 text-accent">ChipGPT Engineering RLE</p>
          <h1 className="max-w-4xl text-balance font-serif text-[2.15rem] leading-[1.1] tracking-[-0.015em] text-ink sm:text-[2.75rem] lg:text-[3.4rem]">
            Know whether an AI agent can engineer silicon&mdash;not merely write Verilog.
          </h1>
          <p className="mt-7 max-w-2xl text-[1.08rem] leading-[1.7] text-ink-2">
            A private, executable environment for evaluating and improving agents across RTL,
            design verification, firmware, RTOS, security, formal, and coverage engineering.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" asChild>
              <TrackedAnchor href={`#${RLE_FORM_ID}`} event="rle_primary_cta_click" placement="hero">
                Request an RLE Briefing
              </TrackedAnchor>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={`#${RLE_GRADING_ID}`}>See How Tasks Are Graded</a>
            </Button>
          </div>

          <ul className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {RLE_EVIDENCE_STRIP.map((item) => (
              <li key={item} className="bg-surface px-5 py-4 font-sans text-[14px] font-medium text-ink">
                <span aria-hidden className="mr-2 text-accent">■</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13px] text-ink-2">
            Oracle validation proves task integrity; full multi-model calibration is pending.
          </p>
        </div>
      </header>

      {/* 2. Why conventional benchmarks are insufficient */}
      <section className={section}>
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHeader
            descriptionClassName="text-ink-2"
            eyebrow="The gap"
            title="Writing Verilog is not the same as engineering silicon."
            description="Prompt / response HDL benchmarks score a single generated answer. Real engineering work is multi-step, tool-driven, and judged by behavior the author cannot see. These are the things a one-shot benchmark cannot measure:"
            className="mb-10"
          />
          <div className="grid gap-px border border-rule bg-rule md:grid-cols-2 lg:grid-cols-3">
            {RLE_BENCHMARK_GAPS.map((g) => (
              <div key={g.k} className="bg-surface px-6 py-6">
                <h3 className="text-[14px] font-semibold text-ink">{g.k}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-2">{g.v}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-[14px] leading-relaxed text-ink-2">
            Engineering RLE is the concrete evaluation layer of ChipGPT&rsquo;s{" "}
            <span className="text-ink">Reliability</span> stack: it measures and improves AI
            co-workers on executable engineering tasks.
          </p>
        </div>
      </section>

      {/* 3. Portfolio */}
      <section className={`${section} bg-paper-2`}>
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHeader
            descriptionClassName="text-ink-2"
            eyebrow="Portfolio"
            title="70 task candidates across five engineering lanes."
            description="Each task supplies an isolated workspace, a precise engineering objective, bounded tools, visible development checks, and protected executable grading."
            className="mb-10"
          />
          <table className="w-full max-w-3xl border-collapse text-left">
            <caption className="sr-only">Engineering RLE task portfolio by lane</caption>
            <thead>
              <tr className="border-b border-rule-strong">
                <th scope="col" className="py-3 pr-4 font-mono text-[11px] font-normal uppercase tracking-wider text-ink-2">Engineering lane</th>
                <th scope="col" className="py-3 text-right font-mono text-[11px] font-normal uppercase tracking-wider text-ink-2">Tasks</th>
              </tr>
            </thead>
            <tbody>
              {RLE_PORTFOLIO.map((l) => (
                <tr key={l.lane} className="border-b border-rule">
                  <th scope="row" className="py-4 pr-4 text-[15px] font-normal text-ink">{l.lane}</th>
                  <td className="py-4 text-right font-mono text-[15px] tabular-nums text-ink">{l.count}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" className="py-4 pr-4 text-[15px] font-semibold text-ink">Total</th>
                <td className="py-4 text-right font-mono text-[15px] font-semibold tabular-nums text-accent">{total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* 4. Executable evaluation flow */}
      <section id={RLE_GRADING_ID} className={`${section} scroll-mt-14`}>
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHeader
            descriptionClassName="text-ink-2"
            eyebrow="How tasks are graded"
            title="An executable evaluation flow, not a subjective review."
            description="A task passes only when every trusted correctness gate passes: integrity, build, private target behavior, architecture / mutation, non-regression, deterministic replay, and scope compliance. A weighted partial reward cannot override a failed hard gate."
            className="mb-10"
          />
          <ol aria-label="Evaluation flow" className="grid gap-3 lg:grid-cols-5 lg:gap-0">
            {RLE_FLOW.map((step, i) => (
              <li key={step.label} className="relative flex flex-col lg:flex-row lg:items-stretch">
                <div
                  className={`flex-1 border px-4 py-4 ${
                    i === 3
                      ? "border-accent/25 bg-accent-soft"
                      : i === RLE_FLOW.length - 1
                        ? "border-rule-strong bg-surface"
                        : "border-rule-strong bg-surface"
                  }`}
                >
                  <span className="font-mono text-[10px] text-ink-2">0{i + 1}</span>
                  <p className={`mt-1 text-[13px] font-medium leading-snug ${i === 3 ? "text-accent" : "text-ink"}`}>
                    {step.label}
                  </p>
                  <p className="mt-1.5 font-mono text-[10.5px] leading-snug text-ink-2">{step.detail}</p>
                </div>
                {i < RLE_FLOW.length - 1 && (
                  <span
                    aria-hidden
                    className="flex items-center justify-center pt-3 font-mono text-[12px] text-accent lg:w-6 lg:shrink-0 lg:pt-0"
                  >
                    <span className="lg:hidden">↓</span>
                    <span className="hidden lg:inline">→</span>
                  </span>
                )}
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-px border border-rule bg-rule md:grid-cols-2 lg:grid-cols-5">
            {RLE_CONTROLS.map((c) => (
              <div key={c.k} className="bg-surface px-5 py-5">
                <h3 className="text-[13px] font-semibold text-ink">{c.k}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">{c.v}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-[13px] leading-relaxed text-ink-2">
            Synthesis, place-and-route, physical PPA, scan insertion, and ATPG are outside this
            tranche. Static synthesizability and lint checks may still run.
          </p>
        </div>
      </section>

      {/* 5. What buyers learn */}
      <section className={`${section} bg-paper-2`}>
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHeader
            descriptionClassName="text-ink-2"
            eyebrow="What you learn"
            title="Five dimensions of an agent, measured separately."
            description="Correctness dominates efficiency: a cheaper failure is still a failure."
            className="mb-10"
          />
          <div className="grid gap-px border border-rule bg-rule md:grid-cols-2 lg:grid-cols-5">
            {RLE_LEARNINGS.map((l) => (
              <div key={l.k} className="flex flex-col bg-surface px-5 py-6">
                <h3 className="text-[14px] font-semibold text-ink">{l.k}</h3>
                <p className="mt-2 font-mono text-[11px] leading-snug text-accent">{l.metric}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-2">{l.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Evidence */}
      <section className={section}>
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHeader
            descriptionClassName="text-ink-2"
            eyebrow="Evidence"
            title="What has been validated so far."
            description="These results validate task construction and the grading path. They are not model scores."
            className="mb-10"
          />
          <ul className="max-w-3xl border-t border-rule">
            {RLE_EVIDENCE.map((e) => (
              <li key={e} className="flex gap-4 border-b border-rule py-4 text-[15px] text-ink">
                <span aria-hidden className="font-mono text-[12px] leading-[1.6] text-accent">✓</span>
                {e}
              </li>
            ))}
            <li className="flex gap-4 border-b border-rule py-4 text-[15px] text-ink">
              <span aria-hidden className="font-mono text-[12px] leading-[1.6] text-accent">✓</span>
              <span>
                Granite 4.2 8B solved one ORI development smoke episode.
                <span className="mt-1.5 block text-[13px] text-ink-2">
                  One successful development smoke task&mdash;not a 70-task score or a publishable
                  model comparison.
                </span>
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 7. Design-partner pilot */}
      <section className={`${section} bg-paper-2`}>
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHeader
            descriptionClassName="text-ink-2"
            eyebrow="Design-partner pilot"
            title="Start with five tasks and one agent configuration."
            className="mb-10"
          />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div className="panel p-6 sm:p-8">
              <p className="mono-label text-ink-2">Pilot includes</p>
              <ul className="mt-5 space-y-3">
                {RLE_PILOT_INCLUDES.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] text-ink">
                    <span aria-hidden className="font-mono text-[11px] leading-[1.7] text-accent">→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-rule pt-6">
                <p className="mono-label text-ink-2">Design-partner pilot anchor</p>
                <p className="mt-3 text-[1.35rem] font-semibold text-ink">
                  Five-task design-partner pilots start at $50,000
                </p>
                <p className="mt-2 text-[13px] text-ink-2">
                  Subject to final scope, license approval, and signed agreement.
                </p>
              </div>
            </div>

            <div className="space-y-5 text-[14px] leading-[1.7] text-ink-2">
              <p>
                <span className="text-ink">Your model can stay where it is.</span> At the starting
                price, the customer&rsquo;s model may remain behind its own secured endpoint while
                task execution and private grading stay ChipGPT-managed.
              </p>
              <p>
                <span className="text-ink">Other deployments are scoped separately.</span>{" "}
                Customer-VPC and connected on-premise execution are separately scoped. Fully
                air-gapped execution is a custom option subject to technical, licensing, and
                security readiness approval.
              </p>
              <p>
                <span className="text-ink">Credit toward the full suite.</span> If you expand to a
                complete-suite agreement within the contractually stated window, the task-license
                portion of the pilot is credited. Deployment fees are non-creditable.
              </p>
              <p>
                <span className="text-ink">Rights.</span> The standard pilot includes a 90-day
                license for internal evaluation and internal model training / improvement. You
                retain your generated weights, outputs, and patches, subject to the
                agreement&rsquo;s underlying rights. Continued task access, publication, and
                redistribution require a separate written grant.
              </p>
              <p className="text-[13px] text-ink-2">
                API / compute charges, commercial EDA tools, and custom integrations are separate
                unless stated in the order form.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className={section}>
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHeader eyebrow="FAQ" title="Questions buyers ask." className="mb-10" />
          <div className="max-w-3xl">
            <RleFaq />
          </div>
        </div>
      </section>

      {/* 9. Final CTA + form */}
      <section id={RLE_FORM_ID} className={`${section} scroll-mt-14`} aria-labelledby="cta-title">
        <div className={`${container} py-16 lg:py-24`}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2
                id="cta-title"
                className="max-w-[20ch] text-balance font-serif text-[2rem] leading-[1.12] tracking-[-0.015em] text-ink sm:text-[2.5rem]"
              >
                Put your model in front of executable silicon-engineering work.
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-2">
                Request a 25-minute technical briefing about a paid five-task design-partner pilot.
                We&rsquo;ll walk through task design, grading, and how your model or agent harness
                would connect.
              </p>
            </div>
            <RleBriefingForm />
          </div>
        </div>
      </section>
    </>
  );
}
