"use client";

import { _Image } from "@/core/config";
import { useSidebar } from "@/store/sidebarStore";
import { LoginButton } from "@/modules/auth";
import { useAuth } from "@/core/hook/useAuth";
import Icon from "./Icon";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
    const { toggle } = useSidebar();
    const { userInfo, isLoggedIn } = useAuth();

    const pathname = usePathname();

    const isHome = pathname === "/";

    return (
        <div className="w-full flex gap-2 justify-between px-4 ">
            {/* icon bar */}
            <div className="flex-shrink-0 flex">
                <button
                    onClick={toggle}
                    className="p-1 rounded-lg hover:bg-gray-100/70 transition-colors duration-200 lg:hidden"
                    aria-label="Toggle sidebar"
                >
                    <Icon src={_Image.icon.icon_bar} size={32} alt="icon-bar" />
                </button>
                <div className="hidden lg:block">
                    <Icon src={_Image.icon.icon_bar} size={32} alt="icon-bar" />
                </div>
            </div>

            {/* title */}
            {!isHome && (
                <div className="flex items-center gap-2">
                    <Icon
                        src={_Image.icon.icon_headphone}
                        size={24}
                        alt="icon-headphone"
                    />
                    <p className="text font-semibold text-[#5E5E5E]">
                        Giấy Hoàng Anh hỗ trợ
                    </p>
                </div>
            )}

            {/* button login */}
            {!isLoggedIn ? (
                <div className="">
                    <LoginButton />
                </div>
            ) : (
                <>
                    {userInfo?.profile_image ? (
                        <Image
                            src={userInfo.profile_image}
                            alt="avatar"
                            width={40}
                            height={40}
                            className="size-[40px] rounded-full shrink-0"
                        />
                    ) : (
                        <div className="size-[40px] shrink-0 rounded-full bg-[#37C390] flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                                {userInfo?.fullname_contacts?.charAt(0)?.toUpperCase() || userInfo?.fullname?.charAt(0)?.toUpperCase() || "U"}
                            </span>
                        </div>
                    )}
                </>

            )}
        </div>
    );
};

export default Header;
