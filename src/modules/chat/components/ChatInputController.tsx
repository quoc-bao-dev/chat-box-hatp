import { axiosInstance } from "@/core/http";
import { createMessage } from "@/core/utils/createMessageFromResponse";
import { getSession } from "@/core/utils/session";
import { GetActiveRobotDetailResponse } from "@/services/robot";
import { useChatBoxActions } from "@/store";
import { useChatInputStore } from "@/store/chatInputStore";
import ChatInput from "./ChatInput";
import { ListProductsResponse } from "@/services/chatbot";

const ChatInputController = () => {
    const { addMessage, setMode } = useChatBoxActions();
    const { event, nextLink, dataPost } = useChatInputStore();
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
            setMode("click");
        }

        const res = await axiosInstance.post<ListProductsResponse>(
            nextLink as string,
            {
                message,
                ...dataPost,
                sp_session: getSession(),
            }
        );

        // xử lý tiếp data
        res.data.data_array.forEach((item) => {
            console.log(item);
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
                });
            }
        });

        // if (res.data.)

        // add message
    };
    return <ChatInput onSend={handleSend} />;
};

export default ChatInputController;
