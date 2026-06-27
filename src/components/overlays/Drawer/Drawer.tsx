import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import * as React from "react";

import { useLockBodyScroll, useReducedMotion } from "../../../hooks";
import { cn } from "../../../utilities";
import { Button } from "../../primitives/Button";

const sideClasses = {
  left: "left-0 top-0 h-dvh border-r",
  right: "right-0 top-0 h-dvh border-l",
  top: "left-0 top-0 w-full border-b",
  bottom: "bottom-0 left-0 w-full border-t"
};

const sizeClasses = {
  sm: "w-full max-w-sm",
  md: "w-full max-w-md",
  lg: "w-full max-w-xl",
  full: "w-full max-w-none"
};

export interface DrawerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>,
  "children"
> {
  children: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  side?: keyof typeof sideClasses;
  size?: keyof typeof sizeClasses;
  title: React.ReactNode;
  trigger?: React.ReactNode;
}

export function Drawer({
  children,
  defaultOpen = false,
  description,
  footer,
  onOpenChange,
  open,
  side = "right",
  size = "md",
  title,
  trigger,
  ...props
}: DrawerProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const currentOpen = open ?? internalOpen;
  const reduceMotion = useReducedMotion();
  useLockBodyScroll(currentOpen);

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (open === undefined) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [onOpenChange, open]
  );

  const initial =
    reduceMotion || side === "right"
      ? { x: "100%" }
      : side === "left"
        ? { x: "-100%" }
        : side === "top"
          ? { y: "-100%" }
          : { y: "100%" };

  return (
    <DialogPrimitive.Root open={currentOpen} onOpenChange={handleOpenChange} {...props}>
      {trigger ? (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      ) : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[var(--z-modal)] bg-background/70 backdrop-blur-sm" />
        <DialogPrimitive.Content asChild>
          <motion.div
            initial={reduceMotion ? false : initial}
            animate={reduceMotion ? undefined : { x: 0, y: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "fixed z-[var(--z-modal)] flex flex-col border-border bg-surface-raised text-foreground shadow-lg",
              sideClasses[side],
              side === "top" || side === "bottom" ? "max-h-[85dvh]" : sizeClasses[size]
            )}
          >
            <div className="space-y-1 border-b border-border p-5 pr-12">
              <DialogPrimitive.Title className="text-lg font-semibold leading-snug">
                {title}
              </DialogPrimitive.Title>
              {description ? (
                <DialogPrimitive.Description className="text-sm text-muted-foreground">
                  {description}
                </DialogPrimitive.Description>
              ) : null}
            </div>
            <div className="flex-1 overflow-auto p-5">{children}</div>
            {footer ? <div className="border-t border-border p-4">{footer}</div> : null}
            <DialogPrimitive.Close asChild>
              <Button
                aria-label="Close drawer"
                className="absolute right-4 top-4"
                size="icon"
                variant="ghost"
              >
                x
              </Button>
            </DialogPrimitive.Close>
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
