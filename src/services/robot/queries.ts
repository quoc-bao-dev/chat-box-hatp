import { useQuery } from "@tanstack/react-query";
import robotApi from "./api";
import { ActiveRobotDetailPayload } from "./type";

export const useGetActiveRobotDetail = (payload: ActiveRobotDetailPayload) =>
    useQuery({
        queryKey: [
            "robot",
            "detail",
            payload.option_id?.toString(),
            payload.sp_session || "",
        ],
        queryFn: () => robotApi.getActiveRobotDetail(payload),
        enabled: !!payload.option_id,
    });
