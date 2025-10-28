"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Modal } from "@/core/components/common/Modal";
import { cn } from "@/core/utils/cn";
import { useSignUpMutation } from "@/services/auth/mutations";
import { useAuth } from "@/core/hook/useAuth";

interface FirstTimeLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (data: FirstTimeLoginData) => void;
    phoneNumber?: string;
    key_pass_code?: string;
    className?: string;
}

export interface FirstTimeLoginData {
    fullName: string;
    companyName: string;
}

// Validation schema
const firstTimeLoginSchema = yup.object({
    fullName: yup
        .string()
        .required("Họ và tên không được để trống")
        .min(2, "Họ và tên phải có ít nhất 2 ký tự")
        .max(100, "Họ và tên không được quá 100 ký tự"),
    companyName: yup
        .string()
        .required("Tên công ty không được để trống")
        .min(2, "Tên công ty phải có ít nhất 2 ký tự")
        .max(100, "Tên công ty không được quá 100 ký tự"),
});

type FirstTimeLoginFormData = yup.InferType<typeof firstTimeLoginSchema>;

export const FirstTimeLoginModal: React.FC<FirstTimeLoginModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    phoneNumber,
    key_pass_code,
    className,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FirstTimeLoginFormData>({
        resolver: yupResolver(firstTimeLoginSchema),
        defaultValues: {
            fullName: "",
            companyName: "",
        },
    });
    const signUpMutation = useSignUpMutation();
    const { login } = useAuth();

    const onSubmitForm = async (data: FirstTimeLoginFormData) => {
        try {
            if (!phoneNumber || !key_pass_code) {
                console.error("Missing phoneNumber or key_pass_code");
                return;
            }

            const response = await signUpMutation.mutateAsync({ 
                phone: phoneNumber, 
                key_pass_code: key_pass_code, 
                name_company: data.companyName, 
                name_clients: data.fullName 
            });   
            
            // Chỉ đóng modal khi result = true
            if (response.result) {
                // Lưu thông tin người dùng vào localStorage
                if (response.infoClient) {
                    login(response.infoClient);
                }
                
                if (onSubmit) {
                    await onSubmit(data as FirstTimeLoginData);
                }
                onClose();
                reset();
            }
        } catch (error) {
            console.error("First time login error:", error);
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
            <div className="py-6 px-4 sm:py-8 sm:px-6 lg:py-12 lg:px-8 xl:py-[84px] xl:px-[78px] flex flex-col gap-6 sm:gap-8 lg:gap-10">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-primary mb-2">
                        Lần Đầu Đăng Nhập?
                    </h2>
                    <p className="text-neutral-05 text-xs sm:text-sm lg:text-base">
                        Bạn vui lòng điền tên đăng nhập để tiếp tục.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-4 sm:gap-6 lg:gap-7">
                    {/* Full Name Field */}
                    <div>
                        <label
                            htmlFor="fullName"
                            className="block text-sm sm:text-base font-semibold text-black mb-1.5"
                        >
                            Họ và tên
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            {...register("fullName")}
                            className={cn(
                                "w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg transition-colors placeholder:text-[#9295A4] text-gray-600",
                                "focus:outline-none focus:ring-2 focus:ring-[#00A76F]/80 focus:border-transparent",
                                errors.fullName
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300"
                            )}
                            placeholder="Nhập họ và tên"
                            disabled={isSubmitting}
                        />
                        {errors.fullName && (
                            <p className="mt-1 text-xs sm:text-sm text-red-600">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    {/* Company Name Field */}
                    <div>
                        <label
                            htmlFor="companyName"
                            className="block text-sm sm:text-base font-semibold text-black mb-1.5"
                        >
                            Tên công ty
                        </label>
                        <input
                            id="companyName"
                            type="text"
                            {...register("companyName")}
                            className={cn(
                                "w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg transition-colors placeholder:text-[#9295A4] text-gray-600",
                                "focus:outline-none focus:ring-2 focus:ring-[#00A76F]/80 focus:border-transparent",
                                errors.companyName
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300"
                            )}
                            placeholder="Nhập tên công ty"
                            disabled={isSubmitting}
                        />
                        {errors.companyName && (
                            <p className="mt-1 text-xs sm:text-sm text-red-600">
                                {errors.companyName.message}
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
                                <span className="text-sm sm:text-base">Đang xử lý...</span>
                            </div>
                        ) : (
                            "Tiếp tục"
                        )}
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default FirstTimeLoginModal;
