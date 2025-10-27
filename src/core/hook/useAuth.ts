"use client";
import { useState, useEffect } from "react";
import { userStorage, UserInfo } from "@/core/utils/userStorage";

export const useAuth = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(userStorage.getUserInfo());
    const [isLoggedIn, setIsLoggedIn] = useState(userStorage.isLoggedIn());
    const [isLoading, setIsLoading] = useState(false);

    // Listen for storage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const newUserInfo = userStorage.getUserInfo();
            const newIsLoggedIn = userStorage.isLoggedIn();
            
            setUserInfo(newUserInfo);
            setIsLoggedIn(newIsLoggedIn);
        };

        // Listen for storage events (cross-tab)
        window.addEventListener('storage', handleStorageChange);
        
        // Listen for custom events (same-tab)
        window.addEventListener('userInfoUpdated', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('userInfoUpdated', handleStorageChange);
        };
    }, []);

    // Login function
    const login = (userData: UserInfo) => {
        setIsLoading(true);
        try {
            userStorage.setUserInfo(userData);
            // State sẽ được cập nhật tự động qua event listener
        } finally {
            setIsLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        setIsLoading(true);
        try {
            userStorage.clearUserInfo();
            // State sẽ được cập nhật tự động qua event listener
        } finally {
            setIsLoading(false);
        }
    };

    // Refresh user data
    const refreshUserData = () => {
        const newUserInfo = userStorage.getUserInfo();
        const newIsLoggedIn = userStorage.isLoggedIn();
        
        setUserInfo(newUserInfo);
        setIsLoggedIn(newIsLoggedIn);
    };

    return {
        userInfo,
        isLoggedIn,
        isLoading,
        login,
        logout,
        refreshUserData,
    };
};
