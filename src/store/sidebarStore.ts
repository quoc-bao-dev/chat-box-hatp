import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SidebarState {
    isOpen: boolean;
    isMobile: boolean;
    toggle: () => void;
    open: () => void;
    close: () => void;
    setMobile: (isMobile: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
    devtools(
        persist(
            (set) => ({
                isOpen: false,
                isMobile: false,

                toggle: () => set((state) => ({ isOpen: !state.isOpen })),

                open: () => set({ isOpen: true }),

                close: () => set({ isOpen: false }),

                setMobile: (isMobile: boolean) => set({ isMobile }),
            }),
            {
                name: "sidebar-storage",
                partialize: (state) => ({ isMobile: state.isMobile }),
            }
        ),
        {
            name: "sidebar-store",
        }
    )
);

// Hook để sử dụng sidebar state
export const useSidebar = () => {
    const { isOpen, isMobile, toggle, open, close, setMobile } =
        useSidebarStore();

    return {
        isOpen,
        isMobile,
        toggle,
        open,
        close,
        setMobile,
    };
};

export default useSidebarStore;
