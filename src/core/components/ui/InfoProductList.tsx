"use client";

import { _Image } from "@/core/config";
import { cn } from "@/core/utils/cn";
import { ProductItem, ProductOption } from "@/services/chatbot";
import Image from "next/image";
import { ActionButtons } from "./ActionButtons";
import NoProductFound from "./NoProductFound";
import styles from "@/core/styles/scrollbar.module.css";
import { decodeHtmlEntities } from "@/core/utils/decode";

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
    isConfirmLoading?: boolean;
    isEditLoading?: boolean;
    isCancelLoading?: boolean;
    actionButtonConfigs?: Array<{
        eventType: string;
        label: string;
        type: "confirm" | "edit" | "cancel";
    }>;
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
    isConfirmLoading = false,
    isEditLoading = false,
    isCancelLoading = false,
    actionButtonConfigs = [],
}: InfoListProps) => {
    const imageProdPlaceholder = _Image.icon.icon_product;

    // Render buttons based on actionButtonConfigs with their types
    const confirmConfig = actionButtonConfigs.find((c) => c.type === "confirm");
    const editConfig = actionButtonConfigs.find((c) => c.type === "edit");
    const cancelConfig = actionButtonConfigs.find((c) => c.type === "cancel");

    const shouldShowConfirmButton = !!confirmConfig;
    const shouldShowEditButton = !!editConfig;
    const shouldShowCancelButton = !!cancelConfig;

    // Empty state when no products are available
    if (!items || items.length === 0) {
        return <NoProductFound />;
    }

    return (
        <div
            className={`px-3.5 py-4 rounded-[20px] bg-white max-w-[460px] min-w-[300px] ${className}`}
        >
            {/* === title === */}
            <p className="text-[18px] font-semibold text-gray-900">
                {decodeHtmlEntities(title)}
            </p>

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
                            className="size-[37px] object-cover rounded-md"
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
                onConfirmClick={onConfirmClick}
                onEditClick={onEditClick}
                onCancelClick={onCancelClick}
                confirmText={confirmConfig?.label || "Xác nhận"}
                editText={editConfig?.label || "Tôi muốn chỉnh sửa mã sản phẩm"}
                cancelText={cancelConfig?.label || "Hủy"}
                confirmLoadingText="Đang xác nhận..."
                editLoadingText="Đang chỉnh sửa..."
                cancelLoadingText="Đang hủy..."
            />
        </div>
    );
};

export default InfoList;
