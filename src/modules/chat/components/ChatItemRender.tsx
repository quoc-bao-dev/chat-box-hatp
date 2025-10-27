import Time from "@/core/components/common/Time";
import { NoProductFound } from "@/core/components/ui";
import { ProductItem, ProductOption } from "@/services/chatbot";
import { RobotOption } from "@/services/robot";
import { SendType } from "@/store/chatBoxStore";
import AssistantMessage from "./AssistantMessage";
import Feedback from "./Feedback";
import InfoPanel from "./infomation/InfoPanel";
import EditProductCodePanel from "./product-price-lookup/EditProductCodePanel";
import ProductPanel from "./product-price-lookup/ProductPanel";
import UserMessage from "./UserMessage";
import ProductListDisplayPanel from "./product-price-lookup/ProductListDisplayPanel";

type ChatItemRenderProps = {
    id: number;
    sender: "user" | "assistant";
    content?: string;
    sendType: SendType;
    options?: RobotOption[];
    productOptions?: ProductOption[];
    products?: ProductItem[];
    feedback?: {
        rating: "good" | "normal" | "bad";
        tags: string[];
        isEvaluated: boolean;
    };
    time?: string;
    disableAction?: boolean;
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
    disableAction = false,
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
                            disable={disableAction}
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
                        disable={disableAction}
                    />
                }
            />
        );
    }

    if (sender === "assistant" && sendType === "table-price") {
        console.log("[options]", options);

        return (
            <AssistantMessage
                content={
                    <ProductListDisplayPanel
                        items={products || []}
                        options={options || []}
                        disable={disableAction || options?.length == 0}
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
                    disable={disableAction}
                    options={options || []}
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
