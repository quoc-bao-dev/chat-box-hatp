import { botConfig } from "@/core/config/bot";
import axiosClient, { axiosInstance } from "@/core/http/axiosClient";
import { createMessageFromResponse } from "@/core/utils/createMessageFromResponse";
import { getSession } from "@/core/utils/session";
import { GetActiveRobotDetailResponse } from "@/services/robot";
import { useChatBoxActions, useChatBoxState } from "@/store";
import { useCartItemEffect } from "@/store/cartItemEffect";
import { useChatInputStore } from "@/store/chatInputStore";
import { useNextEventActions } from "@/store/nextEventStore";
import { useCallback, useState } from "react";

type RequestMethod = "GET" | "POST";
type RequestPayload = FormData | Record<string, unknown> | null;

interface UseNextFlowOptions {
    /**
     * HTTP method to use (default: "POST")
     */
    method?: RequestMethod;
    /**
     * Custom headers for the request
     */
    headers?: Record<string, string>;
    /**
     * Whether to trigger force close on cart items (default: true)
     */
    triggerForceClose?: boolean;
    /**
     * Whether to handle select_category special case (default: true)
     */
    handleSelectCategory?: boolean;
    /**
     * Whether to handle recursive nextRes calls (default: true)
     */
    handleRecursiveNext?: boolean;
    /**
     * Whether to start countdown feedback when no next flows (default: true)
     */
    autoStartFeedback?: boolean;
    /**
     * Callback when flow starts
     */
    onStart?: () => void;
    /**
     * Callback when flow completes successfully
     */
    onSuccess?: (response: GetActiveRobotDetailResponse) => void;
    /**
     * Callback when flow fails
     */
    onError?: (error: unknown) => void;
    /**
     * Callback when flow completes (success or error)
     */
    onComplete?: () => void;
}

interface UseNextFlowReturn {
    /**
     * Handler function to execute the next flow
     * @param next - The next URL to call
     * @param payload - Optional payload for POST requests
     */
    handleNext: (next: string, payload?: RequestPayload) => Promise<void>;
    /**
     * Loading state
     */
    isLoading: boolean;
    /**
     * Reset loading state
     */
    resetLoading: () => void;
}

/**
 * Custom hook to handle next flow logic (nextRes, nextWait, is_chat, etc.)
 * Reusable across InfoPanel, CategoryPanel, OrderSuccessPanel, etc.
 */
