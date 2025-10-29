"use client";
import { LoginButton } from "@/modules/auth";
import { _Image } from "@/core/config";
import { useGetSetting } from "@/services/setting";
import { useAuth } from "@/core/hook/useAuth";
import Image from "next/image";
import Link from "next/link";
import ZaloIcon from "@/core/components/icons/zalo";
import PhoneIcon from "@/core/components/icons/phone";

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
                        <Link
                            href={setting?.zalo_chatbot || ""}
                            target="_blank"
                        >
                            <ZaloIcon className="size-[42px] text-[#6D6D6D] hover:text-[#0168FF] transition-all duration-300" />
                        </Link>

                        <Link href={`tel:${setting?.phone_chatbot || ""}`}>
                            <PhoneIcon className="text-[#6D6D6D] size-[42px] hover:text-[#1BD4BA] transition-all duration-300" />
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
