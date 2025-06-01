"use client";
import { useCallback, useState } from "react";

export function useCopy() {
    const [copy, setCopy] = useState(false);
    const [content, setContent] = useState<string>("");
    const copyContent = useCallback(() => {
        navigator.clipboard.writeText(content);
        setCopy(true);
    }, []);

    const reset = useCallback(() => {
        setTimeout(() => {
            setCopy(false);
        }, 300);
    }, []);
    return {
        copy,
        copyContent,
        setContent,
        reset,
    };
}
