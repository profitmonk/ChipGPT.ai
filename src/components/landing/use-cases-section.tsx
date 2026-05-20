"use client";

import { GlowCard } from "@/components/landing/glow-card";
import { SectionHeader } from "@/components/landing/section-header";
import { USE_CASES } from "@/lib/content";

export function UseCasesSection() {
  return (
    <section id="use-cases" className="border-y border-white/10 bg-white/[0.02] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Use Cases"
          title="Built for every role on your semiconductor team"
          description="From RTL to the boardroom—ChipGPT adapts to how each persona works, with governed outputs and traceable reasoning."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((persona, i) => {
            const Icon = persona.icon;
            return (
              <GlowCard key={persona.persona} delay={i * 0.06}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{persona.persona}</h3>
                </div>
                <ul className="space-y-2.5">
                  {persona.cases.map((c) => (
                    <li key={c} className="flex gap-2.5 text-sm leading-relaxed text-zinc-400">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400/60" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
