import { cn } from "@/core/utils/cn";
import { PropsWithChildren } from "react";

type ChatBoxContainerProps = PropsWithChildren & {
    className?: string;
    wrapperClassName?: string;
};

const ChatBoxContainer = ({
    children,
    className,
    wrapperClassName,
}: ChatBoxContainerProps) => {
    return (
        <div
            className={cn(
                "max-w-[1400px] mx-auto px-2 flex flex-col",
                className
            )}
        >
            <div
                className={cn(
                    "w-full h-full relative flex-1",
                    wrapperClassName
                )}
            >
                {children}
            </div>
        </div>
    );
};

export default ChatBoxContainer;
