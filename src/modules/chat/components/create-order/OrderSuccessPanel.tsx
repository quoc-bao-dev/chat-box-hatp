import OrderSuccessModal from "@/core/components/ui/OrderSuccessModal";
import { axiosInstance } from "@/core/http";
import { createMessageFromResponse } from "@/core/utils/createMessageFromResponse";
import { RobotOption } from "@/services/robot";
import { useChatBoxActions } from "@/store";
import { useChatInputStore } from "@/store/chatInputStore";
import { useState } from "react";

type OrderSuccessPanelProps = { options: RobotOption[]; disable?: boolean };

const OrderSuccessPanel = ({
    options = [],
    disable = false,
}: OrderSuccessPanelProps) => {
    const {
        addMessage,
        stopCountdownFeedback,
        startCountdownFeedback,
        setIsAssistantTyping,
        setIsFeedback,
        setMode,
    } = useChatBoxActions();

    const { setEvent, setNextLink, setDataPost } = useChatInputStore();

    const [isProcessing, setIsProcessing] = useState(false);

    const handleOptionClick = async (option: RobotOption) => {
        if (isProcessing || option.disabled) return;
        setIsProcessing(true);
        stopCountdownFeedback();
        setIsFeedback(false);
        try {
            if (!option.next) {
                return;
            }
            const res = await axiosInstance.get(option.next);
            addMessage(createMessageFromResponse(res.data));
            setIsAssistantTyping(true);

            const nextLink = res.data?.next;
            if (nextLink) {
                const nextRes = await axiosInstance.get(nextLink);
                addMessage(createMessageFromResponse(nextRes.data));

                const sendChat = nextRes.data?.send_chat;

                // xử lí lên dơn khác
                if (sendChat === 1) {
                    const nextWait = nextRes.data?.next_wait;
                    const dataPost = nextRes.data?.data?.data_post;
                    const isChat = nextRes.data?.is_chat;

                    if (isChat === 1) {
                        // mở input chat luôn
                        setEvent(1);
                        setMode("chat");
                        setNextLink(nextWait);
                        setDataPost(dataPost);
                    } else if (isChat === 2) {
                        // mở input chat 1 lần
                        setEvent(2);
                        setMode("chat");
                        setNextLink(nextWait);
                        setDataPost(dataPost);
                    }
                }
            }

            startCountdownFeedback();
            setIsAssistantTyping(false);
        } finally {
            setIsProcessing(false);
        }
    };
    return (
        <OrderSuccessModal
            options={options}
            disable={disable || isProcessing}
            onOptionClick={handleOptionClick}
        />
    );
};

export default OrderSuccessPanel;
