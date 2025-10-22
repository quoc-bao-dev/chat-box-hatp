import { GetActiveRobotDetailResponse } from "@/services/robot";
import { Message } from "@/store/chatBoxStore";

export const createMessageFromResponse = (
    data: GetActiveRobotDetailResponse
): Message => {
    return {
        id: Number(data.data.id),
        sender: data.data.type_send === "1" ? "user" : "assistant",
        content: data.data.message,
        sendType: data.data.event as "select" | "options" | "text",
        options: data.data.options,
    };
};

export const createMessageFromHistoryResponse = (
    data: GetActiveRobotDetailResponse["data"]
): Message => {
    const mapEvaluate = {
        "1": "bad",
        "2": "normal",
        "3": "good",
    };
    if (data.event === "evaluate_support") {
        console.log(data);

        const jsonItem = data.json_item as {
            evaluate: string;
            tag: string[];
        };
        return {
            id: Number(data.id),
            sender: data.type_send === "1" ? "user" : "assistant",
            content: data.message,
            sendType: "feedback",
            feedback: {
                rating: mapEvaluate[jsonItem.evaluate as "1" | "2" | "3"] as
                    | "good"
                    | "normal"
                    | "bad",
                tags: jsonItem.tag,
                isEvaluated: true,
            },
        };
    }
    return {
        id: Number(data.id),
        sender: data.type_send === "1" ? "user" : "assistant",
        content: data.message,
        sendType: data.event as "select" | "options" | "text",
        options: data.options,
    };
};

export const createMessage = (payload: Message) => payload;
