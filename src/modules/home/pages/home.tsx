"use client";

import { ChatBoxContainer } from "@/core/components/layouts";
import { ChatInput } from "@/modules/chat";
import { HomeCardList } from "../../home/components";
import HomeTitle from "../components/HomeTitle";

const HomePage = () => {
    return (
        <div className="min-h-[calc(100svh-40px)] lg:min-h-[calc(100svh-40px)] w-full flex flex-col">
            <ChatBoxContainer
                className="flex-1 flex flex-col h-full"
                wrapperClassName="flex flex-col"
            >
                {/* === title === */}
                <HomeTitle />

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
