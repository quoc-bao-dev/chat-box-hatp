import React, { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/core/utils/cn";
import { _Image } from "@/core/config";
import { ProductItem } from "@/services/chatbot";
import { ActionButtons } from "./ActionButtons";
import styles from "@/core/styles/scrollbar.module.css";
import { decodeHtmlEntities } from "@/core/utils/decode";

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
    onQuantityChange?: (item: ProductItem, quantity: string) => void;
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
    onQuantityChange,
}) => {
    const imageProdPlaceholder = _Image.icon.icon_product;
    const timersRef = useRef<Record<string | number, any>>({});
    // Track item images that failed to load to switch to placeholder gracefully
    const [failedImages, setFailedImages] = useState<Record<number, boolean>>(
        {}
    );

    // Normalize image source to satisfy next/image requirements:
    // - Accept absolute URLs (http/https/data)
    // - For relative paths, ensure they start with a leading "/"
    // - Fallback to placeholder when src is empty/invalid
    const ensureValidImageSrc = (src?: string) => {
        if (!src || typeof src !== "string") return imageProdPlaceholder;
        const trimmed = src.trim();
        if (
            trimmed.startsWith("http://") ||
            trimmed.startsWith("https://") ||
            trimmed.startsWith("data:")
        ) {
            return trimmed;
        }
        return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    };

    const handleQuantityInputChange = (item: ProductItem, value: string) => {
        const key = item.id;
        if (timersRef.current[key]) {
            clearTimeout(timersRef.current[key]);
        }
        timersRef.current[key] = setTimeout(() => {
            onQuantityChange?.(item, value);
        }, 200);
    };

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
            <p className="text-[18px] font-semibold text-[#454F5B]">
                {decodeHtmlEntities(title)}
            </p>

            {/* === list items === */}
            <div
                className={`pt-3 flex flex-col gap-2 max-h-[50vh] overflow-y-auto -ml-2 -mr-2  pl-2 pr-2 -mb-4 pb-4 ${styles.customScrollbar}`}
            >
                {/* === no data === */}
                {items.length === 0 ? (
                    <div className="px-4 py-2 flex flex-col items-center justify-center text-center">
                        <Image
                            src={_Image.icon.icon_not_found}
                            alt="not-found"
                            width={140}
                            height={140}
                        />
                    </div>
                ) : (
                    <>
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
                                    // Use normalized src; if this item's image previously failed, force placeholder
                                    src={
                                        failedImages[item.id]
                                            ? imageProdPlaceholder
                                            : ensureValidImageSrc(
                                                  item.avatar ?? undefined
                                              )
                                    }
                                    // Fallback alt to avoid null
                                    alt={item.name || "product-image"}
                                    width={40}
                                    height={40}
                                    // When the image fails to load, mark this item as failed to switch to placeholder
                                    onError={() =>
                                        setFailedImages((prev) => ({
                                            ...prev,
                                            [item.id]: true,
                                        }))
                                    }
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
                                    <div className="flex flex-col gap-1 ">
                                        <div className="flex gap-2 items-center text-sm text-[#5E5E5E]">
                                            <label
                                                htmlFor={`quantity-${String(
                                                    item.id ?? ""
                                                )}`}
                                                className="flex items-center gap-1 px-1 py-0.5 rounded-md border border-gray-300"
                                            >
                                                <input
                                                    id={`quantity-${String(
                                                        item.id ?? ""
                                                    )}`}
                                                    className="w-[60px] h-4 outline-none text-center no-spinner"
                                                    type="number"
                                                    inputMode="numeric"
                                                    disabled={disable}
                                                    min={1}
                                                    step={1}
                                                    defaultValue={
                                                        item.quantity_client
                                                    }
                                                    onChange={(e) =>
                                                        handleQuantityInputChange(
                                                            item,
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <p>{item.unit_client}</p>
                                            </label>

                                            {Number(item.price_client) > 0 && (
                                                <p>
                                                    <span className="pr-2">
                                                        x
                                                    </span>
                                                    {Number(
                                                        item.price_client
                                                    ).toLocaleString(
                                                        "vi-VN"
                                                    )}{" "}
                                                    đ
                                                </p>
                                            )}

                                            {!Number(item.price_client) && (
                                                <p>Giá liên hệ</p>
                                            )}
                                        </div>

                                        <div className=" lg:text-right ">
                                            <p className="text-[#F04438] font-bold text-sm">
                                                {Number(item.total) > 0
                                                    ? Number(
                                                          item.total
                                                      ).toLocaleString(
                                                          "vi-VN"
                                                      ) + " ₫"
                                                    : "Liên hệ để tư vấn"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
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
