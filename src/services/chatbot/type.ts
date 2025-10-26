// Request/response types for chatbot

export interface ChatbotItem {
    id: string;
    name: string;
    avatar: string;
    next: string;
    disabled: "0" | "1";
}

export interface ChatbotListResponse {
    result: boolean;
    data: ChatbotItem[];
}

// Evaluate Support types
export interface EvaluateSupportRequest {
    tag: string[];
}

export interface EvaluateSupportParams {
    session_robot: string;
    evaluate: string;
}

export interface EvaluateSupportResponse {
    result: boolean;
    data: any; // Will be updated later as requested
}

// List Tags types
export interface ListTagsResponse {
    result: boolean;
    data: {
        [key: string]: string[]; // Key là string (rating level), value là array of tags
    };
}

// List Products types

// Product Item interface
export interface ProductItem {
    id: number;
    id_item: string;
    code: string;
    name: string;
    name_category: string;
    quantity: number;
    price: string;
    avatar: string | null;
}

// Option interface for list products
export interface ProductOption {
    id: string;
    id_robot_support: string;
    name: string;
    level: string;
    link: string | null;
    content: string;
    file: string | null;
    type_send: string;
    event_show: string;
    event_app: string;
    show_move_event: string | null;
    next: string;
}

// Chatbot Product Item (main item in ListProductsResponse.data_array)
export interface ChatbotProductItem {
    id_robot_support: string;
    id_robot_support_detail: string;
    id_client: string;
    session: string;
    session_chat: string;
    is_read: number;
    type_send: number;
    message: string;
    event: string;
    file: string | null;
    suport_items: string;
    json_item: ProductItem[];
    show_move_event: string | null;
    is_function: string;
    is_chat: 1 | 2 | null;
    next_wait: string | null;
    data_post: any | null;
    id: number;
    options: ProductOption[];
}

// List Products response type
export interface ListProductsResponse {
    result: boolean;
    data_array: ChatbotProductItem[];
    next: boolean;
}

// Edit Product Item types
export interface EditProductItemRequest {
    searchCode: string;
}

export interface EditProductItemParams {
    id: string; // id của chi tiết sản phẩm
    id_chat: string; // id tin nhắn đang sửa
}

export interface EditProductItemResponse {
    result: boolean;
    data?: {
        id: string;
        id_client: string;
        is_read: string;
        type_send: string;
        event: string;
        message: string;
        file: string | null;
        suport_items: string;
        created_at: string;
        updated_at: string;
        id_robot_support: string;
        id_robot_support_detail: string;
        json_item: Array<{
            id: string;
            id_item: string;
            code: string;
            name: string;
            name_category: string;
            quantity: string;
            price: string;
            avatar: string | null;
        }>;
        show_move_event: string;
        is_function: string;
        session: string;
        session_chat: string;
        session_robot: string;
    };
    message?: string;
}

// Remove Item types
export interface RemoveItemParams {
    id: string; // id của chi tiết sản phẩm
    id_chat: string; // id tin nhắn đang sửa
}

export interface RemoveItemResponse {
    result: boolean;
    data?: any;
    message?: string;
}
