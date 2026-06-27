import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as React from "react";

import { cn } from "../../../utilities";
import { Button } from "../../primitives/Button";

export interface ConfirmDialogProps extends Omit<
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root>,
  "children"
> {
  cancelLabel?: string;
  confirmLabel?: string;
  description: React.ReactNode;
  onConfirm: () => void;
  title: React.ReactNode;
  trigger: React.ReactNode;
  variant?: "default" | "destructive";
}

export function ConfirmDialog({
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  description,
  onConfirm,
  title,
  trigger,
  variant = "default",
  ...props
}: ConfirmDialogProps) {
  return (
    <AlertDialogPrimitive.Root {...props}>
      <AlertDialogPrimitive.Trigger asChild>{trigger}</AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 z-[var(--z-modal)] bg-background/70 backdrop-blur-sm" />
        <AlertDialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-[var(--z-modal)] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-surface-raised p-5 text-foreground shadow-lg"
          )}
        >
          <AlertDialogPrimitive.Title className="text-lg font-semibold">
            {title}
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description className="mt-2 text-sm text-muted-foreground">
            {description}
          </AlertDialogPrimitive.Description>
          <div className="mt-5 flex justify-end gap-3">
            <AlertDialogPrimitive.Cancel asChild>
              <Button variant="outline">{cancelLabel}</Button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <Button
                variant={variant === "destructive" ? "destructive" : "primary"}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
