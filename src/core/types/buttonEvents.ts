// Minimal option shape required by the button event handlers
export interface MoveOptionLike {
    show_move_event: string | null;
    name: string;
    next?: string;
}

export type ButtonEventType = "CONFIRM" | "EDIT" | "CANCEL";

export interface ButtonEventConfig {
    eventType: ButtonEventType;
    loadingState: boolean;
    setLoadingState: (loading: boolean) => void;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export interface UseButtonEventHandlersOptions {
    options: MoveOptionLike[];
    onSuccess?: (eventType: ButtonEventType) => void;
    onError?: (eventType: ButtonEventType, error: Error) => void;
}

export interface ButtonEventHandlersReturn {
    loadingStates: {
        confirm: boolean;
        edit: boolean;
        cancel: boolean;
    };
    handleConfirmClick: () => Promise<void>;
    handleEditClick: () => Promise<void>;
    handleCancelClick: () => Promise<void>;
    findEventByType: (eventType: ButtonEventType) => string | null;
    callApiByEvent: (
        eventType: string,
        setLoading: (loading: boolean) => void
    ) => Promise<any>;
    actionButtonConfigs: Array<{
        eventType: string;
        label: string;
        type: "confirm" | "edit" | "cancel";
    }>;
    buttonConfigs: {
        confirm: {
            loading: boolean;
            handler: () => Promise<void>;
        };
        edit: {
            loading: boolean;
            handler: () => Promise<void>;
        };
        cancel: {
            loading: boolean;
            handler: () => Promise<void>;
        };
    };
}
