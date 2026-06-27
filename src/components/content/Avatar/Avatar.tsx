import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../../utilities";

const avatarVariants = cva(
  "inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground",
  {
    variants: {
      size: {
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-12 text-base",
        xl: "size-16 text-lg"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

export interface AvatarProps
  extends
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  alt: string;
  fallback?: string;
  src?: string;
}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ alt, className, fallback, size, src, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size }), className)}
    {...props}
  >
    {src ? (
      <AvatarPrimitive.Image src={src} alt={alt} className="size-full object-cover" />
    ) : null}
    <AvatarPrimitive.Fallback delayMs={300} className="font-medium">
      {fallback ?? alt.slice(0, 2).toUpperCase()}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
));

Avatar.displayName = "Avatar";
