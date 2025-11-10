"use client";

import { useEffect, useRef, useState } from "react";

type SizeInputInlineProps = {
    value: string;
    onChange: (value: string) => void;
    onEnter: () => void;
    onEscape: () => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    autoFocus?: boolean;
};

const SizeInputInline = ({
    value,
    onChange,
    onEnter,
    onEscape,
    placeholder = "Ví dụ: 60 x 84",
    disabled = false,
    className = "",
    autoFocus = true,
}: SizeInputInlineProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const prevValueRef = useRef<string>(value);

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
        } else if (e.key === "Backspace" || e.key === "Delete") {
            // Xoá cả cụm " x " và số bên phải để quay lại nhập số đầu
            const el = inputRef.current;
            if (!el) return;
            const selStart = el.selectionStart ?? value.length;
            const selEnd = el.selectionEnd ?? selStart;
            const delimiterIndex = value.indexOf(" x ");
            if (delimiterIndex !== -1) {
                const delimiterStart = delimiterIndex;
                const delimiterEnd = delimiterIndex + 3;
                const isCaretOnly = selStart === selEnd;
                const deletingAroundDelimiter =
                    (e.key === "Backspace" &&
                        isCaretOnly &&
                        selStart > delimiterStart &&
                        selStart <= delimiterEnd) ||
                    (e.key === "Delete" &&
                        isCaretOnly &&
                        selStart >= delimiterStart &&
                        selStart < delimiterEnd) ||
                    // Nếu bôi đen qua phần delimiter
                    (selStart < delimiterEnd && selEnd > delimiterStart);

                if (deletingAroundDelimiter) {
                    e.preventDefault();
                    const leftPart = value
                        .slice(0, delimiterStart)
                        .replace(/[^0-9]/g, "");
                    const nextValue = leftPart;
                    onChange(nextValue);
                    prevValueRef.current = nextValue;
                    setTimeout(() => {
                        if (inputRef.current) {
                            inputRef.current.focus();
                            const endPos = nextValue.length;
                            try {
                                inputRef.current.setSelectionRange(
                                    endPos,
                                    endPos
                                );
                            } catch {}
                        }
                    }, 0);
                    return;
                }
            }
        } else if (e.key === " ") {
            // Khi bấm space, chèn " x " sau số đầu tiên nếu chưa có 'x'
            e.preventDefault();
            if (disabled) return;
            const compact = value.replace(/\s+/g, "").toLowerCase();
            if (!compact) return;
            if (compact.includes("x")) return;
            const digitsOnly = compact.replace(/[^0-9]/g, "");
            if (!digitsOnly) return;
            const nextValue = `${digitsOnly} x `;
            onChange(nextValue);
            prevValueRef.current = nextValue;
            // Focus lại vào input và đưa caret về cuối
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                    const el = inputRef.current;
                    const end = nextValue.length;
                    try {
                        el.setSelectionRange(end, end);
                    } catch {}
                }
            }, 0);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let raw = e.target.value;

        // Chỉ cho phép số, dấu cách và chữ "x" hoặc "X"
        raw = raw.replace(/[^0-9 xX]/g, "");

        // Tự động chuyển "X" thành "x" (lowercase)
        raw = raw.replace(/X/g, "x");

        // Chuẩn hoá khoảng trắng
        raw = raw.replace(/\s+/g, " ");
        raw = raw.trimStart();

        const hasXNow = raw.includes("x");
        const hadXBefore = prevValueRef.current.includes(" x ");

        const xParts = raw.split("x");
        let leftPart = xParts[0] ?? "";
        let rightPart = xParts[1] ?? "";

        if (xParts.length > 2) {
            rightPart = xParts[1] ?? "";
        }

        leftPart = leftPart.replace(/[^0-9]/g, "");
        rightPart = rightPart.replace(/[^0-9]/g, "");

        let newValue = leftPart;

        if (hasXNow || rightPart.length > 0) {
            if (leftPart) {
                newValue = `${leftPart} x ${rightPart}`;
            } else {
                newValue = "";
            }
        }

        if (hadXBefore && !hasXNow) {
            const prevLeft =
                prevValueRef.current.split(" x ")[0]?.replace(/[^0-9]/g, "") ??
                "";
            newValue = prevLeft;
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                    const el = inputRef.current;
                    const end = newValue.length;
                    try {
                        el.setSelectionRange(end, end);
                    } catch {}
                }
            }, 0);
        }

        prevValueRef.current = newValue;
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
                inputMode="numeric"
                className={`bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2FB06B] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${className} ${
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

export default SizeInputInline;
