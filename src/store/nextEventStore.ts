import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type NextEventPayload = Record<string, unknown> | null;

type NextEventState = {
    payload: NextEventPayload;
    nextLink: string | null;
};

type NextEventActions = {
    setPayload: (payload: NextEventPayload) => void;
    setNextLink: (nextLink: string | null) => void;
    reset: () => void;
};

type NextEventStore = NextEventState & NextEventActions;

const useNextEventStore = create<NextEventStore>()(
    devtools(
        persist(
            (set) => ({
                payload: null,
                nextLink: null,

                setPayload: (payload) => set({ payload }),
                setNextLink: (nextLink) => set({ nextLink }),
                reset: () => set({ payload: null, nextLink: null }),
            }),
            {
                name: "next-event-storage",
                storage: {
                    getItem: (name: string) => {
                        const str = sessionStorage.getItem(name);
                        return str ? JSON.parse(str) : null;
                    },
                    setItem: (name: string, value: unknown) => {
                        sessionStorage.setItem(name, JSON.stringify(value));
                    },
                    removeItem: (name: string) =>
                        sessionStorage.removeItem(name),
                },
                partialize: (state) => ({
                    payload: state.payload,
                    nextLink: state.nextLink,
                }),
            }
        ),
        { name: "NextEventStore" }
    )
);

export default useNextEventStore;

export const useNextEventState = () => {
    const payload = useNextEventStore((state) => state.payload);
    const nextLink = useNextEventStore((state) => state.nextLink);
    return { payload, nextLink };
};

export const useNextEventActions = () => {
    const setPayload = useNextEventStore((state) => state.setPayload);
    const setNextLink = useNextEventStore((state) => state.setNextLink);
    const reset = useNextEventStore((state) => state.reset);
    return { setPayload, setNextLink, reset };
};
