"use client";

import ProductListDisplay from "@/core/components/ui/ProductListDisplay";
import { useButtonEventHandlers } from "@/core/hook";
import { useAuth } from "@/core/hook/useAuth";
import { ProductItem } from "@/services/chatbot";
import { useEditTableItem } from "@/services/chatbot/mutations";
import { RobotOption } from "@/services/robot";
import { useChatBoxActions } from "@/store";
import { useFollowUpStore } from "@/store/followUpStore";
import { useEffect, useMemo, useState } from "react";

type ProductListDisplayPanelProps = {
    items: ProductItem[];
    options: RobotOption[];
    disable: boolean;
    idChat: string;
};

const ProductListDisplayPanel = ({
    items,
    options,
    disable,
    idChat,
}: ProductListDisplayPanelProps) => {
    const { isLoggedIn } = useAuth();
    const { openFollowUp } = useFollowUpStore();
    const { mutateAsync: editTableItem } = useEditTableItem();

    const [disableAction, setDisableAction] = useState(false);
    const [itemsEdited, setItemsEdited] = useState<ProductItem[]>(items);

    useEffect(() => {
        setItemsEdited(items);
    }, [items]);

    // Use shared hook for button event handling
    const {
        loadingStates,
        handleConfirmClick,
        handleEditClick,
        handleCancelClick,
        actionButtonConfigs,
    } = useButtonEventHandlers({
        options,
        messageRequire: "Vui lòng đăng nhập để lên đơn",
    });

    const { stopCountdownFeedback } = useChatBoxActions();

    useEffect(() => {
        if (!isLoggedIn) {
            if (options.some((option) => option.is_login === 1)) {
                openFollowUp();
            }
        }
    }, [isLoggedIn]);

    // Hàm xử lý khi click vào item
    const handleItemClick = (item: ProductItem) => {};

    // Hàm chỉnh sửa số lượng (debounced ở component con)
    const handleEditItem = async (item: ProductItem, quantity: string) => {
        // Tạo dữ liệu sẽ gửi
        const params = {
            id: String(item.id),
            id_chat: idChat,
        };
        const payload = {
            quantity_client: quantity,
        };

        // Dừng ở bước log dữ liệu theo yêu cầu

        const res = await editTableItem({ params, payload });

        if (res?.result && Array.isArray(res.data?.json_item)) {
            const updated = res.data.json_item.find(
                (i: any) => String(i.id) === String(item.id)
            );
            if (updated) {
                setItemsEdited((prev) =>
                    prev.map((p) =>
                        String(p.id) === String(item.id)
                            ? {
                                  ...p,
                                  // update fields commonly returned by API
                                  quantity_client: parseInt(
                                      String(updated.quantity_client) ??
                                          p.quantity_client
                                  ),
                                  price_client: String(
                                      updated.price_client ?? p.price_client
                                  ),
                                  total: String(updated.total_client),
                              }
                            : p
                    )
                );
            }
        }
    };

    // Hàm xử lý khi click confirm
    const handleConfirm = async () => {
        setDisableAction(true);
        await handleConfirmClick();
        setDisableAction(false);
        stopCountdownFeedback();
    };

    // Hàm xử lý khi click edit
    const handleEdit = async () => {
        await handleEditClick();
    };

    // Hàm xử lý khi click cancel
    const handleCancel = async () => {
        await handleCancelClick();
    };

    return (
        <ProductListDisplay
            title="Danh sách sản phẩm"
            items={itemsEdited}
            onItemClick={handleItemClick}
            onQuantityChange={handleEditItem}
            onConfirmClick={handleConfirm}
            onEditClick={handleEdit}
            onCancelClick={handleCancel}
            disable={disable || disableAction}
            isConfirmLoading={loadingStates.confirm}
            isEditLoading={loadingStates.edit}
            isCancelLoading={loadingStates.cancel}
            actionButtonConfigs={actionButtonConfigs}
        />
    );
};

export default ProductListDisplayPanel;
