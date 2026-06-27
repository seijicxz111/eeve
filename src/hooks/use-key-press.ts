import { useEffect } from "react";

export function useKeyPress(
  key: string,
  handler: (event: KeyboardEvent) => void,
  target?: Document | HTMLElement
): void {
  useEffect(() => {
    const eventTarget = target ?? document;
    const listener = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler(event);
      }
    };

    eventTarget.addEventListener("keydown", listener as EventListener);

    return () => {
      eventTarget.removeEventListener("keydown", listener as EventListener);
    };
  }, [handler, key, target]);
}
