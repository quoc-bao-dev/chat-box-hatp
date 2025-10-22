import AssistantMessage from "./AssistantMessage";
import InfoPanel from "./infomation/InfoPanel";
import UserMessage from "./UserMessage";

type ChatItemRenderProps = {
    id: number;
    sender: "user" | "assistant";
    content?: string;
    sendType: "select" | "options" | "text";
    options?: { id: string; content: string; next?: string }[];
};

const ChatItemRender = ({
    id,
    sender,
    content,
    sendType,
    options,
}: ChatItemRenderProps) => {
    if (sender === "assistant" && sendType === "select") {
        return (
            <AssistantMessage
                content={
                    options && options.length > 0 ? (
                        <InfoPanel
                            title={content}
                            items={options}
                            messageId={id}
                        />
                    ) : (
                        content
                    )
                }
            />
        );
    }

    if (sender === "assistant" && sendType === "text") {
        return <AssistantMessage content={content || ""} />;
    }

    if (sender === "user" && (sendType === "options" || sendType === "text")) {
        return <UserMessage content={content || ""} />;
    }

    return <div>ChatItemRender</div>;
};

export default ChatItemRender;
