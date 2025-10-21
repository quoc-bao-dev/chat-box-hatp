import Image from "next/image";

type CardItemProps = {
    iconSrc: string;
    title: string;
    description: string;
    onClick?: () => void;
    type?: "default" | "info";
};

const CardItem = ({
    iconSrc,
    title,
    description,
    type = "default",
    onClick,
}: CardItemProps) => {
    if (type === "info") {
        return (
            <div
                className="h-full p-2 md:p-4 rounded-[14px] bg-white cursor-pointer hover:shadow-xl/4 transition-all duration-300 flex items-center gap-3 md:gap-4 border border-gray-100"
                onClick={onClick}
            >
                <Image
                    src={iconSrc}
                    alt={title}
                    width={28}
                    height={28}
                    className="size-[36px] lg:size-[40px]"
                />
                <div className="flex-1">
                    <h3 className="text-gray-700 text-[14px] md:text-[18px] font-medium">
                        {title}
                    </h3>
                </div>
            </div>
        );
    }

    return (
        <div
            className="p-4 h-full rounded-[20px] bg-white cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={onClick}
        >
            <Image
                src={iconSrc}
                alt={title}
                width={60}
                height={60}
                className="size-[36px] lg:size-[48px]"
            />
            <div className="pt-2">
                <h2 className="text-gray-700 text-[18px] lg:text-[24px] font-semibold">
                    {title}
                </h2>
            </div>
            <div className="pt-1">
                <p className="text-xs lg:text-base text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default CardItem;
