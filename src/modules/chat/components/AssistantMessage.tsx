import { _Image } from "@/core/config";
import Image from "next/image";
import Message from "./Message";

type AssistantMessageProps = {
    avatar?: string;
    content: string;
    name?: string;
};

const AssistantMessage = ({ content, avatar, name }: AssistantMessageProps) => {
    const defaultAvatar = _Image.icon.bot_avatar;
    const defaultName = "Chatbot HATP";

    return (
        <div>
            <div className="flex items-start gap-2 pt-6">
                {/* === avatar === */}
                {avatar ? (
                    // === chatbot ===
                    <div className="size-[40px] rounded-full overflow-hidden flex-shrink-0">
                        <Image
                            src={avatar || defaultAvatar}
                            alt="bot-avatar"
                            width={50}
                            height={50}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    // === assistant ===
                    <div className="size-[40px] rounded-full overflow-hidden flex items-center justify-center bg-[#37C39066] flex-shrink-0">
                        <Image
                            src={avatar || defaultAvatar}
                            alt="bot-avatar"
                            width={50}
                            height={50}
                            className="size-[22px] object-cover"
                        />
                    </div>
                )}
                {/* === content === */}
                <div className="relative">
                    {/* === name === */}
                    <div className="absolute -top-6 left-2 text-sm text-gray-500">
                        {name || defaultName}
                    </div>

                    {/* === message === */}
                    <div className="w-full">
                        <Message content={content} sender="assistant" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssistantMessage;
