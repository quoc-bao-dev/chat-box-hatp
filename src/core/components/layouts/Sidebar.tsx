"use client";

import { _Image } from "@/core/config";
import { useAuth } from "@/core/hook/useAuth";
import { useGetSetting } from "@/services/setting";
import { useSidebar } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Icon, Logo } from "../common";

interface SidebarItemProps {
    icon: ReactNode;
    text: string;
    href?: string;
    isActive?: boolean;
    onClick?: () => void;
}

const SidebarItem = ({
    icon,
    text,
    href,
    isActive = false,
    onClick,
}: SidebarItemProps) => {
    const content = (
        <div
            className={`
                w-full px-3 py-2.5 rounded-[14px] 
                flex items-center gap-3
                transition-all duration-200 ease-in-out
                cursor-pointer
                ${isActive
                    ? "bg-[#37C390] text-white hover:bg-[#2ea876]"
                    : "text-gray-600 hover:bg-gray-100/70"
                }
            `}
        >
            {/* <Image src={icon} alt="icon" width={20} height={20} /> */}
            <div className="w-[20px] h-[20px]">{icon}</div>
            <p className="text-sm font-semibold">{text}</p>
        </div>
    );

    if (href) {
        return (
            <Link href={href} onClick={onClick}>
                {content}
            </Link>
        );
    }

    return content;
};

