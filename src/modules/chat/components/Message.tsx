import { cn } from "@/core/utils/cn";
import { ReactNode } from "react";
import HtmlRenderer from "./HtmlRenderer";

type MessageType = "user" | "assistant";

// Hàm check HTML
const isHtmlContent = (content: string | ReactNode): boolean => {
    if (typeof content !== "string") return false;

    // Kiểm tra các thẻ HTML phổ biến
    const htmlTags = /<[^>]+>/g;
    return htmlTags.test(content);
};

type MessageProps = {
    content: string | ReactNode;
    sender: MessageType;
};

const Message = ({ content, sender }: MessageProps) => {
    // Check HTML và render tương ứng
    const isHtml = isHtmlContent(content);

    return (
        <div
            className={cn(
                "px-4 py-2 rounded-[14px] max-w-full lg:max-w-[40vw]",
                sender === "user"
                    ? "bg-[#00A76F] text-white"
                    : "bg-white text-black/70"
            )}
        >
            {isHtml ? (
                // Render HTML content
                <HtmlRenderer
                    htmlContent={content as string}
                    className="whitespace-pre-wrap"
                />
            ) : (
                // Render text content
                <p className="text-base font-medium w-full whitespace-pre-wrap">
                    {content}
                </p>
            )}
        </div>
    );
};

export default Message;
