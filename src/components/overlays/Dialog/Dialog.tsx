import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import * as React from "react";

import { useLockBodyScroll, useReducedMotion } from "../../../hooks";
import { cn } from "../../../utilities";
import { Button } from "../../primitives/Button";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  full: "h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)]"
};

export interface DialogProps extends Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>,
  "children"
> {
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  size?: keyof typeof sizeClasses;
  title: React.ReactNode;
  trigger?: React.ReactNode;
}

export function Dialog({
  children,
  closeOnOverlayClick = true,
  defaultOpen = false,
  description,
  footer,
  onOpenChange,
  open,
  size = "md",
  title,
  trigger,
  ...props
}: DialogProps) {
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

  return (
    <DialogPrimitive.Root open={currentOpen} onOpenChange={handleOpenChange} {...props}>
      {trigger ? (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      ) : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[var(--z-modal)] bg-background/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <DialogPrimitive.Content
          asChild
          onPointerDownOutside={(event) => {
            if (!closeOnOverlayClick) {
              event.preventDefault();
            }
          }}
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={cn(
              "fixed left-1/2 top-1/2 z-[var(--z-modal)] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-surface-raised p-0 text-foreground shadow-lg",
              sizeClasses[size]
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
            <div className="p-5">{children}</div>
            {footer ? <div className="border-t border-border p-4">{footer}</div> : null}
            <DialogPrimitive.Close asChild>
              <Button
                aria-label="Close dialog"
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
