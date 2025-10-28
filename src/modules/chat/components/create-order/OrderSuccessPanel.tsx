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

    const handleViewDetailsClick = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        stopCountdownFeedback();
        setIsFeedback(false);
        try {
            if (!options[0].next) {
                return;
            }
            const res = await axiosInstance.get(options[0].next!);

            addMessage(createMessageFromResponse(res.data));
            setIsAssistantTyping(true);

            const nextLink = res.data.next;

            const nextRes = await axiosInstance.get(nextLink!);

            addMessage(createMessageFromResponse(nextRes.data));
            startCountdownFeedback();
            setIsAssistantTyping(false);
        } finally {
            setIsProcessing(false);
        }
    };

    const handlePlaceAnotherOrderClick = () => {
        setIsFeedback(false);
        if (isProcessing) return;
        setIsProcessing(true);
        // TODO: implement action for placing another order
        setTimeout(() => {
            setIsProcessing(false);
        }, 800);
    };
    return (
        <OrderSuccessModal
            disable={disable || isProcessing}
            onViewDetailsClick={handleViewDetailsClick}
            onPlaceAnotherOrderClick={handlePlaceAnotherOrderClick}
        />
    );
};

export default OrderSuccessPanel;
