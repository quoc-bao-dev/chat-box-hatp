"use client";

import BottomButton from "@/modules/home/components/BottomButton";
import { useState } from "react";
import ChatInputController from "./ChatInputController";
import FaqToggleList from "./FaqToggleList";

type BottomBarProps = {
    type: "chat" | "info";
};

const BottomBar = ({ type }: BottomBarProps) => {
    const [isShow, setIsShow] = useState(type === "info");

    if (type === "chat") {
        return (
            <div>
                <FaqToggleList
                    isShow={isShow}
                    onToggle={() => setIsShow(!isShow)}
                />
                <div className="pt-2 lg:pt-4">
                    <ChatInputController />
                </div>
            </div>
        );
    }
    return (
        <div>
            <FaqToggleList
                defaultShow
                isShow={isShow}
                onToggle={() => setIsShow(!isShow)}
            />
            {/* === bottom button === */}
            <BottomButton />
        </div>
    );
};

export default BottomBar;
