"use client";

import { decodeHtmlEntities } from "@/core/utils/decode";
import { useState } from "react";
import { ActionButtons } from "./ActionButtons";

export type AddressItem = {
    id: string;
    name: string;
    phone: string;
    address: string;
};

type AddressSelectListProps = {
    title: string;
    addresses: AddressItem[];
    onConfirm?: (id: string) => void;
    onClickAddAddress?: () => void;
    disable?: boolean;
};

const AddressSelectList = ({
    title,
    addresses,
    onConfirm,
    onClickAddAddress,
    disable = false,
}: AddressSelectListProps) => {
    const [selectedId, setSelectedId] = useState<string>("");

    const handleSelect = (id: string) => {
        if (!disable) {
            setSelectedId(id);
        }
    };

    const handleConfirm = () => {
        if (selectedId) {
            onConfirm?.(selectedId);
        }
    };

    return (
        <div className="px-3.5 py-4 rounded-[20px] bg-white max-w-[460px] min-w-[300px]">
            {/* title */}
            <p className="text-[18px] mb-2 font-semibold text-[#454F5B]">
                {decodeHtmlEntities(title)}
            </p>

            {/* address list */}
            <div className="pt-3 flex flex-col">
                {addresses?.map((addr) => {
                    const checked = selectedId === addr.id;
                    return (
                        <label
                            key={addr.id}
                            className={`px-4 py-3.5 flex items-center gap-3 border-t border-gray-50 group ${
                                disable
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer hover:bg-gray-50"
                            }`}
                        >
                            {/* native radio (hidden) */}
                            <input
                                type="radio"
                                name="address"
                                className="peer sr-only"
                                checked={checked}
                                onChange={() => handleSelect(addr.id)}
                                disabled={disable}
                            />
                            {/* custom radio button */}
                            <span
                                className={`inline-flex size-5 items-center justify-center rounded-full border mt-0.5 flex-shrink-0 transition-colors duration-150 ${
                                    checked
                                        ? "bg-[#2FB06B] border-[#2FB06B]"
                                        : `bg-white border-gray-300 ${
                                              disable
                                                  ? ""
                                                  : "group-hover:border-gray-400"
                                          }`
                                } ${disable ? "opacity-60" : ""}`}
                            >
                                {/* inner dot */}
                                <span
                                    className={`size-2.5 rounded-full bg-white transition-opacity duration-150 ${
                                        checked ? "opacity-100" : "opacity-0"
                                    }`}
                                />
                            </span>
                            {/* address info */}
                            <div className="flex flex-col gap-1 flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[#0F172A] font-semibold text-[14px]">
                                        {addr.name}
                                    </span>
                                    <span className="text-[#0F172A]">|</span>
                                    <span className="text-[#0F172A] font-medium text-[14px]">
                                        {addr.phone}
                                    </span>
                                </div>
                                <span className="text-gray-600 font-normal text-[14px]">
                                    {addr.address}
                                </span>
                            </div>
                        </label>
                    );
                })}
            </div>

            {/* add new address button */}
            {onClickAddAddress && (
                <button
                    type="button"
                    onClick={onClickAddAddress}
                    disabled={disable}
                    className={`mt-3 -mb-3 text-center w-full py-1.5 font-medium text-[14px] transition-colors duration-150 hover:bg-red-50 rounded-[12px] ${
                        disable
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-[#FC5050] cursor-pointer hover:text-[#E03E3E]"
                    }`}
                >
                    <span className="text-[20px]">+</span> Thêm địa chỉ mới
                </button>
            )}

            {/* confirm button */}
            <ActionButtons
                shouldShowConfirmButton
                confirmText="Xác nhận"
                onConfirmClick={handleConfirm}
                disable={disable || !selectedId}
            />
        </div>
    );
};

export default AddressSelectList;
