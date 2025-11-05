import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ScrollToBottomStore = {
    scrollFunction: (() => void) | null;
    instantScrollFunction: (() => void) | null;
    setScrollFunction: (fn: () => void) => void;
    setInstantScrollFunction: (fn: () => void) => void;
    clearScrollFunctions: () => void;
};

export const useScrollToBottomStore = create<ScrollToBottomStore>()(
    devtools(
        (set) => ({
            scrollFunction: null,
            instantScrollFunction: null,
            setScrollFunction: (fn) => set({ scrollFunction: fn }),
            setInstantScrollFunction: (fn) =>
                set({ instantScrollFunction: fn }),
            clearScrollFunctions: () =>
                set({ scrollFunction: null, instantScrollFunction: null }),
        }),
        { name: "ScrollToBottomStore" }
    )
);
