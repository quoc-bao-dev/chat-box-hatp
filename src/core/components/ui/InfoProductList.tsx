"use client";

import { _Image } from "@/core/config";
import { axiosInstance } from "@/core/http/axiosClient";
import { cn } from "@/core/utils/cn";
import { createMessageFromResponse } from "@/core/utils/createMessageFromResponse";
import { getSession } from "@/core/utils/session";
import { ProductItem, ProductOption } from "@/services/chatbot";
import { useChatBoxActions } from "@/store";
import Image from "next/image";
import { useState } from "react";
import { ActionButtons } from "./ActionButtons";
import NoProductFound from "./NoProductFound";

export type InfoListItem = {
    id: string;
    name: string;
    category: string;
    disabled?: boolean;
    image: string;
};

export type InfoListProps = {
    title: string;
    items: ProductItem[];
    options?: ProductOption[];
    className?: string;
    onItemClick?: (item: ProductItem) => void;
    onConfirmClick?: () => void;
    onEditClick?: () => void;
    onCancelClick?: () => void;
    disable?: boolean;
};

const InfoList = ({
    title,
    items,
    options = [],
    onItemClick,
    onConfirmClick,
    onEditClick,
    onCancelClick,
    className = "",
    disable = false,
}: InfoListProps) => {
    const imageProdPlaceholder = _Image.icon.icon_product;
    const [isConfirmLoading, setIsConfirmLoading] = useState(false);
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [isCancelLoading, setIsCancelLoading] = useState(false);

    const { addMessage, stopCountdownFeedback, startCountdownFeedback } =
        useChatBoxActions();
    // Function to call API based on next URL with specific loading state
    const callApiByEvent = async (
        eventType: string,
        setLoading: (loading: boolean) => void
    ) => {
        const option = options.find((opt) => opt.show_move_event === eventType);
        if (!option?.next) {
            console.warn(`No API endpoint found for event: ${eventType}`);
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.get(option.next, {
                params: {
                    sp_session: getSession(),
                },
            });
            const data = response.data;
            addMessage(createMessageFromResponse(data));

            const res = await axiosInstance.get(data.next, {
                params: { sp_session: getSession() },
            });

            const dataNext = res.data;

            addMessage(createMessageFromResponse(dataNext));
            // setDisable(true);

            return data;
        } catch (error) {
            console.error(`❌ API Error for ${eventType}:`, error);
            throw error;
        } finally {
            setLoading(false);
            startCountdownFeedback();
        }
    };

    // Conditional rendering logic for action buttons using show_move_event
    const moveEvents = options
        .map((opt) => opt.show_move_event)
        .filter((v): v is string => Boolean(v));

    const shouldShowConfirmButton = moveEvents.some((event) =>
        ["confirm_product", "create_order", "save_edit_product"].includes(event)
    );

    const shouldShowEditButton = moveEvents.some((event) =>
        ["edit_product", "view_edit_product"].includes(event)
    );

    const shouldShowCancelButton = moveEvents.some((event) =>
        ["cancel_edit_product", "cancel_product"].includes(event)
    );

    // Empty state when no products are available
    if (!items || items.length === 0) {
        return <NoProductFound />;
    }

    return (
        <div
            className={`px-3.5 py-4 rounded-[20px] bg-white max-w-[460px] min-w-[300px] ${className}`}
        >
            {/* === title === */}
            <p className="text-[18px] font-semibold text-gray-900">{title}</p>

            {/* === list items === */}
            <div className="pt-3 flex flex-col gap-2">
                {/* === item === */}
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onItemClick?.(item)}
                        className={cn(
                            ` px-4 py-3.5 rounded-xl bg-[#F8F8F8] hover:bg-gray-100 flex items-center  gap-4 shadow-xl/4`
                        )}
                    >
                        {/* === image === */}
                        <Image
                            src={item.avatar || imageProdPlaceholder}
                            alt={item.name}
                            width={40}
                            height={40}
                            onError={(e) => {
                                e.currentTarget.src = imageProdPlaceholder;
                            }}
                            className="size-[37px]"
                        />
                        {/* === name === */}
                        <div className="flex flex-col gap-0.5">
                            <p className="text-[#5E5E5E] font-bold text-sm">
                                {item.code}
                            </p>
                            <p className="text-[#5E5E5E] font-semibold text-xs">
                                {item.name_category}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* === action button === */}
            <ActionButtons
                shouldShowConfirmButton={shouldShowConfirmButton}
                shouldShowEditButton={shouldShowEditButton}
                shouldShowCancelButton={shouldShowCancelButton}
                isConfirmLoading={isConfirmLoading}
                isEditLoading={isEditLoading}
                isCancelLoading={isCancelLoading}
                disable={disable}
                onConfirmClick={async () => {
                    stopCountdownFeedback();
                    await callApiByEvent(
                        "confirm_product",
                        setIsConfirmLoading
                    );
                    onConfirmClick?.();
                }}
                onEditClick={async () => {
                    stopCountdownFeedback();
                    await callApiByEvent("edit_product", setIsEditLoading);
                    onEditClick?.();
                }}
                onCancelClick={async () => {
                    stopCountdownFeedback();
                    await callApiByEvent("cancel_product", setIsCancelLoading);
                    onCancelClick?.();
                }}
                confirmText="Xác nhận"
                editText="Tôi muốn chỉnh sửa mã sản phẩm"
                cancelText="Hủy"
                confirmLoadingText="Đang xác nhận..."
                editLoadingText="Đang chỉnh sửa..."
                cancelLoadingText="Đang hủy..."
            />
        </div>
    );
};

export default InfoList;
