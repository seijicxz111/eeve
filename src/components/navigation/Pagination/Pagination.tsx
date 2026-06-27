import * as React from "react";

import { cn } from "../../../utilities";
import { Button } from "../../primitives/Button";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  count: number;
  onPageChange: (page: number) => void;
  page: number;
  siblingCount?: number;
}

function getPages(page: number, count: number, siblingCount: number): number[] {
  const start = Math.max(1, page - siblingCount);
  const end = Math.min(count, page + siblingCount);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, count, onPageChange, page, siblingCount = 1, ...props }, ref) => {
    const pages = getPages(page, count, siblingCount);

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        {pages[0] > 1 ? (
          <>
            <PageButton page={1} active={page === 1} onPageChange={onPageChange} />
            {pages[0] > 2 ? (
              <span className="px-1 text-muted-foreground">...</span>
            ) : null}
          </>
        ) : null}
        {pages.map((pageNumber) => (
          <PageButton
            key={pageNumber}
            page={pageNumber}
            active={pageNumber === page}
            onPageChange={onPageChange}
          />
        ))}
        {pages[pages.length - 1] < count ? (
          <>
            {pages[pages.length - 1] < count - 1 ? (
              <span className="px-1 text-muted-foreground">...</span>
            ) : null}
            <PageButton
              page={count}
              active={page === count}
              onPageChange={onPageChange}
            />
          </>
        ) : null}
        <Button
          variant="outline"
          size="sm"
          disabled={page >= count}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </nav>
    );
  }
);

function PageButton({
  active,
  onPageChange,
  page
}: {
  active: boolean;
  onPageChange: (page: number) => void;
  page: number;
}) {
  return (
    <Button
      aria-current={active ? "page" : undefined}
      variant={active ? "primary" : "ghost"}
      size="sm"
      onClick={() => onPageChange(page)}
    >
      {page}
    </Button>
  );
}

Pagination.displayName = "Pagination";
