"use client";

import EditProductCode from "@/core/components/ui/EditProductCode";
import {
    ProductItem,
    useEditProductItem,
    useRemoveItem,
} from "@/services/chatbot";
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
    }));
};

interface EditProductCodePanelProps {
    items: ProductItem[];
    idChat: string;
}

const EditProductCodePanel = ({ items, idChat }: EditProductCodePanelProps) => {
    const { mutateAsync: editProductItem } = useEditProductItem();
    const { mutateAsync: removeItem } = useRemoveItem();

    const [itemsEdited, setItemsEdited] = useState<ProductItem[]>(items);

    const handleEditProductCode = async (itemId: number, newCode: string) => {
        // gọi hook mutation ở đây

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

    const handleConfirmClick = () => {
        // onProductsUpdate?.(itemsEdited);
    };

    return (
        <EditProductCode
            items={itemsEdited}
            title="Chỉnh sửa mã sản phẩm"
            onConfirmClick={handleConfirmClick}
            onRemoveItem={handleRemoveItem}
            onEditProductCode={handleEditProductCode}
        />
    );
};

export default EditProductCodePanel;
