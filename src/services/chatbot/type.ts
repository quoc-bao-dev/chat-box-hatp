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
