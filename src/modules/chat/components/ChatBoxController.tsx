"use client";

import { botConfig } from "@/core/config/bot";
import { createMessageFromResponse } from "@/core/utils/createMessageFromResponse";
import { useGetActiveRobotDetailMutation } from "@/services/robot";
import { useChatBoxActions, useChatBoxState } from "@/store";
import { useEffect } from "react";

const ChatBoxController = () => {
    const { firstOption, massages } = useChatBoxState();
    const { setIsAssistantTyping, setFirstOption, setMode } =
        useChatBoxActions();
    const { addMessage, setSessionRobot } = useChatBoxActions();

    const { mutateAsync: fetchRobotDetail } = useGetActiveRobotDetailMutation();

    // handle first option and mode
    useEffect(() => {
        if (!firstOption && massages.length === 0) {
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
                    .then((data) => {
                        addMessage(createMessageFromResponse(data));

                        console.log(
                            "data.data.session_robot",
                            data.data.session_robot
                        );

                        setSessionRobot(data.data.session_robot);
                    })
                    .then(() => {
                        setIsAssistantTyping(false);
                        setFirstOption(null);
                    })
            );
        }
    }, [firstOption, fetchRobotDetail, addMessage]);

    return null;
};

export default ChatBoxController;
