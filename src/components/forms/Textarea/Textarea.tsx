import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../../utilities";
import { Field } from "../Field";

const textareaVariants = cva(
  [
    "min-h-24 w-full resize-y rounded-md border border-input bg-surface px-3 py-2 text-sm text-foreground shadow-xs",
    "placeholder:text-muted-foreground",
    "focus-visible:border-focus-ring focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "read-only:bg-muted/50"
  ],
  {
    variants: {
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        both: "resize"
      }
    },
    defaultVariants: {
      resize: "vertical"
    }
  }
);

export interface TextareaProps
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  description?: React.ReactNode;
  error?: React.ReactNode;
  label?: React.ReactNode;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, description, disabled, error, id, label, required, resize, ...props },
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
        <textarea
          ref={ref}
          id={field.id}
          className={cn(
            textareaVariants({ resize }),
            field.invalid &&
              "border-error focus-visible:border-error focus-visible:outline-error",
            className
          )}
          disabled={disabled}
          required={required}
          aria-describedby={field.describedBy}
          aria-invalid={field.invalid || undefined}
          {...props}
        />
      )}
    </Field>
  )
);

Textarea.displayName = "Textarea";
