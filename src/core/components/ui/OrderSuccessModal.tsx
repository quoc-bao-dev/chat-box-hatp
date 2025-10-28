import { _Image } from "@/core/config";
import { Icon } from "../common";

interface OrderSuccessModalProps {
    onViewDetailsClick?: () => void;
    onPlaceAnotherOrderClick?: () => void;
    className?: string;
    disable?: boolean;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
    onViewDetailsClick,
    onPlaceAnotherOrderClick,
    className = "",
    disable = false,
}) => {
    return (
        <div
            className={`bg-white rounded-2xl px-3.5 py-4 w-full max-w-md flex flex-col items-center text-center shadow-lg/3 ${className}`}
        >
            {/* Header */}
            <h2 className="text-xl font-bold text-[#333333] mb-2">
                Lên đơn thành công!
            </h2>
            <p className="text-sm text-[#454F5B] mb-4">
                Xin chúc mừng, đơn của bạn đã được khởi tạo thành công!
            </p>

            {/* Illustration */}
            <Icon
                src={_Image.icon.icon_success}
                size={80}
                alt="success"
                className="mb-4"
            />
            {/* Action Buttons */}
            <button
                type="button"
                className={`w-full px-4 py-2 rounded-xl bg-gray-50/80 flex items-center justify-between mb-2 ${
                    disable
                        ? "opacity-50 cursor-not-allowed pointer-events-none"
                        : "cursor-pointer hover:bg-gray-100"
                }`}
                onClick={() => !disable && onViewDetailsClick?.()}
                aria-disabled={disable}
            >
                <p
                    className={`font-medium ${
                        disable ? "text-gray-500" : "text-[#00A76F]"
                    }`}
                >
                    Xem chi tiết đơn
                </p>
                <Icon
                    src={_Image.icon.icon_send_2}
                    size={20}
                    alt="arrow right"
                />
            </button>

            <button
                type="button"
                className={`w-full px-4 py-2 rounded-xl bg-gray-50/80 flex items-center justify-between ${
                    disable
                        ? "opacity-50 cursor-not-allowed pointer-events-none"
                        : "cursor-pointer hover:bg-gray-100"
                }`}
                onClick={() => !disable && onPlaceAnotherOrderClick?.()}
                aria-disabled={disable}
            >
                <p
                    className={`font-medium ${
                        disable ? "text-gray-500" : "text-[#00A76F]"
                    }`}
                >
                    Lên đơn khác
                </p>
                <Icon
                    src={_Image.icon.icon_send_2}
                    size={20}
                    alt="arrow right"
                />
            </button>
        </div>
    );
};

export default OrderSuccessModal;
