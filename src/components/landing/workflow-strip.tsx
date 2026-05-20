"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { WORKFLOW_STEPS } from "@/lib/content";

export function WorkflowStrip() {
  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500"
        >
          Trusted workflow across the semiconductor lifecycle
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {WORKFLOW_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-2 sm:gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-cyan-500/30 hover:text-white">
                {step}
              </span>
              {i < WORKFLOW_STEPS.length - 1 && (
                <ChevronRight className="hidden h-4 w-4 text-zinc-600 sm:block" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
