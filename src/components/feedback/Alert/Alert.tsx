import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../../utilities";

const alertVariants = cva("rounded-lg border p-4 text-sm", {
  variants: {
    variant: {
      neutral: "border-border bg-surface text-foreground",
      success: "border-success/25 bg-success/10 text-foreground",
      warning: "border-warning/30 bg-warning/15 text-foreground",
      error: "border-error/25 bg-error/10 text-foreground",
      info: "border-info/25 bg-info/10 text-foreground"
    }
  },
  defaultVariants: {
    variant: "neutral"
  }
});

export interface AlertProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  actions?: React.ReactNode;
  icon?: React.ReactNode;
  title?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ actions, children, className, icon, title, variant, ...props }, ref) => (
    <div
      ref={ref}
      role={variant === "error" || variant === "warning" ? "alert" : "status"}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <div className="flex gap-3">
        {icon ? (
          <div className="mt-0.5 shrink-0 text-muted-foreground">{icon}</div>
        ) : null}
        <div className="min-w-0 flex-1 space-y-1">
          {title ? <h3 className="font-semibold text-foreground">{title}</h3> : null}
          {children ? <div className="text-foreground">{children}</div> : null}
          {actions ? <div className="pt-2">{actions}</div> : null}
        </div>
      </div>
    </div>
  )
);

Alert.displayName = "Alert";
