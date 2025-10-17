"use client";

import { _Image } from "@/core/config";
import Image from "next/image";

interface ChatInputProps {
    placeholder?: string;
    className?: string;
    onSend?: (message: string) => void;
    onMicClick?: () => void;
}

const ChatInput = ({
    placeholder = "Nhập tin nhắn...",
    className = "",
    onSend,
    onMicClick,
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
            <div className="bg-white p-2 rounded-full flex items-center">
                <input
                    type="text"
                    className="flex-1 outline-none pl-5"
                    placeholder={placeholder}
                    onKeyPress={handleKeyPress}
                />
                <div
                    className="p-3 rounded-full bg-[#00A76F] flex items-center justify-center cursor-pointer hover:bg-[#00A76F]/90 transition-colors"
                    onClick={handleSend}
                >
                    <Image
                        src={_Image.icon.icon_send}
                        alt="icon-send"
                        width={20}
                        height={20}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
