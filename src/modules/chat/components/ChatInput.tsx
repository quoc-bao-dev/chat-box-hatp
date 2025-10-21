"use client";

import { _Image } from "@/core/config";
import Image from "next/image";

interface ChatInputProps {
    placeholder?: string;
    className?: string;
    onSend?: (message: string) => void;
}

const ChatInput = ({
    placeholder = "Nhập tin nhắn...",
    className = "",
    onSend,
}: ChatInputProps) => {
    const handleSend = () => {
        const input = document.querySelector(
            'input[type="text"]'
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

    return (
        <div className={`${className}`}>
            <div className="bg-white p-2 rounded-full flex items-center border border-[#E2E8F0]">
                <input
                    type="text"
                    className="flex-1 outline-none pl-5 text-gray-800"
                    placeholder={placeholder}
                    onKeyPress={handleKeyPress}
                />
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
