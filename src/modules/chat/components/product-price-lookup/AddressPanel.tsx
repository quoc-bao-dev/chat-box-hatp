"use client";

import AddAddressModal, {
    AddressFormData,
} from "@/core/components/ui/AddAddressModal";
import AddressSelectList, {
    AddressItem,
} from "@/core/components/ui/AddressSelectList";
import { useNextFlow } from "@/core/hook";
import { useState } from "react";

type AddressPanelProps = {
    title: string;
    addresses: AddressItem[];
    disable?: boolean;
    nextLink?: string;
    messageId?: number;
    isHistory?: boolean;
};

const AddressPanel = ({
    title,
    addresses,
    disable = false,
    nextLink,
    messageId,
    isHistory,
}: AddressPanelProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { handleNext, isLoading } = useNextFlow({ method: "POST" });

    const handleAddAddress = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitAddress = async (data: AddressFormData) => {
        // Sau khi xử lý xong, đóng modal
        setIsModalOpen(false);
    };

    const handleClick = (id: string) => {
        try {
            if (typeof window !== "undefined") {
                sessionStorage.setItem("addressId", id);
            }
        } catch (e) {
            console.error("Failed to cache addressId in sessionStorage", e);
        }
        if (nextLink) {
            handleNext(nextLink);
        }
    };

    return (
        <>
            <AddressSelectList
                title={title}
                addresses={addresses}
                onConfirm={handleClick}
                onClickAddAddress={handleAddAddress}
                disable={disable}
                isHistory={isHistory}
                loading={isLoading}
            />

            <AddAddressModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitAddress}
                messageId={messageId}
            />
        </>
    );
};

export default AddressPanel;
