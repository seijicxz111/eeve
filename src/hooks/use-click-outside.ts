import type { RefObject } from "react";
import { useEffect } from "react";

type EventName = "mousedown" | "touchstart" | "pointerdown";

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent | PointerEvent) => void,
  eventName: EventName = "pointerdown"
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent | PointerEvent) => {
      const element = ref.current;
      if (!element || element.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(eventName, listener, true);

    return () => {
      document.removeEventListener(eventName, listener, true);
    };
  }, [eventName, handler, ref]);
}
