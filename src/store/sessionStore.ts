import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SessionReloadState {
    reloadKey: number;
    triggerReload: () => void;
}

export const useSessionReloadStore = create<SessionReloadState>()(
    devtools(
        (set) => ({
            reloadKey: 0,
            triggerReload: () =>
                set((state) => ({ reloadKey: state.reloadKey + 1 })),
        }),
        { name: "session-reload-store" }
    )
);

export const useSessionReload = () => {
    const { reloadKey, triggerReload } = useSessionReloadStore();
    return { reloadKey, triggerReload };
};

export default useSessionReloadStore;
