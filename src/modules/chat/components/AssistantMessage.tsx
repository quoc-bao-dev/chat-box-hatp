import { _Image } from "@/core/config";
import Image from "next/image";
import Message from "./Message";

type AssistantMessageProps = {
    content: string;
};

const AssistantMessage = ({ content }: AssistantMessageProps) => {
    return (
        <div>
            <div className="flex items-center gap-2 pt-6">
                {/* avatar */}
                <div className="size-[44px] rounded-full overflow-hidden p-2.5 bg-[#37C39066]">
                    <Image
                        src={_Image.icon.bot_avatar}
                        alt="bot-avatar"
                        width={50}
                        height={50}
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* content */}
                <div className="relative">
                    {/* name */}
                    <div className="absolute -top-6 left-2 text-sm text-gray-500">
                        user name
                    </div>

                    {/* message */}
                    <div className="">
                        <Message content={content} sender="assistant" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssistantMessage;
