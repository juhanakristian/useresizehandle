import * as React from "react";

export function useThrottle(timeout: number, initialValue?: any) {
  const valueRef = React.useRef<typeof initialValue>(initialValue ?? null);
  const timerRef = React.useRef(false);

  const setValue = React.useCallback(
    (newValue: any) => {
      if (timerRef.current || !valueRef.current) {
        valueRef.current = newValue;
        timerRef.current = false;

        setTimeout(() => {
          timerRef.current = true;
        }, timeout);
      }
    },
    [timeout]
  );

  React.useEffect(() => {
    setTimeout(() => {
      timerRef.current = true;
    }, timeout);
  }, [timeout]);

  return [valueRef.current, setValue];
}
