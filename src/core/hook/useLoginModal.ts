"use client";
import { useState, useCallback } from "react";
import { LoginCredentials } from "@/modules/auth";

interface UseLoginModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  handleLogin: (credentials: LoginCredentials) => Promise<void>;
  isLoading: boolean;
}

interface UseLoginModalOptions {
  onLoginSuccess?: (credentials: LoginCredentials) => void | Promise<void>;
  onLoginError?: (error: Error) => void;
}

export const useLoginModal = (options?: UseLoginModalOptions): UseLoginModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // Call the success callback if provided
      if (options?.onLoginSuccess) {
        await options.onLoginSuccess(credentials);
      }
      
      // Close modal on successful login
      closeModal();
    } catch (error) {
      // Call the error callback if provided
      if (options?.onLoginError) {
        options.onLoginError(error as Error);
      } else {
        console.error("Login error:", error);
      }
      throw error; // Re-throw to let the component handle it
    } finally {
      setIsLoading(false);
    }
  }, [options, closeModal]);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    handleLogin,
    isLoading,
  };
};

export default useLoginModal;
