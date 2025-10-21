import { _Image } from "@/core/config";
import Image from "next/image";

const BottomButton = () => {
    return (
        <div className="pt-2 lg:pt-6">
            <button className="bg-[#00A76F] text-white px-4 py-3 rounded-full text-center w-full text-sm lg:text-lg font-medium flex items-center justify-center gap-3 hover:bg-[#00A76F]/90 transition-all duration-100 cursor-pointer">
                <p>
                    Hãy chọn vấn đề cần hỗ trợ ở thanh trên hoặc biểu tượng bên
                    cạnh
                </p>
                <Image
                    src={_Image.icon.icon_arrow_right}
                    alt="icon-arrow-right"
                    width={20}
                    height={20}
                />
            </button>
        </div>
    );
};

export default BottomButton;
