"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/landing/section-header";
import { ARCHITECTURE_LAYERS } from "@/lib/content";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Architecture"
          title="Four layers built for semiconductor-grade reliability"
          description="A governed stack that combines reasoning, domain compute, institutional knowledge, and human oversight."
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-2xl"
        >
          <div className="absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-500/50 via-white/10 to-transparent" />
          <div className="space-y-4">
            {ARCHITECTURE_LAYERS.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-transparent p-6 backdrop-blur-xl transition-shadow hover:border-cyan-500/20 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]"
                >
                  <div className="absolute -left-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-500/40 bg-zinc-950 sm:flex">
                    <span className="text-[10px] font-bold text-cyan-400">{4 - i}</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-cyan-500/10">
                      <Icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{layer.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
