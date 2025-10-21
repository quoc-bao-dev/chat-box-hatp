"use client";

import { BouncyButton } from "@/core/components/ui";
import { _Image } from "@/core/config/image";
import scrollbarStyles from "@/core/styles/scrollbar.module.css";
import { cn } from "@/core/utils/cn";
import { useEvaluateSupportMutation, useGetListTags } from "@/services/chatbot";
import { useChatBoxState } from "@/store";
import Image from "next/image";
import { useMemo, useState } from "react";

type Rating = "good" | "normal" | "bad";

interface EmojiButtonProps {
    rating: Rating;
    isActive: boolean;
    onClick: () => void;
    label: string;
    normalImage: string;
    activeImage: string;
}

const EmojiButton = ({
    rating,
    isActive,
    onClick,
    label,
    normalImage,
    activeImage,
}: EmojiButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="group outline-none"
            aria-pressed={isActive}
        >
            <div className="flex flex-col items-center gap-2 mt-3">
                <div className="relative w-[100px] h-[100px] overflow-hidden lg:w-[120px] lg:h-[120px] -my-4 ">
                    <div className="relative w-full h-full transition-transform duration-200">
                        <Image
                            src={isActive ? activeImage : normalImage}
                            alt={rating}
                            width={200}
                            height={200}
                            className={cn(
                                "object-contain relative w-full h-full transition-transform duration-200",
                                isActive ? "scale-120" : "scale-100"
                            )}
                        />
                    </div>
                </div>
                <p
                    className={cn(
                        "font-semibold text-sm lg:text-base",
                        isActive ? "text-[#00A76F]" : "text-[#1D2939]"
                    )}
                >
                    {label}
                </p>
            </div>
        </button>
    );
};

const Feedback = () => {
    const [rating, setRating] = useState<Rating | null>(null);
    const [reasons, setReasons] = useState<Set<string>>(new Set());

    const { sessionRobot } = useChatBoxState();

    const { data: listTags } = useGetListTags();

    // Map dữ liệu listTags thành tagList với useMemo - tất cả tags độc lập
    const tagList = useMemo(() => {
        if (!listTags?.data) return [];

        return Object.keys(listTags.data).reduce((acc, ratingKey) => {
            const tags = listTags.data[ratingKey];
            const mappedTags = tags.map((tag, index) => ({
                id: `${ratingKey}-${index}`,
                text: tag,
                rating: ratingKey,
            }));
            return [...acc, ...mappedTags];
        }, [] as Array<{ id: string; text: string; rating: string }>);
    }, [listTags]);

    const { mutateAsync: evaluateSupportMutation } =
        useEvaluateSupportMutation();

    const handleEvaluateSupport = async () => {
        console.log("sessionRobot", sessionRobot);
        console.log("rating", rating);

        if (!sessionRobot || !rating) return;

        // Map rating to API format
        const ratingMap = {
            good: "3",
            normal: "2",
            bad: "1",
        };

        const requestData = {
            params: {
                session_robot: sessionRobot,
                evaluate: ratingMap[rating],
            },
            payload: {
                tag: Array.from(reasons),
            },
        };

        console.log("=== handleEvaluateSupport Data ===");
        console.log("Session Robot:", sessionRobot);
        console.log("Rating:", rating);
        console.log("Mapped Rating:", ratingMap[rating]);
        console.log("Selected Reasons:", Array.from(reasons));
        console.log("Request Data:", requestData);

        const response = await evaluateSupportMutation(requestData);

        console.log("=== API Response ===");
        console.log(response);
    };

    const toggleReason = (key: string) => {
        setReasons((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    const isActive = (value: Rating) => rating === value;

    return (
        <div className="bg-white rounded-[20px] p-4 w-fit mx-auto">
            <div className="text-center">
                <h3 className="text-[#1D2939] text-xl font-semibold">
                    Kết thúc phiên hỗ trợ
                </h3>
                <p className="text-[#475467] text-sm mt-1">
                    Bạn đánh giá lần hỗ trợ này như thế nào?
                </p>
            </div>

            {/* Emoji selections */}
            <div className="flex items-center justify-center">
                <EmojiButton
                    rating="good"
                    isActive={isActive("good")}
                    onClick={() => setRating("good")}
                    label="Tốt"
                    normalImage={_Image.icon.emoji.emoji_1}
                    activeImage={_Image.icon.emoji.emoji_1_at}
                />

                <EmojiButton
                    rating="normal"
                    isActive={isActive("normal")}
                    onClick={() => setRating("normal")}
                    label="Bình Thường"
                    normalImage={_Image.icon.emoji.emoji_2}
                    activeImage={_Image.icon.emoji.emoji_2_at}
                />

                <EmojiButton
                    rating="bad"
                    isActive={isActive("bad")}
                    onClick={() => setRating("bad")}
                    label="Kém"
                    normalImage={_Image.icon.emoji.emoji_3}
                    activeImage={_Image.icon.emoji.emoji_3_at}
                />
            </div>

            {/* Action buttons */}
            <div className="mt-4">
                {/* Mobile: Horizontal scroll */}
                <div
                    className={cn(
                        "flex items-center gap-3 overflow-x-auto pb-2 lg:hidde-n max-w-[420px]",
                        scrollbarStyles.customScrollbar
                    )}
                >
                    <div className="flex items-center gap-3 flex-shrink-0">
                        {tagList.map((tag) => (
                            <BouncyButton
                                key={tag.id}
                                variant={
                                    reasons.has(tag.id)
                                        ? "solid"
                                        : "outlineGradient"
                                }
                                size="sm"
                                onClick={() => toggleReason(tag.id)}
                            >
                                {tag.text}
                            </BouncyButton>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleEvaluateSupport}
                    className="w-full bg-[#00A76F] text-white rounded-[100px] p-2 mt-3"
                >
                    <span className="text-white">Gửi đánh giá</span>
                </button>

                {/* Desktop: Centered layout */}
                {/* <div className="hidden lg:flex items-center justify-center gap-3 flex-wrap max-w-[400px]">
                    {tagList.map((tag) => (
                        <BouncyButton
                            key={tag.id}
                            variant={
                                reasons.has(tag.id)
                                    ? "solid"
                                    : "outlineGradient"
                            }
                            size="sm"
                            onClick={() => toggleReason(tag.id)}
                        >
                            {tag.text}
                        </BouncyButton>
                    ))}
                </div> */}
            </div>
        </div>
    );
};

export default Feedback;
