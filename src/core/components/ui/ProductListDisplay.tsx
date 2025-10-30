import React from "react";
import Image from "next/image";
import { cn } from "@/core/utils/cn";
import { _Image } from "@/core/config";
import { ProductItem } from "@/services/chatbot";
import { ActionButtons } from "./ActionButtons";
import styles from "@/core/styles/scrollbar.module.css";

interface ProductListDisplayProps {
    title: string;
    items: ProductItem[];
    className?: string;
    isConfirmLoading?: boolean;
    isEditLoading?: boolean;
    isCancelLoading?: boolean;
    disable?: boolean;
    onItemClick?: (item: ProductItem) => void;
    onConfirmClick?: () => void;
    onEditClick?: () => void;
    onCancelClick?: () => void;
    actionButtonConfigs?: Array<{
        eventType: string;
        label: string;
        type: "confirm" | "edit" | "cancel";
    }>;
}

const ProductListDisplay: React.FC<ProductListDisplayProps> = ({
    title,
    items,
    className = "",
    isConfirmLoading = false,
    isEditLoading = false,
    isCancelLoading = false,
    disable = false,
    onItemClick,
    onConfirmClick,
    onEditClick,
    onCancelClick,
    actionButtonConfigs = [],
}) => {
    const imageProdPlaceholder = _Image.icon.icon_product;

    // Derive button visibility and labels from actionButtonConfigs
    const confirmConfig = actionButtonConfigs.find((c) => c.type === "confirm");
    const editConfig = actionButtonConfigs.find((c) => c.type === "edit");
    const cancelConfig = actionButtonConfigs.find((c) => c.type === "cancel");

    const shouldShowConfirmButton = !!confirmConfig;
    const shouldShowEditButton = !!editConfig;
    const shouldShowCancelButton = !!cancelConfig;

    return (
        <div
            className={`px-3.5 py-4 rounded-[20px] bg-white max-w-[460px] min-w-[300px] ${className}`}
        >
            {/* === title === */}
            <p className="text-[18px] font-semibold text-gray-900">{title}</p>

            {/* === list items === */}
            <div
                className={`pt-3 flex flex-col gap-2 max-h-[50vh] overflow-y-auto -ml-2 -mr-2  pl-2 pr-2 -mb-4 pb-4 ${styles.customScrollbar}`}
            >
                {/* === item === */}
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onItemClick?.(item)}
                        className={cn(
                            ` w-full px-4 py-3.5 rounded-xl bg-[#F8F8F8] hover:bg-gray-100 flex items-center gap-4 shadow-xl/4`
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
                            className="size-[37px] object-cover rounded-md"
                        />
                        <div className="flex-1 flex lg:items-center lg:flex-row flex-col items-start gap-2">
                            {/* === name === */}
                            <div className="flex flex-col gap-0.5 flex-1">
                                <p className="text-[#5E5E5E] font-bold text-sm">
                                    {item.code}
                                </p>
                                <p className="text-[#5E5E5E] font-semibold text-xs">
                                    {item.name_category}
                                </p>
                            </div>
                            {/* === price === */}
                            <div className=" text-right ">
                                <p className="text-[#F04438] font-bold text-sm">
                                    {Number(item.price) > 0
                                        ? Number(item.price).toLocaleString(
                                              "vi-VN"
                                          ) + " ₫"
                                        : "Liên hệ"}
                                </p>
                            </div>
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
                onConfirmClick={onConfirmClick}
                onEditClick={onEditClick}
                onCancelClick={onCancelClick}
                confirmText={confirmConfig?.label || "Lên đơn"}
                editText={editConfig?.label || "Chỉnh sửa"}
                cancelText={cancelConfig?.label || "Hủy"}
                confirmLoadingText="Đang xử lý..."
                editLoadingText="Đang chỉnh sửa..."
                cancelLoadingText="Đang hủy..."
            />
        </div>
    );
};

export default ProductListDisplay;
