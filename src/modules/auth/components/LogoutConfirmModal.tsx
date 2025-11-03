"use client";

import React from "react";
import { Modal } from "@/core/components/common/Modal";
import { cn } from "@/core/utils/cn";

interface LogoutConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    className?: string;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    className,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={cn("max-w-md w-full", className)}
        >
            <div className="py-6 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-8 flex flex-col gap-6">
                <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#11315B] mb-2">
                        Xác nhận đăng xuất
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?
                    </p>
                </div>

                <div className="flex items-center justify-center gap-3 sm:gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        Hủy
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-[#00A76F] text-white hover:bg-[#00A76F]/80 transition-colors"
                    >
                        Đồng ý
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default LogoutConfirmModal;
