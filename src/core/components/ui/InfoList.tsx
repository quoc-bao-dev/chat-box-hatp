import Image from "next/image";
import { _Image } from "@/core/config";

export type InfoListItem = {
    id: string;
    content: string;
};

export type InfoListProps = {
    title: string;
    items: InfoListItem[];
    onItemClick?: (item: InfoListItem) => void;
    className?: string;
};

const InfoList = ({
    title,
    items,
    onItemClick,
    className = "",
}: InfoListProps) => {
    return (
        <div
            className={`px-3.5 py-4 rounded-[20px] bg-white max-w-[400px] ${className}`}
        >
            <p className="text-[18px] font-semibold text-gray-900">{title}</p>
            <div className="pt-2 flex flex-col gap-2">
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onItemClick?.(item)}
                        className="cursor-pointer px-4 py-2 rounded-xl bg-gray-50/80 hover:bg-gray-100 flex items-center justify-between"
                    >
                        <p className="text-[#00A76F] font-medium">
                            {item.content}
                        </p>
                        <Image
                            src={_Image.icon.icon_send_2}
                            alt="arrow-right"
                            width={20}
                            height={20}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoList;
