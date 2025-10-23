"use client";

import { InfoList, InfoListItem } from "@/core/components/ui";
import { botConfig } from "@/core/config/bot";
import axiosClient from "@/core/http/axiosClient";
import { createMessageFromResponse } from "@/core/utils/createMessageFromResponse";
import { getSession } from "@/core/utils/session";
import { useChatBoxActions, useChatBoxState } from "@/store";
import { useCartItemEffect } from "@/store/cartItemEffect";
import { useChatInputStore } from "@/store/chatInputStore";

type InfoItem = {
    id: string;
    content: string;
    next?: string;
    disabled?: boolean;
};

type InfoPanelProps = {
    title?: string;
    items?: InfoItem[];
    messageId?: number;
};

const defaultItems: InfoItem[] = [
    { id: "return", content: "Thông tin về quy trình trả hàng" },
    { id: "payment", content: "Quy trình trình thanh toán" },
    { id: "debt", content: "Số ngày công nợ" },
    { id: "invoice", content: "Quy trình xuất hoá đơn" },
    { id: "hotline", content: "Gọi hotline liên hệ tư vấn viên" },
];

const InfoPanel = ({ title, items = [], messageId }: InfoPanelProps) => {
    const { isAssistantTyping } = useChatBoxState();

    const {
        addMessage,
        setIsAssistantTyping,
        startCountdownFeedback,
        stopCountdownFeedback,
        setSessionRobot,
        disableOptionInMessage,
        setIsFeedback,
        setMode,
    } = useChatBoxActions();

    const { setEvent, setNextLink, setDataPost } = useChatInputStore();

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
            const nextWait = response.data.next_wait;
            const sessionRobot = response.data.data.session_robot;

            setSessionRobot(sessionRobot);

            // luồng thông tin HATP
            if (nextRes) {
                setIsAssistantTyping(true);
                await new Promise((resolve) =>
                    setTimeout(resolve, botConfig.typingDelay)
                );
                handleNext(nextRes)();
            }
            // luồng tra cứu giá và lên đơn
            else if (nextWait) {
                // lấy data post từ response gửi kèm message
                const dataPost = response.data.data.data_post;

                //  [Handle Event]

                // [is_chat == 1] mở input chat luôn
                if (response.data.is_chat === 1) {
                    setEvent(1);
                    // setActive(true);
                    // setMode("chat");
                    // setNextLink(response.data.next_wait ?? null);
                    // setDataPost(dataPost);
                }

                // [is_chat == 2] mở input chat 1 lần
                if (response.data.is_chat === 2) {
                    setEvent(2);
                    setMode("chat");
                    setNextLink(response.data.next_wait ?? null);
                    setDataPost(dataPost);
                }
            } else {
                startCountdownFeedback();
            }
        } catch (error) {
            setIsAssistantTyping(false);
        }
    };

    const handleItemClick = (item: InfoListItem) => {
        setIsFeedback(false);
        setMode("click");
        const infoItem = items.find((i) => i.id === item.id);
        if (infoItem?.next) {
            // Disable option trước khi thực hiện next
            if (messageId) {
                disableOptionInMessage(messageId, item.id);
            }
            handleNext(infoItem.next)();
        }
    };

    // Convert InfoItem[] to InfoListItem[]
    const infoListItems: InfoListItem[] = items.map((item) => ({
        id: item.id,
        content: item.content,
        disabled: item.disabled,
    }));

    if (infoListItems.length === 0) {
        return null;
    }

    return (
        <InfoList
            title={title!}
            items={infoListItems}
            onItemClick={handleItemClick}
        />
    );
};

export default InfoPanel;
