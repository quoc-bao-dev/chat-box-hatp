"use client";

import { useChatBoxState } from "@/store";
import { Children, PropsWithChildren } from "react";

const BottomBarWrapper = ({ children }: PropsWithChildren) => {
    const { mode } = useChatBoxState();

    console.log(mode);

    const childArray = Children.toArray(children);
    const first = childArray[0] ?? null;
    const second = childArray[1] ?? null;

    if (mode === "click") {
        return <>{first}</>;
    }
    return <>{second}</>;
};

export default BottomBarWrapper;
