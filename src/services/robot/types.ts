// Robot service types

// Individual option item from API response
export interface RobotOption {
    id: string;
    id_robot_support: string;
    name: string;
    level: string;
    link: string | null;
    content: string;
    file: string | null;
    type_send: string;
    event_show: string;
    event_app: string | null;
    show_move_event: string | null;
    next?: string;
}

// Robot data structure from API response
export interface RobotData {
    id_robot_support: string;
    id_robot_support_detail: string;
    id_client: string;
    session: string;
    session_chat: number;
    is_read: number;
    type_send: "0" | "1"; // 0 -> nhân viên, 1 -> khách
    message: string; // nội dung tin nhắn show ra
    event: "select" | "text" | "options"; // select -> option , text
    file: string | null; // file đính kèm (hình ảnh)
    suport_items: number;
    json_item: any | null;
    show_move_event: string | null;
    is_function: string;
    id: number;
    event_app: string | null;
    event_show: string;
    options: RobotOption[];
}

// API response structure for active robot detail
export interface GetActiveRobotDetailResponse {
    result: boolean;
    data: RobotData;
    next: boolean;
}

// API error response structure
export interface ApiErrorResponse {
    result: false;
    message?: string;
    error?: string;
}

// Query key factory for React Query
export const robotKeys = {
    all: ["robot"] as const,
    details: () => [...robotKeys.all, "detail"] as const,
    detail: (optionId?: string, sessionId?: string) =>
        [...robotKeys.details(), optionId, sessionId || ""] as const,
} as const;
