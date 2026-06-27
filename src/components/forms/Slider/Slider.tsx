import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "../../../utilities";
import { Field } from "../Field";

export interface SliderProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  "children"
> {
  description?: React.ReactNode;
  error?: React.ReactNode;
  label?: React.ReactNode;
  required?: boolean;
}

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
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
      <SliderPrimitive.Root
        ref={ref}
        id={field.id}
        disabled={disabled}
        aria-labelledby={label ? field.labelId : undefined}
        aria-describedby={field.describedBy}
        aria-invalid={field.invalid || undefined}
        className={cn(
          "relative flex h-5 w-full touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 grow overflow-hidden rounded-full bg-muted">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            aria-label={typeof label === "string" ? label : undefined}
            className={cn(
              "block size-5 rounded-full border border-primary bg-surface shadow-sm",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
            "disabled:pointer-events-none disabled:opacity-50"
          )}
        />
      </SliderPrimitive.Root>
    )}
  </Field>
));

Slider.displayName = "Slider";
