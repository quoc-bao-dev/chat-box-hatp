"use client";

import { Icon } from "@/core/components/common";
import { _Image } from "@/core/config/image";
import { CardItem } from "@/modules/home/components";
import { homeCards } from "@/modules/home/data/cards";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type FaqToggleListProps = {
    isShow: boolean;
    onToggle: () => void;
};

const FaqToggleList = ({ isShow, onToggle }: FaqToggleListProps) => {
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const prevIsShowRef = useRef(isShow);
    const router = useRouter();

    useEffect(() => {
        if (!isShow && prevIsShowRef.current) {
            // start collapse animation, delay showing button until transition ends
            setIsAnimatingOut(true);
        }
        prevIsShowRef.current = isShow;
    }, [isShow]);

    const showButton = !isShow && !isAnimatingOut;

    const handleTransitionEnd = () => {
        if (!isShow) {
            setIsAnimatingOut(false);
        }
    };

    return (
        <>
            {/* === toggle items === */}
            {showButton && (
                <div
                    className="rounded-full p-[1px] w-fit cursor-pointer"
                    style={{
                        background:
                            "linear-gradient(45deg, #FFFFFF99, #37C390, #37C39066)",
                    }}
                    onClick={onToggle}
                >
                    <div className="px-3 py-2 rounded-full bg-white flex gap-3 items-center">
                        <Icon
                            src={_Image.icon.icon_question}
                            size={20}
                            alt="icon-question"
                        />
                        <p className="text-sm font-medium">
                            Các câu hỏi thường gặp
                        </p>
                    </div>
                </div>
            )}

            {/* === list items with slide-in from left === */}
            <div
                className={`
                    overflow-hidden transition-all duration-300 ease-out
                    ${
                        isShow
                            ? "opacity-100 translate-x-0 max-h-[999px] mt-3"
                            : "opacity-0 -translate-x-3 max-h-0"
                    }
                `}
                onTransitionEnd={handleTransitionEnd}
            >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
                    {homeCards.map((c) => (
                        <CardItem
                            key={c.id}
                            type="info"
                            iconSrc={c.iconSrc}
                            title={c.title}
                            description={c.description}
                            onClick={() => {
                                onToggle();
                                router.push(`/chat?type=${c.id}`);
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default FaqToggleList;
