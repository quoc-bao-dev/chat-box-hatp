"use client";

import { axiosInstance } from "@/core/http";
import { getSession as getSessionStorage } from "@/core/utils/session";
import { useEffect } from "react";

const getSession = async () => {
    const response = await axiosInstance.get("api_chatbot/get_session");
    return response.data;
};

const AutoSetSession = () => {
    // prefetch
    const handlePrefetch = async (data: string) => {
        sessionStorage.setItem("sp_session", data);
    };

    useEffect(() => {
        if (getSessionStorage()) {
            return;
        }
        getSession().then(handlePrefetch);
    }, []);
    return null;
};

export default AutoSetSession;
