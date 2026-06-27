import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../../utilities";

export const spinnerVariants = cva("inline-block animate-spin rounded-full border-2", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-5",
      lg: "size-6"
    },
    tone: {
      current: "border-current border-t-transparent",
      primary: "border-primary/30 border-t-primary",
      muted: "border-muted-foreground/30 border-t-muted-foreground"
    }
  },
  defaultVariants: {
    size: "md",
    tone: "current"
  }
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof spinnerVariants> {
  label?: string;
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, tone, label = "Loading", ...props }, ref) => (
    <span
      ref={ref}
      aria-label={label}
      role="status"
      className={cn(spinnerVariants({ size, tone }), className)}
      {...props}
    />
  )
);

Spinner.displayName = "Spinner";
