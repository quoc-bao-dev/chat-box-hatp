"use client";

import { BouncyButton } from "@/core/components/ui";
import { _Image } from "@/core/config/image";
import Image from "next/image";
import { useState } from "react";

type Rating = "good" | "normal" | "bad";
type ReasonKey = "enthusiastic" | "fast" | "support";

const Feedback = () => {
    const [rating, setRating] = useState<Rating | null>(null);
    const [reasons, setReasons] = useState<Set<ReasonKey>>(new Set());

    const toggleReason = (key: ReasonKey) => {
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
            <div className="flex items-center justify-center mt-6">
                {/* Good */}
                <button
                    onClick={() => setRating("good")}
                    className="group outline-none"
                    aria-pressed={isActive("good")}
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative w-[84px] h-[84px] overflow-hidden lg:w-[120px] lg:h-[120px]">
                            <div>
                                <Image
                                    src={
                                        isActive("good")
                                            ? _Image.icon.emoji.emoji_1_at
                                            : _Image.icon.emoji.emoji_1
                                    }
                                    alt="good"
                                    fill
                                    className={`relative w-full h-full ${
                                        isActive("good") ? "p-0" : "p-6 lg:p-8"
                                    }`}
                                />
                            </div>
                        </div>
                        <p
                            className={`font-semibold ${
                                isActive("good")
                                    ? "text-[#00A76F]"
                                    : "text-[#1D2939]"
                            }`}
                        >
                            Tốt
                        </p>
                    </div>
                </button>

                {/* Normal */}
                <button
                    onClick={() => setRating("normal")}
                    className="group outline-none"
                    aria-pressed={isActive("normal")}
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative w-[84px] h-[84px] overflow-hidden lg:w-[120px] lg:h-[120px]">
                            <div>
                                <Image
                                    src={
                                        isActive("normal")
                                            ? _Image.icon.emoji.emoji_2_at
                                            : _Image.icon.emoji.emoji_2
                                    }
                                    alt="normal"
                                    fill
                                    className={`object-contain relative w-full h-full ${
                                        isActive("normal")
                                            ? "p-0"
                                            : "p-6 lg:p-8"
                                    }`}
                                />
                            </div>
                        </div>
                        <p
                            className={`font-semibold ${
                                isActive("normal")
                                    ? "text-[#00A76F]"
                                    : "text-[#1D2939]"
                            }`}
                        >
                            Bình Thường
                        </p>
                    </div>
                </button>

                {/* Bad */}
                <button
                    onClick={() => setRating("bad")}
                    className="group outline-none"
                    aria-pressed={isActive("bad")}
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative w-[84px] h-[84px] overflow-hidden lg:w-[120px] lg:h-[120px]">
                            <div>
                                <Image
                                    src={
                                        isActive("bad")
                                            ? _Image.icon.emoji.emoji_3_at
                                            : _Image.icon.emoji.emoji_3
                                    }
                                    alt="bad"
                                    fill
                                    className={`object-contain relative w-full h-full ${
                                        isActive("bad") ? "p-0" : "p-6 lg:p-8"
                                    }`}
                                />
                            </div>
                        </div>
                        <p
                            className={`font-semibold ${
                                isActive("bad")
                                    ? "text-[#00A76F]"
                                    : "text-[#1D2939]"
                            }`}
                        >
                            Kém
                        </p>
                    </div>
                </button>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
                <BouncyButton
                    variant={
                        reasons.has("enthusiastic")
                            ? "solid"
                            : "outlineGradient"
                    }
                    size="sm"
                    onClick={() => toggleReason("enthusiastic")}
                >
                    Tư vấn nhiệt tình
                </BouncyButton>

                <BouncyButton
                    variant={reasons.has("fast") ? "solid" : "outlineGradient"}
                    size="sm"
                    onClick={() => toggleReason("fast")}
                >
                    Hỗ trợ nhanh chóng
                </BouncyButton>

                <BouncyButton
                    variant={
                        reasons.has("support") ? "solid" : "outlineGradient"
                    }
                    size="sm"
                    onClick={() => toggleReason("support")}
                >
                    Hỗ trợ nhanh chóng
                </BouncyButton>
            </div>
        </div>
    );
};

export default Feedback;
