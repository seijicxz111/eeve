import * as React from "react";

import { cn } from "../../../utilities";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ animated = true, className, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "rounded-md bg-muted",
        animated && "animate-pulse motion-reduce:animate-none",
        className
      )}
      {...props}
    />
  )
);

Skeleton.displayName = "Skeleton";
