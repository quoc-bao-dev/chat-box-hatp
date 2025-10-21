import { axiosInstance } from "@/core/http";
import { getSession } from "@/core/utils/session";
import { GetListChatParams, GetListChatResponse } from "./type";

const chatApi = {
    // Reads
    getListChat: async (params: GetListChatParams) => {
        params.sp_session = getSession();
        const res = await axiosInstance.get<GetListChatResponse>(
            "/api_chatbot/get_list_chat",
            { params }
        );
        return res.data;
    },
};

export default chatApi;
