import LandscapeAndVerticalSelectList from "@/core/components/ui/LandscapeAndVerticalSelectList";
import axiosClient from "@/core/http/axiosClient";
import { createMessageFromResponse } from "@/core/utils/createMessageFromResponse";
import { getSession } from "@/core/utils/session";
import { OptionLandscapeAndVertical } from "@/services/robot/type";
import { useChatBoxActions } from "@/store";
import { useChatInputStore } from "@/store/chatInputStore";
import { useNextEventState } from "@/store/nextEventStore";
import { useState } from "react";

type LandscapeAndVerticalPanelProps = {
    title: string;
    options: OptionLandscapeAndVertical[];
    disable?: boolean;
};

const LandscapeAndVerticalPanel = ({
    title,
    options,
    disable = false,
}: LandscapeAndVerticalPanelProps) => {
    const { nextLink } = useNextEventState();

    const { setNextLink, setDataPost, setEvent } = useChatInputStore();
    const { addMessage, setIsAssistantTyping, setMode } = useChatBoxActions();
    const [loading, setLoading] = useState(false);
    const [addingLoading, setAddingLoading] = useState(false);

    const handleClick = async (ids: string[]) => {
        if (!nextLink) return;
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("sp_session", getSession());
            ids.forEach((id) =>
                formData.append("id_landscape_and_vertical[]", id)
            );
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
            console.error("Error post landscape and vertical:", error);
            setIsAssistantTyping(false);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (
        landscape: string,
        vertical: string,
        name?: string
    ) => {
        if (!nextLink) return;
        try {
            setAddingLoading(true);
            const formData = new FormData();
            formData.append("sp_session", getSession());
            formData.append("landscape", landscape);
            formData.append("vertical", vertical);
            if (name) {
                formData.append("name", name);
            }

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
            console.error("Error add landscape and vertical:", error);
            setIsAssistantTyping(false);
            throw error; // Re-throw để component con có thể xử lý
        } finally {
            setAddingLoading(false);
        }
    };

    return (
        <LandscapeAndVerticalSelectList
            title={title}
            options={options}
            onConfirm={handleClick}
            onAdd={handleAdd}
            disable={disable || loading || addingLoading}
        />
    );
};

export default LandscapeAndVerticalPanel;
