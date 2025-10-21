"use client";

import { PropsWithChildren } from "react";
import AutoLoadMessage from "../components/common/AutoLoadMessage";
import AutoSetSession from "../components/common/AutoSetSession";
import CountdownFeedback from "../components/common/CountdownFeedback";
import DeviceProvider from "./DeviceProvider";
import QueryProvider from "./QueryProvider";

const AppProvider = ({ children }: PropsWithChildren) => {
    return (
        <QueryProvider>
            <DeviceProvider>{children}</DeviceProvider>
            <AutoSetSession />
            <AutoLoadMessage />
            <CountdownFeedback />
        </QueryProvider>
    );
};

export default AppProvider;
