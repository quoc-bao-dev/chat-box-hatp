import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { robotApi, ActiveRobotDetailPayload } from "./api";
import { GetActiveRobotDetailResponse } from "./types";

// Hook to get active robot detail using mutation
export const useGetActiveRobotDetailMutation = (
    options?: Omit<
        UseMutationOptions<
            GetActiveRobotDetailResponse,
            Error,
            ActiveRobotDetailPayload
        >,
        "mutationFn"
    >
) => {
    return useMutation({
        mutationFn: (payload: ActiveRobotDetailPayload) =>
            robotApi.getActiveRobotDetail(payload),
        ...options,
    });
};

// Export all mutation hooks
export const robotMutations = {
    useGetActiveRobotDetailMutation,
} as const;
