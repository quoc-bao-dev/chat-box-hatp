"use client";

import { createMessageFromHistoryResponse } from "@/core/utils/createMessageFromResponse";
import { useGetListChat } from "@/services/chat";
import { useChatBoxActions } from "@/store";
import { useEffect, useState } from "react";

const AutoLoadMessage = () => {
    const [firstRender, setFirstRender] = useState(true);
    const { addMessage } = useChatBoxActions();
    const { data } = useGetListChat({
        current_page: 1,
        per_page: 10,
    });

    useEffect(() => {
        if (!firstRender) {
            return;
        }
        if (data?.data?.length && data?.data?.length > 0) {
            data?.data?.reverse().forEach((item) => {
                addMessage(createMessageFromHistoryResponse(item as any));
            });
            setFirstRender(false);
        }
    }, [data]);
    return null;
};

export default AutoLoadMessage;
