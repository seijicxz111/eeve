import * as React from "react";

import { cn } from "../../../utilities";
import { Badge, type BadgeProps } from "../Badge";
import { Card, CardContent } from "../Card";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  description?: string;
  trend?: string;
  trendVariant?: BadgeProps["variant"];
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    { className, description, label, trend, trendVariant = "neutral", value, ...props },
    ref
  ) => (
    <Card ref={ref} className={cn("min-w-0", className)} {...props}>
      <CardContent className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {trend ? <Badge variant={trendVariant}>{trend}</Badge> : null}
        </div>
        <div className="text-2xl font-bold leading-tight text-foreground">{value}</div>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </CardContent>
    </Card>
  )
);

StatCard.displayName = "StatCard";
