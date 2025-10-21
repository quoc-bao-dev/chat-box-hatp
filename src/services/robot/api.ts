import { axiosInstance } from "@/core/http";
import { ActiveRobotDetailPayload, GetActiveRobotDetailResponse } from "./type";
import { getSession } from "@/core/utils/session";

const robotApi = {
    // Reads
    getActiveRobotDetail: async (payload: ActiveRobotDetailPayload) => {
        payload.sp_session = getSession();
        const res = await axiosInstance.post<GetActiveRobotDetailResponse>(
            `/Api_chatbot/active_robot_detail/${payload.option_id}`,
            payload
        );
        return res.data;
    },
};

export default robotApi;
