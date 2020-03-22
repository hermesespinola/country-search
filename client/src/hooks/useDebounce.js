import { useState, useEffect } from "react";

/**
 * Hook to debounce a string value.
 * @param {string} value value to debounce.
 * @param {number} delay wait until debounce in milliseconds.
 */
export function useDebounce(value, delay) {
    const [state, setState] = useState(value);
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedValue(state);
        }, delay);
        return () => {
            clearTimeout(debounceTimeout);
        };
    }, [state, delay]);

    return [debouncedValue, state, setState];
}
