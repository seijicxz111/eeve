import * as React from "react";

import { cn } from "../../../utilities";

export interface FieldRenderProps {
  describedBy?: string;
  disabled?: boolean;
  id: string;
  invalid: boolean;
  labelId: string;
  required?: boolean;
}

export interface FieldProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  children: React.ReactNode | ((field: FieldRenderProps) => React.ReactNode);
  description?: React.ReactNode;
  disabled?: boolean;
  error?: React.ReactNode;
  id?: string;
  label?: React.ReactNode;
  required?: boolean;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (
    { children, className, description, disabled, error, id, label, required, ...props },
    ref
  ) => {
    const reactId = React.useId().replace(/:/g, "");
    const fieldId = id ?? `sui-field-${reactId}`;
    const labelId = `${fieldId}-label`;
    const descriptionId = description ? `${fieldId}-description` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
    const invalid = Boolean(error);
    const renderProps = {
      describedBy,
      disabled,
      id: fieldId,
      invalid,
      labelId,
      required
    };

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {label ? (
          <label
            id={labelId}
            htmlFor={fieldId}
            className={cn(
              "block text-sm font-medium text-foreground",
              disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {label}
            {required ? <span aria-hidden="true"> *</span> : null}
          </label>
        ) : null}
        {typeof children === "function" ? children(renderProps) : children}
        {description ? (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
        {error ? (
          <p id={errorId} role="alert" className="text-sm font-medium text-error">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

Field.displayName = "Field";
