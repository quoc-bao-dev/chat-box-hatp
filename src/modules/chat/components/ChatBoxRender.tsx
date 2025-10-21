"use client";

import { useChatBoxState } from "@/store";
import AssistantTyping from "./AssistantTyping";
import ChatItemRender from "./ChatItemRender";
import { useEffect, useRef } from "react";

const ChatBoxRender = () => {
    const { isAssistantTyping, massages } = useChatBoxState();

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, [massages, isAssistantTyping]);

    return (
        <div
            ref={containerRef}
            className={`h-full space-y-3 overflow-y-scroll py-5 lg:px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        >
            {/* === list message === */}
            {massages.map((message, index) => (
                <ChatItemRender
                    key={index}
                    sender={message.sender}
                    content={message.content}
                    sendType={message.sendType}
                    options={message.options}
                />
            ))}

            {isAssistantTyping && <AssistantTyping />}
        </div>
    );
};

export default ChatBoxRender;
