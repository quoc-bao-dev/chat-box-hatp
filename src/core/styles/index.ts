export { default as scrollbarStyles } from "./scrollbar.module.css";

// Re-export individual classes for easier access
export const scrollbarClasses = {
    custom: "customScrollbar",
    chat: "chatScrollbar",
    thin: "thinScrollbar",
    animated: "animatedScrollbar",
    dark: "darkScrollbar",
    smooth: "smoothScroll",
    snap: "snapScroll",
} as const;

export type ScrollbarVariant = keyof typeof scrollbarClasses;
