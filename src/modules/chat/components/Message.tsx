import { cn } from "@/core/utils/cn";
import { ReactNode } from "react";

type MessageType = "user" | "assistant";

type MessageProps = {
    content: string | ReactNode;
    sender: MessageType;
};

const Message = ({ content, sender }: MessageProps) => {
    return (
        <div
            className={cn(
                "px-4 py-2 rounded-[14px] max-w-full lg:max-w-[40vw]",
                sender === "user"
                    ? "bg-[#00A76F] text-white"
                    : "bg-white text-black/70"
            )}
        >
            <p className="text-base font-medium w-full whitespace-pre-wrap">
                {content}
            </p>
        </div>
    );
};

export default Message;
