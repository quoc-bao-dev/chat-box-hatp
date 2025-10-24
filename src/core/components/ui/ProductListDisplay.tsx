import React from "react";
import Image from "next/image";
import { cn } from "@/core/utils/cn";
import { _Image } from "@/core/config";

interface ProductItem {
    id: string;
    name: string;
    name_category: string;
    avatar?: string;
    price?: number;
}

interface ProductListDisplayProps {
    title: string;
    items: ProductItem[];
    className?: string;
    shouldShowConfirmButton?: boolean;
    shouldShowEditButton?: boolean;
    shouldShowCancelButton?: boolean;
    isConfirmLoading?: boolean;
    isEditLoading?: boolean;
    isCancelLoading?: boolean;
    disable?: boolean;
    onItemClick?: (item: ProductItem) => void;
    onConfirmClick?: () => void;
    onEditClick?: () => void;
    onCancelClick?: () => void;
}

const ProductListDisplay: React.FC<ProductListDisplayProps> = ({
    title,
    items,
    className = "",
    shouldShowConfirmButton = false,
    shouldShowEditButton = false,
    shouldShowCancelButton = false,
    isConfirmLoading = false,
    isEditLoading = false,
    isCancelLoading = false,
    disable = false,
    onItemClick,
    onConfirmClick,
    onEditClick,
    onCancelClick,
}) => {
    const imageProdPlaceholder = _Image.icon.icon_product;

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
                        <div className="flex flex-col gap-0.5 flex-1">
                            <p className="text-[#5E5E5E] font-bold text-sm">
                                {item.name}
                            </p>
                            <p className="text-[#5E5E5E] font-semibold text-xs">
                                {item.name_category}
                            </p>
                        </div>
                        {/* === price === */}
                        {item.price && (
                            <div className="text-right">
                                <p className="text-[#F04438] font-bold text-sm">
                                    {item.price.toLocaleString("vi-VN")} ₫
                                </p>
                            </div>
                        )}
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
                            onClick={onConfirmClick}
                            disabled={
                                isConfirmLoading ||
                                isEditLoading ||
                                isCancelLoading ||
                                disable
                            }
                        >
                            {isConfirmLoading ? "Đang xử lý..." : "Lên đơn"}
                        </button>
                    )}
                    {shouldShowCancelButton && (
                        <button
                            type="button"
                            className="h-10 rounded-xl bg-white text-[#F04438] border border-[#F04438] font-semibold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            onClick={onCancelClick}
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

export default ProductListDisplay;
