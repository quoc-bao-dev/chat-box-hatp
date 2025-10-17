import { Time } from "@/core/components/common";
import { ChatBoxContainer } from "@/core/components/layouts";
import { LoginButton } from "@/core/components/ui";
import { _Image } from "@/core/config";
import { scrollbarStyles } from "@/core/styles";
import Image from "next/image";
import AssistantMessage from "../components/AssistantMessage";
import BottomBar from "../components/BottomBar";
import InfoPanel from "../components/InfoPanel";
import UserMessage from "../components/UserMessage";
import Feedback from "../components/Feedback";

const ChatPage = () => {
    return (
        <div className="flex flex-col h-[calc(100vh-40px)] gap-5">
            {/* === header === */}
            <div className="hidden lg:block">
                <div className="flex items-center justify-between">
                    {/* title */}
                    <div className="flex item-center gap-2">
                        <Image
                            src={_Image.icon.icon_headphone}
                            alt="icon-headphone"
                            width={32}
                            height={32}
                            className="size-[32px]"
                        />
                        <h1 className="font-semibold text-[#5E5E5E] text-[28px] leading-[1.15]">
                            Hoàng Anh Tân Phú hỗ trợ
                        </h1>
                    </div>
                    {/* login */}
                    <div className="flex items-center gap-4">
                        <div className="pr-3">
                            <LoginButton />
                        </div>
                        <Image
                            src={_Image.icon.zalo_gray}
                            alt="zalo-gray"
                            width={50}
                            height={50}
                            className="size-[42px]"
                        />
                        <Image
                            src={_Image.icon.phone_gray}
                            alt="phone-gray"
                            width={50}
                            height={50}
                            className="size-[42px]"
                        />
                    </div>
                </div>
            </div>
            {/* === mobile header === */}
            <div className="lg:hidden pt-[40px]"></div>

            {/* === chat content === */}
            <div className="flex-1 lg:bg-[#DFF3E299] lg:rounded-[32px] lg:pb-5">
                <ChatBoxContainer className="h-[calc(100vh-40px-40px-20px)] lg:h-[calc(100vh-140px)]">
                    <div
                        className={`h-full overflow-y-scroll pt-10 pb-50 lg:px-4 ${scrollbarStyles.chatScrollbar} ${scrollbarStyles.smoothScroll}`}
                    >
                        <InfoPanel />

                        {/* time */}
                        <Time time={new Date("2025-10-15T10:00:00")} />
                        <UserMessage content="Thông tin về quy trình trả hàng" />
                        <div className=" space-y-3">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <AssistantMessage
                                    key={index}
                                    content="Thông tin về quy trình trả hàng"
                                />
                            ))}
                        </div>
                        <Feedback />
                    </div>

                    {/* bottom content */}
                    <div className="absolute bottom-0 w-full lg:px-4 ">
                        <BottomBar type="chat" />
                    </div>
                </ChatBoxContainer>
            </div>
        </div>
    );
};

export default ChatPage;
