"use client";

import { ProductOption } from "@/services/chatbot";
import { RobotOption } from "@/services/robot";
import { useChatBoxActions, useChatBoxState } from "@/store";
import { useRegisterScrollContainer } from "@/core/hook";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import AssistantTyping from "./AssistantTyping";
import ChatItemRender from "./ChatItemRender";
import Feedback from "./Feedback";
import PaginationTrigger from "./PaginationTrigger";
import ScrollToBottomButton from "./ScrollToBottomButton";

import styles from "@/core/styles/scrollbar.module.css";

const ChatBoxRender = () => {
    const { isAssistantTyping, massages, isFeedback } = useChatBoxState();
    const [canScrollToBottom, setCanScrollToBottom] = useState(true);
    const { startCountdownFeedback, setMode } = useChatBoxActions();

    const [isFirstMount, setIsFirstMount] = useState(true);
    const [hasInitialScroll, setHasInitialScroll] = useState(false);
    const [hasCheckShowFeedback, setHasCheckShowFeedback] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    // Register container vào store để có thể scroll từ bất kỳ đâu
    useRegisterScrollContainer(containerRef);

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

    // Scroll xuống cuối NGAY LẬP TỨC khi vào chat page lần đầu
    // useLayoutEffect chạy đồng bộ TRƯỚC khi browser paint
    // -> User không thấy scroll, chỉ thấy kết quả cuối cùng
    useLayoutEffect(() => {
        if (isFirstMount && massages.length > 0 && !hasInitialScroll) {
            const el = containerRef.current;
            if (!el) return;

            // Scroll instant bằng cách set scrollTop trực tiếp (không animation)
            el.scrollTop = el.scrollHeight;
            setHasInitialScroll(true);
            setCanScrollToBottom(true);
            setIsFirstMount(false);
        }
    }, [isFirstMount, massages.length, hasInitialScroll]);

    // Reset khi messages thay đổi từ có -> 0 hoặc ngược lại
    useEffect(() => {
        if (massages.length === 0) {
            setHasInitialScroll(false);
            setIsFirstMount(true);
        }
    }, [massages.length]);

    // Auto-scroll smooth cho messages mới (sau khi đã scroll initial)
    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el || isFirstMount) return; // Không scroll nếu đang trong initial mount

        // Chỉ auto scroll nếu được phép
        if (canScrollToBottom) {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
                });
            }, 0);
        }

        setShowScrollButton(false);
    }, [massages, isAssistantTyping, canScrollToBottom, isFirstMount]);

    useLayoutEffect(() => {
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
    useLayoutEffect(() => {
        if (isFeedback) {
            scrollToBottom();
        }
    }, [isFeedback]);

    useEffect(() => {
        if (hasCheckShowFeedback) return;
        if (
            !hasCheckShowFeedback &&
            massages.length > 0 &&
            massages[massages.length - 1].sendType === "table-price" &&
            !isFeedback
        ) {
            startCountdownFeedback();
            setHasCheckShowFeedback(true);
        }

        if (
            massages.length > 0 &&
            massages[massages.length - 1].sendType === "wait_reply"
        ) {
            setMode("chat");
            setHasCheckShowFeedback(false);
            // set input
        }
    }, [massages]);

    return (
        <div
            ref={containerRef}
            className={` h-full space-y-3 overflow-y-scroll py-5 lg:px-4 relative [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${styles.customScrollbar}-`}
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
                    options={message.options as RobotOption[]}
                    feedback={message.feedback}
                    time={message.time}
                    products={message.products}
                    productOptions={message.options as ProductOption[]}
                    orderDetail={message.orderDetail}
                    optionsCategory={message.optionsCategory}
                    optionsAddressShip={message.optionsAddressShip}
                    disableAction={
                        index !== massages.length - 1 || isAssistantTyping
                    }
                    nextLink={message.nextLink}
                    isHistory={message.isHistory}
                />
            ))}

            {isAssistantTyping && <AssistantTyping />}

            {/* === scroll bottom button === */}

            {/* === feedback === */}
            {isFeedback && massages.length > 0 && (
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
            <ScrollToBottomButton
                show={showScrollButton}
                onClick={scrollToBottom}
            />
        </div>
    );
};

export default ChatBoxRender;
