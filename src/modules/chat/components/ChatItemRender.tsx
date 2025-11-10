import Time from "@/core/components/common/Time";
import { NoProductFound } from "@/core/components/ui";
import CancelSuccess from "@/core/components/ui/CancelSuccess";
import { ProductItem, ProductOption } from "@/services/chatbot";
import { OrderDetail } from "@/services/order/type";
import {
    AddressOption,
    CategoryOption,
    OptionLandscapeAndVertical,
    ProductBrandOption,
    ProductQuantityOption,
    ProductSizeOption,
    RobotOption,
} from "@/services/robot";
import { SendType } from "@/store/chatBoxStore";
import AssistantMessage from "./AssistantMessage";
import OrderDetailsPanel from "./create-order/OrderDetailsPanel";
import OrderSuccessPanel from "./create-order/OrderSuccessPanel";
import Feedback from "./Feedback";
import InfoPanel from "./infomation/InfoPanel";
import CategoryPanel from "./product-price-lookup/CategoryPanel";
import EditProductCodePanel from "./product-price-lookup/EditProductCodePanel";
import ProductListDisplayPanel from "./product-price-lookup/ProductListDisplayPanel";
import ProductPanel from "./product-price-lookup/ProductPanel";
import UserMessage from "./UserMessage";
import AddressPanel from "./product-price-lookup/AddressPanel";
import LandscapeAndVerticalPanel from "./new-guest/LandscapeAndVerticalPanel";
import ProductFilterPanel from "./new-guest/ProductFilterPanel";

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

    nextLink?: string;

    time?: string;
    disableAction?: boolean;
    orderDetail?: OrderDetail;
    optionsCategory?: CategoryOption[];
    optionsAddressShip?: AddressOption[];
    optionsLandscapeAndVertical?: OptionLandscapeAndVertical[];
    productFilterSizes?: ProductSizeOption[];
    productFilterQuantities?: ProductQuantityOption[];
    productFilterBrands?: ProductBrandOption[];
    isHistory?: boolean;
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
    orderDetail,
    time,
    disableAction = false,
    optionsCategory,
    optionsAddressShip,
    optionsLandscapeAndVertical,
    productFilterSizes,
    productFilterQuantities,
    productFilterBrands,
    nextLink,
    isHistory,
}: ChatItemRenderProps) => {
    if (sender === "assistant" && sendType === "cancel-product") {
        return (
            <AssistantMessage
                // mode="panel"
                content={<CancelSuccess content={content || ""} />}
            />
        );
    }

    if (sender === "assistant" && sendType === "select") {
        return (
            <AssistantMessage
                // mode="panel"
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

    if (sender === "assistant" && sendType === "select-category") {
        return (
            <AssistantMessage
                content={
                    !isHistory || !disableAction ? (
                        <CategoryPanel
                            title={content || ""}
                            optionsCategory={optionsCategory || []}
                            disable={disableAction}
                        />
                    ) : (
                        content
                    )
                }
            />
        );
    }

    if (sender === "assistant" && sendType === "select-address-ship") {
        const next = nextLink ? nextLink : sessionStorage.getItem("nextLink");
        return (
            <AssistantMessage
                mode="panel"
                content={
                    <AddressPanel
                        title={content || ""}
                        addresses={optionsAddressShip || []}
                        disable={disableAction}
                        nextLink={next!}
                        messageId={id}
                        isHistory={isHistory && !optionsAddressShip}
                    />
                }
            />
        );
    }

    if (sender === "assistant" && sendType === "product-filter") {
        return (
            <AssistantMessage
                mode="panel"
                content={
                    !isHistory || !disableAction ? (
                        <ProductFilterPanel
                            title={content || ""}
                            sizes={productFilterSizes}
                            quantities={productFilterQuantities}
                            brands={productFilterBrands}
                            nextLink={nextLink}
                            disable={disableAction}
                            messageId={id}
                        />
                    ) : (
                        content
                    )
                }
            />
        );
    }

    if (sender === "assistant" && sendType === "landscape-and-vertical") {
        return (
            <AssistantMessage
                mode="panel"
                content={
                    !isHistory || !disableAction ? (
                        <LandscapeAndVerticalPanel
                            title={content || ""}
                            options={optionsLandscapeAndVertical || []}
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

    if (sender === "assistant" && sendType === "show-create-orders") {
        return (
            <AssistantMessage
                mode="panel"
                content={
                    <OrderSuccessPanel
                        options={options || []}
                        disable={disableAction || !options}
                    />
                }
            />
        );
    }

    if (sender === "assistant" && sendType === "order-detail") {
        return (
            <>
                <div className=" hidden lg:block">
                    <AssistantMessage
                        content={
                            <OrderDetailsPanel orderDetail={orderDetail!} />
                        }
                    />
                </div>
                <div className="lg:hidden">
                    <OrderDetailsPanel orderDetail={orderDetail!} />
                </div>
            </>
        );
    }

    if (sender === "assistant" && sendType === "products") {
        return (
            <AssistantMessage
                mode="panel"
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
        return (
            <AssistantMessage
                mode="panel"
                content={
                    <ProductListDisplayPanel
                        items={products || []}
                        options={options || []}
                        disable={disableAction || options?.length == 0}
                        idChat={id.toString()}
                        title={content}
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
