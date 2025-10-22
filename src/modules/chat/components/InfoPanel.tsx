"use client";

import { _Image } from "@/core/config";
import { botConfig } from "@/core/config/bot";
import axiosClient from "@/core/http/axiosClient";
import { createMessageFromResponse } from "@/core/utils/createMessageFromResponse";
import { getSession } from "@/core/utils/session";
import { useChatBoxActions, useChatBoxState } from "@/store";
import { useCartItemEffect } from "@/store/cartItemEffect";
import Image from "next/image";

type InfoItem = {
    id: string;
    content: string;
    next?: string;
};

type InfoPanelProps = {
    items?: InfoItem[];
    // title?: string;
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
            const sessionRobot = response.data.session_robot;

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

    const title = "Thông tin khác về Hoàng Anh Tân Phú";

    return (
        <div className="px-3.5 py-4 rounded-[20px] bg-white max-w-[400px]">
            <p className="text-[18px] font-semibold text-gray-900">{title}</p>
            <div className="pt-2 flex flex-col gap-2">
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={handleNext(item.next!)}
                        className="cursor-pointer px-4 py-2 rounded-xl bg-gray-50/80 hover:bg-gray-100 flex items-center justify-between"
                    >
                        <p className="text-[#00A76F] font-medium">
                            {item.content}
                        </p>
                        <Image
                            src={_Image.icon.icon_send_2}
                            alt="arrow-right"
                            width={20}
                            height={20}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoPanel;
