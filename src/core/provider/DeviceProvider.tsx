"use client";

import { useDeviceStore } from "@/core/hook/useDevice";
import { PropsWithChildren, useEffect } from "react";

const DeviceProvider = ({ children }: PropsWithChildren) => {
    const setDimensions = useDeviceStore((s) => s.setDimensions);

    useEffect(() => {
        const handler = () =>
            setDimensions(window.innerWidth, window.innerHeight);
        handler();
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, [setDimensions]);

    return <>{children}</>;
};

export default DeviceProvider;
