import * as React from "react";

import { cn } from "../../../utilities";

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  block?: boolean;
}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ block = false, className, ...props }, ref) => {
    const Component = block ? "pre" : "code";
    return React.createElement(Component, {
      ref,
      className: cn(
        "font-mono text-sm",
        block
          ? "overflow-x-auto rounded-md border border-border bg-muted p-4 text-foreground"
          : "rounded-sm bg-muted px-1.5 py-0.5 text-foreground",
        className
      ),
      ...props
    });
  }
);

Code.displayName = "Code";
