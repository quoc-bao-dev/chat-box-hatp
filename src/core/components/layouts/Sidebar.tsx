import { _Image } from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { Icon, Logo } from "../common";
import { useSidebar } from "@/store";

interface SidebarItemProps {
    icon: string;
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
                ${
                    isActive
                        ? "bg-[#37C390] text-white hover:bg-[#2ea876]"
                        : "text-gray-900 hover:bg-gray-100/70"
                }
            `}
        >
            <Image src={icon} alt="icon" width={20} height={20} />
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
    return (
        <div
            className="flex flex-col bg-white rounded-r-[24px] lg:rounded-l-[32px] lg:rounded-r-[32px] sticky top-5 h-full"
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
                    icon={_Image.icon.icon_chat}
                    text="Chat"
                    href="/chat"
                    isActive={true}
                    onClick={close}
                />
                <SidebarItem
                    icon={_Image.icon.icon_phone_1}
                    text="Điện thoại"
                    isActive={false}
                />
            </div>

            {/* === social === */}
            <div className="flex flex-col gap-3 p-5">
                <div className="flex items-center gap-3">
                    <Image
                        src={_Image.icon.zalo}
                        alt="zalo"
                        width={40}
                        height={40}
                    />
                    <p className="font-semibold text-gray-600">Zalo</p>
                </div>
                <div className="flex items-center gap-3">
                    <Image
                        src={_Image.icon.phone}
                        alt="phone"
                        width={40}
                        height={40}
                    />
                    <p className="font-semibold text-gray-600">Điện thoại</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
