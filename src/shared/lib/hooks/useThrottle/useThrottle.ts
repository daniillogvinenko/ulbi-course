import { useCallback, useRef } from "react";

// урок 58 (в принципе все понял, на всякий случай)
export function useThrottle(callback: (...args: any[]) => void, delay: number) {
    const throttleRef = useRef(false);

    return useCallback(
        (...args: any[]) => {
            if (!throttleRef.current) {
                callback(...args);
                throttleRef.current = true;

                setTimeout(() => {
                    throttleRef.current = false;
                }, delay);
            }
        },
        [callback, delay]
    );
}
