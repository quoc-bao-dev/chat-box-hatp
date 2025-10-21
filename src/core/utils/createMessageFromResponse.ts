import { GetActiveRobotDetailResponse } from "@/services/robot";
import { Message } from "@/store/chatBoxStore";

export const createMessageFromResponse = (
    data: GetActiveRobotDetailResponse
): Message => {
    return {
        sender: data.data.type_send === "1" ? "user" : "assistant",
        content: data.data.message,
        sendType: data.data.event as "select" | "options" | "text",
        options: data.data.options,
    };
};
