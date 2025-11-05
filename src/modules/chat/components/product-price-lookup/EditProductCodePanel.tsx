"use client";

import EditProductCode from "@/core/components/ui/EditProductCode";
import { axiosInstance } from "@/core/http";
import { createMessageFromResponse } from "@/core/utils/createMessageFromResponse";
import { getSession } from "@/core/utils/session";
import {
    ProductItem,
    useEditProductItem,
    useRemoveItem,
} from "@/services/chatbot";
import { GetActiveRobotDetailResponse, RobotOption } from "@/services/robot";
import { useChatBoxActions } from "@/store";
import { useState } from "react";
import toast from "react-hot-toast";

// Helper function to convert API response to ProductItem format
const convertApiResponseToProductItems = (jsonItems: any[]): ProductItem[] => {
    return jsonItems.map((item) => ({
        id: parseInt(item.id) || 0,
        id_item: item.id_item || "",
        code: item.code || "",
        name: item.name || "",
        name_category: item.name_category || "",
        quantity: parseInt(item.quantity) || 0,
        price: item.price || "",
        avatar: item.avatar,
        unit_client: item.unit_client || "",
        quantity_client: parseInt(item.quantity_client) || 0,
        price_client: item.price_client || "",
        total: item.total,
    }));
};

interface EditProductCodePanelProps {
    items: ProductItem[];
    options: RobotOption[];
    idChat: string;
    disable?: boolean;
}

const EditProductCodePanel = ({
    items,
    options,
    idChat,
    disable,
}: EditProductCodePanelProps) => {
    const { mutateAsync: editProductItem } = useEditProductItem();
    const { mutateAsync: removeItem } = useRemoveItem();
    const { addMessage, startCountdownFeedback, stopCountdownFeedback } =
        useChatBoxActions();

    const [disableAction, setDisableAction] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [itemsEdited, setItemsEdited] = useState<ProductItem[]>(items);
    const [resetTriggers, setResetTriggers] = useState<Record<number, number>>(
        {}
    );

    const handleEditProductCode = async (itemId: number, newCode: string) => {
        const res = await editProductItem({
            params: { id: itemId.toString(), id_chat: idChat },
            payload: { searchCode: newCode },
        });

        if (res.result) {
            // Cập nhật lại dữ liệu mảng items từ response
            if (res.data?.json_item && Array.isArray(res.data.json_item)) {
                const convertedItems = convertApiResponseToProductItems(
                    res.data.json_item
                );
                setItemsEdited(convertedItems);

                // Reset input của item đã chỉnh sửa thành công
                setResetTriggers((prev) => ({
                    ...prev,
                    [itemId]: (prev[itemId] || 0) + 1,
                }));

                toast.success("Chỉnh sửa mã sản phẩm thành công");
            } else {
                toast.error("Không có dữ liệu sản phẩm trả về");
            }
        } else {
            toast.error(res.message || "Có lỗi xảy ra khi chỉnh sửa sản phẩm");
        }
    };

    const handleRemoveItem = async (itemId: number) => {
        try {
            const res = await removeItem({
                id: itemId.toString(),
                id_chat: idChat,
            });

            if (res.result) {
                // Cập nhật lại dữ liệu mảng items từ response
                if (res.data?.json_item && Array.isArray(res.data.json_item)) {
                    const convertedItems = convertApiResponseToProductItems(
                        res.data.json_item
                    );
                    setItemsEdited(convertedItems);
                    toast.success("Xóa sản phẩm thành công");
                } else {
                    // Nếu không có json_item trong response, filter item đã xóa
                    setItemsEdited((prev) =>
                        prev.filter((item) => item.id !== itemId)
                    );
                    toast.success("Xóa sản phẩm thành công");
                }
            } else {
                toast.error(res.message || "Có lỗi xảy ra khi xóa sản phẩm");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xóa sản phẩm");
            console.error("Remove item error:", error);
        }
    };

    const handleConfirmClick = async () => {
        // lấy next link

        stopCountdownFeedback();
        const nextLink = options[0].next;

        console.log(options);

        console.log({ nextLink });

        if (nextLink) {
            try {
                setIsLoading(true);

                const res =
                    await axiosInstance.get<GetActiveRobotDetailResponse>(
                        nextLink,
                        {
                            params: {
                                sp_session: getSession(),
                            },
                        }
                    );

                addMessage(createMessageFromResponse(res.data));

                setIsLoading(false);
                setDisableAction(true);

                const nextLinkTable = res.data.next as string;
                if (nextLinkTable) {
                    try {
                        const resTable =
                            await axiosInstance.get<GetActiveRobotDetailResponse>(
                                nextLinkTable,
                                {
                                    params: {
                                        sp_session: getSession(),
                                    },
                                }
                            );

                        addMessage(createMessageFromResponse(resTable.data));
                    } catch (error) {}
                }
            } catch (error) {}
        }

        startCountdownFeedback();
    };

    return (
        <EditProductCode
            items={itemsEdited}
            title="Chỉnh sửa mã sản phẩm"
            onConfirmClick={handleConfirmClick}
            onRemoveItem={handleRemoveItem}
            onEditProductCode={handleEditProductCode}
            resetTriggers={resetTriggers}
            disable={disable || disableAction}
            isLoading={isLoading}
        />
    );
};

export default EditProductCodePanel;
