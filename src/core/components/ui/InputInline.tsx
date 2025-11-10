"use client";

import { useEffect, useRef } from "react";

type InputInlineProps = {
    value: string;
    onChange: (value: string) => void;
    onEnter: () => void;
    onEscape: () => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    autoFocus?: boolean;
    numericOnly?: boolean;
};

const InputInline = ({
    value,
    onChange,
    onEnter,
    onEscape,
    placeholder = "",
    disabled = false,
    className = "",
    autoFocus = true,
    numericOnly = false,
}: InputInlineProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (autoFocus && inputRef.current && !disabled) {
            inputRef.current.focus();
        }
    }, [autoFocus, disabled]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onEnter();
        } else if (e.key === "Escape") {
            e.preventDefault();
            onEscape();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        if (numericOnly) {
            // Chỉ cho phép số (0-9)
            newValue = newValue.replace(/[^0-9]/g, "");
        }
        onChange(newValue);
    };

    const handleClear = () => {
        onChange("");
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                inputMode={numericOnly ? "numeric" : "text"}
                className={`bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2FB06B] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${className} ${
                    value ? "pr-8" : ""
                }`}
            />
            {value && !disabled && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
                    aria-label="Clear input"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default InputInline;
