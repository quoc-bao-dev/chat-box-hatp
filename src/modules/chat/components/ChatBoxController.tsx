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
import { useChatInputStore } from "@/store/chatInputStore";
import { useEffect } from "react";

const ChatBoxController = () => {
    const { firstOption, massages } = useChatBoxState();
    const { setIsAssistantTyping, setFirstOption, setMode } =
        useChatBoxActions();
    const { addMessage, setSessionRobot } = useChatBoxActions();

    const { setEvent, setNextLink } = useChatInputStore();

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
                        addMessage(createMessageFromResponse(data));
                        setSessionRobot(data.data.session_robot);

                        const typeEvent = data.data.event;

                        // luồng tra cứu giá sản phẩm
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

                            // add message from response
                            addMessage(createMessageFromResponse(res.data));

                            //  handle event
                            // is_chat == 1 mở input chat luôn
                            if (res.data.is_chat === 1) {
                                setEvent(1);
                                // setActive(true);
                                setMode("chat");
                                setNextLink(res.data.next_wait ?? null);
                            }
                            // is_chat == 2 mở input chat 1 lần
                            if (res.data.is_chat === 2) {
                                setEvent(2);
                                setMode("chat");
                            }
                        }
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
