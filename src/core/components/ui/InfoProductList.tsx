"use client";

import { _Image } from "@/core/config";
import { cn } from "@/core/utils/cn";
import HtmlRenderer from "@/modules/chat/components/HtmlRenderer";
import { ProductItem } from "@/services/chatbot";
import Image from "next/image";

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
    onItemClick?: (item: ProductItem) => void;
    onConfirmClick?: () => void;
    onEditClick?: () => void;
    onCancelClick?: () => void;
    className?: string;
};

const InfoList = ({
    title,
    items,
    onItemClick,
    onConfirmClick,
    onEditClick,
    onCancelClick,
    className = "",
}: InfoListProps) => {
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
                            ` px-4 py-3 rounded-xl bg-[#F8F8F8] hover:bg-gray-100 cursor-pointer flex items-center  gap-4 shadow-xl/4`
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
                            <p className="text-[#5E5E5E] font-semibold text-sm">
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
            <div className="flex flex-col gap-2 pt-5">
                <button
                    type="button"
                    className="h-10 rounded-xl bg-[#2FB06B] text-white font-semibold"
                    onClick={onConfirmClick}
                >
                    Xác nhận
                </button>
                <button
                    type="button"
                    className="h-10 rounded-xl bg-white text-gray-700 font-medium border border-gray-200"
                    onClick={onEditClick}
                >
                    Tôi muốn chỉnh sửa mã sản phẩm
                </button>
                <button
                    type="button"
                    className="h-10 rounded-xl bg-white text-[#F04438] border border-[#F04438] font-semibold"
                    onClick={onCancelClick}
                >
                    Hủy
                </button>
            </div>
        </div>
    );
};

export default InfoList;
