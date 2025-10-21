import axiosClient from "@/core/http/axiosClient";
import { GetListResponse } from "./types";

// Chatbot API endpoints
const CHATBOT_ENDPOINTS = {
    GET_LIST: "/Api_chatbot/GetList",
} as const;

// Get list of chatbot items
export const getChatbotList = async (): Promise<GetListResponse> => {
    try {
        const response = await axiosClient.get<GetListResponse>(
            CHATBOT_ENDPOINTS.GET_LIST
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching chatbot list:", error);
        throw error;
    }
};

// Export all API functions
export const chatbotApi = {
    getList: getChatbotList,
} as const;
