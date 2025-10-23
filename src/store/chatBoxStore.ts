import { ProductItem } from "@/services/chatbot";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type Message = {
    id: number;

    sender: "user" | "assistant";
    content: string;
    sendType:
        | "select"
        | "options"
        | "text"
        | "feedback"
        | "time"
        | "wait_reply"
        | "products"
        | "not-found-product";
    products?: ProductItem[];
    options?: {
        id: string;
        content: string;
        next?: string;
        disabled?: boolean;
    }[];
    feedback?: {
        rating: "good" | "normal" | "bad";
        tags: string[];
        isEvaluated: boolean;
    };
    time?: string;
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
    addMessageToTop: (message: Message) => void;
    setSessionRobot: (sessionRobot: string | null) => void;
    disableOptionInMessage: (messageId: number, optionId: string) => void;
    addFeedbackMessage: (feedbackData: {
        rating: "good" | "normal" | "bad";
        tags: string[];
        isEvaluated: boolean;
    }) => void;
    addTimeMessage: (time: string) => void;
    addTimeToTopMessage: (time: string) => void;
};

type ChatBoxStore = ChatBoxState & ChatBoxActions;

const useChatBoxStore = create<ChatBoxStore>()(
    devtools((set) => {
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

        const addMessageToTop = (message: Message) => {
            set((state) => ({ massages: [message, ...state.massages] }));
        };

        const disableOptionInMessage = (
            messageId: number,
            optionId: string
        ) => {
            set((state) => ({
                massages: state.massages.map((message) => {
                    if (message.id === messageId && message.options) {
                        return {
                            ...message,
                            options: message.options.map((option) =>
                                option.id === optionId
                                    ? // toggle disable
                                      { ...option, disabled: true }
                                    : { ...option, disabled: true }
                            ),
                        };
                    }
                    return message;
                }),
            }));
        };

        const addFeedbackMessage = (feedbackData: {
            rating: "good" | "normal" | "bad";
            tags: string[];
            isEvaluated: boolean;
        }) => {
            const feedbackMessage: Message = {
                id: Date.now(),
                sender: "user",
                content: "",
                sendType: "feedback",
                feedback: feedbackData,
            };
            set((state) => ({
                massages: [...state.massages, feedbackMessage],
            }));
        };

        const addTimeMessage = (time: string) => {
            const timeMessage: Message = {
                id: Date.now(),
                sender: "assistant",
                content: "",
                sendType: "time",
                time: time,
            };
            set((state) => ({
                massages: [...state.massages, timeMessage],
            }));
        };

        const addTimeToTopMessage = (time: string) => {
            const timeMessage: Message = {
                id: Date.now(),
                sender: "assistant",
                content: "",
                sendType: "time",
                time: time,
            };
            set((state) => ({
                massages: [timeMessage, ...state.massages],
            }));
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
            addMessageToTop,
            setSessionRobot,
            disableOptionInMessage,
            addFeedbackMessage,
            addTimeMessage,
            addTimeToTopMessage,
        };
    })
);

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
    const addMessageToTop = useChatBoxStore((state) => state.addMessageToTop);
    const setSessionRobot = useChatBoxStore((state) => state.setSessionRobot);
    const disableOptionInMessage = useChatBoxStore(
        (state) => state.disableOptionInMessage
    );
    const addFeedbackMessage = useChatBoxStore(
        (state) => state.addFeedbackMessage
    );
    const addTimeMessage = useChatBoxStore((state) => state.addTimeMessage);
    const addTimeToTopMessage = useChatBoxStore(
        (state) => state.addTimeToTopMessage
    );
    return {
        setFirstOption,
        setIsAssistantTyping,
        setIsFeedback,
        startCountdownFeedback,
        stopCountdownFeedback,
        setMode,
        addMessage,
        addMessageToTop,
        setSessionRobot,
        disableOptionInMessage,
        addFeedbackMessage,
        addTimeMessage,
        addTimeToTopMessage,
    };
};
