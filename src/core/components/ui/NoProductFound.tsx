"use client";

import { _Image } from "@/core/config";
import Image from "next/image";

type NoProductFoundProps = {
    className?: string;
    title?: string;
    descriptionTop?: string;
    descriptionBottom?: string;
};

const NoProductFound = ({
    className = "",
    title = "Không tìm thấy sản phẩm",
    descriptionTop = "Rất tiếc, chúng tôi không tìm thấy mã sản phẩm trên",
    descriptionBottom = "Vui lòng nhập lại mã sản phẩm nhé!",
}: NoProductFoundProps) => {
    return (
        <div
            className={`px-3.5 py-4 rounded-[20px] bg-white max-w-[460px] min-w-[300px] ${className}`}
        >
            <div className="w-full flex flex-col items-center text-center py-4">
                <p className="text-[18px] font-semibold text-gray-600">
                    {title}
                </p>
                <p className="text-sm text-[#5E5E5E]">{descriptionTop}</p>

                <Image
                    src={_Image.icon.icon_product_not_found}
                    alt={title}
                    width={120}
                    height={120}
                    className="my-3"
                />

                <p className="text-sm text-[#5E5E5E]">{descriptionBottom}</p>
            </div>
        </div>
    );
};

export default NoProductFound;
