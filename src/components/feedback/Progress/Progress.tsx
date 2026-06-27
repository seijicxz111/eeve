import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "../../../utilities";

export interface ProgressProps extends React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> {
  showValue?: boolean;
  valueLabel?: string;
}

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, showValue = false, value = 0, valueLabel, ...props }, ref) => {
  const safeValue = Math.min(100, Math.max(0, value ?? 0));

  return (
    <div className="space-y-2">
      <ProgressPrimitive.Root
        ref={ref}
        value={safeValue}
        className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
        aria-label={valueLabel}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full rounded-full bg-primary transition-transform duration-200 motion-reduce:transition-none"
          style={{ transform: `translateX(-${100 - safeValue}%)` }}
        />
      </ProgressPrimitive.Root>
      {showValue ? (
        <p className="text-xs font-medium text-muted-foreground">{safeValue}% complete</p>
      ) : null}
    </div>
  );
});

Progress.displayName = "Progress";
