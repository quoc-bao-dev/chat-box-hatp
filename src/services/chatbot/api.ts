import { axiosInstance } from "@/core/http";
import {
    ChatbotListResponse,
    EvaluateSupportRequest,
    EvaluateSupportParams,
    EvaluateSupportResponse,
    ListTagsResponse,
} from "./type";

const chatbotApi = {
    // Reads
    getList: async () => {
        const res = await axiosInstance.get<ChatbotListResponse>(
            "/Api_chatbot/GetList"
        );
        return res.data;
    },

    getListTags: async () => {
        const res = await axiosInstance.get<ListTagsResponse>(
            "/api_chatbot/listTags"
        );
        return res.data;
    },

    // Mutations
    evaluateSupport: async (
        params: EvaluateSupportParams,
        payload: EvaluateSupportRequest
    ) => {
        const res = await axiosInstance.post<EvaluateSupportResponse>(
            `/api_chatbot/evaluate_support/${params.session_robot}/${params.evaluate}`,
            payload
        );
        return res.data;
    },
};

export default chatbotApi;
