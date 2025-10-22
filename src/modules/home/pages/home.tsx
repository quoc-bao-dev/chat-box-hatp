"use client";

import { ChatBoxContainer } from "@/core/components/layouts";
import { HomeCardList } from "../../home/components";
import BottomButton from "../components/BottomButton";
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

                <div className="pt-10"></div>

                {/* === button chat === */}
                <BottomButton />
            </ChatBoxContainer>
        </div>
    );
};

export default HomePage;
