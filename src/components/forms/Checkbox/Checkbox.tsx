import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";

import { cn } from "../../../utilities";
import { Field } from "../Field";

export interface CheckboxProps extends Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  "children"
> {
  description?: React.ReactNode;
  error?: React.ReactNode;
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
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
      <CheckboxPrimitive.Root
        ref={ref}
        id={field.id}
        disabled={disabled}
        required={required}
        aria-describedby={field.describedBy}
        aria-invalid={field.invalid || undefined}
        className={cn(
          "flex size-5 items-center justify-center rounded-sm border border-input bg-surface shadow-xs",
          "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          field.invalid && "border-error",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="block size-2.5 rounded-[2px] bg-primary-foreground" />
      </CheckboxPrimitive.Root>
    )}
  </Field>
));

Checkbox.displayName = "Checkbox";
