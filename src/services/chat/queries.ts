import { useQuery } from "@tanstack/react-query";
import chatApi from "./api";
import { GetListChatParams } from "./type";

export const useGetListChat = (params: GetListChatParams) => {
    params.current_page = params.current_page || 1;
    params.per_page = params.per_page || 10;

    return useQuery({
        queryKey: [
            "chat-history",
            "list",
            params.sp_session,
            params.current_page,
            params.per_page,
        ],
        queryFn: () => chatApi.getListChat(params),
        enabled: !!params.current_page && !!params.per_page,
    });
};
