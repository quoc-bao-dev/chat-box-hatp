import { axiosInstance } from "@/core/http";
import { ChatbotListResponse } from "./type";

const chatbotApi = {
    // Reads
    getList: async () => {
        const res = await axiosInstance.post<ChatbotListResponse>(
            "/Api_chatbot/GetList"
        );
        return res.data;
    },
};

export default chatbotApi;
