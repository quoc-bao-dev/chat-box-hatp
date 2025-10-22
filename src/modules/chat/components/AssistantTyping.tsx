import { _Image } from "@/core/config";
import Image from "next/image";
import TypingIndicator from "./TypingIndicator";
import Message from "./Message";

type AssistantTypingProps = {
    avatar?: string;
    name?: string;
};

const AssistantTyping = ({ avatar, name }: AssistantTypingProps) => {
    const defaultAvatar = _Image.icon.bot_avatar;
    const defaultName = "Chatbot HATP";

    return (
        <div>
            <div className="flex items-end gap-2 pt-6">
                {/* avatar */}
                {avatar ? (
                    <div className="size-[40px] rounded-full overflow-hidden ">
                        <Image
                            src={avatar || defaultAvatar}
                            alt="bot-avatar"
                            width={50}
                            height={50}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="size-[40px] rounded-full overflow-hidden p-2.5 bg-[#37C39066]">
                        <Image
                            src={avatar || defaultAvatar}
                            alt="bot-avatar"
                            width={50}
                            height={50}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                {/* content */}
                <div className="relative">
                    {/* name */}
                    <div className="absolute -top-6 left-2 text-xs text-gray-500 truncate">
                        {name || defaultName}
                    </div>

                    {/* message */}
                    <Message
                        sender="assistant"
                        content={<TypingIndicator />}
                    ></Message>
                </div>
            </div>
        </div>
    );
};

export default AssistantTyping;
