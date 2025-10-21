import { create } from "zustand";

export type Message = {
    sender: "user" | "assistant";
    content: string;
    sendType: "select" | "options" | "text";
    options?: any[];
};

type ChatBoxState = {
    firstOption: number | null;
    isAssistantTyping: boolean;
    mode: "chat" | "click";
    massages: Message[];
};

type ChatBoxActions = {
    setFirstOption: (firstOption: number | null) => void;
    setIsAssistantTyping: (isAssistantTyping: boolean) => void;
    setMode: (mode: "chat" | "click") => void;
    addMessage: (message: Message) => void;
};

type ChatBoxStore = ChatBoxState & ChatBoxActions;

const useChatBoxStore = create<ChatBoxStore>((set) => {
    const setFirstOption = (firstOption: number | null) => {
        set({ firstOption });
    };

    const setIsAssistantTyping = (isAssistantTyping: boolean) => {
        set({ isAssistantTyping });
    };

    const setMode = (mode: "chat" | "click") => {
        set({ mode });
    };

    const addMessage = (message: Message) => {
        set((state) => ({ massages: [...state.massages, message] }));
    };

    return {
        // state
        firstOption: null,
        isAssistantTyping: false,
        mode: "chat",
        massages: [],
        // action
        setFirstOption,
        setIsAssistantTyping,
        setMode,
        addMessage,
    };
});

export default useChatBoxStore;

export const useChatBox = () => {
    return useChatBoxStore();
};

export const useChatBoxState = () => {
    const firstOption = useChatBoxStore((state) => state.firstOption);
    const isAssistantTyping = useChatBoxStore(
        (state) => state.isAssistantTyping
    );
    const mode = useChatBoxStore((state) => state.mode);
    const massages = useChatBoxStore((state) => state.massages);

    return {
        firstOption,
        isAssistantTyping,
        mode,
        massages,
    };
};

export const useChatBoxActions = () => {
    const setFirstOption = useChatBoxStore((state) => state.setFirstOption);
    const setIsAssistantTyping = useChatBoxStore(
        (state) => state.setIsAssistantTyping
    );
    const setMode = useChatBoxStore((state) => state.setMode);
    const addMessage = useChatBoxStore((state) => state.addMessage);

    return {
        setFirstOption,
        setIsAssistantTyping,
        setMode,
        addMessage,
    };
};
