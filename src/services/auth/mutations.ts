import useToast from "@/core/hook/useToast";
import { useMutation } from "@tanstack/react-query";
import authApi from "./api";

export const useSendOtpRegisterMutation = () => {
    const toast = useToast();
    return useMutation({
        mutationFn: (phoneNumber: string) => authApi.sendOtpRegister(phoneNumber),
        onSuccess: (data) => {
            if (data.result) {
                toast.success(data.message || "Mã OTP đã được gửi đến số điện thoại của bạn");
            } else {
                toast.error(data.message);
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useCheckOtpRegisterMutation = () => {
    const toast = useToast();
    return useMutation({
        mutationFn: ({ phoneNumber, key_code }: { phoneNumber: string, key_code: string }) => authApi.checkOtpRegister(phoneNumber, key_code),
        onSuccess: (data) => {
            if (data.result) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useSignUpMutation = () => {
    const toast = useToast();
    return useMutation({
        mutationFn: ({ phone, key_pass_code, name_company, name_clients }: { phone: string, key_pass_code: string, name_company: string, name_clients: string }) => authApi.signUp(phone, key_pass_code, name_company, name_clients),
        onSuccess: (data) => {
            console.log(data);
            if (data.result) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
