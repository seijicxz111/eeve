import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import {
  useClickOutside,
  useControllableState,
  useEscapeKey,
  useKeyPress,
  useLockBodyScroll,
  useMediaQuery,
  usePrevious,
  useReducedMotion
} from "./index";

describe("hooks", () => {
  it("calls useClickOutside only for outside interactions and cleans up", async () => {
    const user = userEvent.setup();
    const onOutside = vi.fn();

    function Demo() {
      const ref = React.useRef<HTMLDivElement>(null);
      useClickOutside(ref, onOutside);
      return (
        <>
          <div ref={ref}>Inside</div>
          <button>Outside</button>
        </>
      );
    }

    const { unmount } = render(<Demo />);
    await user.click(screen.getByText("Inside"));
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(onOutside).toHaveBeenCalledTimes(1);
    unmount();
  });

  it("handles Escape and arbitrary key presses", async () => {
    const user = userEvent.setup();
    const onEscape = vi.fn();
    const onK = vi.fn();

    function Demo() {
      useEscapeKey(onEscape);
      useKeyPress("k", onK);
      return <button>Target</button>;
    }

    render(<Demo />);
    await user.keyboard("{Escape}");
    await user.keyboard("k");

    expect(onEscape).toHaveBeenCalledTimes(1);
    expect(onK).toHaveBeenCalledTimes(1);
  });

  it("supports controllable state", async () => {
    const user = userEvent.setup();

    function Counter() {
      const [value, setValue] = useControllableState({ defaultValue: 0 });
      return (
        <button onClick={() => setValue((previous) => previous + 1)}>{value}</button>
      );
    }

    render(<Counter />);
    await user.click(screen.getByRole("button", { name: "0" }));
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
  });

  it("reads media queries and reduced motion", () => {
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));

    const { result: mediaResult } = renderHook(() => useMediaQuery("(min-width: 40rem)"));
    const { result: motionResult } = renderHook(() => useReducedMotion());

    expect(mediaResult.current).toBe(true);
    expect(motionResult.current).toBe(true);
  });

  it("locks and restores body scroll", () => {
    function Demo({ locked }: { locked: boolean }) {
      useLockBodyScroll(locked);
      return null;
    }

    const { rerender, unmount } = render(<Demo locked />);
    expect(document.body.style.overflow).toBe("hidden");
    rerender(<Demo locked={false} />);
    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("returns the previous value", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: "one" }
    });

    expect(result.current).toBeUndefined();
    act(() => rerender({ value: "two" }));
    expect(result.current).toBe("one");
  });
});
