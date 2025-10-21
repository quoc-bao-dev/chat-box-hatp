"use client";

import { axiosInstance } from "@/core/http";
import { useGetChatbotList } from "@/services/chatbot";
import { useEffect } from "react";

const getSession = async () => {
    const response = await axiosInstance.get("api_chatbot/get_session");
    return response.data;
};

const AutoSetSession = () => {
    const { refetch } = useGetChatbotList();

    // prefetch
    const handlePrefetch = async (data: string) => {
        sessionStorage.setItem("sp_session", data);

        await refetch();
    };

    useEffect(() => {
        getSession().then(handlePrefetch);
    }, []);
    return null;
};

export default AutoSetSession;
