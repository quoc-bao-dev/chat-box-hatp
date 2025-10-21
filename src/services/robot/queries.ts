import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { robotApi, ActiveRobotDetailPayload } from "./api";
import { GetActiveRobotDetailResponse, robotKeys } from "./types";

// Hook to get active robot detail with new payload structure
export const useGetActiveRobotDetail = (
    payload: ActiveRobotDetailPayload,
    options?: Omit<
        UseQueryOptions<GetActiveRobotDetailResponse, Error>,
        "queryKey" | "queryFn"
    >
) => {
    return useQuery({
        queryKey: robotKeys.detail(
            payload.option_id?.toString(),
            payload.sp_session!
        ),
        queryFn: () => robotApi.getActiveRobotDetail(payload),
        enabled: !!payload.option_id, // Only run query if required fields are provided
        ...options,
    });
};

// Export all query hooks
export const robotQueries = {
    useGetActiveRobotDetail,
} as const;
