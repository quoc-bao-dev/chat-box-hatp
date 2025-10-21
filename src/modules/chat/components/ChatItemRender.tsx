import AssistantMessage from "./AssistantMessage";
import InfoPanel from "./InfoPanel";
import UserMessage from "./UserMessage";

type ChatItemRenderProps = {
    sender: "user" | "assistant";
    content?: string;
    sendType: "select" | "options" | "text";
    options?: { id: string; content: string; next?: string }[];
};

const ChatItemRender = ({
    sender,
    content,
    sendType,
    options,
}: ChatItemRenderProps) => {
    if (sendType === "select" && sender === "assistant") {
        return (
            <div>
                <AssistantMessage content={content!} />
                <div className="pt-3 pl-12">
                    <InfoPanel items={options} />
                </div>
            </div>
        );
    }

    if (sendType === "options" && sender === "user") {
        return <UserMessage content={content || ""} />;
    }

    if (sendType === "text" && sender === "assistant") {
        return <AssistantMessage content={content || ""} />;
    }

    return <div>ChatItemRender</div>;
};

export default ChatItemRender;
