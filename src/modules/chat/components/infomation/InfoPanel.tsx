"use client";

import { InfoList, InfoListItem } from "@/core/components/ui";
import { botConfig } from "@/core/config/bot";
import axiosClient from "@/core/http/axiosClient";
import { createMessageFromResponse } from "@/core/utils/createMessageFromResponse";
import { getSession } from "@/core/utils/session";
import { useChatBoxActions, useChatBoxState } from "@/store";
import { useCartItemEffect } from "@/store/cartItemEffect";

type InfoItem = {
    id: string;
    content: string;
    next?: string;
};

type InfoPanelProps = {
    items?: InfoItem[];
};

const defaultItems: InfoItem[] = [
    { id: "return", content: "Thông tin về quy trình trả hàng" },
    { id: "payment", content: "Quy trình trình thanh toán" },
    { id: "debt", content: "Số ngày công nợ" },
    { id: "invoice", content: "Quy trình xuất hoá đơn" },
    { id: "hotline", content: "Gọi hotline liên hệ tư vấn viên" },
];

const InfoPanel = ({ items = defaultItems }: InfoPanelProps) => {
    const { isAssistantTyping } = useChatBoxState();

    const {
        addMessage,
        setIsAssistantTyping,
        startCountdownFeedback,
        stopCountdownFeedback,
        setSessionRobot,
    } = useChatBoxActions();

    const { triggerForceClose } = useCartItemEffect();

    // xử lí kịch bản ở đây
    const handleNext = (next: string) => async () => {
        if (!next) return;
        if (isAssistantTyping) return;

        stopCountdownFeedback();
        triggerForceClose();
        try {
            const response = await axiosClient.post(next, {
                sp_session: getSession(),
            });

            addMessage(createMessageFromResponse(response.data));
            setIsAssistantTyping(false);
            const nextRes = response.data.next;
            const sessionRobot = response.data.data.session_robot;

            setSessionRobot(sessionRobot);

            if (nextRes) {
                setIsAssistantTyping(true);
                await new Promise((resolve) =>
                    setTimeout(resolve, botConfig.typingDelay)
                );
                handleNext(nextRes)();
            } else {
                // setMode("chat");

                // TODO: start countdown feedback
                startCountdownFeedback();
            }
        } catch (error) {
            setIsAssistantTyping(false);
        }
    };

    const handleItemClick = (item: InfoListItem) => {
        const infoItem = items.find((i) => i.id === item.id);
        if (infoItem?.next) {
            handleNext(infoItem.next)();
        }
    };

    const title = "Thông tin khác về Hoàng Anh Tân Phú";

    // Convert InfoItem[] to InfoListItem[]
    const infoListItems: InfoListItem[] = items.map((item) => ({
        id: item.id,
        content: item.content,
    }));

    return (
        <InfoList
            title={title}
            items={infoListItems}
            onItemClick={handleItemClick}
        />
    );
};

export default InfoPanel;
