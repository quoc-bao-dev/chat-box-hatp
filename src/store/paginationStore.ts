import { create } from "zustand";
import { devtools } from "zustand/middleware";

type PaginationState = {
    page: number;
    limit: number;
    enable: boolean;
    hasNextPage: boolean;
    loading: boolean;
};

type PaginationActions = {
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    setEnable: (enable: boolean) => void;
    setHasNextPage: (hasNextPage: boolean) => void;
    setLoading: (loading: boolean) => void;
};

type PaginationStore = PaginationState & PaginationActions;

const usePaginationStore = create<PaginationStore>()(
    devtools((set) => {
        const setPage = (page: number) => {
            set({ page });
        };
        const setLimit = (limit: number) => {
            set({ limit });
        };
        const setEnable = (enable: boolean) => {
            set({ enable });
        };
        const setHasNextPage = (hasNextPage: boolean) => {
            set({ hasNextPage });
        };
        const setLoading = (loading: boolean) => {
            set({ loading });
        };
        return {
            page: 1,
            limit: 10,
            enable: false,
            hasNextPage: false,
            loading: false,

            setPage,
            setLimit,
            setEnable,
            setHasNextPage,
            setLoading,
        };
    })
);

// state

// action

export default usePaginationStore;
