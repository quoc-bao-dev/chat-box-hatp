"use client";

import { BouncyButton, Button } from "@/core/components/ui";

const FollowUp = () => {
    return (
        <div
            className="rounded-full p-[1px] w-fit cursor-pointer"
            style={{
                background:
                    "linear-gradient(45deg, #FFFFFF99, #37C390, #37C39066)",
            }}
            onClick={() => {}}
        >
            <div className="px-3 py-2 rounded-full bg-white flex gap-3 items-center">
                <p className="text-sm font-medium text-gray-900">
                    Bạn có muốn đăng nhập để tiếp tục lên đơn?
                </p>
                <Button>Đăng nhập ngay</Button>
                <div className="pl-1">x</div>
            </div>
        </div>
    );
};

export default FollowUp;
