import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

export const useKeyPress = (
  opts: { keys: string[]; isRegistered: boolean },
  callback: (event: KeyboardEvent) => void
) => {
  // implement the callback ref pattern
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  // handle what happens on key press
  const handleKeyPress = useCallback(
    (event) => {
      // check if one of the key is part of the ones we want
      if (opts.keys.some((key) => event.key === key)) {
        callbackRef.current(event);
      }
    },
    [opts.keys]
  );

  useEffect(() => {
    if (opts.isRegistered) {
      document.addEventListener("keydown", handleKeyPress);
    }
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress, opts.isRegistered]);
};
