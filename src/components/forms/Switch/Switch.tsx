import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "../../../utilities";
import { Field } from "../Field";

export interface SwitchProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
  "children"
> {
  description?: React.ReactNode;
  error?: React.ReactNode;
  label?: React.ReactNode;
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, description, disabled, error, id, label, required, ...props }, ref) => (
  <Field
    id={id}
    label={label}
    description={description}
    error={error}
    disabled={disabled}
    required={required}
  >
    {(field) => (
      <SwitchPrimitive.Root
        ref={ref}
        id={field.id}
        disabled={disabled}
        required={required}
        aria-describedby={field.describedBy}
        aria-invalid={field.invalid || undefined}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 rounded-full border border-transparent bg-input shadow-inner",
          "transition-colors duration-150 data-[state=checked]:bg-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          field.invalid && "ring-2 ring-error",
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block size-5 translate-x-0 rounded-full bg-surface shadow-sm ring-0",
            "transition-transform duration-150 data-[state=checked]:translate-x-5"
          )}
        />
      </SwitchPrimitive.Root>
    )}
  </Field>
));

Switch.displayName = "Switch";
