import * as React from "react";

import { cn } from "../../../utilities";
import { Button, type ButtonProps } from "../../primitives/Button";

export interface EmptyStateAction {
  label: string;
  onClick?: ButtonProps["onClick"];
}

export interface EmptyStateProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  action?: EmptyStateAction;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  title: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ action, className, description, icon, title, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface p-8 text-center",
        className
      )}
      {...props}
    >
      {icon ? <div className="mb-4 text-muted-foreground">{icon}</div> : null}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? (
        <Button className="mt-5" onClick={action.onClick}>
          {action.label}
        </Button>
      ) : null}
    </div>
  )
);

EmptyState.displayName = "EmptyState";
