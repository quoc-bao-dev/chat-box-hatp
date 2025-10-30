"use client";

import { _Image } from "@/core/config";
import { useChatBoxActions } from "@/store";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ChatInputProps {
    placeholder?: string;
    className?: string;
    onSend?: (message: string) => void;
    onChange?: (value: string) => void;
    value?: string;
    suggestText?: string;
    onAcceptSuggestion?: () => void;
}

const ChatInput = ({
    placeholder = "Nhập tin nhắn...",
    className = "",
    onSend,
    onChange,
    value,
    suggestText,
    onAcceptSuggestion,
}: ChatInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { stopCountdownFeedback } = useChatBoxActions();
    const [isMobile, setIsMobile] = useState(false);
    const handleSend = () => {
        const input = document.querySelector(
            "#input-chat-box"
        ) as HTMLInputElement;
        if (input && input.value.trim() && onSend) {
            onSend(input.value.trim());
            input.value = "";
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Tab") {
            // console.log("handleKeyDown", suggestText);

            const current = inputRef.current?.value || "";

            const remainder = getSuggestionRemainder(
                current,
                suggestText || ""
            );

            if (remainder) {
                e.preventDefault();
                onAcceptSuggestion && onAcceptSuggestion();
            }
        }
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef.current]);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const remainder = getSuggestionRemainder(value ?? "", suggestText ?? "");

    return (
        <div className={`${className}`}>
            <div className="bg-white p-1.5 rounded-full flex items-center border border-[#E2E8F0]">
                <div className="relative flex-1">
                    {/* Ghost text overlay */}
                    {!!suggestText && !!value ? (
                        <div className=" absolute inset-0 z-10 pointer-events-none pl-5 text-gray-400">
                            <span className="invisible whitespace-pre">
                                {value ?? ""}
                            </span>
                            <span>
                                {remainder}{" "}
                                {!isMobile && (
                                    <span className="text-xs">
                                        {" "}
                                        (Tab để chọn)
                                    </span>
                                )}
                            </span>
                        </div>
                    ) : null}
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full outline-none pl-5 text-gray-800 bg-transparent"
                        placeholder={
                            suggestText ? ` (${suggestText})` : placeholder
                        }
                        onKeyPress={handleKeyPress}
                        onKeyDown={handleKeyDown}
                        onFocus={stopCountdownFeedback}
                        onChange={(e) => onChange && onChange(e.target.value)}
                        value={value}
                        id="input-chat-box"
                    />
                    {/* Nút chọn cho mobile (hiện bên trong relative) */}
                    {!!remainder && !!value && isMobile && (
                        <button
                            type="button"
                            onClick={onAcceptSuggestion}
                            tabIndex={0}
                            className="absolute right-2 top-1/2 -translate-y-1/2 ml-2 text-xs px-2 py-1 rounded-full bg-[#00A76F] text-white active:scale-95 transition md:hidden"
                            style={{ zIndex: 60 }}
                        >
                            Chọn
                        </button>
                    )}
                </div>
                <div
                    className="p-2 md:p-3 rounded-full bg-[#00A76F] flex items-center justify-center cursor-pointer hover:bg-[#00A76F]/90 transition-colors"
                    onClick={handleSend}
                >
                    <Image
                        src={_Image.icon.icon_send}
                        alt="icon-send"
                        width={20}
                        height={20}
                        className="size-[18px] md:size-[20px] "
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatInput;

function getSuggestionRemainder(value: string, suggestText: string) {
    if (!suggestText) return "";
    const parts = (value || "").split(",");
    const last = (parts[parts.length - 1] || "").trim();
    if (!last) return `(${suggestText})`;
    const v = last.toLowerCase();
    const s = suggestText.toLowerCase();
    if (s.startsWith(v)) return suggestText.slice(last.length);
    return ` (${suggestText})`;
}
