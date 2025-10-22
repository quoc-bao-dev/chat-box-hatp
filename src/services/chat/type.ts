// Request/response types for chat

export interface GetListChatParams {
    sp_session?: string;
    current_page?: number;
    per_page?: number;
}

export interface ChatItem {
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
    json_item: any | null;
    show_move_event: string | null;
    is_function: string;
    session: string;
    session_chat: string;
    session_robot: string;
    next?: boolean;
}

export interface GetListChatResponse {
    result: boolean;
    data: ChatItem[];
    current_page: string;
    per_page: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    next: boolean;
}
