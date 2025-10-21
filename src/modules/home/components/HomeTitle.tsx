import { Icon } from "@/core/components/common";
import { _Image } from "@/core/config";

const HomeTitle = () => {
    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="flex items-center gap-2">
                <h1 className="pt-10 lg:pt-0 text-transparent bg-clip-text bg-gradient-to-r from-[#018445] to-[#006BE5] text-[28px] lg:text-[72px] leading-[1.15] text-center font-bold">
                    Hoàng Anh Tân Phú <br /> xin chào !
                </h1>
                <div className="pt-10 lg:pt-0">
                    <Icon
                        src={_Image.icon.icon_hand_1}
                        size={100}
                        alt="icon-hand-1"
                        className="size-[50px] lg:size-[100px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeTitle;
