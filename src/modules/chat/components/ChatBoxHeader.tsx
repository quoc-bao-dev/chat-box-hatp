"use client";
import { LoginButton } from "@/modules/auth";
import { _Image } from "@/core/config";
import { useGetSetting } from "@/services/setting";
import { useAuth } from "@/core/hook/useAuth";
import Image from "next/image";
import Link from "next/link";

const ChatBoxHeader = () => {
    const { data: setting } = useGetSetting();
    const { isLoggedIn } = useAuth();

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
                            className="size-[24px]"
                        />
                        <h1 className="font-semibold text-[#5E5E5E] text-[20px] leading-[1.15]">
                            Giấy Hoàng Anh hỗ trợ
                        </h1>
                    </div>
                    {/* login */}
                    <div className="flex items-center gap-4">
                        {!isLoggedIn && (
                            <div className="pr-3">
                                <LoginButton />
                            </div>
                        )}
                        <Link href={setting?.zalo_chatbot || ""}>
                            <Image
                                src={_Image.icon.zalo_gray}
                                alt="zalo-gray"
                                width={50}
                                height={50}
                                className="size-[42px]"
                            />
                        </Link>

                        <Link href={setting?.phone_chatbot || ""}>
                            <Image
                                src={_Image.icon.phone_gray}
                                alt="phone-gray"
                                width={50}
                                height={50}
                                className="size-[42px]"
                            />
                        </Link>
                    </div>
                </div>
            </div>
            {/* === mobile header === */}
            <div className="lg:hidden pt-[40px]"></div>
        </div>
    );
};

export default ChatBoxHeader;
