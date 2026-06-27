import * as React from "react";

import { cn } from "../../../utilities";

export interface BreadcrumbItem {
  current?: boolean;
  href?: string;
  label: React.ReactNode;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, separator = "/", ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn("text-sm", className)}
      {...props}
    >
      <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.href ?? `breadcrumb-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">{separator}</span> : null}
            {item.href && !item.current ? (
              <a
                className="rounded-sm hover:text-foreground focus-visible:outline-focus-ring"
                href={item.href}
              >
                {item.label}
              </a>
            ) : (
              <span
                aria-current={item.current ? "page" : undefined}
                className="text-foreground"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
);

Breadcrumb.displayName = "Breadcrumb";
