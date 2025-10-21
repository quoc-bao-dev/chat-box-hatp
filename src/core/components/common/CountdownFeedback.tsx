import { botConfig } from "@/core/config/bot";
import { useChatBoxActions, useChatBoxState } from "@/store";
import { useEffect, useRef } from "react";

const CountdownFeedback = () => {
    const { isCountdownFeedback } = useChatBoxState();

    const { stopCountdownFeedback, setIsFeedback } = useChatBoxActions();

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            stopCountdownFeedback();
            setIsFeedback(true);
        }, botConfig.timeToFeedback);

        if (!isCountdownFeedback) {
            clearTimeout(timerRef.current);
        }

        return () => clearTimeout(timerRef.current!);
    }, [isCountdownFeedback]);

    return null;
};

export default CountdownFeedback;
