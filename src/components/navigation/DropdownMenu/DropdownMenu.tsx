import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import * as React from "react";

import { cn } from "../../../utilities";

export interface DropdownMenuActionItem {
  disabled?: boolean;
  inset?: boolean;
  label: React.ReactNode;
  onSelect?: () => void;
  shortcut?: string;
  type?: "item";
}

export interface DropdownMenuSeparatorItem {
  type: "separator";
}

export type DropdownMenuItem = DropdownMenuActionItem | DropdownMenuSeparatorItem;

export interface DropdownMenuProps {
  align?: "start" | "center" | "end";
  items: DropdownMenuItem[];
  trigger: React.ReactNode;
}

export function DropdownMenu({ align = "end", items, trigger }: DropdownMenuProps) {
  return (
    <DropdownPrimitive.Root>
      <DropdownPrimitive.Trigger asChild>{trigger}</DropdownPrimitive.Trigger>
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content
          align={align}
          sideOffset={6}
          className={cn(
            "z-[var(--z-dropdown)] min-w-44 rounded-md border border-border bg-surface-raised p-1 text-foreground shadow-md",
            "data-[state=open]:animate-in data-[state=closed]:animate-out"
          )}
        >
          {items.map((item, index) =>
            item.type === "separator" ? (
              <DropdownPrimitive.Separator key={index} className="my-1 h-px bg-border" />
            ) : (
              <DropdownPrimitive.Item
                key={`dropdown-item-${index}`}
                disabled={item.disabled}
                onSelect={item.onSelect}
                className={cn(
                  "flex cursor-default select-none items-center justify-between gap-4 rounded-sm px-3 py-2 text-sm outline-none",
                  "focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  item.inset && "pl-8"
                )}
              >
                <span>{item.label}</span>
                {item.shortcut ? (
                  <span className="text-xs text-muted-foreground">{item.shortcut}</span>
                ) : null}
              </DropdownPrimitive.Item>
            )
          )}
        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Root>
  );
}
