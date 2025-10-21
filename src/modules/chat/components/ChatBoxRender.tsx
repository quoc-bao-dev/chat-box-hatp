"use client";

import { useChatBoxState } from "@/store";
import AssistantTyping from "./AssistantTyping";
import ChatItemRender from "./ChatItemRender";
import { useEffect, useRef, useState } from "react";
import ScrollToBottomButton from "./ScrollToBottomButton";

const ChatBoxRender = () => {
    const { isAssistantTyping, massages } = useChatBoxState();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const updateScrollButtonVisibility = () => {
        const el = containerRef.current;
        if (!el) return;
        const threshold = 80; // px from bottom considered "at bottom"
        const isAtBottom =
            el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
        setShowScrollButton(!isAtBottom);
    };

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        // After auto-scroll, hide the button (we are at bottom)
        setShowScrollButton(false);
    }, [massages, isAssistantTyping]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const onScroll = () => updateScrollButtonVisibility();
        el.addEventListener("scroll", onScroll);
        // Initialize state on mount
        updateScrollButtonVisibility();
        return () => {
            el.removeEventListener("scroll", onScroll);
        };
    }, []);

    const scrollToBottom = () => {
        const el = containerRef.current;
        if (!el) return;
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    };

    return (
        <div
            ref={containerRef}
            className={`h-full space-y-3 overflow-y-scroll py-5 lg:px-4 relative [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
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

            {/* === scroll bottom button === */}
            <ScrollToBottomButton
                show={showScrollButton}
                onClick={scrollToBottom}
            />
        </div>
    );
};

export default ChatBoxRender;
