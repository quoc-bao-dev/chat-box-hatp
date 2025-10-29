import InfoProductList from "@/core/components/ui/InfoProductList";
import { useButtonEventHandlers } from "@/core/hook";
import { ProductItem, ProductOption } from "@/services/chatbot";

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
    // Use the button event handlers hook
    const {
        loadingStates,
        handleConfirmClick,
        handleEditClick,
        handleCancelClick,
        actionButtonConfigs, // Lấy actionButtonConfigs từ hook
    } = useButtonEventHandlers({
        options,
        onSuccess: (eventType) => {
            console.log(`${eventType} action completed`);
        },
        onError: (eventType, error) => {
            console.error(`${eventType} action failed:`, error);
        },
    });

    const handleItemClick = (item: ProductItem) => {
        // placeholder: handle select product item
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
            isConfirmLoading={loadingStates.confirm}
            isEditLoading={loadingStates.edit}
            isCancelLoading={loadingStates.cancel}
            actionButtonConfigs={actionButtonConfigs}
        />
    );
};

export default ProductPanel;
