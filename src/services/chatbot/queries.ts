import { useQuery } from "@tanstack/react-query";
import chatbotApi from "./api";

export const useGetChatbotList = () =>
    useQuery({
        queryKey: ["chatbot", "list"],
        queryFn: chatbotApi.getList,
    });
