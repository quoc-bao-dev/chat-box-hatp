"use client";

import { BouncyButton } from "@/core/components/ui";
import { _Image } from "@/core/config/image";
import scrollbarStyles from "@/core/styles/scrollbar.module.css";
import { cn } from "@/core/utils/cn";
import { useEvaluateSupportMutation, useGetListTags } from "@/services/chatbot";
import { useChatBoxState, useChatBoxActions } from "@/store";
import Image from "next/image";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

type Rating = "good" | "normal" | "bad";

type FeedbackProps = {
    onScrollToBottom?: () => void;
    feedbackData?: {
        rating: "good" | "normal" | "bad";
        tags: string[];
        isEvaluated: boolean;
    };
};

const Feedback = ({ onScrollToBottom, feedbackData }: FeedbackProps) => {
    const [rating, setRating] = useState<Rating | null>(
        feedbackData?.rating || null
    );
    const [reasons, setReasons] = useState<Set<string>>(
        new Set(feedbackData?.tags || [])
    );
    const [isEvaluated, setIsEvaluated] = useState(
        feedbackData?.isEvaluated || false
    );

    const { sessionRobot } = useChatBoxState();
    const { addFeedbackMessage, setIsFeedback } = useChatBoxActions();

    const { data: listTags } = useGetListTags();

    // Map dữ liệu listTags thành tagList với useMemo - chỉ hiển thị tags theo rating được chọn
    const tagList = useMemo(() => {
        if (!listTags?.data || !rating) return [];

        // Map rating sang key tương ứng
        const ratingMap = {
            good: "3",
            normal: "2",
            bad: "1",
        };

        const ratingKey = ratingMap[rating];
        const tags = listTags.data[ratingKey] || [];

        return tags.map((tag, index) => ({
            id: `${ratingKey}-${index}`,
            text: tag,
            rating: ratingKey,
        }));
    }, [listTags, rating]);

    const { mutateAsync: evaluateSupportMutation } =
        useEvaluateSupportMutation();

    const handleEvaluateSupport = async () => {
        if (!rating) {
            toast.error("Vui lòng chọn đánh giá");
            return;
        }

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

        const response = await evaluateSupportMutation(requestData);

        // Đánh dấu đã đánh giá thành công
        if (response.result) {
            setIsEvaluated(true);
            // Lưu feedback vào store
            addFeedbackMessage({
                rating,
                tags: Array.from(reasons),
                isEvaluated: true,
            });
            setIsFeedback(false);
            toast.success("Đánh giá thành công");
        } else {
            toast.error("Đánh giá thất bại");
        }
    };

    const toggleReason = (tagText: string) => {
        if (isEvaluated) return; // Không cho phép thay đổi khi đã đánh giá

        setReasons((prev) => {
            const next = new Set(prev);
            if (next.has(tagText)) {
                next.delete(tagText);
            } else {
                next.add(tagText);
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
                    onClick={() => {
                        if (!isEvaluated) {
                            setRating("good");
                            setReasons(new Set()); // Clear reasons khi thay đổi rating
                            onScrollToBottom?.();
                        }
                    }}
                    label="Tốt"
                    normalImage={_Image.icon.emoji.emoji_1}
                    activeImage={_Image.icon.emoji.emoji_1_at}
                    disabled={isEvaluated}
                />

                <EmojiButton
                    rating="normal"
                    isActive={isActive("normal")}
                    onClick={() => {
                        if (!isEvaluated) {
                            setRating("normal");
                            setReasons(new Set()); // Clear reasons khi thay đổi rating
                            onScrollToBottom?.();
                        }
                    }}
                    label="Bình Thường"
                    normalImage={_Image.icon.emoji.emoji_2}
                    activeImage={_Image.icon.emoji.emoji_2_at}
                    disabled={isEvaluated}
                />

                <EmojiButton
                    rating="bad"
                    isActive={isActive("bad")}
                    onClick={() => {
                        if (!isEvaluated) {
                            setRating("bad");
                            setReasons(new Set()); // Clear reasons khi thay đổi rating
                            onScrollToBottom?.();
                        }
                    }}
                    label="Kém"
                    normalImage={_Image.icon.emoji.emoji_3}
                    activeImage={_Image.icon.emoji.emoji_3_at}
                    disabled={isEvaluated}
                />
            </div>

            {/* Action buttons */}
            <div className="mt-4">
                {/* Tags chỉ hiển thị khi đã chọn rating */}
                {rating && (
                    <div
                        className={cn(
                            "flex items-center gap-3 pb-2 w-[300px] lg:w-[400px]",
                            scrollbarStyles.customScrollbar
                        )}
                    >
                        <div className="flex items-center justify-center flex-wrap gap-3 w-full">
                            {tagList.map((tag) => (
                                <BouncyButton
                                    key={tag.id}
                                    variant={
                                        reasons.has(tag.text)
                                            ? "solid"
                                            : "outlineGradient"
                                    }
                                    size="sm"
                                    onClick={() => toggleReason(tag.text)}
                                    disabled={isEvaluated}
                                >
                                    {tag.text}
                                </BouncyButton>
                            ))}
                        </div>
                    </div>
                )}

                <button
                    onClick={handleEvaluateSupport}
                    disabled={isEvaluated}
                    className={cn(
                        "w-full rounded-[100px] p-2 mt-3 transition-all duration-200",
                        isEvaluated
                            ? "bg-[#00A76F] text-white cursor-not-allowed opacity-75"
                            : "bg-[#00A76F] hover:bg-[#00A76F]/90 cursor-pointer text-white"
                    )}
                >
                    <span className="text-white">
                        {isEvaluated
                            ? "Bạn đã đánh giá thành công"
                            : "Gửi đánh giá"}
                    </span>
                </button>
            </div>
        </div>
    );
};

interface EmojiButtonProps {
    rating: Rating;
    isActive: boolean;
    onClick: () => void;
    label: string;
    normalImage: string;
    activeImage: string;
    disabled?: boolean;
}

const EmojiButton = ({
    rating,
    isActive,
    onClick,
    label,
    normalImage,
    activeImage,
    disabled = false,
}: EmojiButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "group outline-none cursor-pointer",
                disabled && "cursor-not-allowed opacity-50"
            )}
            aria-pressed={isActive}
        >
            <div className="flex flex-col items-center gap-2 mt-3">
                <div className="relative flex items-center w-[100px] h-[100px] overflow-hidden lg:w-[120px] lg:h-[120px] -my-4 ">
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

export default Feedback;
