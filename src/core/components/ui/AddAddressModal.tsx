"use client";
import { cn } from "@/core/utils/cn";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Modal } from "@/core/components/common/Modal";
import styles from "@/core/styles/scrollbar.module.css";

interface AddAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (data: AddressFormData) => void;
    className?: string;
}

export interface AddressFormData {
    address: string;
    factory_code: string;
    factory_name: string;
    phone: string;
    name: string;
    number: string;
    street_name: string;
    ward_name: string;
    district_name: string;
}

// Validation schema
const addressSchema = yup.object({
    address: yup.string().required("Địa chỉ không được để trống"),
    factory_code: yup.string().required("Mã xưởng không được để trống"),
    factory_name: yup.string().required("Tên xưởng không được để trống"),
    phone: yup
        .string()
        .required("Số điện thoại không được để trống")
        .matches(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số")
        .transform((value) => value?.replace(/\s/g, "") || ""),
    name: yup.string().required("Tên người nhận hàng không được để trống"),
    number: yup.string().required("Số nhà không được để trống"),
    street_name: yup.string().required("Đường không được để trống"),
    ward_name: yup.string().required("Phường không được để trống"),
    district_name: yup.string().required("Quận không được để trống"),
});

type AddressFormFields = yup.InferType<typeof addressSchema>;

export const AddAddressModal: React.FC<AddAddressModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    className,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<AddressFormFields>({
        resolver: yupResolver(addressSchema),
        defaultValues: {
            address: "",
            factory_code: "",
            factory_name: "",
            phone: "",
            name: "",
            number: "",
            street_name: "",
            ward_name: "",
            district_name: "",
        },
    });

    const onSubmitForm = async (data: AddressFormFields) => {
        try {
            if (onSubmit) {
                await onSubmit(data as AddressFormData);
            }
            onClose();
            reset();
        } catch (error) {
            console.error("Add address error:", error);
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
            className={cn(
                "max-w-[600px] w-full max-h-[90vh] overflow-hidden",
                className
            )}
        >
            <div className="flex flex-col max-h-[90vh]">
                {/* Header - fixed */}
                <div className="py-6 px-4 sm:py-8 sm:px-6 lg:pb-6 pt-10 flex-shrink-0">
                    <h2 className="text-xl  lg:text-2xl font-medium text-[#11315B] capitalize text-center">
                        Thêm địa chỉ mới
                    </h2>
                </div>

                {/* Form - scrollable */}
                <div
                    className={cn(
                        "flex-1 overflow-y-auto min-h-0 px-4 sm:px-6",
                        styles.customScrollbar
                    )}
                >
                    <form
                        id="address-form"
                        onSubmit={handleSubmit(onSubmitForm)}
                        className="flex flex-col gap-4 sm:gap-6 lg:gap-4 pb-4"
                    >
                        {/* Address Field */}
                        <div>
                            <label
                                htmlFor="address"
                                className="block text-sm  font-semibold text-gray-700 mb-1.5"
                            >
                                Địa chỉ
                            </label>
                            <input
                                id="address"
                                type="text"
                                {...register("address")}
                                className={cn(
                                    "w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg transition-colors placeholder:text-[#9295A4] text-gray-600",
                                    "focus:outline-none focus:ring-2 focus:ring-[#00A76F]/80 focus:border-transparent",
                                    errors.address
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300"
                                )}
                                placeholder="Nhập địa chỉ"
                                disabled={isSubmitting}
                            />
                            {errors.address && (
                                <p className="mt-1 text-xs sm:text-sm text-red-600">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>

                        {/* Factory Code and Factory Name Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="factory_code"
                                    className="block text-sm  font-semibold text-gray-700 mb-1.5"
                                >
                                    Mã xưởng
                                </label>
                                <input
                                    id="factory_code"
                                    type="text"
                                    {...register("factory_code")}
                                    className={cn(
                                        "w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg transition-colors placeholder:text-[#9295A4] text-gray-600",
                                        "focus:outline-none focus:ring-2 focus:ring-[#00A76F]/80 focus:border-transparent",
                                        errors.factory_code
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300"
                                    )}
                                    placeholder="Nhập mã xưởng"
                                    disabled={isSubmitting}
                                />
                                {errors.factory_code && (
                                    <p className="mt-1 text-xs sm:text-sm text-red-600">
                                        {errors.factory_code.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="factory_name"
                                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                                >
                                    Tên xưởng
                                </label>
                                <input
                                    id="factory_name"
                                    type="text"
                                    {...register("factory_name")}
                                    className={cn(
                                        "w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg transition-colors placeholder:text-[#9295A4] text-gray-600",
                                        "focus:outline-none focus:ring-2 focus:ring-[#00A76F]/80 focus:border-transparent",
                                        errors.factory_name
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300"
                                    )}
                                    placeholder="Nhập tên xưởng"
                                    disabled={isSubmitting}
                                />
                                {errors.factory_name && (
                                    <p className="mt-1 text-xs sm:text-sm text-red-600">
                                        {errors.factory_name.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Name and Phone Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm  font-semibold text-gray-700 mb-1.5"
                                >
                                    Tên người nhận hàng
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register("name")}
                                    className={cn(
                                        "w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg transition-colors placeholder:text-[#9295A4] text-gray-600",
                                        "focus:outline-none focus:ring-2 focus:ring-[#00A76F]/80 focus:border-transparent",
                                        errors.name
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300"
                                    )}
                                    placeholder="Nhập tên người nhận hàng"
                                    disabled={isSubmitting}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-xs sm:text-sm text-red-600">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm  font-semibold text-gray-700 mb-1.5"
                                >
                                    Số điện thoại
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    {...register("phone")}
                                    className={cn(
                                        "w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg transition-colors placeholder:text-[#9295A4] text-gray-600",
                                        "focus:outline-none focus:ring-2 focus:ring-[#00A76F]/80 focus:border-transparent",
                                        errors.phone
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300"
                                    )}
                                    placeholder="Nhập số điện thoại"
                                    disabled={isSubmitting}
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-xs sm:text-sm text-red-600">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Number and Street Name Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="number"
                                    className="block text-sm  font-semibold text-gray-700 mb-1.5"
                                >
                                    Số nhà
                                </label>
                                <input
                                    id="number"
                                    type="text"
                                    {...register("number")}
                                    className={cn(
                                        "w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg transition-colors placeholder:text-[#9295A4] text-gray-600",
                                        "focus:outline-none focus:ring-2 focus:ring-[#00A76F]/80 focus:border-transparent",
                                        errors.number
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300"
                                    )}
                                    placeholder="Nhập số nhà"
                                    disabled={isSubmitting}
                                />
                                {errors.number && (
                                    <p className="mt-1 text-xs sm:text-sm text-red-600">
                                        {errors.number.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="street_name"
                                    className="block text-sm  font-semibold text-gray-700 mb-1.5"
                                >
                                    Đường
                                </label>
                                <input
                                    id="street_name"
                                    type="text"
                                    {...register("street_name")}
                                    className={cn(
                                        "w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg transition-colors placeholder:text-[#9295A4] text-gray-600",
                                        "focus:outline-none focus:ring-2 focus:ring-[#00A76F]/80 focus:border-transparent",
                                        errors.street_name
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300"
                                    )}
                                    placeholder="Nhập tên đường"
                                    disabled={isSubmitting}
                                />
                                {errors.street_name && (
                                    <p className="mt-1 text-xs sm:text-sm text-red-600">
                                        {errors.street_name.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Ward and District Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="ward_name"
                                    className="block text-sm  font-semibold text-gray-700 mb-1.5"
                                >
                                    Phường
                                </label>
                                <input
                                    id="ward_name"
                                    type="text"
                                    {...register("ward_name")}
                                    className={cn(
                                        "w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg transition-colors placeholder:text-[#9295A4] text-gray-600",
                                        "focus:outline-none focus:ring-2 focus:ring-[#00A76F]/80 focus:border-transparent",
                                        errors.ward_name
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300"
                                    )}
                                    placeholder="Nhập phường"
                                    disabled={isSubmitting}
                                />
                                {errors.ward_name && (
                                    <p className="mt-1 text-xs sm:text-sm text-red-600">
                                        {errors.ward_name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="district_name"
                                    className="block text-sm  font-semibold text-gray-700 mb-1.5"
                                >
                                    Quận
                                </label>
                                <input
                                    id="district_name"
                                    type="text"
                                    {...register("district_name")}
                                    className={cn(
                                        "w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg transition-colors placeholder:text-[#9295A4] text-gray-600",
                                        "focus:outline-none focus:ring-2 focus:ring-[#00A76F]/80 focus:border-transparent",
                                        errors.district_name
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300"
                                    )}
                                    placeholder="Nhập quận"
                                    disabled={isSubmitting}
                                />
                                {errors.district_name && (
                                    <p className="mt-1 text-xs sm:text-sm text-red-600">
                                        {errors.district_name.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Submit Button - fixed */}
                <div className="flex-shrink-0 px-4 sm:px-6 pb-4 sm:pb-6 pt-4 ">
                    <button
                        type="submit"
                        form="address-form"
                        disabled={isSubmitting}
                        className={cn(
                            "w-full py-2.5 sm:py-3 px-4 text-base sm:text-lg  rounded-lg font-semibold transition-all duration-300",
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
                                    Đang thêm...
                                </span>
                            </div>
                        ) : (
                            "Thêm địa chỉ"
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default AddAddressModal;
