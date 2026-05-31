import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/[0.04] text-zinc-400",
        accent: "border-green-500/30 bg-green-500/10 text-green-400",
        success: "border-green-500/25 bg-green-500/8 text-green-400",
        warn: "border-amber-500/25 bg-amber-500/8 text-amber-400",
        neutral: "border-white/10 bg-white/[0.02] text-zinc-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
