"use client";

import { useState, useEffect } from "react";

export type ProductCodeInputProps = {
    placeholder?: string;
    onSubmit?: (value: string) => void;
    className?: string;
    disable?: boolean;
    resetTrigger?: number;
};

const ProductCodeInput = ({
    placeholder = "Nhập lại mã sản phẩm...",
    onSubmit,
    className = "",
    disable = false,
    resetTrigger,
}: ProductCodeInputProps) => {
    const [value, setValue] = useState("");

    // Reset input when resetTrigger changes
    useEffect(() => {
        if (resetTrigger !== undefined) {
            setValue("");
        }
    }, [resetTrigger]);

    const handleSubmit = () => {
        if (value.trim() && onSubmit && !disable) {
            onSubmit(value.trim());
        }
    };

    const handleClear = () => {
        if (!disable) {
            setValue("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !disable) {
            handleSubmit();
        }
    };

    return (
        <div className={`relative w-[250px] mt-3 ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => !disable && setValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={disable}
                className={`pl-2 pr-12 py-2 text-gray-900 text-sm w-full border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00A76F] focus:border-transparent ${
                    disable ? "opacity-50 cursor-not-allowed bg-gray-100" : ""
                }`}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {value && (
                    <button
                        type="button"
                        onClick={handleClear}
                        disabled={disable}
                        className={`text-gray-400 hover:text-red-500 transition-colors p-1 ${
                            disable ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        <svg
                            width="12"
                            height="12"
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
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={disable}
                    className={`py-1 px-2 text-xs rounded-full text-white bg-[#00A76F] cursor-pointer ${
                        disable ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    Nhập
                </button>
            </div>
        </div>
    );
};

export default ProductCodeInput;
