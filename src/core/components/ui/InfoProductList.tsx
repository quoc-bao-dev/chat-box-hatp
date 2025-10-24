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
}: InfoListProps) => {
    const imageProdPlaceholder = _Image.icon.icon_product;
    const [isConfirmLoading, setIsConfirmLoading] = useState(false);
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [isCancelLoading, setIsCancelLoading] = useState(false);
    const [disable, setDisable] = useState(false);

    const { addMessage } = useChatBoxActions();
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
            setDisable(true);

            return data;
        } catch (error) {
            console.error(`❌ API Error for ${eventType}:`, error);
            throw error;
        } finally {
            setLoading(false);
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
                            ` px-4 py-3.5 rounded-xl bg-[#F8F8F8] hover:bg-gray-100 cursor-pointer flex items-center  gap-4 shadow-xl/4`
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
                                {item.name}
                            </p>
                            <p className="text-[#5E5E5E] font-semibold text-xs">
                                {item.name_category}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* === action button === */}
            {(shouldShowCancelButton ||
                shouldShowConfirmButton ||
                shouldShowEditButton) && (
                <div className="flex flex-col gap-2 mt-5">
                    {shouldShowConfirmButton && (
                        <button
                            type="button"
                            className=" h-10 rounded-xl bg-[#2FB06B] text-white font-semibold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            onClick={async () => {
                                await callApiByEvent(
                                    "confirm_product",
                                    setIsConfirmLoading
                                );
                                onConfirmClick?.();
                            }}
                            disabled={
                                isConfirmLoading ||
                                isEditLoading ||
                                isCancelLoading ||
                                disable
                            }
                        >
                            {isConfirmLoading ? "Đang xác nhận..." : "Xác nhận"}
                        </button>
                    )}
                    {shouldShowEditButton && (
                        <button
                            type="button"
                            className="h-10 rounded-xl bg-white text-gray-700 font-medium border border-gray-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            onClick={async () => {
                                await callApiByEvent(
                                    "edit_product",
                                    setIsEditLoading
                                );
                                onEditClick?.();
                            }}
                            disabled={
                                isConfirmLoading ||
                                isEditLoading ||
                                isCancelLoading ||
                                disable
                            }
                        >
                            {isEditLoading
                                ? "Đang chỉnh sửa..."
                                : "Tôi muốn chỉnh sửa mã sản phẩm"}
                        </button>
                    )}
                    {shouldShowCancelButton && (
                        <button
                            type="button"
                            className="h-10 rounded-xl bg-white text-[#F04438] border border-[#F04438] font-semibold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            onClick={async () => {
                                await callApiByEvent(
                                    "cancel_product",
                                    setIsCancelLoading
                                );
                                onCancelClick?.();
                            }}
                            disabled={
                                isConfirmLoading ||
                                isEditLoading ||
                                isCancelLoading ||
                                disable
                            }
                        >
                            {isCancelLoading ? "Đang hủy..." : "Hủy"}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default InfoList;
