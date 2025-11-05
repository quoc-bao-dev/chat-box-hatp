"use client";
import { Modal } from "@/core/components/common/Modal";
import styles from "@/core/styles/scrollbar.module.css";
import { cn } from "@/core/utils/cn";
import showToast from "@/core/utils/toast";
import { useAddAddress } from "@/services/chatbot/mutations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useChatBoxActions } from "@/store/chatBoxStore";
import { AddressOption } from "@/services/robot";
import { AddAddressResponse } from "@/services/chatbot/type";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface AddAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (data: AddressFormData) => void;
    className?: string;
    messageId?: number;
}

export interface AddressFormData {
    address: string;
    phone: string;
    name: string;
}

// Validation schema
const addressSchema = yup.object({
    address: yup.string().required("Địa chỉ không được để trống"),
    phone: yup
        .string()
        .required("Số điện thoại không được để trống")
        .matches(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số")
        .transform((value) => value?.replace(/\s/g, "") || ""),
    name: yup.string().required("Tên người nhận hàng không được để trống"),
});

type AddressFormFields = yup.InferType<typeof addressSchema>;

export const AddAddressModal: React.FC<AddAddressModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    className,
    messageId,
}) => {
    const { mutateAsync: addAddress, isPending } = useAddAddress();
    const { addAddressOptionToMessage } = useChatBoxActions();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<AddressFormFields>({
        resolver: yupResolver(addressSchema),
        defaultValues: {
            address: "",
            phone: "",
            name: "",
        },
    });

    const onSubmitForm = async (data: AddressFormFields) => {
        try {
            const res = (await addAddress(
                data as AddressFormData
            )) as AddAddressResponse;

            console.log({ messageId, res });

            if (messageId && res?.data?.id != null) {
                const createdId = String(res.data.id);
                const created = res.all_data?.find(
                    (i) => String(i.id) === createdId
                );

                console.log({ created });

                if (created) {
                    const option: AddressOption = {
                        id: String(created.id),
                        client: created.client,
                        address: created.address,
                        factory_code: created.factory_code,
                        factory_name: created.factory_name,
                        phone: created.phone,
                        name: created.name,
                        number: created.number,
                        street_name: created.street_name,
                        ward_name: created.ward_name,
                        district_name: created.district_name,
                        address_primary: created.address_primary,
                    };
                    addAddressOptionToMessage(messageId, option);
                }
            }

            showToast.success("Thêm địa chỉ thành công");
            if (onSubmit) await onSubmit(data as AddressFormData);
            onClose();
            reset();
        } catch (error) {
            console.error("Add address error:", error);
            showToast.error("Thêm địa chỉ thất bại. Vui lòng thử lại");
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
                        {/* Only keep required fields: Address, Name, Phone */}

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

                        {/* Removed optional fields */}

                        {/* Removed optional fields */}
                    </form>
                </div>

                {/* Submit Button - fixed */}
                <div className="flex-shrink-0 px-4 sm:px-6 pb-4 sm:pb-6 pt-4 ">
                    <button
                        type="submit"
                        form="address-form"
                        disabled={isSubmitting || isPending}
                        className={cn(
                            "w-full py-2.5 sm:py-3 px-4 text-base sm:text-lg  rounded-lg font-semibold transition-all duration-300",
                            "bg-[#00A76F] hover:bg-[#00A76F]/80 text-white",
                            "shadow-[0_8px_24px_rgba(0,167,111,0.20)]",
                            "hover:shadow-[0_12px_32px_rgba(0,167,111,0.30)]",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            "focus:outline-none focus:ring-2 focus:ring-[#00A76F]/80 focus:ring-offset-2"
                        )}
                    >
                        {isSubmitting || isPending ? (
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
