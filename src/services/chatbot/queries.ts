import { useMutation, useQuery } from "@tanstack/react-query";
import chatbotApi from "./api";
import { EvaluateSupportParams, EvaluateSupportRequest } from "./type";

export const useGetChatbotList = () =>
    useQuery({
        queryKey: ["chatbot", "list"],
        queryFn: chatbotApi.getList,
    });

export const useGetListTags = () =>
    useQuery({
        queryKey: ["chatbot", "listTags"],
        queryFn: chatbotApi.getListTags,
    });

export const useEvaluateSupportMutation = () =>
    useMutation({
        mutationFn: ({
            params,
            payload,
        }: {
            params: EvaluateSupportParams;
            payload: EvaluateSupportRequest;
        }) => chatbotApi.evaluateSupport(params, payload),
    });

export const useSearchProduct = (search: string, enabled = true) =>
    useQuery({
        queryKey: ["chatbot", "search_product", search],
        queryFn: () => chatbotApi.searchProduct(search),
        enabled: Boolean(search) && enabled,
    });

export const useSearchProductSuggestion = (search: string, enabled = true) => {
    const fetchData = async () => {
        const res = await chatbotApi.searchProduct(search);
        return res.data[0];
    };

    return useQuery({
        queryKey: ["chatbot", "search_product_suggestion", search],
        queryFn: fetchData,
        enabled: Boolean(search) && enabled,
    });
};
