"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function GlowCard({ children, className, delay = 0 }: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={cn(
        "group relative rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl",
        "transition-shadow duration-300 hover:border-white/20",
        "hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at 50% 50%, rgba(34,211,238, 0.06), transparent 40%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
