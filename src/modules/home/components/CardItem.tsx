import { cn } from "@/core/utils/cn";
import Image from "next/image";

type CardItemProps = {
    iconSrc: string;
    title: string;
    description: string;
    disabled?: boolean;

    onClick?: () => void;
    type?: "default" | "info";
};

const CardItem = ({
    iconSrc,
    title,
    description,
    type = "default",
    disabled = false,
    onClick,
}: CardItemProps) => {
    if (type === "info") {
        return (
            <div
                className={cn(
                    "relative h-full p-2 md:p-4 rounded-[14px] bg-white cursor-pointer hover:shadow-xl/4 transition-all duration-300 flex items-center gap-3 md:gap-4",
                    disabled && "cursor-not-allowed hover:shadow-none"
                )}
                onClick={() => !disabled && onClick?.()}
            >
                <Image
                    src={iconSrc}
                    alt={title}
                    width={100}
                    height={100}
                    className="size-[36px] lg:size-[40px]"
                />
                <div className="flex-1">
                    <h3 className="text-gray-700 text-[14px] md:text-[18px] font-medium">
                        {title}
                    </h3>
                </div>

                {disabled && (
                    <div className="absolute inset-0 bg-black/10 rounded-[14px] z-10 cursor-not-allowed">
                        <div className="absolute top-2 right-4 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs font-semibold">
                            Sắp ra mắt
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className={cn(
                "relative p-4 h-full rounded-[20px] bg-white cursor-pointer hover:shadow-lg transition-all duration-300",
                disabled && "cursor-not-allowed hover:shadow-none"
            )}
            onClick={() => !disabled && onClick?.()}
        >
            <Image
                src={iconSrc}
                alt={title}
                width={100}
                height={100}
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

            {disabled && (
                <div className="absolute inset-0 bg-black/15 rounded-[20px] z-10 cursor-not-allowed">
                    <div className="absolute top-4 right-5 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Sắp ra mắt
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardItem;
