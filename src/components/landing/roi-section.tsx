"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/landing/section-header";
import { Badge } from "@/components/ui/badge";
import { ROI_MODULES } from "@/lib/content";
import { cn } from "@/lib/utils";

const impactColor: Record<string, string> = {
  Highest: "text-cyan-300 border-cyan-500/40",
  "Very High": "text-emerald-300 border-emerald-500/40",
  High: "text-white border-white/20",
  "Medium-High": "text-zinc-300 border-zinc-500/30",
};

export function RoiSection() {
  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Highest ROI"
          title="Where ChipGPT delivers the fastest payback"
          description="Ranked by measured impact across yield, bring-up, verification, and field operations at leading semiconductor programs."
        />
        <div className="space-y-3">
          {ROI_MODULES.map((item, i) => (
            <motion.div
              key={item.rank}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
              className="group flex flex-col gap-4 rounded-xl border border-white/10 bg-zinc-950/50 p-5 backdrop-blur-sm transition-all hover:border-white/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.06)] sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 font-mono text-sm font-bold text-cyan-400">
                  {item.rank}
                </span>
                <div>
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <p className="mt-0.5 font-mono text-xs text-zinc-500">{item.metric}</p>
                </div>
              </div>
              <Badge
                className={cn(
                  "w-fit shrink-0 border",
                  impactColor[item.impact] ?? impactColor.High
                )}
              >
                <TrendingUp className="mr-1 h-3 w-3" />
                {item.impact} impact
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
