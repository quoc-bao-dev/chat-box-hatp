import { axiosInstance } from "@/core/http";

interface GetListSettingResponse {
    result: boolean;
    settings: Setting;
}

interface Setting {
    phone_chatbot: string;
    zalo_chatbot: string;
}

const settingApi = {
    getSetting: async () => {
        const res = await axiosInstance.get<GetListSettingResponse>(
            "/api_Controller/getSettings"
        );
        return res.data.settings;
    },
};

export default settingApi;