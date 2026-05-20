"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section id="demo" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black px-8 py-16 text-center sm:px-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.12),transparent_60%)]" />
          <div className="relative">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-cyan-400/80">
              Early Access
            </p>
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              The AI Operating Layer for Semiconductor Teams
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Join leading fabless and IDM programs deploying governed AI co-workers
              across the full chip lifecycle.
            </p>
            <Button size="lg" className="mt-10" variant="glow">
              Request Early Access
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
