"use client";

import { useGetListChat } from "@/services/chat";

const AutoLoadMessage = () => {
    const { data } = useGetListChat({
        current_page: 1,
        per_page: 10,
    });

    console.log(data);

    return null;
};

export default AutoLoadMessage;
