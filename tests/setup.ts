import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";
import { afterEach, expect, vi } from "vitest";

expect.extend(toHaveNoViolations);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

class TestResizeObserver implements ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: TestResizeObserver
});

Object.defineProperty(globalThis, "ResizeObserver", {
  writable: true,
  value: TestResizeObserver
});

Element.prototype.scrollIntoView = vi.fn();

Element.prototype.hasPointerCapture = vi.fn(() => false);
Element.prototype.setPointerCapture = vi.fn();
Element.prototype.releasePointerCapture = vi.fn();
