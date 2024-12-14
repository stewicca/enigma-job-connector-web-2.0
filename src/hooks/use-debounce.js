import { useEffect, useRef, useState, useCallback } from 'react';

export const useDebounce = (delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState('');
    const timerRef = useRef();

    const setDebouncedHandler = useCallback((newValue) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            setDebouncedValue(newValue);
        }, delay);
    }, [delay]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return [debouncedValue, setDebouncedHandler];
};
