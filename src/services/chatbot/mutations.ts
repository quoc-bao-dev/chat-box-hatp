import { useMutation } from "@tanstack/react-query";
import chatbotApi from "./api";
import {
    EditProductItemParams,
    EditProductItemRequest,
    RemoveItemParams,
    AddAddressRequest,
    EditTableItemParams,
    EditTableItemRequest,
    AddLandscapeAndVerticalRequest,
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

export const useAddAddress = () => {
    return useMutation({
        mutationFn: (payload: AddAddressRequest) =>
            chatbotApi.addAddress(payload),
    });
};

export const useEditTableItem = () => {
    return useMutation({
        mutationFn: ({
            params,
            payload,
        }: {
            params: EditTableItemParams;
            payload: EditTableItemRequest;
        }) => chatbotApi.editTableItem(params, payload),
    });
};

export const useAddLandscapeAndVertical = () => {
    return useMutation({
        mutationFn: (payload: AddLandscapeAndVerticalRequest) =>
            chatbotApi.addLandscapeAndVertical(payload),
    });
};
