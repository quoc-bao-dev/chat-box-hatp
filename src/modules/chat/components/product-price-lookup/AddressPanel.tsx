"use client";

import { useState } from "react";
import AddressSelectList, {
    AddressItem,
} from "@/core/components/ui/AddressSelectList";
import AddAddressModal, {
    AddressFormData,
} from "@/core/components/ui/AddAddressModal";

type AddressPanelProps = {
    title: string;
    addresses: AddressItem[];
    disable?: boolean;
};

const AddressPanel = ({
    title,
    addresses,
    disable = false,
}: AddressPanelProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddAddress = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitAddress = async (data: AddressFormData) => {
        // TODO: xử lý khi submit form thêm địa chỉ
        console.log("Address form data:", data);
        // Sau khi xử lý xong, đóng modal
        setIsModalOpen(false);
    };

    const handleClick = (id: string) => {
        // TODO: xử lý khi xác nhận địa chỉ
        console.log("Selected address id:", id);
    };

    return (
        <>
            <AddressSelectList
                title={title}
                addresses={addresses}
                onConfirm={handleClick}
                onClickAddAddress={handleAddAddress}
                disable={disable}
            />
            <AddAddressModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitAddress}
            />
        </>
    );
};

export default AddressPanel;
