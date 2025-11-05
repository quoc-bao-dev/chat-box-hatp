// import OrderDetailsModal from "@/core/components/ui/OrderDetailsModal";

import OrderDetailsModal from "@/core/components/ui/OrderDetailsModal";
import { OrderDetail } from "@/services/order/type";
import { useMemo } from "react";

type OrderDetailsPanelProps = { orderDetail: OrderDetail };

const OrderDetailsPanel = ({ orderDetail }: OrderDetailsPanelProps) => {
    const orderData = useMemo(() => {
        const formatNumber = (value?: string | null) => {
            if (value == null || value === "") return "0";
            const num = Number(value);
            if (Number.isNaN(num)) return String(value);
            return num.toLocaleString("vi-VN");
        };

        const formatDate = (isoLike?: string) => {
            if (!isoLike) return "";
            const d = new Date(isoLike);
            if (Number.isNaN(d.getTime())) return isoLike;
            const dd = String(d.getDate()).padStart(2, "0");
            const mm = String(d.getMonth() + 1).padStart(2, "0");
            const yyyy = d.getFullYear();
            return `${dd}/${mm}/${yyyy}`;
        };

        return {
            title: "Chi Tiết Đơn Hàng",
            orderNumber: orderDetail.reference_no,
            orderDate: formatDate(orderDetail.date),
            customer: {
                name: orderDetail.customer_name,
                taxId: orderDetail.vat ?? "",
                deliveryAddress: orderDetail.address ?? "Khách lấy",
            },
            items: (orderDetail.items || []).map((item, index) => ({
                stt: String(index + 1),
                name: item.name_product || item.code_product,
                unit: item.unit,
                quantity: formatNumber(item.quantity),
                unitPrice: formatNumber(item.price),
                amount: formatNumber(item.amount),
                sheets: formatNumber(item.quantity_to),
                weight: formatNumber(item.quantity_kg),
            })),
            totalAmount: formatNumber(orderDetail.grand_total),
            totalWeight: formatNumber(orderDetail.total_kg),
        };
    }, [orderDetail]);

    return (
        <div>
            <OrderDetailsModal orderData={orderData} />
        </div>
    );
};

export default OrderDetailsPanel;
