import { GetActiveRobotDetailResponse } from "@/services/robot";
import { Message } from "@/store/chatBoxStore";

const mapEvaluate = {
    "1": "bad",
    "2": "normal",
    "3": "good",
} as const;

/**
 * Internal function to create message from data object
 * Handles all message types for both response and history
 */
const createMessageFromData = (
    data: GetActiveRobotDetailResponse["data"],
    isFromHistory: boolean = false,
    nextLink?: string
): Message => {
    // Helper to determine sender
    const getSender = (typeSend: string | number): "user" | "assistant" => {
        // Handle both string and number comparison for type_send
        if (typeof typeSend === "string") {
            return typeSend === "1" ? "user" : "assistant";
        }
        return Number(typeSend) === 1 ? "user" : "assistant";
    };

    // Helper to parse json_item if it's a string
    const parseJsonItem = (jsonItem: any): any => {
        if (jsonItem === null || jsonItem === undefined) {
            return null;
        }
        if (typeof jsonItem === "string") {
            try {
                return JSON.parse(jsonItem);
            } catch (error) {
                console.error("Failed to parse json_item:", error);
                return jsonItem; // Return original string if parse fails
            }
        }
        return jsonItem; // Return as-is if already parsed
    };

    // show select address ship
    if (data.show_move_event === "select_address_ship") {
        if (nextLink) sessionStorage.setItem("nextLink", nextLink || "");

        return {
            id: Number(data.id),
            sender: getSender(data.type_send),
            content: data.message,
            sendType: "select-address-ship",
            options: data.options,
            optionsCategory: data.options_category,
            optionsAddressShip: data.options_address_ship || [
                data.info_address_delivery,
            ],
            nextLink: nextLink,
            isHistory: isFromHistory,
        };
    }

    // show category
    if (data.show_move_event === "select_category") {
        return {
            id: Number(data.id),
            sender: getSender(data.type_send),
            content: data.message,
            sendType: "select-category",
            options: data.options,
            optionsCategory: data.options_category,
            isHistory: isFromHistory,
        };
    }

    // show cancel product
    if (data.event === "cancel_product") {
        return {
            id: Number(data.id),
            sender: getSender(data.type_send),
            content: data.message,
            sendType: "cancel-product",
        };
    }

    // show detail table
    if (data.event === "show_detail_orders" && data.data_orders) {
        return {
            id: Number(data.id),
            sender: getSender(data.type_send),
            content: data.message,
            sendType: "order-detail",
            orderDetail: data.data_orders,
        };
    }

    // show create order
    if (data.show_move_event === "show_create_orders") {
        return {
            id: Number(data.id),
            sender: getSender(data.type_send),
            content: data.message,
            sendType: "show-create-orders",
            options: data.options,
            products: parseJsonItem(data.json_item),
        };
    }

    // show table
    if (data.show_move_event === "tablePrice") {
        return {
            id: Number(data.id),
            sender: getSender(data.type_send),
            content: data.message,
            sendType: "table-price",
            options: data.options,
            products: parseJsonItem(data.json_item),
            ...(isFromHistory && { disableAction: true }),
        };
    }

    // show edit product code
    // Handle both conditions: from response (event_app + event_show) and from history (show_move_event)
    if (
        (data.event_app === "event_order" && data.event_show === "select") ||
        data.show_move_event === "view_edit_product"
    ) {
        return {
            id: Number(data.id),
            sender: getSender(data.type_send),
            content: data.message,
            sendType: "edit-product-code",
            options: data.options,
            products: parseJsonItem(data.json_item),
            ...(isFromHistory && { disableAction: true }),
        };
    }

    // show feedback (only in history)
    if (data.event === "evaluate_support") {
        const jsonItem = parseJsonItem(data.json_item) as {
            evaluate: string;
            tag: string[];
        };
        return {
            id: Number(data.id),
            sender: getSender(data.type_send),
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

    // show products (only in history)
    if (
        data.show_move_event === "FindInfoProduct" ||
        data.show_move_event === "event_order"
    ) {
        return {
            id: Number(data.id),
            sender: getSender(data.type_send),
            content: data.message,
            sendType: "products",
            products: parseJsonItem(data.json_item),
            options: data.options,
        };
    }

    // show not found product (only in history)
    if (data.show_move_event === "not_found_product") {
        return {
            id: Number(data.id),
            sender: getSender(data.type_send),
            content: data.message,
            sendType: "not-found-product",
        };
    }

    // Default message
    return {
        id: Number(data.id),
        sender: getSender(data.type_send),
        content: data.message,
        sendType: data.event as "select" | "options" | "text" | "wait_reply",
        options: data.options,
    };
};

export const createMessageFromResponse = (
    data: GetActiveRobotDetailResponse
): Message => {
    return createMessageFromData(data.data, false, data.next as string);
};

export const createMessageFromHistoryResponse = (
    data: GetActiveRobotDetailResponse["data"]
): Message => {
    return createMessageFromData(data, true);
};

export const createMessage = (payload: Message) => payload;
