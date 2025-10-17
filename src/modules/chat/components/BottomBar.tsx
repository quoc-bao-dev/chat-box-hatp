import { _Image } from "@/core/config/image";
import { CardItem } from "@/modules/home/components";
import { homeCards } from "@/modules/home/data/cards";
import Image from "next/image";
import ChatInput from "./ChatInput";

type BottomBarProps = {
    type: "chat" | "info";
};

const BottomBar = ({ type }: BottomBarProps) => {
    if (type === "chat") {
        return (
            <div>
                <ChatInput />
            </div>
        );
    }
    return (
        <div>
            {" "}
            {/* === list items === */}
            <div className="grid grid-cols-4 gap-6">
                {homeCards.map((c) => (
                    <CardItem
                        key={c.id}
                        type="info"
                        iconSrc={c.iconSrc}
                        title={c.title}
                        description={c.description}
                    />
                ))}
            </div>
            {/* === bottom === */}
            <div className="pt-8">
                <button className="bg-[#00A76F] text-white px-4 py-3 rounded-full text-center w-full text-lg font-medium flex items-center justify-center gap-3 hover:bg-[#00A76F]/90 transition-all duration-100 cursor-pointer">
                    <p>
                        Hãy chọn vấn đề cần hỗ trợ ở thanh trên hoặc biểu tượng
                        bên cạnh
                    </p>
                    <Image
                        src={_Image.icon.icon_arrow_right}
                        alt="icon-arrow-right"
                        width={20}
                        height={20}
                    />
                </button>
            </div>
        </div>
    );
};

export default BottomBar;
