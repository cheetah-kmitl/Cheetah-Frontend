import { useEffect } from "react";

export const useOnClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent) => void
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}
