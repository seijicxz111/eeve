import * as React from "react";

import { cn } from "../../../utilities";

const columnsClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  auto: "grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))]"
} as const;

const gapClasses = {
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8"
} as const;

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: keyof typeof columnsClasses;
  gap?: keyof typeof gapClasses;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, columns = "auto", gap = 4, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid min-w-0", columnsClasses[columns], gapClasses[gap], className)}
      {...props}
    />
  )
);

Grid.displayName = "Grid";
