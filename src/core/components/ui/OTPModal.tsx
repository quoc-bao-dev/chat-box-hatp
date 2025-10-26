import React, { useState, useRef, useEffect } from "react";

interface OTPModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify?: (otp: string) => void;
    phoneNumber: string;
    isLoading?: boolean;
    className?: string;
}

const OTPModal: React.FC<OTPModalProps> = ({
    isOpen,
    onClose,
    onVerify,
    phoneNumber,
    isLoading = false,
    className = "",
}) => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleInputChange = (index: number, value: string) => {
        if (value.length > 1) return; // Chỉ cho phép 1 ký tự

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Tự động chuyển sang ô tiếp theo
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        // Xử lý phím Backspace
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);
        const newOtp = [...otp];

        for (let i = 0; i < pastedData.length && i < 6; i++) {
            newOtp[i] = pastedData[i];
        }
        setOtp(newOtp);

        // Focus vào ô cuối cùng được paste
        const lastFilledIndex = Math.min(pastedData.length - 1, 5);
        inputRefs.current[lastFilledIndex]?.focus();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const otpString = otp.join("");
        if (otpString.length === 6 && onVerify) {
            onVerify(otpString);
        }
    };

    const handleClose = () => {
        setOtp(new Array(6).fill(""));
        onClose();
    };

    // Focus vào ô đầu tiên khi modal mở
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
        }
    }, [isOpen]);

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
                        className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
                    >
                        ‹
                    </button>
                    <h2 className="text-xl font-bold text-blue-900 text-center">
                        Nhập Mã OTP
                    </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 pb-6">
                    <div className="mb-6">
                        <p className="text-gray-700 text-sm text-center mb-6">
                            Nhập mã xác thực OTP được gửi đến {phoneNumber}
                        </p>

                        {/* OTP Input Fields */}
                        <div className="flex justify-center gap-2 mb-6">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) =>
                                        (inputRefs.current[index] = el)
                                    }
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={digit}
                                    onChange={(e) =>
                                        handleInputChange(index, e.target.value)
                                    }
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-12 h-12 text-center text-lg font-bold text-blue-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    maxLength={1}
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || otp.join("").length !== 6}
                        className="w-full bg-[#2FB06B] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#2FB06B]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? "Đang xác thực..." : "Đăng nhập"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OTPModal;
