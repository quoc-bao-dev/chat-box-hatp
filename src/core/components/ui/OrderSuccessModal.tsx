import { _Image } from "@/core/config";
import { RobotOption } from "@/services/robot";
import { Icon } from "../common";

interface OrderSuccessModalProps {
    options: RobotOption[];
    onOptionClick: (option: RobotOption) => void;
    className?: string;
    disable?: boolean;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
    options,
    onOptionClick,
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
            {/* Action Buttons - dynamic from options */}
            {options?.map((option) => {
                const isDisabled = disable || option.disabled === true;
                return (
                    <button
                        key={option.id}
                        type="button"
                        className={`w-full px-4 py-2 rounded-xl bg-gray-50/80 flex items-center justify-between ${
                            isDisabled
                                ? "opacity-50 cursor-not-allowed pointer-events-none"
                                : "cursor-pointer hover:bg-gray-100"
                        } ${"mb-2"}`}
                        onClick={() => !isDisabled && onOptionClick(option)}
                        aria-disabled={isDisabled}
                    >
                        <p
                            className={`font-medium ${
                                isDisabled ? "text-gray-500" : "text-[#00A76F]"
                            }`}
                        >
                            {option.name}
                        </p>
                        <Icon
                            src={_Image.icon.icon_send_2}
                            size={20}
                            alt="arrow right"
                        />
                    </button>
                );
            })}
        </div>
    );
};

export default OrderSuccessModal;
