"use client";

import { botConfig } from "@/core/config/bot";
import { createMessageFromHistoryResponse } from "@/core/utils/createMessageFromResponse";
import { useGetListChat } from "@/services/chat";
import { useChatBoxActions } from "@/store";
import usePaginationStore from "@/store/paginationStore";
import { useEffect, useState } from "react";

const AutoLoadMessage = () => {
    const [firstRender, setFirstRender] = useState(true);
    const { addMessage, addMessageToTop } = useChatBoxActions();
    const { page, limit, enable, setEnable, setLoading, setHasNextPage } =
        usePaginationStore();
    const { data, isLoading } = useGetListChat({
        current_page: page,
        per_page: limit,
    });

    // Delay 3s trước khi enable loading
    useEffect(() => {
        if (firstRender) {
            const timer = setTimeout(() => {
                setEnable(true);
            }, botConfig.delayToLoadMore);
            return () => clearTimeout(timer);
        }
    }, []);

    // Handle loading state
    useEffect(() => {
        if (isLoading) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [isLoading, setLoading]);

    useEffect(() => {
        if (firstRender) {
            if (data?.data?.length && data?.data?.length > 0) {
                data?.data?.reverse().forEach((item) => {
                    addMessage(createMessageFromHistoryResponse(item as any));
                });
                setHasNextPage(data?.next || false);
                setFirstRender(false);
            }
        } else if (enable) {
            if (data?.data?.length && data?.data?.length > 0) {
                data?.data?.forEach((item) => {
                    // push message lên đầu
                    addMessageToTop(
                        createMessageFromHistoryResponse(item as any)
                    );
                });
                setHasNextPage(data?.next || false);
            }
        }
    }, [data]);
    return null;
};

export default AutoLoadMessage;
