import * as React from "react";

import { cn } from "../../../utilities";

type TypographyVariant =
  "display" | "h1" | "h2" | "h3" | "h4" | "lead" | "body" | "small" | "muted" | "caption";

const variantClasses: Record<TypographyVariant, string> = {
  display: "text-4xl font-bold leading-tight text-foreground md:text-5xl",
  h1: "text-3xl font-bold leading-tight text-foreground",
  h2: "text-2xl font-semibold leading-snug text-foreground",
  h3: "text-xl font-semibold leading-snug text-foreground",
  h4: "text-lg font-semibold leading-snug text-foreground",
  lead: "text-lg leading-relaxed text-muted-foreground",
  body: "text-base leading-normal text-foreground",
  small: "text-sm leading-normal text-foreground",
  muted: "text-sm leading-normal text-muted-foreground",
  caption: "text-xs font-medium uppercase tracking-wide text-muted-foreground"
};

const defaultElement: Record<TypographyVariant, React.ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  lead: "p",
  body: "p",
  small: "p",
  muted: "p",
  caption: "span"
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?: TypographyVariant;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as, className, variant = "body", ...props }, ref) => {
    const Component = as ?? defaultElement[variant];
    return (
      <Component
        ref={ref}
        className={cn(variantClasses[variant], className)}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";
