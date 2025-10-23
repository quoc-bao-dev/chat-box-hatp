"use client";

import { _Image } from "@/core/config";
import { cn } from "@/core/utils/cn";
import { ProductItem } from "@/services/chatbot";
import Image from "next/image";
import { useState } from "react";

export type EditProductCodeProps = {
    title: string;
    items: ProductItem[];
    onConfirmClick?: (updatedItems: ProductItem[]) => void;
    onRemoveItem?: (itemId: string) => void;
    className?: string;
};

const EditProductCode = ({
    title,
    items,
    onConfirmClick,
    onRemoveItem,
    className = "",
}: EditProductCodeProps) => {
    const imageProdPlaceholder = _Image.icon.icon_product;
    const [updatedItems, setUpdatedItems] = useState<ProductItem[]>(items);

    const handleProductCodeChange = (itemId: string, newCode: string) => {
        setUpdatedItems((prev) =>
            prev.map((item) =>
                item.id === itemId ? { ...item, name: newCode } : item
            )
        );
    };

    const handleRemoveItem = (itemId: string) => {
        setUpdatedItems((prev) => prev.filter((item) => item.id !== itemId));
        onRemoveItem?.(itemId);
    };

    const handleConfirm = () => {
        onConfirmClick?.(updatedItems);
    };

    return (
        <div
            className={`px-3.5 py-4 rounded-[20px] bg-white max-w-[460px] min-w-[300px] ${className}`}
        >
            {/* === title === */}
            <p className="text-[18px] font-semibold text-gray-900">{title}</p>

            {/* === list items === */}
            <div className="pt-3 flex flex-col gap-2">
                {updatedItems.map((item) => (
                    <div
                        key={item.id}
                        className="px-4 py-3 rounded-xl bg-[#F8F8F8] flex items-center gap-4 shadow-xl/4"
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

                        {/* === product info === */}
                        <div className="flex flex-col gap-0.5 flex-1">
                            <p className="text-[#5E5E5E] font-semibold text-sm">
                                {item.name}
                            </p>
                            <p className="text-[#5E5E5E] font-semibold text-xs">
                                {item.name_category}
                            </p>

                            {/* === input field === */}
                            <input
                                type="text"
                                placeholder="Nhập lại mã sản phẩm..."
                                value={item.name}
                                onChange={(e) =>
                                    handleProductCodeChange(
                                        item.id,
                                        e.target.value
                                    )
                                }
                                className="mt-2 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        {/* === remove button === */}
                        <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            {/* === confirm button === */}
            <div className="pt-5">
                <button
                    type="button"
                    className="w-full h-10 rounded-xl bg-[#2FB06B] text-white font-semibold hover:bg-[#28a05a] transition-colors"
                    onClick={handleConfirm}
                >
                    Xác nhận
                </button>
            </div>
        </div>
    );
};

export default EditProductCode;
