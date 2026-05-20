"use client";

import { motion } from "framer-motion";
import { Activity, Cpu, ShieldCheck, Timer, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DASHBOARD_METRICS } from "@/lib/content";

const statusVariant = {
  good: "success" as const,
  warn: "warn" as const,
  neutral: "default" as const,
};

const activityFeed = [
  { time: "14:32", event: "Yield agent correlated Lot #A-4412 excursion to etch chamber drift" },
  { time: "14:18", event: "Verification co-worker closed 3 coverage holes in PCIe subsystem" },
  { time: "13:55", event: "Bring-up assistant proposed JTAG sweep for PLL lock failure" },
  { time: "13:41", event: "FAE knowledge graph matched errata E-2024-17 to customer escalation" },
];

export function DashboardMock() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="absolute -inset-4 rounded-2xl bg-cyan-500/10 blur-3xl" aria-hidden />
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/90 shadow-[0_0_80px_rgba(34,211,238,0.12)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <span className="font-mono text-xs text-zinc-400">chipgpt.ops / program-alpha</span>
          </div>
          <Badge variant="accent" className="font-mono text-[10px]">
            LIVE
          </Badge>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2">
          {DASHBOARD_METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-3"
            >
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                {metric.label}
              </p>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-mono text-lg font-medium text-white">
                  {metric.value}
                </span>
                <Badge variant={statusVariant[metric.status]} className="text-[10px]">
                  {metric.status === "good" ? "OK" : metric.status === "warn" ? "!" : "—"}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-2 text-xs text-zinc-500">
            <Activity className="h-3.5 w-3.5 text-cyan-400" />
            Agent activity stream
          </div>
          <div className="space-y-2.5">
            {activityFeed.map((item, i) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex gap-3 rounded-md border border-white/5 bg-white/[0.02] px-3 py-2"
              >
                <span className="shrink-0 font-mono text-[10px] text-cyan-400/80">
                  {item.time}
                </span>
                <p className="text-xs leading-relaxed text-zinc-400">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 bg-white/[0.02] px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[10px] text-zinc-500">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            Human approval required for tapeout actions
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400">
            <TrendingUp className="h-3 w-3" />
            <Timer className="h-3 w-3" />
            +312h saved
          </div>
        </div>
      </div>
    </motion.div>
  );
}
