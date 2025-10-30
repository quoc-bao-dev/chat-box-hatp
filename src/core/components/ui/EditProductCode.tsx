"use client";

import { _Image } from "@/core/config";
import { ProductItem } from "@/services/chatbot";
import Image from "next/image";
import ProductCodeInput from "./ProductCodeInput";
import styles from "@/core/styles/scrollbar.module.css";

export type EditProductCodeProps = {
    title: string;
    items: ProductItem[];
    onConfirmClick?: () => void;
    onRemoveItem?: (itemId: number) => void;
    onEditProductCode?: (itemId: number, newCode: string) => void;

    onHover?: () => void;
    onLeave?: () => void;
    className?: string;
    disable?: boolean;
    resetTriggers?: Record<number, number>;
};

const EditProductCode = ({
    title,
    items,
    onConfirmClick,
    onRemoveItem,
    onEditProductCode,
    onHover,
    onLeave,
    className = "",
    disable = false,
    resetTriggers = {},
}: EditProductCodeProps) => {
    const imageProdPlaceholder = _Image.icon.icon_product;

    return (
        <div
            className={`px-3.5 py-4 rounded-[20px] bg-white max-w-[460px] min-w-[300px] lg:w-full ${className}`}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            {/* === title === */}
            <p className="text-[18px] font-semibold text-gray-900">{title}</p>

            {/* === list items === */}
            <div
                className={`pt-3 flex flex-col gap-2 max-h-[50vh] overflow-y-auto -ml-2 -mr-2  pl-2 pr-2 -mb-4 pb-4 ${styles.customScrollbar}`}
            >
                {items.length === 0 && (
                    <p className="text-gray-500 text-sm">
                        Không có sản phẩm nào để chỉnh sửa
                    </p>
                )}
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="relative px-4 py-3 rounded-xl bg-[#F8F8F8] min-w-[300px] shadow-xl/4"
                    >
                        <div className="flex items-center gap-4 pr-6">
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
                                    {item.code}
                                </p>
                                <p className="text-[#5E5E5E] font-semibold text-xs">
                                    {item.name_category}
                                </p>
                            </div>
                        </div>

                        {/* === input field === */}
                        {!disable && (
                            <ProductCodeInput
                                onSubmit={(value) =>
                                    onEditProductCode?.(item.id, value)
                                }
                                disable={disable}
                                resetTrigger={resetTriggers[item.id]}
                            />
                        )}

                        {/* === remove button === */}
                        {!disable && (
                            <button
                                type="button"
                                onClick={() =>
                                    !disable && onRemoveItem?.(item.id)
                                }
                                disabled={disable}
                                className={`absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer ${
                                    disable
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
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
                        )}
                    </div>
                ))}
            </div>

            {/* === confirm button === */}
            {!disable && (
                <div className="pt-5">
                    <button
                        type="button"
                        className="w-full h-10 rounded-xl bg-[#00A76F] text-white font-semibold hover:bg-[#28a05a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-[#00A76F]"
                        disabled={items.length === 0 || disable}
                        onClick={onConfirmClick}
                    >
                        Xác nhận
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditProductCode;
