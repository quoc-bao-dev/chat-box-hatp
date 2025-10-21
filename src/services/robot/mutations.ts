import { useMutation } from "@tanstack/react-query";
import robotApi from "./api";
import { ActiveRobotDetailPayload } from "./type";

export const useGetActiveRobotDetailMutation = () =>
    useMutation({
        mutationFn: (payload: ActiveRobotDetailPayload) =>
            robotApi.getActiveRobotDetail(payload),
    });
