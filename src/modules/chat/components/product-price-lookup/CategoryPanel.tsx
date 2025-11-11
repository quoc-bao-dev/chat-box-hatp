import CategorySelectList from "@/core/components/ui/CategorySelectList";
import axiosClient from "@/core/http/axiosClient";
import { createMessageFromResponse } from "@/core/utils/createMessageFromResponse";
import { getSession } from "@/core/utils/session";
import { CategoryOption } from "@/services/robot/type";
import { useChatBoxActions } from "@/store";
import { useChatInputStore } from "@/store/chatInputStore";
import { useNextEventState } from "@/store/nextEventStore";
import { useState } from "react";

type CategoryPanelProps = {
    title: string;
    optionsCategory: CategoryOption[];
    disable?: boolean;
};

const CategoryPanel = ({
    title,
    optionsCategory,
    disable = false,
}: CategoryPanelProps) => {
    const { nextLink } = useNextEventState();

    const { setNextLink, setDataPost, setEvent } = useChatInputStore();
    const { addMessage, setIsAssistantTyping, setMode } = useChatBoxActions();
    const [loading, setLoading] = useState(false);

    const handleClick = async (ids: string[]) => {
        // log dữ liệu từ onchange (khi người dùng xác nhận)
        if (!nextLink) return;
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("sp_session", getSession());
            ids.forEach((id) => formData.append("id_category[]", id));
            const response = await axiosClient.post(nextLink, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const nextRes = response.data.next;

            if (nextRes) {
                setIsAssistantTyping(true);
                addMessage(createMessageFromResponse(response.data));

                const res = await axiosClient.get(nextRes);

                const nextWait = res.data.next_wait;
                const dataPost = res.data.data.data_post;
                const sendChat = res.data.send_chat;
                const isChat = res.data.is_chat;

                addMessage(createMessageFromResponse(res.data));
                setIsAssistantTyping(false);

                if (sendChat === 1) {
                    setEvent(isChat);
                    setMode("chat");
                    setNextLink(nextWait);
                    setDataPost(dataPost);
                }
            }
        } catch (error) {
            console.error("Error post categories:", error);
            setIsAssistantTyping(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CategorySelectList
            title={title}
            optionsCategory={optionsCategory}
            onConfrim={handleClick}
            disable={disable || loading}
            loading={loading}
        />
    );
};

export default CategoryPanel;
