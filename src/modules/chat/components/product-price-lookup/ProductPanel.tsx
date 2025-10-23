import InfoProductList from "@/core/components/ui/InfoProductList";
import React from "react";
import { ProductItem } from "@/services/chatbot";

type ProductPanelProps = {
    id: number;
    content?: string;
    products?: ProductItem[];
};

const ProductPanel = ({
    id,
    content = "",
    products = [],
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

    console.log(products);

    return (
        <InfoProductList
            title={content}
            items={products}
            onItemClick={handleItemClick}
            onConfirmClick={handleConfirmClick}
            onEditClick={handleEditClick}
            onCancelClick={handleCancelClick}
        />
    );
};

export default ProductPanel;
