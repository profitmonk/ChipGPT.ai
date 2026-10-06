import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default: "border-rule bg-ink/[0.03] text-ink-2",
        accent: "border-accent/25 bg-accent-soft text-accent",
        success: "border-accent/25 bg-accent-soft text-accent",
        warn: "border-amber-700/30 bg-amber-50 text-amber-800",
        neutral: "border-rule bg-ink/[0.03] text-ink-3",
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
