"use client";

import { ProductOption } from "@/services/chatbot";
import { useChatBoxState } from "@/store";
import { useEffect, useRef, useState } from "react";
import AssistantTyping from "./AssistantTyping";
import ChatItemRender from "./ChatItemRender";
import Feedback from "./Feedback";
import PaginationTrigger from "./PaginationTrigger";
import ScrollToBottomButton from "./ScrollToBottomButton";

const ChatBoxRender = () => {
    const { isAssistantTyping, massages, isFeedback } = useChatBoxState();
    const [canScrollToBottom, setCanScrollToBottom] = useState(true);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const updateScrollButtonVisibility = () => {
        const el = containerRef.current;
        if (!el) return;

        const threshold = 80; // px from bottom considered "at bottom"
        const isAtBottom =
            el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;

        // Kiểm tra nếu user đang ở gần top (100px từ đầu)
        const isNearTop = el.scrollTop < 0;

        // Chỉ cho phép auto scroll nếu user ở gần cuối và không ở gần top
        const shouldAllowAutoScroll = isAtBottom && !isNearTop;
        setCanScrollToBottom(shouldAllowAutoScroll);

        setShowScrollButton(!isAtBottom);
    };

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // Chỉ auto scroll nếu được phép
        if (canScrollToBottom) {
            el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
            // After auto-scroll, hide the button (we are at bottom)
        }
        setShowScrollButton(false);
    }, [massages, isAssistantTyping, canScrollToBottom]);

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
        // Reset state khi user click scroll to bottom
        setCanScrollToBottom(true);
    };

    // show feedback
    useEffect(() => {
        if (isFeedback) {
            scrollToBottom();
        }
    }, [isFeedback]);

    return (
        <div
            ref={containerRef}
            className={`h-full space-y-3 overflow-y-scroll py-5 lg:px-4 relative [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        >
            {/* === trigger === */}
            <PaginationTrigger />

            {/* === list message === */}
            {massages.map((message, index) => (
                <ChatItemRender
                    key={index}
                    id={message.id}
                    sender={message.sender}
                    content={message.content}
                    sendType={message.sendType}
                    options={message.options}
                    feedback={message.feedback}
                    time={message.time}
                    products={message.products}
                    productOptions={message.options as ProductOption[]}
                />
            ))}
            {isAssistantTyping && <AssistantTyping />}

            {/* === scroll bottom button === */}
            <ScrollToBottomButton
                show={showScrollButton}
                onClick={scrollToBottom}
            />

            {/* === feedback === */}
            {isFeedback && (
                <div className="pt-5">
                    <Feedback
                        onScrollToBottom={() =>
                            setTimeout(() => {
                                scrollToBottom();
                            }, 100)
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default ChatBoxRender;
