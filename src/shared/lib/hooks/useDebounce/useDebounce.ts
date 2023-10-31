import { MutableRefObject, useCallback, useRef } from "react";

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
    const timer = useRef() as MutableRefObject<any>;

    return useCallback(
        (...args: any[]) => {
            // таймер очищается
            if (timer.current) {
                clearTimeout(timer.current);
            }

            // и обновляется заново
            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );
}
