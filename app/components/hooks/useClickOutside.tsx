import React, { RefObject } from "react";

const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (e: MouseEvent) => void
) => {
  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", handleClick, true);

    return () => {
      document.removeEventListener("mousedown", handleClick, true);
    };
  }, [ref, handler]);
};

export default useClickOutside;