export const useNextFlow = (
    options: UseNextFlowOptions = {}
): UseNextFlowReturn => {
    const {
        method = "POST",
        headers,
        triggerForceClose: shouldTriggerForceClose = true,
        handleSelectCategory = true,
        handleRecursiveNext = true,
        autoStartFeedback = true,
        onStart,
        onSuccess,
        onError,
        onComplete,
    } = options;

    const { isAssistantTyping } = useChatBoxState();
    const {
        addMessage,
        setIsAssistantTyping,
        startCountdownFeedback,
        stopCountdownFeedback,
        setSessionRobot,
    } = useChatBoxActions();
    const { setEvent, setNextLink, setDataPost } = useChatInputStore();
    const { triggerForceClose } = useCartItemEffect();
    const { setNextLink: setNextLinkNextEvent } = useNextEventActions();

    const [isLoading, setIsLoading] = useState(false);

    const resetLoading = useCallback(() => {
        setIsLoading(false);
    }, []);

    const handleNext = useCallback(
        async (next: string, payload?: RequestPayload): Promise<void> => {
            if (!next) return;
            if (isAssistantTyping) return;

            onStart?.();
            stopCountdownFeedback();
            if (shouldTriggerForceClose) {
                triggerForceClose();
            }

            setIsLoading(true);

            try {
                // Make API request
                let response: { data: GetActiveRobotDetailResponse };

                if (method === "POST") {
                    const requestPayload = payload || {
                        sp_session: getSession(),
                    };

                    if (payload instanceof FormData) {
                        // For FormData, add session if not already included
                        if (!payload.has("sp_session")) {
                            payload.append("sp_session", getSession() || "");
                        }
                        response = await axiosClient.post(next, payload, {
                            headers: headers || {
                                "Content-Type": "multipart/form-data",
                            },
                        });
                    } else {
                        response = await axiosClient.post(
                            next,
                            requestPayload,
                            {
                                headers,
                            }
                        );
                    }
                } else {
                    // GET request
                    response = await axiosInstance.get(next, {
                        params: {
                            sp_session: getSession(),
                            ...(typeof payload === "object" &&
                                !(payload instanceof FormData) &&
                                payload),
                        },
                        headers,
                    });
                }

                const responseData = response.data;

                // Handle select_category special case
                if (
                    handleSelectCategory &&
                    responseData.data.show_move_event === "select_category"
                ) {
                    setNextLinkNextEvent(responseData.next as string);
                    addMessage(createMessageFromResponse(responseData));
                    setIsAssistantTyping(false);
                    setIsLoading(false);
                    onSuccess?.(responseData);
                    onComplete?.();
                    return;
                }

                // payload for next request (as FormData)
                const payloads = new FormData();
                payloads.append("sp_session", getSession() || "");

                if (responseData.data.show_move_event === "create_order") {
                    const addressId =
                        typeof window !== "undefined"
                            ? sessionStorage.getItem("addressId")
                            : null;
                    console.log("addressId", addressId);
                    if (
                        typeof addressId !== "undefined" &&
                        addressId !== null
                    ) {
                        payloads.append(
                            "address_delivery_id",
                            String(addressId)
                        );
                    }
                }

                // Add message from response
                addMessage(createMessageFromResponse(responseData));
                setIsAssistantTyping(false);

                // Extract flow data
                const nextLink = responseData.next;
                const nextWait = responseData.next_wait;
                const sessionRobot = responseData.data.session_robot;
                const dataPost = responseData.data.data_post;
                const isChat = responseData.is_chat;
                const sendChat = responseData.send_chat;

                // Set session robot if available
                if (sessionRobot) {
                    setSessionRobot(sessionRobot);
                }

                // Handle recursive nextRes flow
                if (
                    nextLink &&
                    handleRecursiveNext &&
                    typeof nextLink === "string"
                ) {
                    setIsAssistantTyping(true);
                    await new Promise((resolve) =>
                        setTimeout(resolve, botConfig.typingDelay)
                    );

                    // Recursive call
                    await handleNext(nextLink, payloads);
                    setIsLoading(false);
                    onSuccess?.(responseData);
                    onComplete?.();
                    return;
                }

                // Handle nextWait flow (for chat input)
                if (nextWait) {
                    // Handle is_chat === 1 (open input chat immediately)
                    if (isChat === 1) {
                        setEvent(1);
                        // Optionally set mode and nextLink based on use case
                        // setMode("chat");
                        // setNextLink(nextWait);
                        // setDataPost(dataPost);
                    }

                    // Handle is_chat === 2 (open input chat once)
                    if (isChat === 2) {
                        setEvent(2);
                        // setMode("chat");
                        setNextLink(nextWait);
                        setDataPost(dataPost);
                    }

                    // Handle sendChat === 1 (alternative flow)
                    if (sendChat === 1) {
                        const sendChatIsChat = responseData.is_chat;
                        setEvent(sendChatIsChat);
                        // setMode("chat");
                        setNextLink(nextWait);
                        setDataPost(dataPost);
                    }
                } else {
                    // No nextWait, start feedback countdown
                    if (autoStartFeedback) {
                        startCountdownFeedback();
                    }
                }

                setIsLoading(false);
                onSuccess?.(responseData);
            } catch (error) {
                setIsAssistantTyping(false);
                setIsLoading(false);
                onError?.(error);
            } finally {
                onComplete?.();
            }
        },
        [
            isAssistantTyping,
            method,
            headers,
            shouldTriggerForceClose,
            handleSelectCategory,
            handleRecursiveNext,
            autoStartFeedback,
            onStart,
            onSuccess,
            onError,
            onComplete,
            stopCountdownFeedback,
            triggerForceClose,
            setNextLinkNextEvent,
            addMessage,
            setIsAssistantTyping,
            startCountdownFeedback,
            setSessionRobot,
            setEvent,
            setNextLink,
            setDataPost,
        ]
    );

    return {
        handleNext,
        isLoading,
        resetLoading,
    };
};
