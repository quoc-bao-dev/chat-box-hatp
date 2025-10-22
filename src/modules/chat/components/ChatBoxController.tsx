"use client";

import { botConfig } from "@/core/config/bot";
import { axiosInstance } from "@/core/http";
import { createMessageFromResponse } from "@/core/utils/createMessageFromResponse";
import { getSession } from "@/core/utils/session";
import {
    GetActiveRobotDetailResponse,
    useGetActiveRobotDetailMutation,
} from "@/services/robot";
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
        if (getSession()) return;

        if (!firstOption && massages.length === 0) {
            // setFirstOption(1);
            // setMode("click");
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
                    .then(async (data) => {
                        console.log("data", data);

                        const typeEvent = data.data.event;

                        if (typeEvent === "start" && data.next) {
                            const res =
                                await axiosInstance.get<GetActiveRobotDetailResponse>(
                                    data.next as unknown as string,
                                    {
                                        params: {
                                            sp_session: getSession(),
                                        },
                                    }
                                );

                            console.log("res", res);

                            //  handle event
                            // is_chat == 1 mở input chat luông
                            if (data.is_chat === 1) {
                            }
                            // is_chat == 2 mở input chat 1 lần
                        }

                        addMessage(createMessageFromResponse(data));
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
