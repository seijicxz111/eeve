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
  8: "gap-8",
  10: "gap-10",
  12: "gap-12"
} as const;

type Gap = keyof typeof gapClasses;

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: Gap;
  align?: "start" | "center" | "end" | "stretch";
}

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch"
};

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ align = "stretch", className, gap = 4, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex min-w-0 flex-col",
        gapClasses[gap],
        alignClasses[align],
        className
      )}
      {...props}
    />
  )
);

Stack.displayName = "Stack";
