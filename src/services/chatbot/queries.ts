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
