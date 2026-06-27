import * as React from "react";

import { cn } from "../../../utilities";

const sizeClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-none"
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof sizeClasses;
  padded?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, padded = true, size = "lg", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full",
        sizeClasses[size],
        padded && "px-4 sm:px-6",
        className
      )}
      {...props}
    />
  )
);

Container.displayName = "Container";
