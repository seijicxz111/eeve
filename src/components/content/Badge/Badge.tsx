import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../../utilities";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        neutral: "border-border bg-muted text-foreground",
        primary: "border-primary/25 bg-primary/10 text-foreground",
        secondary: "border-secondary/25 bg-secondary/10 text-foreground",
        success: "border-success/25 bg-success/10 text-foreground",
        warning: "border-warning/30 bg-warning/15 text-foreground",
        error: "border-error/25 bg-error/10 text-foreground",
        info: "border-info/25 bg-info/10 text-foreground"
      }
    },
    defaultVariants: {
      variant: "neutral"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
);

Badge.displayName = "Badge";
