import {
    scrollbarStyles,
    scrollbarClasses,
    ScrollbarVariant,
} from "@/core/styles";

/**
 * Hook để sử dụng scrollbar styles một cách dễ dàng
 * @param variant - Loại scrollbar muốn sử dụng
 * @param additionalClasses - Các class CSS bổ sung
 * @returns Object chứa className và các utility functions
 */
export const useScrollbar = (
    variant: ScrollbarVariant = "custom",
    additionalClasses: string = ""
) => {
    const getScrollbarClass = (type: ScrollbarVariant) => {
        return scrollbarStyles[scrollbarClasses[type]];
    };

    const className = `${getScrollbarClass(
        variant
    )} ${additionalClasses}`.trim();

    const scrollToTop = (element?: HTMLElement) => {
        const target = element || document.documentElement;
        target.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const scrollToBottom = (element?: HTMLElement) => {
        const target = element || document.documentElement;
        target.scrollTo({
            top: target.scrollHeight,
            behavior: "smooth",
        });
    };

    const scrollToElement = (element: HTMLElement, offset: number = 0) => {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        // Apply offset after scroll
        setTimeout(() => {
            window.scrollBy(0, offset);
        }, 100);
    };

    return {
        className,
        scrollToTop,
        scrollToBottom,
        scrollToElement,
        // Expose individual classes for flexibility
        classes: {
            custom: getScrollbarClass("custom"),
            chat: getScrollbarClass("chat"),
            thin: getScrollbarClass("thin"),
            animated: getScrollbarClass("animated"),
            dark: getScrollbarClass("dark"),
            smooth: getScrollbarClass("smooth"),
            snap: getScrollbarClass("snap"),
        },
    };
};

export default useScrollbar;
