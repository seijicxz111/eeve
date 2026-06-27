import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "../../../utilities";

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  delayDuration?: number;
  side?: "top" | "right" | "bottom" | "left";
}

export function Tooltip({
  children,
  content,
  delayDuration = 300,
  side = "top"
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={6}
            className={cn(
              "z-[var(--z-tooltip)] max-w-xs rounded-md bg-foreground px-3 py-1.5 text-xs text-background shadow-md",
              "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out"
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-foreground" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
