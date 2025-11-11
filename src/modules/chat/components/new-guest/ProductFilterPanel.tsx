import ProductFilterSelectList from "@/core/components/ui/ProductFilterSelectList";
import axiosClient from "@/core/http/axiosClient";
import { createMessageFromResponse } from "@/core/utils/createMessageFromResponse";
import { getSession } from "@/core/utils/session";
import { useAddLandscapeAndVertical } from "@/services/chatbot";
import {
    ProductBrandOption,
    ProductQuantityOption,
    ProductSizeOption,
} from "@/services/robot/type";
import { useChatBoxActions } from "@/store";
import { useChatInputStore } from "@/store/chatInputStore";
import { useState } from "react";

type ProductFilterPanelProps = {
    title: string;
    sizes?: ProductSizeOption[];
    quantities?: ProductQuantityOption[];
    brands?: ProductBrandOption[];
    nextLink?: string;
    disable?: boolean;
    messageId: number;
};

const ProductFilterPanel = ({
    title,
    sizes = [],
    quantities = [],
    brands = [],
    nextLink,
    disable = false,
    messageId,
}: ProductFilterPanelProps) => {
    const { setNextLink, setDataPost, setEvent } = useChatInputStore();
    const {
        addMessage,
        setIsAssistantTyping,
        setMode,
        addProductFilterSizeToMessage,
        addProductFilterQuantityToMessage,
    } = useChatBoxActions();
    const { mutateAsync: addLandscapeAndVertical } =
        useAddLandscapeAndVertical();
    const [loading, setLoading] = useState(false);
    const [addingSizeLoading, setAddingSizeLoading] = useState(false);
    const [addingQuantityLoading, setAddingQuantityLoading] = useState(false);

    const handleClick = async (data: {
        selectedSizes: ProductSizeOption[];
        selectedQuantities: ProductQuantityOption[];
        selectedBrands: ProductBrandOption[];
    }) => {
        if (!nextLink) return;
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("sp_session", getSession());

            // landscape_and_vertical[0][id], landscape_and_vertical[0][name], etc.
            data.selectedSizes.forEach((size, index) => {
                formData.append(
                    `landscape_and_vertical[${index}][id]`,
                    size.id
                );
                formData.append(
                    `landscape_and_vertical[${index}][name]`,
                    size.name
                );
            });

            // quantitative[0][id], quantitative[0][name], etc.
            data.selectedQuantities.forEach((quantity, index) => {
                formData.append(`quantitative[${index}][id]`, quantity.id);
                formData.append(`quantitative[${index}][name]`, quantity.name);
            });

            // item_brand[0][id], item_brand[0][name], etc.
            data.selectedBrands.forEach((brand, index) => {
                formData.append(`item_brand[${index}][id]`, brand.id);
                formData.append(`item_brand[${index}][name]`, brand.name);
            });

            const response = await axiosClient.post(nextLink, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const nextRes = response.data.next;

            if (nextRes) {
                setIsAssistantTyping(true);
                addMessage(createMessageFromResponse(response.data));

                const res = await axiosClient.get(nextRes);

                const nextWait = res.data.next_wait;
                const dataPost = res.data.data.data_post;
                const sendChat = res.data.send_chat;
                const isChat = res.data.is_chat;

                addMessage(createMessageFromResponse(res.data));
                setIsAssistantTyping(false);

                if (sendChat === 1) {
                    setEvent(isChat);
                    setMode("chat");
                    setNextLink(nextWait);
                    setDataPost(dataPost);
                }
            }
        } catch (error) {
            console.error("Error post product filter:", error);
            setIsAssistantTyping(false);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSize = async (size: string) => {
        try {
            setAddingSizeLoading(true);

            // Tách dữ liệu "32 x 30" thành landscape và vertical
            const parts = size.split(" x ").map((part) => part.trim());
            if (parts.length !== 2) {
                console.error(
                    "Invalid size format. Expected format: 'landscape x vertical'"
                );
                return;
            }

            const [landscape, vertical] = parts;

            // Gọi API thêm kích thước và khổ giấy
            const response = await addLandscapeAndVertical({
                landscape,
                vertical,
            });

            if (response?.result) {
                console.log("Add landscape and vertical response:", response);

                const displayName = `${landscape}x${vertical}`;
                const idValue = String(
                    response?.data?.id ??
                        response?.data?.name ??
                        `${landscape}x${vertical}`
                );

                addProductFilterSizeToMessage(messageId, {
                    id: idValue,
                    name: displayName,
                });
            } else {
                console.warn(
                    "Add landscape and vertical failed with response:",
                    response
                );
            }
        } catch (error) {
            console.error("Error add size:", error);
            throw error;
        } finally {
            setAddingSizeLoading(false);
        }
    };

    const handleAddQuantity = async (quantity: string) => {
        try {
            setAddingQuantityLoading(true);
            const value = String(quantity).trim();
            if (!value) return;

            // Thêm trực tiếp vào store, không gọi API
            addProductFilterQuantityToMessage(messageId, {
                id: value,
                name: value,
            });
        } finally {
            setAddingQuantityLoading(false);
        }
    };

    return (
        <ProductFilterSelectList
            title={title}
            sizes={sizes}
            quantities={quantities}
            brands={brands}
            loading={loading}
            onConfirm={handleClick}
            onAddSize={handleAddSize}
            onAddQuantity={handleAddQuantity}
            disable={
                disable || loading || addingSizeLoading || addingQuantityLoading
            }
            addingSizeLoading={addingSizeLoading}
        />
    );
};

export default ProductFilterPanel;
