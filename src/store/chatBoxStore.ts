import { create } from "zustand";

export type Message = {
    sender: "user" | "assistant";
    content: string;
    sendType: "select" | "options" | "text";
    options?: any[];
};

type ChatBoxState = {
    firstOption: number | null;
    isCountdownFeedback: boolean;
    isAssistantTyping: boolean;
    isFeedback: boolean;
    mode: "chat" | "click";
    massages: Message[];
    sessionRobot: string | null;
};

type ChatBoxActions = {
    setFirstOption: (firstOption: number | null) => void;
    setIsAssistantTyping: (isAssistantTyping: boolean) => void;
    setIsFeedback: (isFeedback: boolean) => void;
    startCountdownFeedback: () => void;
    stopCountdownFeedback: () => void;
    setMode: (mode: "chat" | "click") => void;
    addMessage: (message: Message) => void;
    setSessionRobot: (sessionRobot: string | null) => void;
};

type ChatBoxStore = ChatBoxState & ChatBoxActions;

const useChatBoxStore = create<ChatBoxStore>((set) => {
    const setFirstOption = (firstOption: number | null) => {
        set({ firstOption });
    };

    const setIsAssistantTyping = (isAssistantTyping: boolean) => {
        set({ isAssistantTyping });
    };
    const setIsFeedback = (isFeedback: boolean) => {
        set({ isFeedback });
    };

    const startCountdownFeedback = () => {
        set({ isCountdownFeedback: true });
    };

    const stopCountdownFeedback = () => {
        set({ isCountdownFeedback: false });
    };

    const setMode = (mode: "chat" | "click") => {
        set({ mode });
    };

    const setSessionRobot = (sessionRobot: string | null) => {
        set({ sessionRobot });
    };

    const addMessage = (message: Message) => {
        set((state) => ({ massages: [...state.massages, message] }));
    };

    return {
        // state
        firstOption: null,
        isAssistantTyping: false,
        isCountdownFeedback: false,
        isFeedback: false,
        mode: "click",
        massages: [],
        sessionRobot: null,
        // action
        setFirstOption,
        setIsAssistantTyping,
        setIsFeedback,
        startCountdownFeedback,
        stopCountdownFeedback,
        setMode,
        addMessage,
        setSessionRobot,
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
    const isCountdownFeedback = useChatBoxStore(
        (state) => state.isCountdownFeedback
    );
    const isFeedback = useChatBoxStore((state) => state.isFeedback);
    const mode = useChatBoxStore((state) => state.mode);
    const massages = useChatBoxStore((state) => state.massages);
    const sessionRobot = useChatBoxStore((state) => state.sessionRobot);

    return {
        firstOption,
        isAssistantTyping,
        isCountdownFeedback,
        isFeedback,
        mode,
        massages,
        sessionRobot,
    };
};

export const useChatBoxActions = () => {
    const setFirstOption = useChatBoxStore((state) => state.setFirstOption);
    const setIsAssistantTyping = useChatBoxStore(
        (state) => state.setIsAssistantTyping
    );
    const setIsFeedback = useChatBoxStore((state) => state.setIsFeedback);
    const startCountdownFeedback = useChatBoxStore(
        (state) => state.startCountdownFeedback
    );
    const stopCountdownFeedback = useChatBoxStore(
        (state) => state.stopCountdownFeedback
    );
    const setMode = useChatBoxStore((state) => state.setMode);
    const addMessage = useChatBoxStore((state) => state.addMessage);
    const setSessionRobot = useChatBoxStore((state) => state.setSessionRobot);
    return {
        setFirstOption,
        setIsAssistantTyping,
        setIsFeedback,
        startCountdownFeedback,
        stopCountdownFeedback,
        setMode,
        addMessage,
        setSessionRobot,
    };
};
