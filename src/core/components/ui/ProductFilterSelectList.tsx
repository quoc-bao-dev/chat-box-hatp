"use client";

import HtmlRenderer from "@/modules/chat/components/HtmlRenderer";
import {
    ProductBrandOption,
    ProductQuantityOption,
    ProductSizeOption,
} from "@/services/robot/type";
import { useState } from "react";
import { ActionButtons } from "./ActionButtons";
import { _Image } from "@/core/config";
import Image from "next/image";
import InputInline from "./InputInline";
import SizeInputInline from "./SizeInputInline";
import styles from "@/core/styles/scrollbar.module.css";
import PlusIcon from "../icons/plus";

type ProductFilterSelectListProps = {
    title: string;
    sizes?: ProductSizeOption[];
    quantities?: ProductQuantityOption[];
    brands?: ProductBrandOption[];
    onConfirm?: (data: {
        selectedSizes: ProductSizeOption[];
        selectedQuantities: ProductQuantityOption[];
        selectedBrands: ProductBrandOption[];
    }) => void;
    onAddSize?: (size: string) => Promise<void>;
    onAddQuantity?: (quantity: string) => Promise<void>;
    disable?: boolean;
    addingSizeLoading?: boolean;
};

const ProductFilterSelectList = ({
    title,
    sizes = [],
    quantities = [],
    brands = [],
    onConfirm,
    onAddSize,
    onAddQuantity,
    disable = false,
    addingSizeLoading = false,
}: ProductFilterSelectListProps) => {
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedQuantities, setSelectedQuantities] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    // Form states cho thêm mới
    const [isAddingSize, setIsAddingSize] = useState(false);
    const [isAddingQuantity, setIsAddingQuantity] = useState(false);
    const [sizeInput, setSizeInput] = useState("");
    const [quantityInput, setQuantityInput] = useState("");

    // Toggle selection
    const toggleSize = (id: string) => {
        if (disable) return;
        setSelectedSizes((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const toggleQuantity = (id: string) => {
        if (disable) return;
        setSelectedQuantities((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const toggleBrand = (id: string) => {
        if (disable) return;
        setSelectedBrands((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleConfirm = () => {
        // Map từ IDs sang full objects
        const selectedSizeObjects = selectedSizes
            .map((id) => sizes.find((size) => size.id === id))
            .filter((size): size is ProductSizeOption => size !== undefined);

        const selectedQuantityObjects = selectedQuantities
            .map((id) => quantities.find((qty) => qty.id === id))
            .filter((qty): qty is ProductQuantityOption => qty !== undefined);

        const selectedBrandObjects = selectedBrands
            .map((id) => brands.find((brand) => brand.id === id))
            .filter(
                (brand): brand is ProductBrandOption => brand !== undefined
            );

        onConfirm?.({
            selectedSizes: selectedSizeObjects,
            selectedQuantities: selectedQuantityObjects,
            selectedBrands: selectedBrandObjects,
        });
    };

    // Handle add size
    const handleToggleAddSize = () => {
        if (!disable && !isAddingSize) {
            setIsAddingSize(true);
            setSizeInput("");
        }
    };

    const handleAddSize = async () => {
        if (!sizeInput.trim()) return;

        try {
            await onAddSize?.(sizeInput.trim());
            setSizeInput("");
            setIsAddingSize(false);
        } catch (error) {
            console.error("Error adding size:", error);
        }
    };

    const handleCancelAddSize = () => {
        setSizeInput("");
        setIsAddingSize(false);
    };

    // Handle add quantity
    const handleToggleAddQuantity = () => {
        if (!disable && !isAddingQuantity) {
            setIsAddingQuantity(true);
            setQuantityInput("");
        }
    };

    const handleAddQuantity = async () => {
        if (!quantityInput.trim()) return;

        // Validate: chỉ nhận số
        const quantityNum = Number(quantityInput.trim());
        if (isNaN(quantityNum)) {
            return;
        }

        try {
            await onAddQuantity?.(quantityInput.trim());
            setQuantityInput("");
            setIsAddingQuantity(false);
        } catch (error) {
            console.error("Error adding quantity:", error);
        }
    };

    const handleCancelAddQuantity = () => {
        setQuantityInput("");
        setIsAddingQuantity(false);
    };

    // Tag component
    const Tag = ({
        label,
        isSelected,
        onClick,
        disabled = false,
    }: {
        label: string;
        isSelected: boolean;
        onClick: () => void;
        disabled?: boolean;
    }) => (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`px-3.5 py-[8px] h-[40px] rounded-lg font-medium transition-all duration-200 text-[14px] ${
                isSelected
                    ? "bg-[#2FB06B] text-white "
                    : "bg-gray-100 text-[#0F172A]  hover:border-gray-400"
            } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        >
            {label}
        </button>
    );

    // Add button component
    const AddButton = ({
        onClick,
        disabled = false,
    }: {
        onClick: () => void;
        disabled?: boolean;
    }) => (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`size-[40px] rounded-lg text-[18px] font-bold transition-all duration-200 border border-dashed flex items-center justify-center ${
                disabled
                    ? "opacity-60 cursor-not-allowed border-gray-300 text-gray-400"
                    : "border-gray-300 text-gray-500 hover:text-[#2FB06B] hover:border-[#2FB06B] hover:bg-gray-50 cursor-pointer"
            }`}
        >
            <PlusIcon className="size-4" />
        </button>
    );

    return (
        <div className="px-3.5 py-4 rounded-[20px] bg-white max-w-[460px] min-w-[300px]">
            {/* title */}
            <p className="text-[18px] mb-4 font-semibold text-[#454F5B]">
                <HtmlRenderer
                    htmlContent={title}
                    className="text-lg! font-semibold! text-[#454F5B]!"
                />
            </p>

            {/* Phần Kích thước */}
            <div className="mb-6">
                <p className="text-[16px] mb-3 font-semibold text-[#454F5B]">
                    Kích thước
                </p>
                <div className="flex flex-wrap gap-2 items-center">
                    {sizes.map((size) => (
                        <Tag
                            key={size.id}
                            label={size.name}
                            isSelected={selectedSizes.includes(size.id)}
                            onClick={() => toggleSize(size.id)}
                            disabled={disable}
                        />
                    ))}
                </div>
                <div className="mt-2">
                    {!isAddingSize ? (
                        <AddButton
                            onClick={handleToggleAddSize}
                            disabled={disable}
                        />
                    ) : (
                        <div className="flex flex-col gap-1.5">
                            <div className="w-full">
                                <SizeInputInline
                                    value={sizeInput}
                                    onChange={setSizeInput}
                                    onEnter={handleAddSize}
                                    onEscape={handleCancelAddSize}
                                    placeholder="Ví dụ: 60 x 84"
                                    disabled={disable}
                                    className="px-4 py-2 rounded-lg text-[14px] w-full"
                                />
                            </div>
                            <p className="text-[12px] text-[#2FB06B] flex items-center gap-2">
                                {addingSizeLoading ? (
                                    <>
                                        <span className="inline-block w-3.5 h-3.5 border-2 border-[#2FB06B]/30 border-t-[#2FB06B] rounded-full animate-spin" />
                                        <span>Đang thêm kích thước...</span>
                                    </>
                                ) : (
                                    <span>
                                        Nhấn Enter để thêm và nhấn Esc để hủy
                                    </span>
                                )}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Phần Định lượng */}
            <div className="mb-6">
                <p className="text-[16px] mb-3 font-semibold text-[#454F5B]">
                    Định lượng
                </p>
                <div className="flex flex-wrap gap-2">
                    {quantities.map((quantity) => (
                        <Tag
                            key={quantity.id}
                            label={quantity.name}
                            isSelected={selectedQuantities.includes(
                                quantity.id
                            )}
                            onClick={() => toggleQuantity(quantity.id)}
                            disabled={disable}
                        />
                    ))}
                    {!isAddingQuantity ? (
                        <AddButton
                            onClick={handleToggleAddQuantity}
                            disabled={disable}
                        />
                    ) : (
                        <div className="w-[150px]">
                            <InputInline
                                value={quantityInput}
                                onChange={setQuantityInput}
                                onEnter={handleAddQuantity}
                                onEscape={handleCancelAddQuantity}
                                placeholder="Nhập định lượng"
                                disabled={disable}
                                numericOnly={true}
                                className="px-4 py-2 rounded-lg text-[14px] w-full"
                            />
                        </div>
                    )}
                </div>
                {isAddingQuantity && (
                    <p className="text-[12px] text-[#2FB06B] mt-2">
                        Nhấn Enter để thêm và nhấn Esc để hủy
                    </p>
                )}
            </div>

            {/* Phần Thương hiệu */}
            <div className="mb-4">
                <p className="text-[16px] mb-3 font-semibold text-[#454F5B]">
                    Thương hiệu
                </p>
                {brands.length === 0 ? (
                    <div className="px-4 py-2 flex flex-col items-center justify-center text-center">
                        <Image
                            src={_Image.icon.icon_not_found}
                            alt="not-found"
                            width={140}
                            height={140}
                        />
                    </div>
                ) : (
                    <div
                        className={`grid grid-cols-2 gap-2 max-h-[23vh] overflow-y-auto -ml-2 -mr-2 pl-2 pr-2 -mb-4 pb-4 ${styles.customScrollbar}`}
                    >
                        {brands.map((brand) => {
                            const checked = selectedBrands.includes(brand.id);
                            return (
                                <label
                                    key={brand.id}
                                    className={`w-full px-4 py-4.5 flex items-center gap-3 border border-gray-100 rounded-lg group ${
                                        disable
                                            ? "cursor-not-allowed"
                                            : "cursor-pointer hover:bg-gray-50"
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        className="peer sr-only hidden"
                                        checked={checked}
                                        onChange={() => toggleBrand(brand.id)}
                                        disabled={disable}
                                    />
                                    <span
                                        className={`inline-flex size-5 items-center justify-center rounded-md border text-white transition-colors duration-150 ${
                                            checked
                                                ? "bg-[#2FB06B] border-[#2FB06B]"
                                                : `bg-white border-gray-300 ${
                                                      disable
                                                          ? ""
                                                          : "group-hover:border-gray-400"
                                                  }`
                                        } ${disable ? "opacity-60" : ""}`}
                                    >
                                        <svg
                                            className={`h-4 w-4 ${
                                                checked
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5 10.5l3 3 7-7"
                                                stroke="white"
                                                strokeWidth="2.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <span className="text-[#0F172A] font-medium text-[14px]">
                                        {brand.name}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* confirm button */}
            <ActionButtons
                shouldShowConfirmButton
                confirmText="Xác nhận"
                onConfirmClick={handleConfirm}
                disable={
                    disable ||
                    (selectedSizes.length === 0 &&
                        selectedQuantities.length === 0 &&
                        selectedBrands.length === 0)
                }
            />
        </div>
    );
};

export default ProductFilterSelectList;
