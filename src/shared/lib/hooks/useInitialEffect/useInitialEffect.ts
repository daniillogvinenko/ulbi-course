import { useEffect } from "react";

// тут должно было быть условие __PROJECT__ !== "storybook"
export function useInitialEffect(callback: () => void) {
    useEffect(() => {
        callback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
