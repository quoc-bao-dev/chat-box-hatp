// Chatbot service types

// Individual chatbot item from API response
export interface ChatbotItem {
    id: string;
    name: string;
    avatar: string;
    next: string;
}

// API response structure
export interface GetListResponse {
    result: boolean;
    data: ChatbotItem[];
}

// API error response structure
export interface ApiErrorResponse {
    result: false;
    message?: string;
    error?: string;
}

// Query key factory for React Query
export const chatbotKeys = {
    all: ["chatbot"] as const,
    lists: () => [...chatbotKeys.all, "list"] as const,
    list: (filters: Record<string, any>) =>
        [...chatbotKeys.lists(), { filters }] as const,
} as const;
