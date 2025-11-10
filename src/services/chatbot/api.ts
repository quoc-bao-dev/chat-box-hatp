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
    SearchProductResponse,
    AddAddressRequest,
    AddAddressResponse,
    EditTableItemParams,
    EditTableItemRequest,
    EditTableItemResponse,
    AddLandscapeAndVerticalRequest,
    AddLandscapeAndVerticalResponse,
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

    // Search Product
    searchProduct: async (search: string) => {
        const res = await axiosInstance.get<SearchProductResponse>(
            "/api_chatbot/search_product",
            { params: { search } }
        );
        return res.data;
    },

    // Add Address
    addAddress: async (payload: AddAddressRequest) => {
        const formData = new FormData();
        formData.append("address", payload.address);
        formData.append("phone", payload.phone);
        formData.append("name", payload.name);
        if (payload.factory_code != null && payload.factory_code !== "") {
            formData.append("factory_code", payload.factory_code);
        }
        if (payload.factory_name != null && payload.factory_name !== "") {
            formData.append("factory_name", payload.factory_name);
        }
        if (payload.number != null && payload.number !== "") {
            formData.append("number", payload.number);
        }
        if (payload.street_name != null && payload.street_name !== "") {
            formData.append("street_name", payload.street_name);
        }
        if (payload.ward_name != null && payload.ward_name !== "") {
            formData.append("ward_name", payload.ward_name);
        }
        if (payload.district_name != null && payload.district_name !== "") {
            formData.append("district_name", payload.district_name);
        }

        const res = await axiosInstance.post<AddAddressResponse>(
            "/api_chatbot/add_address",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return res.data;
    },

    // Edit quantity in table  item
    editTableItem: async (
        params: EditTableItemParams,
        payload: EditTableItemRequest
    ) => {
        const formData = new FormData();
        formData.append("quantity_client", String(payload.quantity_client));

        const res = await axiosInstance.post<EditTableItemResponse>(
            `/api_chatbot/editTableItem/${params.id}/${params.id_chat}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return res.data;
    },

    // Add Landscape and Vertical
    addLandscapeAndVertical: async (
        payload: AddLandscapeAndVerticalRequest
    ) => {
        const formData = new FormData();
        formData.append("landscape", payload.landscape);
        formData.append("vertical", payload.vertical);
        if (payload.name) {
            formData.append("name", payload.name);
        }

        const res = await axiosInstance.post<AddLandscapeAndVerticalResponse>(
            "/api_chatbot/add_landscape_and_vertical",
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
