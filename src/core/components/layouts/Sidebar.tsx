import { _Image } from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "../common";

const Sidebar = () => {
    return (
        <div
            className="flex flex-col bg-white rounded-[32px] sticky top-5 h-full"
            style={{ boxShadow: "0px 0px 40px 0px #00000011" }}
        >
            {/* === logo === */}
            <div className="pt-6 w-fit mx-auto">
                <Link href={"/"}>
                    <Logo size={120} />
                </Link>
            </div>
            {/* === items === */}
            <div className="flex-1 pt-10 px-5 flex flex-col gap-2">
                {/* Item */}
                <div
                    className="
        w-full px-3 py-2.5 rounded-[14px] 
        flex items-center gap-3
        bg-[#37C390] text-white"
                >
                    <Image
                        src={_Image.icon.icon_chat}
                        alt="icon-chat"
                        width={20}
                        height={20}
                    />
                    <p className="text-sm font-semibold">Chat</p>
                </div>
                <div
                    className="
        w-full px-3 py-2.5 rounded-[14px] 
        flex items-center gap-3
         text-gray-900"
                >
                    <Image
                        src={_Image.icon.icon_phone_1}
                        alt="icon-chat"
                        width={20}
                        height={20}
                    />
                    <p className="text-sm font-semibold">Chat</p>
                </div>
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
