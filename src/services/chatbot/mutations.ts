import { useMutation } from "@tanstack/react-query";
import chatbotApi from "./api";
import {
    EditProductItemParams,
    EditProductItemRequest,
    RemoveItemParams,
} from "./type";

export const useEditProductItem = () => {
    return useMutation({
        mutationFn: ({
            params,
            payload,
        }: {
            params: EditProductItemParams;
            payload: EditProductItemRequest;
        }) => chatbotApi.editProductItem(params, payload),
    });
};

export const useRemoveItem = () => {
    return useMutation({
        mutationFn: (params: RemoveItemParams) => chatbotApi.removeItem(params),
    });
};
