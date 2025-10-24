"use client";

import { useGetChatbotList } from "@/services/chatbot";
import { useChatBoxActions } from "@/store";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import CardItem from "./CardItem";
import HomeCardListSkeleton from "./HomeCardListSkeleton";

const HomeCardList = () => {
    const { setFirstOption, setMode, setIsFeedback } = useChatBoxActions();
    const router = useRouter();

    const { data, isLoading } = useGetChatbotList();

    // Sử dụng useMemo để map dữ liệu từ API
    const mappedCards = useMemo(() => {
        if (!data?.data) return [];

        return data.data
            .map((chatbot) => ({
                id: Number(chatbot.id),
                iconSrc: chatbot.avatar || "/image/icons/icon-01.png", // fallback icon
                title: chatbot.name,
                description: "Craft compelling text for ads and emails.", // default description
                disabled: chatbot.disabled === "1",
            }))
            .sort((a) => (a.disabled ? 1 : -1));
    }, [data?.data]);

    const handleClick = (id: number) => {
        setFirstOption(id);
        setMode("click");
        setIsFeedback(false);
        router.push("/chat");
    };

    // Hiển thị skeleton khi đang loading
    if (isLoading) {
        return <HomeCardListSkeleton />;
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
            {mappedCards.length > 0 ? (
                mappedCards.map((card) => (
                    <div key={card.id} className="h-full">
                        <CardItem
                            iconSrc={card.iconSrc}
                            title={card.title}
                            description={card.description}
                            onClick={() => handleClick(card.id)}
                            disabled={card.disabled}
                        />
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center py-8">
                    <p className="text-gray-500 text-sm">Không có dữ liệu</p>
                </div>
            )}
        </div>
    );
};

export default HomeCardList;
