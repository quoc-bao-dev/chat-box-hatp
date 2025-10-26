import React from "react";

interface OrderSuccessModalProps {
    isOpen: boolean;
    onClose?: () => void;
    onViewDetailsClick?: () => void;
    onPlaceAnotherOrderClick?: () => void;
    className?: string;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
    isOpen,
    onClose,
    onViewDetailsClick,
    onPlaceAnotherOrderClick,
    className = "",
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
                className={`bg-white rounded-2xl p-6 w-full max-w-md flex flex-col items-center text-center shadow-lg ${className}`}
            >
                {/* Header */}
                <h2 className="text-xl font-bold text-[#333333] mb-2">
                    Lên đơn thành công!
                </h2>
                <p className="text-sm text-[#5E5E5E] mb-6">
                    Xin chúc mừng, đơn của bạn đã được khởi tạo thành công!
                </p>

                {/* Illustration */}
                <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 flex items-center justify-center bg-[#F0F9F4] rounded-full">
                        {/* Main receipt icon */}
                        <div className="w-16 h-16 bg-[#FF9900] rounded-lg flex flex-col justify-center items-center p-2">
                            <div className="w-10 h-1.5 bg-white rounded-full mb-1"></div>
                            <div className="w-10 h-1.5 bg-white rounded-full mb-1"></div>
                            <div className="w-10 h-1.5 bg-white rounded-full"></div>
                        </div>
                        {/* Checkmark badge */}
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#2FB06B] rounded-full flex items-center justify-center border-2 border-white">
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    {/* Confetti dots */}
                    <div className="absolute -top-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-100"></div>
                    <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
                    <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse delay-300"></div>
                </div>

                {/* Action Buttons */}
                <button
                    type="button"
                    className="w-full h-12 rounded-xl bg-white text-[#2FB06B] font-semibold border border-[#E0E0E0] flex items-center justify-center mb-3 hover:bg-gray-50 transition-colors"
                    onClick={onViewDetailsClick}
                >
                    Xem chi tiết đơn
                    <svg
                        className="ml-2 w-4 h-4 text-[#2FB06B]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                    </svg>
                </button>

                <button
                    type="button"
                    className="w-full h-12 rounded-xl bg-white text-[#2FB06B] font-semibold border border-[#E0E0E0] flex items-center justify-center hover:bg-gray-50 transition-colors"
                    onClick={onPlaceAnotherOrderClick}
                >
                    Lên đơn khác
                    <svg
                        className="ml-2 w-4 h-4 text-[#2FB06B]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default OrderSuccessModal;
