"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Modal } from "@/core/components/common/Modal";
import { cn } from "@/core/utils/cn";
import { useCheckOtpRegisterMutation } from "@/services/auth/mutations";
import { useAuth } from "@/core/hook/useAuth";

interface OTPModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify?: (otp: string) => void;
    onBack?: () => void; // Thêm callback để quay về bước trước
    onFirstTimeLogin?: (phone: string, key_pass_code: string) => void; // Callback để mở FirstTimeLoginModal với phone và key_pass_code
    phoneNumber: string;
    className?: string;
}

export interface OTPCredentials {
    otp: string;
}

// Validation schema cho OTP
const otpSchema = yup.object({
    otp: yup
        .string()
        .required("Mã OTP không được để trống")
        .matches(/^[0-9]{6}$/, "Mã OTP phải có 6 chữ số"),
});

type OTPFormData = yup.InferType<typeof otpSchema>;

export const OTPModal: React.FC<OTPModalProps> = ({
    isOpen,
    onClose,
    onVerify,
    onBack,
    onFirstTimeLogin,
    phoneNumber,
    className,
}) => {
    const [otpValues, setOtpValues] = useState<string[]>([
        "",
        "",
        "",
        "",
        "",
        "",
    ]);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const {
        handleSubmit,
        formState: { isSubmitting },
        setValue,
        reset,
    } = useForm<OTPFormData>({
        resolver: yupResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
    });

    const checkOtpMutation = useCheckOtpRegisterMutation();
    const { login } = useAuth();

    // Format phone number để hiển thị
    const formatPhoneNumber = (phone: string) => {
        if (phone.length === 10) {
            return `${phone.slice(0, 4)}-${phone.slice(4, 7)}-${phone.slice(
                7
            )}`;
        }
        return phone;
    };

    // Handle input change
    const handleInputChange = (index: number, value: string) => {
        // Chỉ cho phép nhập số
        if (!/^[0-9]*$/.test(value)) return;

        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);

        // Update form value
        const otpString = newOtpValues.join("");
        setValue("otp", otpString);

        // Auto focus next input
        if (value && index < 5) {
            setActiveIndex(index + 1);
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle backspace
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace") {
            if (otpValues[index]) {
                // Nếu input hiện tại có giá trị, xóa giá trị đó
                const newOtpValues = [...otpValues];
                newOtpValues[index] = "";
                setOtpValues(newOtpValues);
                setValue("otp", newOtpValues.join(""));
            } else if (index > 0) {
                // Nếu input hiện tại trống, chuyển về input trước và xóa giá trị
                const newOtpValues = [...otpValues];
                newOtpValues[index - 1] = "";
                setOtpValues(newOtpValues);
                setValue("otp", newOtpValues.join(""));
                setActiveIndex(index - 1);
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    // Handle paste
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");

        if (pastedData.length === 6) {
            const newOtpValues = pastedData.split("");
            setOtpValues(newOtpValues);
            setValue("otp", pastedData);
            setActiveIndex(5);
            inputRefs.current[5]?.focus();
        }
    };

    // Submit form
    const onSubmit = useCallback(
        async (data: OTPFormData) => {
            try {
                const response = await checkOtpMutation.mutateAsync({
                    phoneNumber: phoneNumber,
                    key_code: data.otp,
                });
                if (response.result) {
                    // Kiểm tra nếu check_user = false thì mở FirstTimeLoginModal với phone và key_pass_code
                    if (response.check_user === false && onFirstTimeLogin) {
                        onClose();
                        reset();
                        setOtpValues(["", "", "", "", "", ""]);
                        setActiveIndex(0);
                        onFirstTimeLogin(phoneNumber, response.key_pass_code);
                    } else {
                        // Nếu check_user = true, lưu thông tin người dùng và gọi callback onVerify
                        if (response.infoClient) {
                            login(response.infoClient);
                        }

                        if (onVerify) {
                            await onVerify(data.otp);
                        }
                        onClose();
                        reset();
                        setOtpValues(["", "", "", "", "", ""]);
                        setActiveIndex(0);
                    }
                }
            } catch (error) {
                console.error("OTP verification error:", error);
            }
        },
        [
            onVerify,
            onFirstTimeLogin,
            onClose,
            reset,
            phoneNumber,
            checkOtpMutation,
        ]
    );

    // Handle close
    const handleClose = () => {
        reset();
        setOtpValues(["", "", "", "", "", ""]);
        setActiveIndex(0);
        onClose();
    };

    // Reset khi modal đóng và focus input đầu khi mở
    useEffect(() => {
        if (!isOpen) {
            setOtpValues(["", "", "", "", "", ""]);
            setActiveIndex(0);
            reset();
        } else {
            // Auto focus vào input đầu tiên khi modal mở
            setTimeout(() => {
                inputRefs.current[0]?.focus();
                setActiveIndex(0);
            }, 100); // Delay nhỏ để đảm bảo modal đã render xong
        }
    }, [isOpen, reset]);

    return (
        <Modal
            isOpen={isOpen}
            showCloseButton={false}
            onClose={handleClose}
            className={cn("max-w-[600px] w-full", className)}
        >
            <div className="py-6 px-4 sm:py-8 sm:px-6 lg:py-12 lg:px-8 xl:py-[84px] xl:px-[78px] flex flex-col gap-6 sm:gap-8 lg:gap-10">
                {/* Header với nút back */}
                {onBack && (
                    <button
                        onClick={onBack}
                        className="absolute left-3 top-3 sm:left-6 sm:top-8 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Quay lại"
                    >
                        <svg
                            width="42"
                            height="42"
                            viewBox="0 0 42 42"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M29.8043 4.32017C29.6824 4.19794 29.5376 4.10096 29.3781 4.0348C29.2187 3.96863 29.0477 3.93457 28.8751 3.93457C28.7025 3.93457 28.5315 3.96863 28.3721 4.0348C28.2126 4.10096 28.0678 4.19794 27.9458 4.32017L12.1958 20.0702C12.0736 20.1921 11.9766 20.3369 11.9105 20.4964C11.8443 20.6558 11.8102 20.8268 11.8102 20.9994C11.8102 21.1721 11.8443 21.343 11.9105 21.5025C11.9766 21.6619 12.0736 21.8067 12.1958 21.9287L27.9458 37.6787C28.1923 37.9251 28.5266 38.0636 28.8751 38.0636C29.2236 38.0636 29.5579 37.9251 29.8043 37.6787C30.0508 37.4322 30.1893 37.098 30.1893 36.7494C30.1893 36.4009 30.0508 36.0666 29.8043 35.8202L14.981 20.9994L29.8043 6.17867C29.9266 6.05675 30.0235 5.91191 30.0897 5.75246C30.1559 5.593 30.1899 5.42206 30.1899 5.24942C30.1899 5.07678 30.1559 4.90583 30.0897 4.74638C30.0235 4.58692 29.9266 4.44209 29.8043 4.32017Z"
                                fill="#434343"
                            />
                        </svg>
                    </button>
                )}
                <div className="text-center flex-1">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#11315B] mb-2">
                        Nhập Mã OTP
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                        Nhập mã xác thực OTP được gửi đến{" "}
                        {formatPhoneNumber(phoneNumber)}
                    </p>
                </div>

                {/* OTP Input Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 sm:gap-6 lg:gap-8"
                >
                    {/* OTP Input Fields */}
                    <div className="flex justify-center gap-2 sm:gap-3">
                        {otpValues.map((value, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={value}
                                onChange={(e) =>
                                    handleInputChange(index, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                onFocus={() => setActiveIndex(index)}
                                className={cn(
                                    "w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-semibold border rounded-lg transition-all duration-200",
                                    "focus:outline-none focus:ring-2 focus:ring-[#00A76F]/80 focus:border-transparent",
                                    "bg-white text-[#11315B]",
                                    activeIndex === index
                                        ? "border-[#00A76F] ring-2 ring-[#00A76F]/20"
                                        : "border-gray-300",
                                    value
                                        ? "border-[#00A76F] bg-[#00A76F]/5"
                                        : ""
                                )}
                                disabled={isSubmitting}
                            />
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || otpValues.some((v) => !v)}
                        className={cn(
                            "w-full py-2.5 sm:py-3 px-4 text-base sm:text-lg lg:text-xl rounded-lg font-semibold transition-all duration-300",
                            "bg-[#00A76F] hover:bg-[#00A76F]/80 text-white",
                            "shadow-[0_8px_24px_rgba(0,167,111,0.20)]",
                            "hover:shadow-[0_12px_32px_rgba(0,167,111,0.30)]",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            "focus:outline-none focus:ring-2 focus:ring-[#00A76F]/80 focus:ring-offset-2"
                        )}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span className="text-sm sm:text-base">
                                    Đang xác thực...
                                </span>
                            </div>
                        ) : (
                            "Đăng nhập"
                        )}
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default OTPModal;
