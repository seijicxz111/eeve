import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import { cn } from "../../../utilities";

export interface PopoverProps extends Omit<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>,
  "children"
> {
  align?: "start" | "center" | "end";
  children: React.ReactNode;
  title?: React.ReactNode;
  trigger: React.ReactNode;
}

export function Popover({
  align = "center",
  children,
  title,
  trigger,
  ...props
}: PopoverProps) {
  return (
    <PopoverPrimitive.Root {...props}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={align}
          sideOffset={8}
          className={cn(
            "z-[var(--z-overlay)] w-72 rounded-lg border border-border bg-surface-raised p-4 text-foreground shadow-md",
            "data-[state=open]:animate-in data-[state=closed]:animate-out"
          )}
        >
          {title ? <h3 className="mb-2 text-sm font-semibold">{title}</h3> : null}
          {children}
          <PopoverPrimitive.Arrow className="fill-surface-raised" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
