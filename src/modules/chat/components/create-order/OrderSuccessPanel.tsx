import OrderSuccessModal from "@/core/components/ui/OrderSuccessModal";
import { axiosInstance } from "@/core/http";
import { createMessageFromResponse } from "@/core/utils/createMessageFromResponse";
import { RobotOption } from "@/services/robot";
import { useChatBoxActions } from "@/store";
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
    } = useChatBoxActions();
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
