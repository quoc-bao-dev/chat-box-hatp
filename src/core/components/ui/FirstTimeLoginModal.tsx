import React, { useState } from "react";

interface FirstTimeLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue?: (data: { fullName: string; companyName: string }) => void;
    isLoading?: boolean;
    className?: string;
}

const FirstTimeLoginModal: React.FC<FirstTimeLoginModalProps> = ({
    isOpen,
    onClose,
    onContinue,
    isLoading = false,
    className = "",
}) => {
    const [fullName, setFullName] = useState("");
    const [companyName, setCompanyName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (fullName.trim() && companyName.trim() && onContinue) {
            onContinue({
                fullName: fullName.trim(),
                companyName: companyName.trim(),
            });
        }
    };

    const handleClose = () => {
        setFullName("");
        setCompanyName("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                className={`bg-white rounded-xl shadow-lg max-w-md w-full mx-4 ${className}`}
            >
                {/* Header */}
                <div className="relative px-6 pt-6 pb-4">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl font-bold"
                    >
                        ×
                    </button>
                    <h2 className="text-xl font-bold text-blue-900 text-center">
                        Lần Đầu Đăng Nhập?
                    </h2>
                    <p className="text-gray-600 text-sm text-center mt-2">
                        Bạn vui lòng điền tên đăng nhập để tiếp tục.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 pb-6">
                    <div className="mb-4">
                        <label className="block text-gray-900 font-bold text-sm mb-2">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Nhập họ và tên"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-900 font-bold text-sm mb-2">
                            Tên công ty
                        </label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Nhập tên công ty"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={
                            isLoading || !fullName.trim() || !companyName.trim()
                        }
                        className="w-full bg-[#2FB06B] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#2FB06B]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? "Đang xử lý..." : "Tiếp tục"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FirstTimeLoginModal;
