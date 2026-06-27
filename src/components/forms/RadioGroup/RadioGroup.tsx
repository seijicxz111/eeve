import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";

import { cn } from "../../../utilities";
import { Field } from "../Field";

export interface RadioOption {
  description?: string;
  disabled?: boolean;
  label: string;
  value: string;
}

export interface RadioGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  "children"
> {
  description?: React.ReactNode;
  error?: React.ReactNode;
  label?: React.ReactNode;
  options: RadioOption[];
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    { className, description, disabled, error, id, label, options, required, ...props },
    ref
  ) => (
    <Field
      id={id}
      label={label}
      description={description}
      error={error}
      disabled={disabled}
      required={required}
    >
      {(field) => (
        <RadioGroupPrimitive.Root
          ref={ref}
          id={field.id}
          aria-labelledby={label ? field.labelId : undefined}
          aria-describedby={field.describedBy}
          aria-invalid={field.invalid || undefined}
          className={cn("grid gap-3", className)}
          disabled={disabled}
          required={required}
          {...props}
        >
          {options.map((option) => {
            const optionId = `${field.id}-${option.value}`;
            return (
              <div key={option.value} className="flex items-start gap-3">
                <RadioGroupPrimitive.Item
                  id={optionId}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    "mt-0.5 flex size-5 items-center justify-center rounded-full border border-input bg-surface shadow-xs",
                    "data-[state=checked]:border-primary",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                >
                  <RadioGroupPrimitive.Indicator className="size-2.5 rounded-full bg-primary" />
                </RadioGroupPrimitive.Item>
                <label htmlFor={optionId} className="grid gap-0.5 text-sm">
                  <span className="font-medium text-foreground">{option.label}</span>
                  {option.description ? (
                    <span className="text-muted-foreground">{option.description}</span>
                  ) : null}
                </label>
              </div>
            );
          })}
        </RadioGroupPrimitive.Root>
      )}
    </Field>
  )
);

RadioGroup.displayName = "RadioGroup";
