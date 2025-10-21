import { LoginButton } from "@/core/components/ui";
import { _Image } from "@/core/config";
import Image from "next/image";

const ChatBoxHeader = () => {
    return (
        <div>
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
        </div>
    );
};

export default ChatBoxHeader;
