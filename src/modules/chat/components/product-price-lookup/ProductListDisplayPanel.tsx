"use client";

import ProductListDisplay from "@/core/components/ui/ProductListDisplay";
import { useAuth } from "@/core/hook/useAuth";
import { axiosInstance } from "@/core/http";
import { createMessageFromResponse } from "@/core/utils/createMessageFromResponse";
import { ProductItem } from "@/services/chatbot";
import { RobotOption } from "@/services/robot";
import { useChatBoxActions } from "@/store";
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

    const {
        addMessage,
        stopCountdownFeedback,
        startCountdownFeedback,
        setIsAssistantTyping,
        setIsFeedback,
    } = useChatBoxActions();

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
    const handleConfirmClick = async () => {
        if (!isLoggedIn) {
            toast.error("Vui lòng đăng nhập để lên đơn");
            return;
        }

        stopCountdownFeedback();

        setIsFeedback(false);
        setDisableAction(true);

        const res = await axiosInstance.get(options[0].next!);

        // add message from response
        addMessage(createMessageFromResponse(res.data));
        setIsAssistantTyping(true);

        const nextLink = res.data.next;

        if (nextLink) {
            const res = await axiosInstance.get(nextLink);

            addMessage(createMessageFromResponse(res.data));
            toast.success(res.data?.message!);
        }
        setIsAssistantTyping(false);
        startCountdownFeedback();
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
            shouldShowConfirmButton={!!options[0]}
            shouldShowCancelButton={!!options[1]}
            onItemClick={handleItemClick}
            onConfirmClick={handleConfirmClick}
            onEditClick={handleEditClick}
            onCancelClick={handleCancelClick}
            disable={disable || disableAction}
        />
    );
};

export default ProductListDisplayPanel;
