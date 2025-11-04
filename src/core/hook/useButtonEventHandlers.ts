import { useState } from "react";
import { axiosInstance } from "@/core/http/axiosClient";
import { createMessageFromResponse } from "@/core/utils/createMessageFromResponse";
import { getSession } from "@/core/utils/session";
import { useChatBoxActions } from "@/store";
import { EVENTS } from "@/core/constants/events";
import {
    ButtonEventType,
    UseButtonEventHandlersOptions,
    ButtonEventHandlersReturn,
} from "@/core/types/buttonEvents";
import { RobotOption } from "@/services/robot";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";

export const useButtonEventHandlers = (
    options: UseButtonEventHandlersOptions
): ButtonEventHandlersReturn => {
    const { isLoggedIn } = useAuth();
    const {
        options: productOptions,
        onSuccess,
        onError,
        messageRequire,
    } = options;

    // Internal state
    const [loadingStates, setLoadingStates] = useState({
        confirm: false,
        edit: false,
        cancel: false,
    });

    const {
        addMessage,
        stopCountdownFeedback,
        startCountdownFeedback,
        setIsAssistantTyping,
        setIsFeedback,
    } = useChatBoxActions();

    // Helper function to find event from options by type
    const findEventByType = (eventType: ButtonEventType): string | null => {
        const eventArray = EVENTS[eventType];
        const foundOption = productOptions.find((opt) => {
            const moveEvent = opt.show_move_event;
            return (
                moveEvent &&
                (eventArray as readonly string[]).includes(moveEvent)
            );
        });
        return foundOption?.show_move_event || null;
    };

    // Function to call API based on next URL with specific loading state
    const callApiByEvent = async (
        eventType: string,
        setLoading: (loading: boolean) => void
    ) => {
        // Check if eventType is valid based on EVENTS
        const isValidEvent = Object.values(EVENTS)
            .flat()
            .includes(eventType as any);
        if (!isValidEvent) {
            console.warn(`Invalid event type: ${eventType}`);
            return;
        }

        const option = productOptions.find(
            (opt) => opt.show_move_event === eventType
        );
        // console.log("option", (option as RobotOption).is_login === 1);

        if ((option as RobotOption).is_login === 1 && !isLoggedIn) {
            toast.error(messageRequire || "Vui lòng đăng nhập!");
            return;
        }
        if (!option?.next) {
            console.warn(`No API endpoint found for event: ${eventType}`);
            return;
        }

        setIsFeedback(false);
        setLoading(true);
        try {
            const response = await axiosInstance.get(option.next, {
                params: {
                    sp_session: getSession(),
                },
            });
            const data = response.data;
            addMessage(createMessageFromResponse(data));

            const nextLink = data.next;
            if (!nextLink) {
                return;
            }

            setIsAssistantTyping(true);

            const res = await axiosInstance.get(nextLink, {
                params: { sp_session: getSession() },
            });

            const dataNext = res.data;

            setIsAssistantTyping(false);
            addMessage(createMessageFromResponse(dataNext));

            return data;
        } catch (error) {
            console.error(`❌ API Error for ${eventType}:`, error);
            setIsAssistantTyping(false);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // ========================================
    // LOGIC RENDER ACTION BUTTON CONFIGS
    // ========================================
    // Phần này xử lý việc tạo ra actionButtonConfigs từ options
    // để render các button động dựa trên dữ liệu từ API

    // Helper function để xác định button type dựa trên eventType
    const getButtonType = (
        eventType: string
    ): "confirm" | "edit" | "cancel" | null => {
        // Kiểm tra eventType thuộc nhóm nào trong EVENTS constant
        if (EVENTS.CONFIRM.includes(eventType as any)) return "confirm";
        if (EVENTS.EDIT.includes(eventType as any)) return "edit";
        if (EVENTS.CANCEL.includes(eventType as any)) return "cancel";
        return null;
    };

    // Tạo actionButtonConfigs từ options với type classification
    // Mỗi option sẽ được map thành một config object với:
    // - eventType: event từ API (ví dụ: "confirm_product", "edit_product")
    // - label: tên hiển thị trên button (lấy từ option.name)
    // - type: phân loại button ("confirm", "edit", "cancel")
    const actionButtonConfigs = productOptions
        .filter((opt) => Boolean(opt.show_move_event)) // Chỉ lấy options có show_move_event
        .map((opt) => {
            const eventType = opt.show_move_event as string;
            return {
                eventType,
                label: opt.name, // Tên button lấy từ option.name
                type: getButtonType(eventType) as "confirm" | "edit" | "cancel",
            };
        })
        .filter((config) => config.type !== null); // Chỉ lấy configs có type hợp lệ
    // ========================================
    // END LOGIC RENDER ACTION BUTTON CONFIGS
    // ========================================

    // Event handlers
    const handleConfirmClick = async () => {
        stopCountdownFeedback();
        const confirmEvent = findEventByType("CONFIRM");

        if (confirmEvent) {
            try {
                await callApiByEvent(confirmEvent, (loading) =>
                    setLoadingStates((prev) => ({ ...prev, confirm: loading }))
                );
                onSuccess?.("CONFIRM");
            } catch (error) {
                onError?.("CONFIRM", error as Error);
            }
        }
        startCountdownFeedback();
    };

    const handleEditClick = async () => {
        stopCountdownFeedback();
        const editEvent = findEventByType("EDIT");

        if (editEvent) {
            try {
                await callApiByEvent(editEvent, (loading) =>
                    setLoadingStates((prev) => ({ ...prev, edit: loading }))
                );
                onSuccess?.("EDIT");
            } catch (error) {
                onError?.("EDIT", error as Error);
            }
        }
    };

    const handleCancelClick = async () => {
        stopCountdownFeedback();
        const cancelEvent = findEventByType("CANCEL");

        if (cancelEvent) {
            try {
                await callApiByEvent(cancelEvent, (loading) =>
                    setLoadingStates((prev) => ({ ...prev, cancel: loading }))
                );
                onSuccess?.("CANCEL");
            } catch (error) {
                onError?.("CANCEL", error as Error);
            }
        }
    };

    // Return object
    return {
        // Loading states
        loadingStates,

        // Event handlers
        handleConfirmClick,
        handleEditClick,
        handleCancelClick,

        // Utility functions
        findEventByType,
        callApiByEvent,

        // Action button configs for rendering (từ options API)
        actionButtonConfigs,

        // Button configs for rendering
        buttonConfigs: {
            confirm: {
                loading: loadingStates.confirm,
                handler: handleConfirmClick,
            },
            edit: { loading: loadingStates.edit, handler: handleEditClick },
            cancel: {
                loading: loadingStates.cancel,
                handler: handleCancelClick,
            },
        },
    };
};
