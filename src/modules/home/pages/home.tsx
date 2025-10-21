"use client";

import { Icon } from "@/core/components/common";
import { ChatBoxContainer } from "@/core/components/layouts";
import { _Image } from "@/core/config";
import { ChatInput } from "@/modules/chat";
import { HomeCardList } from "../../home/components";

const HomePage = () => {
    return (
        <div className="min-h-[calc(100svh-40px)] lg:min-h-[calc(100svh-40px)] w-full flex flex-col">
            <ChatBoxContainer
                className="flex-1 flex flex-col h-full"
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
                <HomeCardList />

                {/* === input chat === */}
                <ChatInput
                    placeholder="Nhập tin nhắn..."
                    onSend={(message) => console.log("Message sent:", message)}
                    className="pt-5 lg:py-10 "
                />
            </ChatBoxContainer>
        </div>
    );
};

export default HomePage;
