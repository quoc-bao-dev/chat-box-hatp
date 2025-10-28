import InfoProductList from "@/core/components/ui/InfoProductList";
import { ProductItem, ProductOption } from "@/services/chatbot";
import { useState } from "react";

type ProductPanelProps = {
    id: number;
    content?: string;
    products?: ProductItem[];
    options?: ProductOption[];
    disable?: boolean;
};

const ProductPanel = ({
    id,
    content = "",
    products = [],
    options = [],
    disable = false,
}: ProductPanelProps) => {
    // const [disablePanel, setDisablePanel] = useState(disable);

    const handleItemClick = (item: ProductItem) => {
        // placeholder: handle select product item
        // setDisablePanel(true);
    };

    const handleConfirmClick = () => {
        // placeholder: handle confirm selection
        // setDisablePanel(true);
    };

    const handleEditClick = () => {
        // placeholder: handle edit action
        // setDisablePanel(true);
    };

    const handleCancelClick = () => {
        // placeholder: handle cancel action
        // setDisablePanel(true);
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
            disable={disable}
        />
    );
};

export default ProductPanel;
