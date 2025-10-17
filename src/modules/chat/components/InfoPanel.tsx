import { _Image } from "@/core/config";
import Image from "next/image";

type InfoItem = {
    id: string;
    label: string;
};

const items: InfoItem[] = [
    { id: "return", label: "Thông tin về quy trình trả hàng" },
    { id: "payment", label: "Quy trình trình thanh toán" },
    { id: "debt", label: "Số ngày công nợ" },
    { id: "invoice", label: "Quy trình xuất hoá đơn" },
    { id: "hotline", label: "Gọi hotline liên hệ tư vấn viên" },
];

const InfoPanel = () => {
    return (
        <div className="px-3.5 py-4 rounded-[20px] bg-white max-w-[400px]">
            <p className="text-[18px] font-semibold">
                Thông tin khác về Hoàng Anh Tân Phú
            </p>
            <div className="pt-2 flex flex-col gap-2">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="cursor-pointer px-4 py-2 rounded-xl bg-gray-50/80 hover:bg-gray-100 flex items-center justify-between"
                    >
                        <p className="text-[#00A76F] font-medium">
                            {item.label}
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

export default InfoPanel;
