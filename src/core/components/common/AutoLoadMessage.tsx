"use client";

import { botConfig } from "@/core/config/bot";
import { createMessageFromHistoryResponse } from "@/core/utils/createMessageFromResponse";
import { useGetListChat } from "@/services/chat";
import { useChatBoxActions } from "@/store";
import usePaginationStore from "@/store/paginationStore";
import { useEffect, useState } from "react";
import { differenceInMinutes } from "date-fns";

const AutoLoadMessage = () => {
    const [firstRender, setFirstRender] = useState(true);
    const { addMessage, addMessageToTop, addTimeMessage, addTimeToTopMessage } =
        useChatBoxActions();
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
                let lastTime: Date | null = null;
                data?.data?.reverse().forEach((item, index) => {
                    const currentTime = new Date(item.created_at);

                    // Check if we need to add a time separator
                    if (lastTime) {
                        const timeDiff = differenceInMinutes(
                            currentTime,
                            lastTime
                        );

                        if (
                            timeDiff >= botConfig.timeDifferenceThreshold ||
                            index == data?.data?.length - 1 ||
                            index == 0
                        ) {
                            addTimeMessage(currentTime.toISOString());
                        }
                    }

                    addMessage(createMessageFromHistoryResponse(item as any));
                    lastTime = currentTime;
                });
                setHasNextPage(data?.next || false);
                setFirstRender(false);
            }
        } else if (enable) {
            if (data?.data?.length && data?.data?.length > 0) {
                let lastTime: Date | null = null;
                data?.data?.forEach((item, index) => {
                    const currentTime = new Date(item.created_at);

                    // push message lên đầu
                    addMessageToTop(
                        createMessageFromHistoryResponse(item as any)
                    );

                    // Check if we need to add a time separator
                    if (lastTime) {
                        const timeDiff = differenceInMinutes(
                            lastTime,
                            currentTime
                        );

                        if (
                            timeDiff >= botConfig.timeDifferenceThreshold ||
                            index == data?.data?.length - 1
                        ) {
                            addTimeToTopMessage(currentTime.toISOString());
                        }
                    }
                    lastTime = currentTime;
                });
                setHasNextPage(data?.next || false);
            }
        }
    }, [data]);
    return null;
};

export default AutoLoadMessage;
