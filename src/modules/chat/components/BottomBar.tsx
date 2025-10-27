"use client";

import BottomButton from "@/modules/home/components/BottomButton";
import { useCartItemEffect } from "@/store/cartItemEffect";
import { PropsWithChildren, useEffect, useState } from "react";
import ChatInputController from "./ChatInputController";
import FaqToggleList from "./FaqToggleList";
import FollowUp from "./FollowUp";

type BottomBarProps = {
    type: "chat" | "info";
};

const BottomBar = ({ type }: BottomBarProps) => {
    const [isShow, setIsShow] = useState(false);

    // side effect
    const { forceClose, resetForceClose } = useCartItemEffect();

    useEffect(() => {
        if (forceClose) {
            setIsShow(false);
            resetForceClose();
        }
    }, [forceClose]);

    const BottomContent = ({ children }: PropsWithChildren) => {
        return (
            <div>
                {/* <div className="pb-2">
                    <FollowUp />
                </div> */}
                <FaqToggleList
                    isShow={isShow}
                    onToggle={() => setIsShow(!isShow)}
                />
                {children}
            </div>
        );
    };

    if (type === "chat") {
        return (
            <BottomContent>
                <div className="pt-2 lg:pt-4">
                    <ChatInputController />
                </div>
            </BottomContent>
        );
    }
    return (
        <BottomContent>
            {/* === bottom button === */}
            <BottomButton />
        </BottomContent>
    );
};

export default BottomBar;
