import { axiosInstance } from "@/core/http";
import { ChatbotListResponse } from "./type";

const chatbotApi = {
    // Reads
    getList: async () => {
        const res = await axiosInstance.get<ChatbotListResponse>(
            "/Api_chatbot/GetList"
        );
        return res.data;
    },
};

export default chatbotApi;
