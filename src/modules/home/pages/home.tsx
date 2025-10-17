"use client";

import { ChatBoxContainer } from "@/core/components/layouts";
import { Player } from "@lordicon/react";
import { ChatInput } from "@/modules/chat";
import Link from "next/link";
import { CardItem } from "../../home/components";
import { homeCards } from "../../home/data/cards";
import { Icon } from "@/core/components/common";
import { _Image } from "@/core/config";

const HomePage = () => {
    return (
        <div className="min-h-[calc(100vh-40px)] lg:min-h-[calc(100svh-40px)] w-full flex flex-col">
            <ChatBoxContainer
                className="flex-1 flex flex-col h-full "
                wrapperClassName="flex flex-col"
            >
                {/* === title === */}
                <div className="flex flex-1 items-center justify-center">
                    <div className="flex items-center gap-2">
                        <h1 className="pt-10 lg:pt-0 text-transparent bg-clip-text bg-gradient-to-r from-[#018445] to-[#006BE5] text-[28px] lg:text-[72px] leading-[1.15] text-center font-bold">
                            Hoàng Anh Tân Phú <br /> xin chào !
                        </h1>
                        <div className="pt-10 lg:pt-0">
                            <Icon
                                src={_Image.icon.icon_hand_1}
                                size={100}
                                alt="icon-hand-1"
                                className="size-[50px] lg:size-[100px]"
                            />
                        </div>
                    </div>
                </div>

                {/* === list items === */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
                    {homeCards.map((c) => (
                        <Link
                            href={"/chat?type=greeting"}
                            key={c.id}
                            className="h-full"
                        >
                            <CardItem
                                iconSrc={c.iconSrc}
                                title={c.title}
                                description={c.description}
                            />
                        </Link>
                    ))}
                </div>

                {/* === input chat === */}
                <ChatInput
                    placeholder="Nhập tin nhắn..."
                    onSend={(message) => console.log("Message sent:", message)}
                    onMicClick={() => console.log("Mic clicked")}
                    className="pt-5 lg:py-10"
                />
            </ChatBoxContainer>
        </div>
    );
};

export default HomePage;
