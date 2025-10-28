"use client";

import styles from "@/core/styles/scrollbar.module.css";

export type OrderItem = {
    stt: string;
    name: string;
    unit: string;
    quantity: string;
    unitPrice: string;
    amount: string;
    sheets: string;
    weight: string;
};

export type OrderDetailsData = {
    title: string;
    orderNumber: string;
    orderDate: string;
    customer: {
        name: string;
        taxId: string;
        deliveryAddress: string;
    };
    items: OrderItem[];
    totalAmount: string;
    totalWeight: string;
};

interface OrderDetailsModalProps {
    orderData: OrderDetailsData;
    className?: string;
    disable?: boolean;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
    orderData,
    className = "",
    disable = false,
}) => {
    const {
        title,
        orderNumber,
        orderDate,
        customer,
        items,
        totalAmount,
        totalWeight,
    } = orderData;

    return (
        <div className={` max-w-4xl w-full ${className}`}>
            <div
                className="bg-white rounded-xl px-3 lg:px-6 pt-3 lg:pt-5
             pb-2 shadow-sm"
                aria-disabled={disable}
                role="region"
                tabIndex={-1}
                style={disable ? { opacity: 0.6 } : undefined}
            >
                {/* Header Section */}
                <div className="lg:text-center mb-2 lg:mb-6">
                    <h2 className="lg:text-xl font-bold text-[#454F5B] mb-2">
                        {title}
                    </h2>
                    <div className="flex  lg:justify-center  flex-col gap-1 text-sm text-gray-600">
                        <span>
                            <span className="font-medium ">Phiếu số:</span>{" "}
                            {orderNumber}
                        </span>
                        <span>
                            <span className="font-medium">Ngày phiếu:</span>{" "}
                            {orderDate}
                        </span>
                    </div>
                </div>

                {/* Customer Information Section */}
                <div className="text-sm lg:text-base mb-6 space-y-2 ">
                    <div>
                        <span className="font-medium text-gray-700">
                            Tên khách hàng:
                        </span>{" "}
                        <span className="text-gray-900 font-semibold">
                            {customer.name}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">MST:</span>{" "}
                        <span className="text-gray-900 font-semibold">
                            {customer.taxId}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">
                            Địa chỉ giao:
                        </span>{" "}
                        <span className="text-gray-900 font-semibold">
                            {customer.deliveryAddress}
                        </span>
                    </div>
                </div>

                {/* Item Details Table */}
                <div
                    className={`mb-6 overflow-x-auto md:overflow-visible w-full ${styles.customScrollbar}`}
                >
                    <table className="w-full min-w-[1000px] md:min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr style={{ background: "#B4EED9" }}>
                                <th className="px-2 py-2 md:px-4 md:py-4 text-center text-xs lg:text-base font-semibold text-[#5E5E5E] border border-gray-300 truncate">
                                    STT
                                </th>
                                <th className="px-2 py-2 md:px-4 md:py-4 text-center text-xs lg:text-base font-semibold text-[#5E5E5E] border border-gray-300 truncate">
                                    Tên hàng
                                </th>
                                <th className="px-2 py-2 md:px-4 md:py-4 text-center text-xs lg:text-base font-semibold text-[#5E5E5E] border border-gray-300 truncate">
                                    Đơn vị tính
                                </th>
                                <th className="px-2 py-2 md:px-4 md:py-4 text-center text-xs lg:text-base font-semibold text-[#5E5E5E] border border-gray-300 truncate">
                                    Số lượng
                                </th>
                                <th className="px-2 py-2 md:px-4 md:py-4 text-center text-xs lg:text-base font-semibold text-[#5E5E5E] border border-gray-300 truncate">
                                    Đơn giá
                                </th>
                                <th className="px-2 py-2 md:px-4 md:py-4 text-center text-xs lg:text-base font-semibold text-[#5E5E5E] border border-gray-300 truncate">
                                    Thành tiền
                                </th>
                                <th className="px-2 py-2 md:px-4 md:py-4 text-center text-xs lg:text-base font-semibold text-[#5E5E5E] border border-gray-300 truncate">
                                    Số tờ
                                </th>
                                <th className="px-2 py-2 md:px-4 md:py-4 text-center text-xs lg:text-base font-semibold text-[#5E5E5E] border border-gray-300 truncate">
                                    Số Kg
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-2 py-2 md:px-3 md:py-4 text-sm text-center font-semibold text-gray-700 border border-gray-300 ">
                                        {item.stt}
                                    </td>
                                    <td className="py-2 md:px-3 md:py-4 text-sm text-center font-semibold text-gray-700 border border-gray-300">
                                        {item.name}
                                    </td>
                                    <td className="px-2 py-2 md:px-3 md:py-4 text-sm text-center font-semibold text-gray-700 border border-gray-300">
                                        {item.unit}
                                    </td>
                                    <td className="px-2 py-2 md:px-3 md:py-4 text-sm text-center font-semibold text-gray-700 border border-gray-300">
                                        {item.quantity}
                                    </td>
                                    <td className="px-2 py-2 md:px-3 md:py-4 text-sm text-center font-semibold text-gray-700 border border-gray-300">
                                        {item.unitPrice}
                                    </td>
                                    <td className="px-2 py-2 md:px-3 md:py-4 text-sm text-center font-semibold text-gray-700 border border-gray-300">
                                        {item.amount}
                                    </td>
                                    <td className="px-2 py-2 md:px-3 md:py-4 text-sm text-center font-semibold text-gray-700 border border-gray-300">
                                        {item.sheets}
                                    </td>
                                    <td className="px-2 py-2 md:px-3 md:py-4 text-sm text-center font-semibold text-gray-700 border border-gray-300 truncate">
                                        {item.weight}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {/* Footer Section */}
                        <tfoot className="hidden md:table-row-group">
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-3 py-3 text-sm font-semibold text-center text-[#E93838] border border-gray-300 truncate"
                                >
                                    Tổng Cộng
                                </td>
                                <td
                                    colSpan={2}
                                    className="px-3 py-3 text-sm font-semibold text-center text-[#E93838] border border-gray-300 truncate"
                                >
                                    {totalAmount} VND
                                </td>
                                <td className="px-3 py-3 text-sm font-semibold text-center text-[#E93838] border border-gray-300 truncate">
                                    {totalWeight} Kg
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="pt-0  pb-3 lg:hidden">
                    <div className="flex justify-between flex-col md:flex-row gap-1">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-gray-700 ">
                                Tổng Cộng:
                            </span>
                            <span className="text-[#E93838] font-semibold">
                                {totalAmount} VND
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-gray-700">
                                Tổng số Kg:
                            </span>
                            <span className="text-[#E93838] font-semibold">
                                {totalWeight} Kg
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
