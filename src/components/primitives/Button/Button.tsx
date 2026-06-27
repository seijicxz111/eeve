import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn, composeEventHandlers } from "../../../utilities";
import { Spinner } from "../../feedback/Spinner";

export const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-standard",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
    "motion-reduce:transition-none"
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 active:scale-[0.99]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/90 active:scale-[0.99]",
        outline:
          "border border-border bg-surface text-foreground shadow-xs hover:bg-muted active:scale-[0.99]",
        ghost: "text-foreground hover:bg-muted active:scale-[0.99]",
        destructive:
          "bg-error text-error-foreground shadow-xs hover:bg-error/90 active:scale-[0.99]",
        link: "h-auto rounded-none p-0 text-primary underline-offset-4 hover:underline"
      },
      size: {
        xs: "h-7 px-2.5 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-base",
        icon: "size-10 p-0"
      },
      fullWidth: {
        true: "w-full",
        false: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false
    }
  }
);

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      children,
      className,
      disabled = false,
      fullWidth,
      leftIcon,
      loading = false,
      loadingText = "Loading",
      onClick,
      rightIcon,
      size,
      type = "button",
      variant,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        type={asChild ? undefined : type}
        disabled={asChild ? undefined : isDisabled}
        aria-disabled={asChild && isDisabled ? true : undefined}
        aria-busy={loading ? true : undefined}
        data-loading={loading ? "" : undefined}
        onClick={composeEventHandlers(onClick, (event) => {
          if (isDisabled) {
            event.preventDefault();
          }
        })}
        {...props}
      >
        {loading ? <Spinner size="sm" aria-hidden="true" /> : leftIcon}
        {children ? <Slottable>{children}</Slottable> : null}
        {loading ? <span className="sr-only">{loadingText}</span> : rightIcon}
      </Component>
    );
  }
);

Button.displayName = "Button";
