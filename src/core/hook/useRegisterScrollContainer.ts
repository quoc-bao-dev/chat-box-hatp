"use client";

import { useScrollToBottomStore } from "@/store/scrollToBottomStore";
import { useCallback, useEffect, RefObject } from "react";

/**
 * Hook để register scroll container vào store
 * Chỉ cần gọi 1 lần trong ChatBoxRender
 *
 * @example
 * ```tsx
 * const ChatBoxRender = () => {
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   useRegisterScrollContainer(containerRef);
 *
 *   return <div ref={containerRef}>...</div>;
 * };
 * ```
 */
export const useRegisterScrollContainer = (
    containerRef: RefObject<HTMLDivElement | null>
) => {
    const { setScrollFunction, setInstantScrollFunction } =
        useScrollToBottomStore();

    useEffect(() => {
        if (!containerRef.current) return;

        const scrollToBottom = () => {
            const el = containerRef.current;
            if (!el) return;
            el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        };

        const scrollToBottomInstant = () => {
            const el = containerRef.current;
            if (!el) return;
            el.scrollTop = el.scrollHeight;
        };

        setScrollFunction(scrollToBottom);
        setInstantScrollFunction(scrollToBottomInstant);

        // Cleanup khi unmount
        return () => {
            setScrollFunction(() => {});
            setInstantScrollFunction(() => {});
        };
    }, [containerRef, setScrollFunction, setInstantScrollFunction]);
};

export default useRegisterScrollContainer;
