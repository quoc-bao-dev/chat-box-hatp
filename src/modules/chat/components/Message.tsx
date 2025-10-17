import { cn } from "@/core/utils/cn";

type MessageType = "user" | "assistant";

type MessageProps = {
    content: string;
    sender: MessageType;
};

const Message = ({ content, sender }: MessageProps) => {
    return (
        <div
            className={cn(
                "px-4 py-2 rounded-[14px] ",
                sender === "user"
                    ? "bg-[#00A76F] text-white"
                    : "bg-white text-black/70"
            )}
        >
            <p className="text-base font-medium">{content}</p>
        </div>
    );
};

export default Message;
