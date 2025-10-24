import React, { useState } from "react";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin?: (phoneNumber: string) => void;
    isLoading?: boolean;
    className?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({
    isOpen,
    onClose,
    onLogin,
    isLoading = false,
    className = "",
}) => {
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (phoneNumber.trim() && onLogin) {
            onLogin(phoneNumber.trim());
        }
    };

    const handleClose = () => {
        setPhoneNumber("");
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
                    <h2 className="text-xl font-bold text-blue-900 text-center">
                        Đăng Nhập
                    </h2>
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl font-bold"
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 pb-6">
                    <div className="mb-4">
                        <label className="block text-gray-900 font-bold text-sm mb-2">
                            Số điện thoại
                        </label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Nhập số điện thoại"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !phoneNumber.trim()}
                        className="w-full bg-[#2FB06B] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#2FB06B]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
