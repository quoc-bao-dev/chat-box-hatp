import React from "react";

interface BaseButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    loadingText?: string;
    children: React.ReactNode;
    className?: string;
}

// Confirm Button Component
export const ConfirmButton: React.FC<BaseButtonProps> = ({
    onClick,
    disabled = false,
    isLoading = false,
    loadingText = "Đang xử lý...",
    children,
    className = "",
}) => {
    return (
        <button
            type="button"
            className={`h-10 rounded-xl bg-[#2FB06B] text-white font-semibold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all duration-200 hover:bg-[#28A05A] hover:shadow-md active:scale-95 ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {isLoading ? loadingText : children}
        </button>
    );
};

// Edit Button Component
export const EditButton: React.FC<BaseButtonProps> = ({
    onClick,
    disabled = false,
    isLoading = false,
    loadingText = "Đang chỉnh sửa...",
    children,
    className = "",
}) => {
    return (
        <button
            type="button"
            className={`h-10 rounded-xl bg-white text-gray-700 font-medium border border-gray-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md active:scale-95 ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {isLoading ? loadingText : children}
        </button>
    );
};

// Cancel Button Component
export const CancelButton: React.FC<BaseButtonProps> = ({
    onClick,
    disabled = false,
    isLoading = false,
    loadingText = "Đang hủy...",
    children,
    className = "",
}) => {
    return (
        <button
            type="button"
            className={`h-10 rounded-xl bg-white text-[#F04438] border border-[#F04438] font-semibold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all duration-200 hover:bg-red-50 hover:border-red-400 hover:shadow-md active:scale-95 ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {isLoading ? loadingText : children}
        </button>
    );
};

// Action Buttons Container
interface ActionButtonsProps {
    shouldShowConfirmButton?: boolean;
    shouldShowEditButton?: boolean;
    shouldShowCancelButton?: boolean;
    isConfirmLoading?: boolean;
    isEditLoading?: boolean;
    isCancelLoading?: boolean;
    disable?: boolean;
    onConfirmClick?: () => void;
    onEditClick?: () => void;
    onCancelClick?: () => void;
    confirmText?: string;
    editText?: string;
    cancelText?: string;
    confirmLoadingText?: string;
    editLoadingText?: string;
    cancelLoadingText?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    shouldShowConfirmButton = false,
    shouldShowEditButton = false,
    shouldShowCancelButton = false,
    isConfirmLoading = false,
    isEditLoading = false,
    isCancelLoading = false,
    disable = false,
    onConfirmClick,
    onEditClick,
    onCancelClick,
    confirmText = "Lên đơn",
    editText = "Tôi muốn chỉnh sửa mã sản phẩm",
    cancelText = "Hủy",
    confirmLoadingText = "Đang xử lý...",
    editLoadingText = "Đang chỉnh sửa...",
    cancelLoadingText = "Đang hủy...",
}) => {
    const isDisabled =
        isConfirmLoading || isEditLoading || isCancelLoading || disable;

    if (
        !shouldShowConfirmButton &&
        !shouldShowEditButton &&
        !shouldShowCancelButton
    ) {
        return null;
    }

    return (
        <div className="flex flex-col gap-2 mt-5">
            {shouldShowConfirmButton && (
                <ConfirmButton
                    onClick={onConfirmClick}
                    disabled={isDisabled}
                    isLoading={isConfirmLoading}
                    loadingText={confirmLoadingText}
                >
                    {confirmText}
                </ConfirmButton>
            )}
            {shouldShowEditButton && (
                <EditButton
                    onClick={onEditClick}
                    disabled={isDisabled}
                    isLoading={isEditLoading}
                    loadingText={editLoadingText}
                >
                    {editText}
                </EditButton>
            )}
            {shouldShowCancelButton && (
                <CancelButton
                    onClick={onCancelClick}
                    disabled={isDisabled}
                    isLoading={isCancelLoading}
                    loadingText={cancelLoadingText}
                >
                    {cancelText}
                </CancelButton>
            )}
        </div>
    );
};
