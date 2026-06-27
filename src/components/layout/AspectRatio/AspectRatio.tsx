import * as React from "react";

import { cn } from "../../../utilities";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 16 / 9, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: `${ratio}`, ...style }}
      {...props}
    />
  )
);

AspectRatio.displayName = "AspectRatio";
