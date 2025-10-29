import { _Image } from "@/core/config";
import { decodeHtmlEntities } from "@/core/utils/decode";
import HtmlRenderer from "@/modules/chat/components/HtmlRenderer";
import Image from "next/image";

type CancelSuccessProps = {
    content: string;
};

const CancelSuccess = ({ content }: CancelSuccessProps) => {
    return (
        <div className="w-full lg:min-w-[450px] rounded-[24px] bg-white py-6 px-5 flex flex-col gap-2 items-center">
            <h2 className="text-xl text-[#454F5B] font-semibold">
                Hủy thành công!
            </h2>

            <p className="text-[#454F5B]">
                <HtmlRenderer
                    htmlContent={content}
                    className="text-[#454F5B]! font-normal!"
                />
                {/* {decodeHtmlEntities(content)} */}
            </p>

            <Image
                src={_Image.icon.icon_checked}
                alt="checked"
                width={200}
                height={200}
                className="size-[64px]"
            />
        </div>
    );
};

export default CancelSuccess;
