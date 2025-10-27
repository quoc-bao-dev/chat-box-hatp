"use client";
import { cn } from "@/core/utils/cn";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Modal } from "@/core/components/common/Modal";
import { useSendOtpRegisterMutation } from "@/services/auth/mutations";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin?: (credentials: LoginCredentials) => void;
    className?: string;
}

export interface LoginCredentials {
    phoneNumber: string;
}

// Validation schema
const loginSchema = yup.object({
    phoneNumber: yup
        .string()
        .required("Số điện thoại không được để trống")
        .matches(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số")
        .transform((value) => value?.replace(/\s/g, '') || ''),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export const LoginModal: React.FC<LoginModalProps> = ({
    isOpen,
    onClose,
    onLogin,
    className,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            phoneNumber: "",
        },
    });

    // Sử dụng mutation hook
    const sendOtpMutation = useSendOtpRegisterMutation();
    
    // Sử dụng loading state từ mutation
    const isSubmitting = sendOtpMutation.isPending;

    const onSubmit = async (data: LoginFormData) => {
        try {
            // Gọi API send OTP với số điện thoại
            const response = await sendOtpMutation.mutateAsync(data.phoneNumber);
            
            // Chỉ chuyển sang OTP khi result = true
            if (response.result) {
                // Call the onLogin callback if provided
                if (onLogin) {
                    await onLogin(data as LoginCredentials);
                }
                
                // Close modal on successful login
                onClose();
                // Reset form
                reset();
            }
            // Nếu result = false, toast error đã được hiển thị trong mutation
        } catch (error) {
            console.error("Login error:", error);
            // Handle login error here
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            className={cn("max-w-[600px] w-full", className)}
        >
            <div className="py-6 px-4 sm:py-8 sm:px-6 lg:py-12 lg:px-8 xl:py-10 xl:px-[78px] flex flex-col gap-6 sm:gap-8 lg:gap-10">
                {/* Header */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#11315B] capitalize text-center">
                    Đăng nhập
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
                    {/* Phone Number Field */}
                    <div>
                        <label
                            htmlFor="phoneNumber"
                            className="block text-sm sm:text-base font-semibold text-black mb-1.5"
                        >
                            Số điện thoại
                        </label>
                        <input
                            id="phoneNumber"
                            type="tel"
                            {...register("phoneNumber")}
                            className={cn(
                                "w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg transition-colors placeholder:text-[#9295A4] text-gray-600",
                                "focus:outline-none focus:ring-2 focus:ring-[#00A76F]/80 focus:border-transparent",
                                errors.phoneNumber
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300"
                            )}
                            placeholder="Nhập số điện thoại"
                            disabled={isSubmitting}
                        />
                        {errors.phoneNumber && (
                            <p className="mt-1 text-xs sm:text-sm text-red-600">
                                {errors.phoneNumber.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
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
                                <span className="text-sm sm:text-base">Đang đăng nhập...</span>
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

export default LoginModal;
