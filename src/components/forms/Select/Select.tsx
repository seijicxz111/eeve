import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";

import { cn } from "../../../utilities";
import { Field } from "../Field";

export interface SelectOption {
  disabled?: boolean;
  label: string;
  value: string;
}

export interface SelectProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
  "children"
> {
  description?: React.ReactNode;
  error?: React.ReactNode;
  id?: string;
  label?: React.ReactNode;
  options: SelectOption[];
  placeholder?: string;
  triggerClassName?: string;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      description,
      disabled,
      error,
      id,
      label,
      options,
      placeholder = "Select an option",
      required,
      triggerClassName,
      ...props
    },
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
        <SelectPrimitive.Root disabled={disabled} required={required} {...props}>
          <SelectPrimitive.Trigger
            ref={ref}
            id={field.id}
            aria-describedby={field.describedBy}
            aria-invalid={field.invalid || undefined}
            className={cn(
              "flex h-10 w-full items-center justify-between gap-3 rounded-md border border-input bg-surface px-3 text-left text-sm text-foreground shadow-xs",
              "data-[placeholder]:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              field.invalid && "border-error",
              triggerClassName
            )}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon aria-hidden="true" className="text-muted-foreground">
              v
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              position="popper"
              sideOffset={6}
              className={cn(
                "z-[var(--z-dropdown)] max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-border bg-surface-raised text-foreground shadow-md",
                "data-[state=open]:animate-in data-[state=closed]:animate-out"
              )}
            >
              <SelectPrimitive.Viewport className="p-1">
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={cn(
                      "relative flex cursor-default select-none items-center rounded-sm px-3 py-2 text-sm outline-none",
                      "focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    )}
                  >
                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      )}
    </Field>
  )
);

Select.displayName = "Select";
