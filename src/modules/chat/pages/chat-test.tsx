import { ChatBoxContainer } from "@/core/components/layouts";
import BottomBar from "../components/BottomBar";
import BottomBarWrapper from "../components/BottomBarWrapper";
import ChatBoxController from "../components/ChatBoxController";
import ChatBoxHeader from "../components/ChatBoxHeader";
import OrderDetailsPanel from "../components/create-order/OrderDetailsPanel";

const ChatTestPage = () => {
    return (
        <>
            <ChatBoxController />
            <div className="flex flex-col h-[calc(100svh-40px)] lg:h-[calc(100svh-40px)] gap-5">
                {/* === header === */}
                <ChatBoxHeader />

                {/* === chat content === */}
                <div className="min-h-0 flex-1 flex flex-col gap-4 lg:bg-[#DFF3E299] lg:rounded-[32px] lg:pb-5">
                    {/* === chat scroll === */}
                    <ChatBoxContainer className="min-h-0 w-full flex-1">
                        {/* <ChatBoxRender /> */}
                        {/* <Feedback /> */}

                        {/* <OrderDetailsPanel /> */}
                    </ChatBoxContainer>

                    {/* === bottom content === */}
                    <div className="flex-shrink-0 w-full relative z-30">
                        <div className="w-full lg:px-5">
                            <BottomBarWrapper>
                                <BottomBar type="info" />
                                <BottomBar type="chat" />
                            </BottomBarWrapper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatTestPage;
