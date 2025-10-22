"use client";

import { Icon } from "@/core/components/common";
import { _Image } from "@/core/config/image";
import { CardItem } from "@/modules/home/components";
import { useGetChatbotList } from "@/services/chatbot";
import { useChatBoxActions } from "@/store";
import { useEffect, useMemo, useRef, useState } from "react";

type FaqToggleListProps = {
    isShow: boolean;
    defaultShow?: boolean;
    onToggle: () => void;
};

const FaqToggleList = ({
    isShow,
    defaultShow,
    onToggle,
}: FaqToggleListProps) => {
    const [isAnimatingOut, setIsAnimatingOut] = useState(defaultShow);
    const prevIsShowRef = useRef(defaultShow);
    const { setFirstOption, setIsFeedback, stopCountdownFeedback } =
        useChatBoxActions();

    const { data } = useGetChatbotList();

    // Sử dụng useMemo để map dữ liệu từ API
    const mappedCards = useMemo(() => {
        if (!data?.data) return [];

        return data.data.map((chatbot) => ({
            id: Number(chatbot.id),
            iconSrc: chatbot.avatar || "/image/icons/icon-01.png", // fallback icon
            title: chatbot.name,
            description: "Craft compelling text for ads and emails.", // default description
            disabled: chatbot.disabled === "1",
        }));
    }, [data?.data]);

    useEffect(() => {
        if (!isShow && prevIsShowRef.current) {
            // start collapse animation, delay showing button until transition ends
            setIsAnimatingOut(true);
        }
        prevIsShowRef.current = isShow;
    }, [isShow]);

    const showButton = !isShow && !isAnimatingOut;

    const handleTransitionEnd = () => {
        if (!isShow) {
            setIsAnimatingOut(false);
        }
    };

    return (
        <div className="min-h-[36px] relative">
            {/* === toggle items === */}
            {showButton && (
                <div
                    className="rounded-full p-[1px] w-fit cursor-pointer"
                    style={{
                        background:
                            "linear-gradient(45deg, #FFFFFF99, #37C390, #37C39066)",
                    }}
                    onClick={onToggle}
                >
                    <div className="px-3 py-2 rounded-full bg-white flex gap-3 items-center">
                        <Icon
                            src={_Image.icon.icon_question}
                            size={20}
                            alt="icon-question"
                        />
                        <p className="text-sm font-medium text-gray-900">
                            Vấn để cần hỗ trợ
                        </p>
                    </div>
                </div>
            )}

            {/* === close button === */}
            {/* {!showButton && (
                <button
                    onClick={onToggle}
                    className="absolute -top-10 right-0 w-[35px] h-[35px] rounded-full bg-white/80 hover:bg-white transition-all duration-300 ease-out flex items-center justify-center"
                >
                    <Icon
                        src={_Image.icon.icon_arrow_left}
                        size={20}
                        alt="icon-close"
                        className="mr-1"
                    />
                </button>
            )} */}

            {/* === list items with slide-in from left === */}
            <div
                className={`
                    relative overflow-hidden transition-all duration-300 ease-out
                    ${
                        isShow
                            ? "opacity-100 translate-x-0 max-h-[999px]"
                            : "opacity-0 -translate-x-3 max-h-0"
                    }
                `}
                onTransitionEnd={handleTransitionEnd}
            >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
                    {mappedCards.map((c) => (
                        <CardItem
                            key={c.id}
                            type="info"
                            iconSrc={c.iconSrc}
                            title={c.title}
                            description={c.description}
                            onClick={() => {
                                onToggle();
                                setFirstOption(c.id!);
                                setIsFeedback(false);
                                stopCountdownFeedback();
                            }}
                            disabled={c.disabled}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqToggleList;
