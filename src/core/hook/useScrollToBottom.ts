"use client";

import { useScrollToBottomStore } from "@/store/scrollToBottomStore";
import { useCallback } from "react";

/**
 * Hook để lấy scroll function, có thể gọi từ bất kỳ đâu trong app
 *
 * @example
 * ```tsx
 * const { scrollToBottom } = useScrollToBottom();
 *
 * const handleClick = () => {
 *   scrollToBottom(); // Scroll xuống cuối chat
 * };
 * ```
 */
export const useScrollToBottom = () => {
    const scrollFunction = useScrollToBottomStore(
        (state) => state.scrollFunction
    );
    const instantScrollFunction = useScrollToBottomStore(
        (state) => state.instantScrollFunction
    );

    const scrollToBottom = useCallback(() => {
        if (scrollFunction) {
            setTimeout(() => {
                scrollFunction();
            }, 500);
        } else {
            console.warn("Scroll function not registered yet");
        }
    }, [scrollFunction]);

    const scrollToBottomInstant = useCallback(() => {
        if (instantScrollFunction) {
            instantScrollFunction();
        } else {
            console.warn("Instant scroll function not registered yet");
        }
    }, [instantScrollFunction]);

    return {
        scrollToBottom,
        scrollToBottomInstant,
    };
};

export default useScrollToBottom;
