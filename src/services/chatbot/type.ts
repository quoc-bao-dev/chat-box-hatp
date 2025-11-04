// Request/response types for chatbot

export interface ChatbotItem {
    id: string;
    name: string;
    avatar: string;
    next: string;
    content: string;
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
    unit_client: string;
    quantity_client: number;
    price_client: string;
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

// Search Product types
export interface SearchProductItem {
    name: string;
    code: string;
    avatar: string;
}

export interface SearchProductResponse {
    result: boolean;
    data: SearchProductItem[];
}

// Add Address types
export interface AddAddressRequest {
    address: string;
    phone: string;
    name: string;
    factory_code?: string;
    factory_name?: string;
    number?: string;
    street_name?: string;
    ward_name?: string;
    district_name?: string;
}

export interface AddAddressData {
    client: string;
    address: string;
    factory_code: string;
    factory_name: string;
    phone: string;
    name: string;
    number: string;
    street_name: string;
    ward_name: string;
    district_name: string;
    create_by: number;
    date_create: string; // ISO-like datetime string
    id: number | string;
}

export interface AddressListItem {
    id: number | string;
    client: string;
    address: string;
    factory_code: string;
    factory_name: string;
    phone: string;
    name: string;
    number: string;
    street_name: string;
    ward_name: string;
    district_name: string;
    address_primary: string; // "0" | "1"
}

export interface AddAddressResponse {
    result: boolean;
    data: AddAddressData;
    all_data: AddressListItem[];
    message: string;
}

// Edit Table Item (update quantity)
export interface EditTableItemParams {
    id: string; // id chi tiết sản phẩm trong bảng
    id_chat: string; // id tin nhắn/chat chứa bảng
}

export interface EditTableItemRequest {
    quantity_client: string | number; // số lượng muốn cập nhật
}

export interface EditTableItemData {
    id: string;
    id_client: string;
    is_read: string; // "0" | "1"
    type_send: string; // e.g. "0" | "1"
    event: string; // e.g. "select"
    message: string;
    file: string | null;
    suport_items: string;
    created_at: string; // datetime string
    updated_at: string; // datetime string
    id_robot_support: string;
    id_robot_support_detail: string;
    json_item: {
        total_client: number;
        price_client: number;
        quantity_client: number | string;
    }[]; // product items array (server format)
    data_order_draft: any | null;
    show_move_event: string;
    is_function: string;
    session: string;
    session_chat: string;
    session_robot: string;
    type_object: any | null;
    id_object: any | null;
}

export interface EditTableItemResponse {
    result: boolean;
    data: EditTableItemData;
    message: string;
}
