import * as React from "react";

import { Button, type ButtonProps } from "../Button";

export interface IconButtonProps extends Omit<
  ButtonProps,
  "children" | "leftIcon" | "rightIcon"
> {
  label: string;
  icon: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, size = "icon", title, ...props }, ref) => (
    <Button ref={ref} aria-label={label} size={size} title={title ?? label} {...props}>
      {icon}
    </Button>
  )
);

IconButton.displayName = "IconButton";
