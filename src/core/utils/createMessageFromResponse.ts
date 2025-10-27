import { GetActiveRobotDetailResponse } from "@/services/robot";
import { Message } from "@/store/chatBoxStore";

export const createMessageFromResponse = (
    data: GetActiveRobotDetailResponse
): Message => {
    // show table
    if (data.data.show_move_event === "tablePrice") {
        return {
            id: Number(data.data.id),
            sender: data.data.type_send === "1" ? "user" : "assistant",
            content: data.data.message,
            sendType: "table-price",
            options: data.data.options,
            products: data.data.json_item,
        };
    }

    // show edit product code

    if (
        data.data.event_app === "event_order" &&
        data.data.event_show === "select"
    ) {
        return {
            id: Number(data.data.id),
            sender: data.data.type_send === "1" ? "user" : "assistant",
            content: data.data.message,
            sendType: "edit-product-code",
            options: data.data.options,
            products: data.data.json_item,
        };
    }

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

    // show table
    if (data.show_move_event === "tablePrice") {
        return {
            id: Number(data.id),
            sender: data.type_send === "1" ? "user" : "assistant",
            content: data.message,
            sendType: "table-price",
            options: data.options,
            products: data.json_item,
            disableAction: true,
        };
    }

    // show edit product code
    if (data.show_move_event == "view_edit_product") {
        return {
            id: Number(data.id),
            sender: data.type_send === "1" ? "user" : "assistant",
            content: data.message,
            sendType: "edit-product-code",
            products: data.json_item,
            options: data.options,
            disableAction: true,
        };
    }

    // show feedback
    if (data.event === "evaluate_support") {
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
            options: data.options,
        };
    }

    if (data.show_move_event === "not_found_product") {
        return {
            id: Number(data.id),
            sender: data.type_send === "1" ? "user" : "assistant",
            content: data.message,
            sendType: "not-found-product",
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
