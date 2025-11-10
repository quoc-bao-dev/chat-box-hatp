"use client";

import { decodeHtmlEntities } from "@/core/utils/decode";
import { OptionLandscapeAndVertical } from "@/services/robot/type";
import { useState } from "react";
import { ActionButtons } from "./ActionButtons";
import styles from "@/core/styles/scrollbar.module.css";
import { _Image } from "@/core/config";
import Image from "next/image";
import HtmlRenderer from "@/modules/chat/components/HtmlRenderer";

type LandscapeAndVerticalSelectListProps = {
    title: string;
    options: OptionLandscapeAndVertical[];
    onConfirm?: (ids: string[]) => void;
    onAdd?: (landscape: string, vertical: string, name?: string) => void;
    disable?: boolean;
};

const LandscapeAndVerticalSelectList = ({
    title,
    options,
    onConfirm,
    onAdd,
    disable = false,
}: LandscapeAndVerticalSelectListProps) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [landscapeInput, setLandscapeInput] = useState("");
    const [verticalInput, setVerticalInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    const toggleId = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleConfirm = () => {
        onConfirm?.(selectedIds);
    };

    const handleToggleAddForm = () => {
        if (!disable) {
            setShowAddForm((prev) => !prev);
            if (showAddForm) {
                // Reset form khi đóng
                setLandscapeInput("");
                setVerticalInput("");
                setNameInput("");
            }
        }
    };

    const handleAdd = async () => {
        // Validate: chiều ngang và chiều dọc không được để trống và chỉ nhận số
        if (!landscapeInput.trim() || !verticalInput.trim()) {
            return;
        }

        // Check if inputs are valid numbers
        const landscapeNum = Number(landscapeInput);
        const verticalNum = Number(verticalInput);

        if (isNaN(landscapeNum) || isNaN(verticalNum)) {
            return;
        }

        try {
            setIsAdding(true);
            await onAdd?.(
                landscapeInput.trim(),
                verticalInput.trim(),
                nameInput.trim() || undefined
            );
            // Reset form sau khi thêm thành công
            setLandscapeInput("");
            setVerticalInput("");
            setNameInput("");
            setShowAddForm(false);
        } catch (error) {
            console.error("Error adding size:", error);
        } finally {
            setIsAdding(false);
        }
    };

    const isAddFormValid =
        landscapeInput.trim() !== "" &&
        verticalInput.trim() !== "" &&
        !isNaN(Number(landscapeInput)) &&
        !isNaN(Number(verticalInput));

    return (
        <div className="px-3.5 py-4 rounded-[20px] bg-white max-w-[460px] min-w-[300px]">
            {/* title */}
            <p className="text-[18px] mb-2 font-semibold text-[#454F5B]">
                <HtmlRenderer htmlContent={title} />
            </p>

            {/* options */}
            <div
                className={`pt-3 flex flex-col max-h-[50vh] overflow-y-auto -ml-2 -mr-2  pl-2 pr-2 -mb-4 pb-4 ${styles.customScrollbar}`}
            >
                {options.length === 0 && (
                    <div className="px-4 py-2 flex flex-col items-center justify-center text-center">
                        <Image
                            src={_Image.icon.icon_not_found}
                            alt="not-found"
                            width={140}
                            height={140}
                        />
                    </div>
                )}
                {options?.map((opt) => {
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
                                {opt.name}
                            </span>
                        </label>
                    );
                })}
            </div>

            {/* Add size form */}
            {showAddForm && (
                <div className="mt-4 mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200 transition-all duration-300">
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            {/* Chiều ngang */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-[#454F5B] mb-1.5">
                                    Chiều ngang
                                </label>
                                <input
                                    type="text"
                                    value={landscapeInput}
                                    onChange={(e) =>
                                        setLandscapeInput(e.target.value)
                                    }
                                    placeholder="Nhập chiều ngang"
                                    disabled={disable || isAdding}
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2FB06B] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-[14px]"
                                />
                            </div>
                            {/* Chiều dọc */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-[#454F5B] mb-1.5">
                                    Chiều dọc
                                </label>
                                <input
                                    type="text"
                                    value={verticalInput}
                                    onChange={(e) =>
                                        setVerticalInput(e.target.value)
                                    }
                                    placeholder="Nhập chiều dọc"
                                    disabled={disable || isAdding}
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2FB06B] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-[14px]"
                                />
                            </div>
                            {/* Tên option (optional) */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-[#454F5B] mb-1.5">
                                    Tên option{" "}
                                </label>
                                <input
                                    type="text"
                                    value={nameInput}
                                    onChange={(e) =>
                                        setNameInput(e.target.value)
                                    }
                                    placeholder="Nhập tên option"
                                    disabled={disable || isAdding}
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2FB06B] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-[14px]"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <button
                                type="button"
                                onClick={handleAdd}
                                disabled={
                                    !isAddFormValid || disable || isAdding
                                }
                                className=" h-10 rounded-xl bg-[#2FB06B] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-[#28A05A] hover:shadow-md active:scale-95"
                            >
                                {isAdding ? "Đang thêm..." : "Thêm kích thước"}
                            </button>
                            <button
                                type="button"
                                onClick={handleToggleAddForm}
                                disabled={isAdding}
                                className="px-4 h-10 rounded-xl bg-white text-gray-700 font-medium border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-gray-50 hover:border-gray-300"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add size button */}
            {!showAddForm && (
                <div className="mt-4 mb-4">
                    <button
                        type="button"
                        onClick={handleToggleAddForm}
                        disabled={disable}
                        className="w-full h-10 rounded-xl bg-white text-[#2FB06B] font-semibold border-2 border-[#2FB06B] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-[#2FB06B] hover:text-white hover:shadow-md active:scale-95"
                    >
                        + Thêm kích thước
                    </button>
                </div>
            )}

            {/* confirm button */}
            <ActionButtons
                shouldShowConfirmButton
                confirmText="Xác nhận"
                onConfirmClick={handleConfirm}
                disable={disable || selectedIds.length === 0}
            />
        </div>
    );
};

export default LandscapeAndVerticalSelectList;
