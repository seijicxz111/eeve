import * as React from "react";

import { cn } from "../../../utilities";
import { Input, type InputProps } from "../Input";

export interface SearchInputProps extends Omit<InputProps, "type" | "trailingIcon"> {
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onClear, value, ...props }, ref) => {
    const hasValue = typeof value === "string" && value.length > 0;

    return (
      <Input
        ref={ref}
        type="search"
        value={value}
        className={cn("[&::-webkit-search-cancel-button]:appearance-none", className)}
        leadingIcon={<span aria-hidden="true">/</span>}
        trailingIcon={
          hasValue && onClear ? (
            <button
              type="button"
              aria-label="Clear search"
              className="rounded-sm px-1 text-xs text-muted-foreground hover:text-foreground focus-visible:outline-focus-ring"
              onClick={onClear}
            >
              x
            </button>
          ) : null
        }
        {...props}
      />
    );
  }
);

SearchInput.displayName = "SearchInput";
