// Request/response types for chat

export interface GetListChatParams {
    sp_session?: string;
    current_page?: number;
    per_page?: number;
}

export interface GetListChatResponse {
    result: boolean;
    data: any;
}
