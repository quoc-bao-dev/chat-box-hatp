import { createMessage } from "@/core/utils/createMessageFromResponse";
import { useChatBoxActions } from "@/store";
import ChatInput from "./ChatInput";

const ChatInputController = () => {
    const { addMessage } = useChatBoxActions();
    const handleSend = (message: string) => {
        // addMessage(
        //     createMessage({
        //         content: message,
        //         sendType: "text",
        //         sender: "user",
        //     })
        // );
    };
    return <ChatInput onSend={handleSend} />;
};

export default ChatInputController;
