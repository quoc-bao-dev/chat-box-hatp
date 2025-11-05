export type OrderDetail = {
    id: string;
    date: string;
    reference_no: string;
    customer_id: string;
    customer_name: string;
    vat: string | null;
    total_kg: string;
    grand_total: string;
    address: string | null;
    items: Array<{
        id: string;
        price_kg: string;
        unit_id: string;
        name_product: string;
        code_product: string;
        unit: string;
        quantity: string;
        price: string;
        amount: string;
        quantity_kg: string;
        quantity_to: string;
    }>;
};
