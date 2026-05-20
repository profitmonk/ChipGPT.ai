"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/landing/section-header";
import { MOAT_ITEMS } from "@/lib/content";

export function MoatSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Competitive Moat"
          title="Why ChipGPT wins in semiconductor AI"
          description="Generic LLMs cannot replicate domain depth, lifecycle memory, and EDA-native integrations at tapeout scale."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOAT_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition-all hover:border-cyan-500/20 hover:shadow-[0_0_40px_rgba(34,211,238,0.06)]"
              >
                <Icon className="mb-4 h-8 w-8 text-cyan-400" />
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6 text-center"
        >
          <p className="text-sm text-zinc-300">
            <span className="font-medium text-cyan-300">Agent memory</span> persists
            across design revisions, test program updates, yield excursions, and field
            failures—so every co-worker gets smarter with your program, not just your
            latest prompt.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
