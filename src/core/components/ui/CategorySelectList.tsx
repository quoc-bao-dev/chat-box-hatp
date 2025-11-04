"use client";

import { decodeHtmlEntities } from "@/core/utils/decode";
import { CategoryOption } from "@/services/robot/type";
import { useState } from "react";
import { ActionButtons } from "./ActionButtons";

type CategorySelectListProps = {
    title: string;
    optionsCategory: CategoryOption[];
    onConfrim?: (ids: string[]) => void;
    disable?: boolean;
};

const CategorySelectList = ({
    title,
    optionsCategory,
    onConfrim,
    disable = false,
}: CategorySelectListProps) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleId = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleConfirm = () => {
        onConfrim?.(selectedIds);
    };

    return (
        <div className="px-3.5 py-4 rounded-[20px] bg-white max-w-[460px] min-w-[300px]">
            {/* title */}
            <p className="text-[18px] mb-2 font-semibold text-[#454F5B]">
                {decodeHtmlEntities(title)}
            </p>

            {/* options */}
            <div className="pt-3 flex flex-col ">
                {optionsCategory?.map((opt) => {
                    const checked = selectedIds.includes(opt.id);
                    return (
                        <label
                            key={opt.id}
                            className={`px-4 py-4.5 flex items-center gap-3 border-t border-gray-50 group ${
                                disable
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer hover:bg-gray-50"
                            }`}
                        >
                            {/* native checkbox (hidden) */}
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={checked}
                                onChange={() => toggleId(opt.id)}
                                disabled={disable}
                            />
                            {/* custom box */}
                            <span
                                className={`inline-flex size-5 items-center justify-center rounded-md border text-white transition-colors duration-150 ${
                                    checked
                                        ? "bg-[#2FB06B] border-[#2FB06B]"
                                        : `bg-white border-gray-300 ${
                                              disable
                                                  ? ""
                                                  : "group-hover:border-gray-400"
                                          }`
                                } ${disable ? "opacity-60" : ""}`}
                            >
                                {/* check icon */}
                                <svg
                                    className={`h-4 w-4 ${
                                        checked ? "opacity-100" : "opacity-0"
                                    }`}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 10.5l3 3 7-7"
                                        stroke="white"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            <span className="text-[#0F172A] font-medium text-[14px]">
                                {opt.category}
                            </span>
                        </label>
                    );
                })}
            </div>

            {/* confirm button */}
            <ActionButtons
                shouldShowConfirmButton
                confirmText="Xác nhận"
                onConfirmClick={handleConfirm}
                disable={disable}
            />
        </div>
    );
};

export default CategorySelectList;
