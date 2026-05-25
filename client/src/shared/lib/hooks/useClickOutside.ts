import { useEffect, useRef } from "react";

export function useClickOutside(handler: () => void) {
  const domNodeRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const maybeHandler = (event: MouseEvent) => {
      if (
        domNodeRef.current &&
        !domNodeRef.current.contains(event.target as Node)
      ) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, [handler]);
  return domNodeRef;
}
