"use client";

import { PropsWithChildren } from "react";
import AutoSetSession from "../components/common/AutoSetSession";
import DeviceProvider from "./DeviceProvider";
import QueryProvider from "./QueryProvider";

const AppProvider = ({ children }: PropsWithChildren) => {
    return (
        <QueryProvider>
            <DeviceProvider>{children}</DeviceProvider>
            <AutoSetSession />
        </QueryProvider>
    );
};

export default AppProvider;
