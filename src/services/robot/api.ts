import axiosClient from "@/core/http/axiosClient";
import { GetActiveRobotDetailResponse } from "./types";

// Robot API endpoints
const ROBOT_ENDPOINTS = {
    POST_ACTIVE_ROBOT_DETAIL: "/Api_chatbot/active_robot_detail",
} as const;

// Payload structure for active robot detail request
export interface ActiveRobotDetailPayload {
    option_id: number;
    sp_session?: string;
}

// Get active robot detail by payload
export const getActiveRobotDetail = async (
    payload: ActiveRobotDetailPayload
): Promise<GetActiveRobotDetailResponse> => {
    payload.sp_session = sessionStorage.getItem("sp_session") || "";
    try {
        const response = await axiosClient.post<GetActiveRobotDetailResponse>(
            ROBOT_ENDPOINTS.POST_ACTIVE_ROBOT_DETAIL + "/" + payload.option_id,
            payload
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching active robot detail:", error);
        throw error;
    }
};

// Export all API functions
export const robotApi = {
    getActiveRobotDetail,
} as const;
