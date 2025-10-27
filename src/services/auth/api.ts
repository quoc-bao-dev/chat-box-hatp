import { axiosInstance } from "@/core/http";

const authApi = {
    sendOtpRegister: async (phoneNumber: string) => {
        const formData = new FormData();
        formData.append('phone', phoneNumber);

        const res = await axiosInstance.post<any>(
            "/Api_Controller/send_otp/register",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return res.data;
    },

    checkOtpRegister: async (phoneNumber: string, key_code: string) => {
        const formData = new FormData();
        formData.append('phone', phoneNumber);
        formData.append('key_code', key_code);

        const res = await axiosInstance.post<any>(
            "/Api_Controller/check_otp/register",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return res.data;
    },
    
    signUp: async (phone: string, key_pass_code: string, name_company: string, name_clients: string) => {
        const formData = new FormData();
        formData.append('phone', phone);
        formData.append('key_pass_code', key_pass_code);
        formData.append('name_company', name_company);
        formData.append('name_clients', name_clients);

        const res = await axiosInstance.post<any>(
            "/Api_Controller/sign_up",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return res.data;
    },
};


export default authApi;
