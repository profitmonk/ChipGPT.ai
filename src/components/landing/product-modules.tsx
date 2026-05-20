"use client";

import { GlowCard } from "@/components/landing/glow-card";
import { SectionHeader } from "@/components/landing/section-header";
import { Badge } from "@/components/ui/badge";
import { PRODUCT_MODULES } from "@/lib/content";

export function ProductModules() {
  return (
    <section id="modules" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Product Modules"
          title="Specialized agents for every stage of the chip lifecycle"
          description="Deploy co-workers where your teams spend the most time—from first RTL draft through field failure analysis."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <GlowCard key={mod.title} delay={i * 0.05} className="flex flex-col">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-cyan-500/10">
                    <Icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <Badge variant="default">{mod.tag}</Badge>
                </div>
                <h3 className="text-base font-semibold text-white">{mod.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                  {mod.description}
                </p>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
