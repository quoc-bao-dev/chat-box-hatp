import InfoProductList from "@/core/components/ui/InfoProductList";
import React from "react";
import { ProductItem, ProductOption } from "@/services/chatbot";

type ProductPanelProps = {
    id: number;
    content?: string;
    products?: ProductItem[];
    options?: ProductOption[];
};

const ProductPanel = ({
    id,
    content = "",
    products = [],
    options = [],
}: ProductPanelProps) => {
    const handleItemClick = (item: ProductItem) => {
        // placeholder: handle select product item
    };

    const handleConfirmClick = () => {
        // placeholder: handle confirm selection
    };

    const handleEditClick = () => {
        // placeholder: handle edit action
    };

    const handleCancelClick = () => {
        // placeholder: handle cancel action
    };

    return (
        <InfoProductList
            title={content}
            items={products}
            options={options}
            onItemClick={handleItemClick}
            onConfirmClick={handleConfirmClick}
            onEditClick={handleEditClick}
            onCancelClick={handleCancelClick}
        />
    );
};

export default ProductPanel;
