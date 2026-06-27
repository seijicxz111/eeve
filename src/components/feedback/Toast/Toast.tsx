import * as ToastPrimitive from "@radix-ui/react-toast";
import * as React from "react";

import { cn, createId } from "../../../utilities";
import { Button } from "../../primitives/Button";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  action?: ToastAction;
  description?: React.ReactNode;
  duration?: number;
  id?: string;
  title: React.ReactNode;
  variant?: ToastVariant;
}

interface ToastRecord extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  dismiss: (id: string) => void;
  toast: (options: ToastOptions) => string;
  toasts: ToastRecord[];
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

const variantClasses: Record<ToastVariant, string> = {
  success: "border-success/30",
  error: "border-error/30",
  warning: "border-warning/30",
  info: "border-info/30"
};

export interface ToastProviderProps {
  children: React.ReactNode;
  defaultDuration?: number;
  maxVisible?: number;
}

export function ToastProvider({
  children,
  defaultDuration = 5000,
  maxVisible = 5
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastRecord[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = React.useCallback(
    (options: ToastOptions) => {
      const id = options.id ?? createId("toast");
      setToasts((current) => [{ ...options, id }, ...current].slice(0, maxVisible));
      return id;
    },
    [maxVisible]
  );

  const value = React.useMemo(
    () => ({
      dismiss,
      toast,
      toasts
    }),
    [dismiss, toast, toasts]
  );

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider duration={defaultDuration} swipeDirection="right">
        {children}
        {toasts.map((record) => (
          <ToastItem key={record.id} toast={record} onDismiss={dismiss} />
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-[var(--z-toast)] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3 outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

function ToastItem({
  onDismiss,
  toast
}: {
  onDismiss: (id: string) => void;
  toast: ToastRecord;
}) {
  const variant = toast.variant ?? "info";

  return (
    <ToastPrimitive.Root
      duration={toast.duration}
      onOpenChange={(open) => {
        if (!open) {
          onDismiss(toast.id);
        }
      }}
      className={cn(
        "rounded-lg border bg-surface-raised p-4 text-foreground shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
        "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
        variantClasses[variant]
      )}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <ToastPrimitive.Title className="text-sm font-semibold">
            {toast.title}
          </ToastPrimitive.Title>
          {toast.description ? (
            <ToastPrimitive.Description className="mt-1 text-sm text-muted-foreground">
              {toast.description}
            </ToastPrimitive.Description>
          ) : null}
          {toast.action ? (
            <ToastPrimitive.Action asChild altText={toast.action.label}>
              <Button
                className="mt-3"
                size="sm"
                variant="outline"
                onClick={toast.action.onClick}
              >
                {toast.action.label}
              </Button>
            </ToastPrimitive.Action>
          ) : null}
        </div>
        <ToastPrimitive.Close
          aria-label="Dismiss notification"
          className="rounded-sm px-1 text-muted-foreground hover:text-foreground focus-visible:outline-focus-ring"
        >
          x
        </ToastPrimitive.Close>
      </div>
    </ToastPrimitive.Root>
  );
}

export function useToast(): ToastContextValue {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider.");
  }

  return context;
}
