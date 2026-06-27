import * as NavigationPrimitive from "@radix-ui/react-navigation-menu";
import * as React from "react";

import { cn } from "../../../utilities";

export interface NavigationMenuItem {
  active?: boolean;
  description?: string;
  href: string;
  label: React.ReactNode;
}

export interface NavigationMenuProps extends Omit<
  React.ComponentPropsWithoutRef<typeof NavigationPrimitive.Root>,
  "children"
> {
  items: NavigationMenuItem[];
}

export const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationPrimitive.Root>,
  NavigationMenuProps
>(({ className, items, ...props }, ref) => (
  <NavigationPrimitive.Root
    ref={ref}
    className={cn("relative z-10", className)}
    {...props}
  >
    <NavigationPrimitive.List className="flex flex-wrap items-center gap-1">
      {items.map((item) => (
        <NavigationPrimitive.Item key={item.href}>
          <NavigationPrimitive.Link asChild active={item.active}>
            <a
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground",
                "hover:bg-muted hover:text-foreground focus-visible:outline-focus-ring",
                item.active && "bg-muted text-foreground"
              )}
            >
              <span>{item.label}</span>
              {item.description ? (
                <span className="sr-only">, {item.description}</span>
              ) : null}
            </a>
          </NavigationPrimitive.Link>
        </NavigationPrimitive.Item>
      ))}
    </NavigationPrimitive.List>
  </NavigationPrimitive.Root>
));

NavigationMenu.displayName = "NavigationMenu";
