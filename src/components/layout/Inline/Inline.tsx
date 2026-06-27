import * as React from "react";

import { cn } from "../../../utilities";

const gapClasses = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
} as const;

export interface InlineProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: keyof typeof gapClasses;
  align?: "start" | "center" | "end" | "stretch";
  wrap?: boolean;
}

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch"
};

export const Inline = React.forwardRef<HTMLDivElement, InlineProps>(
  ({ align = "center", className, gap = 3, wrap = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex min-w-0 flex-row",
        wrap ? "flex-wrap" : "flex-nowrap",
        gapClasses[gap],
        alignClasses[align],
        className
      )}
      {...props}
    />
  )
);

Inline.displayName = "Inline";