const Sidebar = () => {
    const { close } = useSidebar();
    const pathname = usePathname();
    const { data: setting } = useGetSetting();
    const { userInfo, isLoggedIn, logout } = useAuth();

    console.log(userInfo);
    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

    return (
        <div
            className="flex flex-col bg-white rounded-r-[24px] lg:rounded-l-[32px] lg:rounded-r-[32px] sticky top-5 h-full w-full"
            style={{ boxShadow: "0px 0px 40px 0px #00000011" }}
        >
            {/* close button */}
            <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2- lg:hidden">
                <div
                    className="p-2.5 rounded-full bg-gray-50- hover:bg-gray-50"
                    onClick={close}
                >
                    <Icon
                        src={_Image.icon.icon_arrow_left}
                        size={20}
                        alt="icon-bar"
                    />
                </div>
            </div>
            {/* === logo === */}
            <div className="relative">
                <div className="pt-6 w-fit mx-auto relative">
                    <Link href={"/"} onClick={close}>
                        <Logo size={120} />
                    </Link>
                </div>
            </div>
            {/* === items === */}
            <div className="flex-1 pt-10 px-3 2xl:px-5 flex flex-col gap-2">
                <SidebarItem
                    icon={
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20.3279 8.94214C20.5113 8.95316 20.6269 9.21713 20.8582 9.74487C21.1968 10.5178 21.4086 11.3602 21.4666 12.2449C21.5116 12.9327 21.5116 13.644 21.4666 14.3318C21.3754 15.7242 20.7619 16.9726 20.0906 17.9744C19.9377 18.2764 20.0042 18.7742 20.3718 19.4617L20.3914 19.4978C20.5141 19.7272 20.6416 19.9667 20.7166 20.1736C20.7969 20.3954 20.8941 20.7853 20.6628 21.1746C20.4532 21.5273 20.1207 21.6514 19.8718 21.699C19.6692 21.7377 19.4237 21.7428 19.2087 21.7478L19.1687 21.7488C18.0004 21.7768 17.1687 21.4433 16.5095 20.9636C16.4315 20.9069 16.3927 20.8778 16.3464 20.863C16.3121 20.8521 16.272 20.848 16.2361 20.8503C16.1877 20.8535 16.1432 20.871 16.0544 20.907L15.9578 20.947C15.5092 21.1294 15.0017 21.2377 14.5359 21.2683C13.3639 21.3452 12.139 21.3453 10.9646 21.2683C9.37057 21.1637 7.945 20.5419 6.79858 19.5837C6.44313 19.2867 6.26455 19.1382 6.25269 19.0154C6.24343 18.9171 6.28072 18.8252 6.35522 18.7605C6.44848 18.6796 6.71828 18.6976 7.25757 18.7332C8.56634 18.8193 9.93148 18.8195 11.2429 18.7332C15.9334 18.4243 19.6555 14.6728 19.9617 9.98218C20.0027 9.35317 20.0231 9.03816 20.1921 8.96558C20.2326 8.94827 20.284 8.9396 20.3279 8.94214ZM7.3562 0.311279C8.59952 0.229402 9.8994 0.229232 11.1453 0.311279C15.0789 0.570579 18.2072 3.71865 18.4646 7.66382C18.5123 8.39528 18.5123 9.15209 18.4646 9.88354C18.2071 13.8285 15.0788 16.9758 11.1453 17.2351C9.8994 17.3172 8.59952 17.317 7.3562 17.2351C6.86557 17.2028 6.33098 17.0878 5.85913 16.8953C5.68957 16.8261 5.56772 16.7761 5.47534 16.741C5.41436 16.7838 5.33543 16.8411 5.22925 16.9187C4.53682 17.4246 3.66334 17.7784 2.43237 17.7488L2.3894 17.7468C2.15996 17.7414 1.90346 17.7356 1.69214 17.6951C1.43366 17.6455 1.09527 17.5181 0.882568 17.1589C0.648953 16.7642 0.746206 16.3674 0.829834 16.1355C0.908129 15.9185 1.0424 15.6668 1.17358 15.4207L1.19409 15.3826C1.58654 14.6457 1.66813 14.0917 1.49097 13.7449C0.779415 12.6795 0.132079 11.3567 0.0358887 9.88354C-0.0118254 9.1521 -0.0118012 8.39528 0.0358887 7.66382C0.293253 3.71849 3.42234 0.570347 7.3562 0.311279ZM6.25073 10.2498C5.83662 10.2498 5.50089 10.5857 5.50073 10.9998C5.50081 11.4139 5.83656 11.7498 6.25073 11.7498H12.2507C12.6648 11.7496 13.0007 11.4138 13.0007 10.9998C13.0006 10.5858 12.6647 10.2499 12.2507 10.2498H6.25073ZM6.25073 6.24976C5.83662 6.24976 5.50089 6.58568 5.50073 6.99976C5.50081 7.41391 5.83656 7.74976 6.25073 7.74976H9.25073C9.66477 7.74961 10.0007 7.41382 10.0007 6.99976C10.0006 6.58577 9.66472 6.2499 9.25073 6.24976H6.25073Z"
                                fill="currentColor"
                            />
                        </svg>
                    }
                    text="Chat"
                    href="/chat"
                    isActive={isActive("/chat")}
                    onClick={close}
                />
                <SidebarItem
                    icon={
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15.2735 18.7499C14.511 18.7499 13.4399 18.4741 11.836 17.578C9.88562 16.4843 8.37702 15.4745 6.43718 13.5397C4.56687 11.6706 3.65671 10.4604 2.38288 8.14246C0.94382 5.52527 1.18913 4.1534 1.46335 3.56707C1.78991 2.86629 2.27195 2.44715 2.89499 2.03113C3.24888 1.79927 3.62338 1.60051 4.01374 1.43738C4.0528 1.42058 4.08913 1.40457 4.12155 1.39012C4.31491 1.30301 4.60788 1.17137 4.97898 1.31199C5.22663 1.40496 5.44773 1.59519 5.79382 1.93699C6.50359 2.63699 7.47351 4.19598 7.83132 4.9616C8.07155 5.47762 8.23054 5.81824 8.23093 6.20027C8.23093 6.64754 8.00593 6.99246 7.73288 7.36473C7.68171 7.43465 7.63093 7.50144 7.58171 7.56629C7.28444 7.95691 7.21921 8.0698 7.26218 8.27137C7.34929 8.67644 7.9989 9.8823 9.06648 10.9475C10.1341 12.0128 11.3051 12.6214 11.7118 12.7081C11.9219 12.753 12.0372 12.685 12.4403 12.3772C12.4981 12.3331 12.5575 12.2874 12.6196 12.2417C13.036 11.9319 13.3649 11.7128 13.8016 11.7128H13.804C14.1841 11.7128 14.5094 11.8776 15.0485 12.1495C15.7516 12.5042 17.3575 13.4616 18.0618 14.1721C18.4044 14.5175 18.5954 14.7378 18.6887 14.985C18.8294 15.3573 18.6969 15.6491 18.6106 15.8444C18.5962 15.8768 18.5801 15.9124 18.5634 15.9518C18.3989 16.3415 18.199 16.7152 17.9661 17.0682C17.5509 17.6893 17.1301 18.1702 16.4278 18.4971C16.0672 18.6678 15.6725 18.7542 15.2735 18.7499Z"
                                fill="currentColor"
                            />
                        </svg>
                    }
                    text="Điện thoại"
                    isActive={isActive("/phone")}
                />
            </div>

            {/* === social === */}
            <div className="flex flex-col gap-3 p-5">
                <Link href={setting?.zalo_chatbot || ""} className="flex items-center gap-3">
                    <Image
                        src={_Image.icon.zalo}
                        alt="zalo"
                        width={40}
                        height={40}
                    />
                    <p className="font-semibold text-gray-600">Zalo</p>
                </Link>
                <Link href={setting?.phone_chatbot || ""} className="flex items-center gap-3">
                    <Image
                        src={_Image.icon.phone}
                        alt="phone"
                        width={40}
                        height={40}
                    />
                    <p className="font-semibold text-gray-600">Điện thoại</p>
                </Link>
            </div>

            {isLoggedIn && (
                <div className="flex flex-col gap-5 px-5 w-full">
                    <div className="flex flex-col gap-2">
                        <button className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-100/70 transition-all duration-200 ease-in-out">
                            <Icon
                                src={_Image.icon.setting}
                                size={20}
                                alt="icon-bar"
                            />
                            <p className="font-normal text-sm text-black">Cài đặt</p>
                        </button>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-[#FC5050]/10 transition-all duration-200 ease-in-out"
                        >
                            <Icon
                                src={_Image.icon.logout}
                                size={20}
                                alt="icon-bar"
                            />
                            <p className="font-normal text-sm text-[#FC5050]">Đăng xuất</p>
                        </button>
                    </div>
                    <div className="2xl:px-3 w-full min-w-0">
                        <div className="w-full flex items-center gap-3 py-3 border-t border-[#F3F3F3]">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
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
                                <div className="flex flex-col flex-1 min-w-0">
                                    <p className="font-semibold text-sm text-black truncate">{userInfo?.fullname_contacts}</p>
                                    <p className="font-normal text-xs text-black truncate">{userInfo?.fullname}</p>
                                </div>
                            </div>
                            <Image
                                src={_Image.icon.icon_arrow_left}
                                alt="icon-bar"
                                className="rotate-180 shrink-0"
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default Sidebar;
