import { GetActiveRobotDetailResponse } from "@/services/robot";
import { Message } from "@/store/chatBoxStore";

export const createMessageFromResponse = (
    data: GetActiveRobotDetailResponse
): Message => {
    return {
        id: Number(data.data.id),
        sender: data.data.type_send === "1" ? "user" : "assistant",
        content: data.data.message,
        sendType: data.data.event as
            | "select"
            | "options"
            | "text"
            | "wait_reply",
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

    // show feedback
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

    // show products
    if (
        data.show_move_event === "FindInfoProduct" ||
        data.show_move_event === "event_order"
    ) {
        return {
            id: Number(data.id),
            sender: data.type_send === "1" ? "user" : "assistant",
            content: data.message,
            sendType: "products",
            products: data.json_item,
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
