"use client";

import { botConfig } from "@/core/config/bot";
import { createMessageFromResponse } from "@/core/utils/createMessageFromResponse";
import { useGetActiveRobotDetailMutation } from "@/services/robot";
import { useChatBoxActions, useChatBoxState } from "@/store";
import { useEffect } from "react";

const ChatBoxController = () => {
    const { firstOption } = useChatBoxState();
    const { setIsAssistantTyping, setFirstOption, setMode } =
        useChatBoxActions();
    const { addMessage } = useChatBoxActions();

    const { mutateAsync: fetchRobotDetail } = useGetActiveRobotDetailMutation({
        onSuccess: (data) => {
            console.log("Robot detail data:", data.data);
        },
        onError: (error) => {
            console.error("Error fetching robot detail:", error);
        },
    });

    useEffect(() => {
        if (!firstOption) {
            setFirstOption(1);
            setMode("click");
        }
    }, []);
    // handle first option

    useEffect(() => {
        if (firstOption) {
            new Promise((resolve) => {
                setIsAssistantTyping(true);
                setTimeout(resolve, botConfig.typingDelay);
            }).then(() =>
                fetchRobotDetail({
                    option_id: firstOption,
                })
                    .then((data) => addMessage(createMessageFromResponse(data)))
                    .then(() => {
                        setIsAssistantTyping(false);
                        setFirstOption(null);
                    })
            );
        }
    }, [firstOption, fetchRobotDetail, addMessage]);

    // useEffect(() => {
    //     setIsAssistantTyping(isPending);
    // }, [isPending, setIsAssistantTyping]);

    return null;
};

export default ChatBoxController;
