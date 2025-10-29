"use client";

import { NoProductFound } from "@/core/components/ui";
import ProductListDisplay from "@/core/components/ui/ProductListDisplay";
import { useButtonEventHandlers } from "@/core/hook";
import { useAuth } from "@/core/hook/useAuth";
import { ProductItem } from "@/services/chatbot";
import { RobotOption } from "@/services/robot";
import { useFollowUpStore } from "@/store/followUpStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ProductListDisplayPanelProps = {
    items: ProductItem[];
    options: RobotOption[];
    disable: boolean;
};

const ProductListDisplayPanel = ({
    items,
    options,
    disable,
}: ProductListDisplayPanelProps) => {
    const { isLoggedIn } = useAuth();
    const { openFollowUp } = useFollowUpStore();

    const [disableAction, setDisableAction] = useState(false);

    // Use shared hook for button event handling
    const {
        loadingStates,
        handleConfirmClick,
        handleEditClick,
        handleCancelClick,
        actionButtonConfigs,
    } = useButtonEventHandlers({ options });

    useEffect(() => {
        if (!isLoggedIn) {
            if (options.some((option) => option.is_login === 1)) {
                openFollowUp();
            }
        }
    }, [isLoggedIn]);

    // Hàm xử lý khi click vào item
    const handleItemClick = (item: ProductItem) => {};

    // Hàm xử lý khi click confirm
    const handleConfirm = async () => {
        if (!isLoggedIn) {
            toast.error("Vui lòng đăng nhập để lên đơn");
            return;
        }
        setDisableAction(true);
        await handleConfirmClick();
        setDisableAction(false);
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
            items={items}
            onItemClick={handleItemClick}
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
