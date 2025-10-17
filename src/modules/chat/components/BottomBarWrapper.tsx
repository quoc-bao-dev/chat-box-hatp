"use client";

import { useSearchParams } from "next/navigation";
import { Children, PropsWithChildren } from "react";

const BottomBarWrapper = ({ children }: PropsWithChildren) => {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    const childArray = Children.toArray(children);
    const first = childArray[0] ?? null;
    const second = childArray[1] ?? null;

    if (type === "greeting") {
        return <>{first}</>;
    }
    return <>{second}</>;
};

export default BottomBarWrapper;
