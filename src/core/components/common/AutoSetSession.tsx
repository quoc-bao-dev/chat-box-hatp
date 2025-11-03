"use client";

import { axiosInstance } from "@/core/http";
import {
    getSession as getSessionStorage,
    setSession,
} from "@/core/utils/session";
import { useEffect } from "react";
import { useSessionReload } from "@/store";

const getSession = async () => {
    const response = await axiosInstance.get("api_chatbot/get_session");
    return response.data;
};

const AutoSetSession = () => {
    const { reloadKey } = useSessionReload();
    // prefetch
    const handlePrefetch = async (data: string) => {
        setSession(data);
    };

    useEffect(() => {
        if (getSessionStorage()) {
            return;
        }

        getSession().then(handlePrefetch);
    }, [reloadKey]);
    return null;
};

export default AutoSetSession;
