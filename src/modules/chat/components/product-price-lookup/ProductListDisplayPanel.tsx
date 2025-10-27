"use client";

import ProductListDisplay from "@/core/components/ui/ProductListDisplay";
import { ProductItem } from "@/services/chatbot";
import { RobotOption } from "@/services/robot";
import { useAuthStore } from "@/store";
import { useFollowUpStore } from "@/store/followUpStore";
import { useEffect, useState } from "react";

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
    // const [disablePanel, setDisablePanel] = useState(disable);

    const { isAuthenticated } = useAuthStore();
    const { openFollowUp } = useFollowUpStore();

    useEffect(() => {
        if (isAuthenticated) {
            openFollowUp();
        }
    }, [isAuthenticated, openFollowUp]);

    // Hàm xử lý khi click vào item
    const handleItemClick = (item: ProductItem) => {
        console.log("Item clicked:", item);
    };

    // Hàm xử lý khi click confirm
    const handleConfirmClick = () => {
        console.log("Confirm clicked");
    };

    // Hàm xử lý khi click edit
    const handleEditClick = () => {
        console.log("Edit clicked");
    };

    // Hàm xử lý khi click cancel
    const handleCancelClick = () => {
        console.log("Cancel clicked");
    };

    return (
        <ProductListDisplay
            title="Danh sách sản phẩm"
            items={items}
            shouldShowConfirmButton={true}
            shouldShowCancelButton={true}
            onItemClick={handleItemClick}
            onConfirmClick={handleConfirmClick}
            onEditClick={handleEditClick}
            onCancelClick={handleCancelClick}
            disable={disable}
        />
    );
};

export default ProductListDisplayPanel;
