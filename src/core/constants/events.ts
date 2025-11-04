// Constants for button event types
export const EVENTS = {
    CONFIRM: [
        "confirm_product",
        "create_order",
        "save_edit_product",
        "button_info",
    ],
    EDIT: ["edit_product", "view_edit_product"],
    CANCEL: ["cancel_edit_product", "cancel_product"],
} as const;
