"use client";
import { useState, useCallback } from "react";
import { LoginCredentials } from "@/modules/auth";

interface UseLoginFlowReturn {
    // Login Modal states
    isLoginModalOpen: boolean;
    openLoginModal: () => void;
    closeLoginModal: () => void;
    
    // OTP Modal states
    isOTPModalOpen: boolean;
    openOTPModal: (phoneNumber: string) => void;
    closeOTPModal: () => void;
    
    // First Time Login Modal states
    isFirstTimeLoginModalOpen: boolean;
    openFirstTimeLoginModal: (phoneNumber: string, key_pass_code: string) => void;
    closeFirstTimeLoginModal: () => void;
    
    // Current phone number and key_pass_code
    phoneNumber: string;
    key_pass_code: string;
    
    // Handlers
    handleLoginSuccess: (credentials: LoginCredentials) => Promise<void>;
    handleOTPVerify: (otp: string) => Promise<void>;
    handleBackToLogin: () => void; // Thêm handler để quay về login
    handleFirstTimeLogin: (phone: string, key_pass_code: string) => void; // Handler để mở FirstTimeLoginModal với phone và key_pass_code
    
    // Loading states
    isLoginLoading: boolean;
    isOTPLoading: boolean;
}

interface UseLoginFlowOptions {
    onLoginSuccess?: (credentials: LoginCredentials) => void | Promise<void>;
    onOTPVerify?: (otp: string, phoneNumber: string) => void | Promise<void>;
    onLoginError?: (error: Error) => void;
    onOTPError?: (error: Error) => void;
}

export const useLoginFlow = (options?: UseLoginFlowOptions): UseLoginFlowReturn => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
    const [isFirstTimeLoginModalOpen, setIsFirstTimeLoginModalOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [key_pass_code, setKey_pass_code] = useState("");
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isOTPLoading, setIsOTPLoading] = useState(false);

    // Login Modal handlers
    const openLoginModal = useCallback(() => {
        setIsLoginModalOpen(true);
    }, []);

    const closeLoginModal = useCallback(() => {
        setIsLoginModalOpen(false);
    }, []);

    // OTP Modal handlers
    const openOTPModal = useCallback((phone: string) => {
        setPhoneNumber(phone);
        setIsOTPModalOpen(true);
        setIsLoginModalOpen(false); // Close login modal
    }, []);

    const closeOTPModal = useCallback(() => {
        setIsOTPModalOpen(false);
        setPhoneNumber("");
        setKey_pass_code("");
    }, []);

    // First Time Login Modal handlers
    const openFirstTimeLoginModal = useCallback((phone: string, key_pass_code: string) => {
        setPhoneNumber(phone);
        setKey_pass_code(key_pass_code);
        setIsFirstTimeLoginModalOpen(true);
    }, []);

    const closeFirstTimeLoginModal = useCallback(() => {
        setIsFirstTimeLoginModalOpen(false);
        setPhoneNumber("");
        setKey_pass_code("");
    }, []);

    // Login success handler
    const handleLoginSuccess = useCallback(async (credentials: LoginCredentials) => {
        setIsLoginLoading(true);
        try {
            // Call the login success callback if provided
            if (options?.onLoginSuccess) {
                await options.onLoginSuccess(credentials);
            }
            
            // Open OTP modal with phone number
            openOTPModal(credentials.phoneNumber);
            
        } catch (error) {
            // Call the error callback if provided
            if (options?.onLoginError) {
                options.onLoginError(error as Error);
            } else {
                console.error("Login error:", error);
            }
            throw error; // Re-throw to let the component handle it
        } finally {
            setIsLoginLoading(false);
        }
    }, [options, openOTPModal]);

    // OTP verify handler
    const handleOTPVerify = useCallback(async (otp: string) => {
        setIsOTPLoading(true);
        try {
            // Call the OTP verify callback if provided
            if (options?.onOTPVerify) {
                await options.onOTPVerify(otp, phoneNumber);
            }
            
            // Close OTP modal on successful verification
            closeOTPModal();
            
        } catch (error) {
            // Call the error callback if provided
            if (options?.onOTPError) {
                options.onOTPError(error as Error);
            } else {
                console.error("OTP verification error:", error);
            }
            throw error; // Re-throw to let the component handle it
        } finally {
            setIsOTPLoading(false);
        }
    }, [options, phoneNumber, closeOTPModal]);

    // Back to login handler
    const handleBackToLogin = useCallback(() => {
        closeOTPModal();
        openLoginModal();
    }, [closeOTPModal, openLoginModal]);

    // First time login handler
    const handleFirstTimeLogin = useCallback((phone: string, key_pass_code: string) => {
        closeOTPModal();
        openFirstTimeLoginModal(phone, key_pass_code);
    }, [closeOTPModal, openFirstTimeLoginModal]);

    return {
        // Login Modal states
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        
        // OTP Modal states
        isOTPModalOpen,
        openOTPModal,
        closeOTPModal,
        
        // First Time Login Modal states
        isFirstTimeLoginModalOpen,
        openFirstTimeLoginModal,
        closeFirstTimeLoginModal,
        
        // Current phone number and key_pass_code
        phoneNumber,
        key_pass_code,
        
        // Handlers
        handleLoginSuccess,
        handleOTPVerify,
        handleBackToLogin,
        handleFirstTimeLogin,
        
        // Loading states
        isLoginLoading,
        isOTPLoading,
    };
};

export default useLoginFlow;
