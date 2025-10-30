import { useDebounce } from "@/core/hook";
import { axiosInstance } from "@/core/http";
import { createMessage } from "@/core/utils/createMessageFromResponse";
import { getSession } from "@/core/utils/session";
import {
    ListProductsResponse,
    useSearchProductSuggestion,
} from "@/services/chatbot";
import { useChatBoxActions } from "@/store";
import { useChatInputStore } from "@/store/chatInputStore";
import { useMemo, useState } from "react";
import ChatInput from "./ChatInput";

const ChatInputController = () => {
    const { addMessage, setMode, setIsAssistantTyping } = useChatBoxActions();

    const { event, nextLink, dataPost, setEvent, setNextLink, setDataPost } =
        useChatInputStore();

    const [inputValue, setInputValue] = useState("");
    const debouncedValue = useDebounce(inputValue, 200);

    const { data: suggestion } = useSearchProductSuggestion(debouncedValue);

    const suggestText = useMemo(() => {
        return suggestion?.code || "";
    }, [suggestion]);

    const handleSend = async (message: string) => {
        addMessage(
            createMessage({
                content: message,
                sendType: "text",
                sender: "user",
                id: -1,
            })
        );

        // [is_chat == 2] mở input chat 1 lần
        if (event === 2) {
            setIsAssistantTyping(true);
            setMode("click");
        }

        try {
            const res = await axiosInstance.post<ListProductsResponse>(
                nextLink as string,
                {
                    message,
                    ...dataPost,
                    sp_session: getSession(),
                }
            );

            setIsAssistantTyping(false);

            // xử lý tiếp data
            res.data.data_array.forEach((item) => {
                if (
                    item.show_move_event === "FindInfoProduct" ||
                    item.show_move_event === "event_order"
                ) {
                    addMessage({
                        id: -1,
                        sender: "assistant",
                        content: item.message,
                        sendType: "products",
                        products: item.json_item,
                        options: item.options,
                    });
                }

                // xử lý khi không tìm thấy sản phẩm
                if (item.show_move_event === "not_found_product") {
                    if (item.is_chat === 2) {
                        setEvent(2);
                        setMode("chat");
                        setNextLink(item.next_wait);
                        setDataPost(item.data_post);
                    }
                    addMessage({
                        id: -1,
                        sender: "assistant",
                        content: item.message,
                        sendType: "not-found-product",
                    });
                }
            });
        } catch (error) {
            setIsAssistantTyping(false);
        } finally {
        }
    };

    return <ChatInput onSend={handleSend} onChange={setInputValue} />;
};

export default ChatInputController;
