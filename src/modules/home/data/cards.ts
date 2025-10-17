import { _Image } from "@/core/config";

export type HomeCard = {
    id: string;
    iconSrc: string;
    title: string;
    description: string;
};

export const homeCards: HomeCard[] = [
    {
        id: "progress",
        iconSrc: _Image.icon.icon_item_1,
        title: "Tiến độ đơn hàng",
        description: "Craft compelling text for ads and emails.",
    },
    {
        id: "quote-order",
        iconSrc: _Image.icon.icon_item_2,
        title: "Tra cứu giá SP & lên đơn",
        description: "Craft compelling text for ads and emails.",
    },
    {
        id: "consult",
        iconSrc: _Image.icon.icon_item_3,
        title: "Gặp tư vấn viên",
        description: "Craft compelling text for ads and emails.",
    },
    {
        id: "others",
        iconSrc: _Image.icon.icon_item_4,
        title: "Thông tin khác về HATP",
        description: "Craft compelling text for ads and emails.",
    },
];
