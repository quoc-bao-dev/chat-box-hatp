"use client";

import Image from "next/image";
import { _Image } from "@/core/config/image";
import { useState } from "react";
import ChatInput from "./ChatInput";
import FaqToggleList from "./FaqToggleList";

type BottomBarProps = {
    type: "chat" | "info";
};

const BottomBar = ({ type }: BottomBarProps) => {
    const [isShow, setIsShow] = useState(false);

    if (type === "chat") {
        return (
            <div>
                <FaqToggleList
                    isShow={isShow}
                    onToggle={() => setIsShow(!isShow)}
                />
                <div className="pt-2 lg:pt-4">
                    <ChatInput />
                </div>
            </div>
        );
    }
    return (
        <div>
            <FaqToggleList
                isShow={isShow}
                onToggle={() => setIsShow(!isShow)}
            />
            {/* === bottom === */}
            <div className="pt-2 lg:pt-4">
                <button className="bg-[#00A76F] text-white px-4 py-3 rounded-full text-center w-full text-sm lg:text-lg font-medium flex items-center justify-center gap-3 hover:bg-[#00A76F]/90 transition-all duration-100 cursor-pointer">
                    <p>
                        Hãy chọn vấn đề cần hỗ trợ ở thanh trên hoặc biểu tượng
                        bên cạnh
                    </p>
                    <Image
                        src={_Image.icon.icon_arrow_right}
                        alt="icon-arrow-right"
                        width={20}
                        height={20}
                    />
                </button>
            </div>
        </div>
    );
};

export default BottomBar;
