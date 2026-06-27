import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../../utilities";
import { Field } from "../Field";

const inputVariants = cva(
  [
    "w-full rounded-md border border-input bg-surface text-foreground shadow-xs",
    "placeholder:text-muted-foreground",
    "focus-visible:border-focus-ring focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "read-only:bg-muted/50"
  ],
  {
    variants: {
      inputSize: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-11 px-4 text-base"
      }
    },
    defaultVariants: {
      inputSize: "md"
    }
  }
);

type NativeInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export interface InputProps extends NativeInputProps, VariantProps<typeof inputVariants> {
  description?: React.ReactNode;
  error?: React.ReactNode;
  label?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      description,
      disabled,
      error,
      id,
      inputSize,
      label,
      leadingIcon,
      required,
      trailingIcon,
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
        <div className="relative">
          {leadingIcon ? (
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
              {leadingIcon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={field.id}
            className={cn(
              inputVariants({ inputSize }),
              leadingIcon && "pl-9",
              trailingIcon && "pr-9",
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
          {trailingIcon ? (
            <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
              {trailingIcon}
            </span>
          ) : null}
        </div>
      )}
    </Field>
  )
);

Input.displayName = "Input";
