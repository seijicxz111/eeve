import * as React from "react";

import { cn } from "../../../utilities";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  decorative?: boolean;
  orientation?: "horizontal" | "vertical";
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <hr
      ref={ref}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 border-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full min-h-4 w-px",
        className
      )}
      role={decorative ? "presentation" : "separator"}
      {...props}
    />
  )
);

Divider.displayName = "Divider";
