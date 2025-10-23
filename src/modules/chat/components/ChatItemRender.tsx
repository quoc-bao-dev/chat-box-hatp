import AssistantMessage from "./AssistantMessage";
import Feedback from "./Feedback";
import InfoPanel from "./infomation/InfoPanel";
import UserMessage from "./UserMessage";
import Time from "@/core/components/common/Time";

type ChatItemRenderProps = {
    id: number;
    sender: "user" | "assistant";
    content?: string;
    sendType: "select" | "options" | "text" | "start" | "feedback" | "time";
    options?: { id: string; content: string; next?: string }[];
    feedback?: {
        rating: "good" | "normal" | "bad";
        tags: string[];
        isEvaluated: boolean;
    };
    time?: string;
};

const ChatItemRender = ({
    id,
    sender,
    content,
    sendType,
    options,
    feedback,
    time,
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

    if (sender === "assistant" && sendType === "start") {
        return <AssistantMessage content={content || ""} />;
    }

    if (sender === "assistant" && sendType === "text") {
        return <AssistantMessage content={content || ""} />;
    }

    if (sender === "user" && sendType === "start") {
        return <UserMessage content={content || ""} />;
    }

    if (sender === "user" && (sendType === "options" || sendType === "text")) {
        return <UserMessage content={content || ""} />;
    }

    if (sendType === "feedback") {
        return <Feedback feedbackData={feedback} />;
    }

    if (sendType === "time" && time) {
        return <Time time={time} />;
    }

    return <div></div>;
};

export default ChatItemRender;
