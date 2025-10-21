import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { chatbotApi } from "./api";
import { chatbotKeys, GetListResponse } from "./types";

// Hook to get chatbot list
export const useGetChatbotList = (
    options?: Omit<
        UseQueryOptions<GetListResponse, Error>,
        "queryKey" | "queryFn"
    >
) => {
    return useQuery({
        queryKey: chatbotKeys.lists(),
        queryFn: chatbotApi.getList,
        ...options,
    });
};

// Export all query hooks
export const chatbotQueries = {
    useGetList: useGetChatbotList,
} as const;
