import { axiosInstance } from "@/core/http";
import {
    ChatbotListResponse,
    EvaluateSupportRequest,
    EvaluateSupportParams,
    EvaluateSupportResponse,
    ListTagsResponse,
    EditProductItemRequest,
    EditProductItemParams,
    EditProductItemResponse,
    RemoveItemParams,
    RemoveItemResponse,
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

    // Edit Product Item
    editProductItem: async (
        params: EditProductItemParams,
        payload: EditProductItemRequest
    ) => {
        const formData = new FormData();
        formData.append("searchCode", payload.searchCode);

        const res = await axiosInstance.post<EditProductItemResponse>(
            `/api_chatbot/editProductItem/${params.id}/${params.id_chat}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return res.data;
    },

    // Remove Item
    removeItem: async (params: RemoveItemParams) => {
        const res = await axiosInstance.post<RemoveItemResponse>(
            `/api_chatbot/removeItem/${params.id}/${params.id_chat}`
        );
        return res.data;
    },
};

export default chatbotApi;
