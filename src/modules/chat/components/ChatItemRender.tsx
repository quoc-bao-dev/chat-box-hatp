import Time from "@/core/components/common/Time";
import { NoProductFound } from "@/core/components/ui";
import { ProductItem, ProductOption } from "@/services/chatbot";
import AssistantMessage from "./AssistantMessage";
import Feedback from "./Feedback";
import InfoPanel from "./infomation/InfoPanel";
import EditProductCodePanel from "./product-price-lookup/EditProductCodePanel";
import ProductPanel from "./product-price-lookup/ProductPanel";
import UserMessage from "./UserMessage";

type ChatItemRenderProps = {
    id: number;
    sender: "user" | "assistant";
    content?: string;
    sendType:
        | "select"
        | "options"
        | "text"
        | "start"
        | "feedback"
        | "time"
        | "wait_reply"
        | "products"
        | "not-found-product"
        | "edit-product-code";
    options?: { id: string; content: string; next?: string }[];
    productOptions?: ProductOption[];
    products?: ProductItem[];
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
    productOptions,
    products,
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

    if (sender === "assistant" && sendType === "not-found-product") {
        return <AssistantMessage content={<NoProductFound />} />;
    }

    if (sender === "assistant" && sendType === "start") {
        return <AssistantMessage content={content || ""} />;
    }

    if (sender === "assistant" && sendType === "text") {
        return <AssistantMessage content={content || ""} />;
    }

    if (sender === "assistant" && sendType === "wait_reply") {
        return <AssistantMessage content={content || ""} />;
    }
    if (sender === "assistant" && sendType === "options") {
        return <AssistantMessage content={content || ""} />;
    }

    if (sender === "assistant" && sendType === "products") {
        return (
            <AssistantMessage
                content={
                    <ProductPanel
                        id={id}
                        content={content}
                        products={products}
                        options={productOptions}
                    />
                }
            />
        );
    }
    if (sender === "user" && sendType === "products") {
        return (
            <AssistantMessage
                content={
                    <ProductPanel
                        id={id}
                        content={content}
                        products={products}
                        options={productOptions}
                    />
                }
            />
        );
    }

    if (sender === "user" && sendType === "start") {
        return <UserMessage content={content || ""} />;
    }

    if (sender === "user" && (sendType === "options" || sendType === "text")) {
        return <UserMessage content={content || ""} />;
    }

    if (sendType === "edit-product-code") {
        return (
            <div className="flex justify-end">
                <EditProductCodePanel
                    items={products || []}
                    idChat={id.toString()}
                />
            </div>
        );
    }

    if (sendType === "feedback") {
        return <Feedback feedbackData={feedback} />;
    }

    if (sendType === "time" && time) {
        return <Time time={time} />;
    }

    if (sender === "user") {
        return <UserMessage content={content || ""} />;
    }
    return <div></div>;
};

export default ChatItemRender;
