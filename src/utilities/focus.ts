import { isBrowser } from "./environment";

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ].join(",");

  return Array.from(container.querySelectorAll<HTMLElement>(selectors)).filter(
    (element) =>
      !element.hasAttribute("disabled") &&
      element.getAttribute("aria-hidden") !== "true" &&
      element.offsetParent !== null
  );
}

export function rememberActiveElement(): () => void {
  if (!isBrowser()) {
    return () => undefined;
  }

  const activeElement = document.activeElement;
  return () => {
    if (activeElement instanceof HTMLElement && document.contains(activeElement)) {
      activeElement.focus();
    }
  };
}
