/**
 * EXAMPLES: Cách sử dụng useNextFlow hook trong các panel
 *
 * Hook này giúp tái sử dụng logic xử lý next flow (nextRes, nextWait, is_chat, etc.)
 * cho InfoPanel, CategoryPanel, OrderSuccessPanel, và các component khác.
 */

import { useNextFlow } from "@/core/hook";
import { useState } from "react";

// ============================================
// EXAMPLE 1: InfoPanel - POST request với body
// ============================================
export const InfoPanelExample = () => {
    const { handleNext, isLoading } = useNextFlow({
        method: "POST",
        triggerForceClose: true,
        handleSelectCategory: true,
        handleRecursiveNext: true,
        autoStartFeedback: true,
        onSuccess: (response) => {
            console.log("Flow completed:", response);
        },
        onError: (error) => {
            console.error("Flow error:", error);
        },
    });

    const handleItemClick = (next: string) => {
        // Gọi với payload mặc định (sp_session)
        handleNext(next);
    };

    return <div>...</div>;
};

// ============================================
// EXAMPLE 2: CategoryPanel - POST request với FormData
// ============================================
export const CategoryPanelExample = () => {
    const { handleNext, isLoading } = useNextFlow({
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        handleSelectCategory: false, // CategoryPanel không cần xử lý select_category
        handleRecursiveNext: false, // CategoryPanel xử lý nextRes khác (gọi GET riêng)
        autoStartFeedback: false,
    });

    const handleClick = async (ids: string[]) => {
        const formData = new FormData();
        ids.forEach((id) => formData.append("id_category[]", id));

        // Gọi với FormData
        await handleNext(nextLink, formData);

        // Sau đó xử lý nextRes riêng nếu cần
        // (vì CategoryPanel có logic đặc biệt cho nextRes)
    };

    return <div>...</div>;
};

// ============================================
// EXAMPLE 3: OrderSuccessPanel - GET request
// ============================================
export const OrderSuccessPanelExample = () => {
    const { handleNext, isLoading } = useNextFlow({
        method: "GET",
        triggerForceClose: false,
        handleSelectCategory: false,
        handleRecursiveNext: false, // OrderSuccessPanel xử lý nextLink riêng
        autoStartFeedback: true,
    });

    const handleOptionClick = async (option: RobotOption) => {
        if (!option.next) return;

        // Gọi GET request
        await handleNext(option.next);

        // Sau đó xử lý nextLink riêng nếu cần
        // (vì OrderSuccessPanel có logic đặc biệt cho nextLink)
    };

    return <div>...</div>;
};

// ============================================
// EXAMPLE 4: Custom flow với callback
// ============================================
export const CustomFlowExample = () => {
    const [customState, setCustomState] = useState(false);

    const { handleNext, isLoading } = useNextFlow({
        method: "POST",
        onStart: () => {
            console.log("Flow started");
            setCustomState(true);
        },
        onSuccess: (response) => {
            console.log("Success:", response);
            // Xử lý custom logic sau khi flow thành công
        },
        onError: (error) => {
            console.error("Error:", error);
            setCustomState(false);
        },
        onComplete: () => {
            console.log("Flow completed");
        },
    });

    return <div>...</div>;
};
