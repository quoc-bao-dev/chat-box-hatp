"use client";

import { Icon } from "@/core/components/common";
import { _Image } from "@/core/config";
import { LoginButton } from "@/modules/auth";
import { useFollowUpStore } from "@/store/followUpStore";

const FollowUp = () => {
    const { closeFollowUp } = useFollowUpStore();
    return (
        <div
            className="rounded-xl lg:rounded-full p-[1px] w-fit cursor-pointer"
            style={{
                background:
                    "linear-gradient(45deg, #FFFFFF99, #37C390, #37C39066)",
            }}
        >
            <div className="px-3 py-3 lg:py-1.5 rounded-xl lg:rounded-full bg-white flex gap-3 items-center">
                <div className="flex gap-1 lg:gap-3 flex-col lg:flex-row  items-start lg:items-center">
                    <p className="text-sm font-medium text-gray-900 truncate">
                        Bạn có muốn đăng nhập để tiếp tục lên đơn?
                    </p>
                    <LoginButton showIcon={false}>
                        {" "}
                        Đăng nhập ngay {"  "}
                    </LoginButton>
                </div>
                <div className="pl-0" onClick={closeFollowUp}>
                    <Icon
                        src={_Image.icon.icon_cancel}
                        size={20}
                        alt="icon-cancel"
                    />
                </div>
            </div>
        </div>
    );
};

export default FollowUp;
