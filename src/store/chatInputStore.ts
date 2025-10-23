import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ChatInputState = {
    event: 1 | 2 | null; // 1 -> mở input chat luôn, 2 -> mở input chat 1 lần, null -> không mở input chat
    nextLink: string | null;
    dataPost: any | null;
};

type ChatInputActions = {
    setEvent: (event: number) => void;
    setNextLink: (nextLink: string | null) => void;
    setDataPost: (dataPost: any | null) => void;
};

type ChatInputStore = ChatInputState & ChatInputActions;

export const useChatInputStore = create<ChatInputStore>()(
    devtools((set) => {
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
    })
);
