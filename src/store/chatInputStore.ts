import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type ChatInputState = {
    event: 1 | 2 | null; // 1 -> mở input chat luôn, 2 -> mở input chat 1 lần, null -> không mở input chat
    nextLink: string | null;
    dataPost: any | null;
};

type ChatInputActions = {
    setEvent: (event: 1 | 2 | null) => void;
    setNextLink: (nextLink: string | null) => void;
    setDataPost: (dataPost: any | null) => void;
};

type ChatInputStore = ChatInputState & ChatInputActions;

export const useChatInputStore = create<ChatInputStore>()(
    devtools(
        persist(
            (set) => {
                const setEvent = (event: 1 | 2 | null) => {
                    set({ event });
                };

                const setNextLink = (nextLink: string | null) => {
                    set({ nextLink });
                };

                const setDataPost = (dataPost: any | null) => {
                    set({ dataPost });
                };
                return {
                    event: null,
                    nextLink: null,
                    dataPost: null,
                    setEvent,
                    setNextLink,
                    setDataPost,
                };
            },
            {
                name: "chat-input-storage",
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
                    event: state.event,
                    nextLink: state.nextLink,
                    dataPost: state.dataPost,
                }),
            }
        ),
        { name: "ChatInputStore" }
    )
);
