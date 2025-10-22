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
        const formData = new FormData();
        if (Array.isArray(payload.tag)) {
            payload.tag.forEach((t) => {
                formData.append("tag[]", t);
            });
        }

        const res = await axiosInstance.post<EvaluateSupportResponse>(
            `/api_chatbot/evaluate_support/${params.session_robot}/${params.evaluate}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return res.data;
    },
};

export default chatbotApi;
