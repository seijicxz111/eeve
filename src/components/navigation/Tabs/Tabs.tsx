import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "../../../utilities";

export interface TabItem {
  content: React.ReactNode;
  disabled?: boolean;
  label: React.ReactNode;
  value: string;
}

export interface TabsProps extends Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
  "children"
> {
  items: TabItem[];
  listClassName?: string;
}

export const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, items, listClassName, ...props }, ref) => (
  <TabsPrimitive.Root ref={ref} className={cn("w-full", className)} {...props}>
    <TabsPrimitive.List
      className={cn(
        "inline-flex min-h-10 items-center rounded-md border border-border bg-muted p-1",
        listClassName
      )}
    >
      {items.map((item) => (
        <TabsPrimitive.Trigger
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className={cn(
              "inline-flex h-8 items-center justify-center whitespace-nowrap rounded-sm px-3 text-sm font-medium text-foreground",
            "transition-colors hover:text-foreground",
            "data-[state=active]:bg-surface data-[state=active]:text-foreground data-[state=active]:shadow-xs",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          {item.label}
        </TabsPrimitive.Trigger>
      ))}
    </TabsPrimitive.List>
    {items.map((item) => (
      <TabsPrimitive.Content
        key={item.value}
        value={item.value}
        className="mt-4 focus-visible:outline-focus-ring"
      >
        {item.content}
      </TabsPrimitive.Content>
    ))}
  </TabsPrimitive.Root>
));

Tabs.displayName = "Tabs";
