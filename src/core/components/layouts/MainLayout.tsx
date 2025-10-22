"use client";

import { useDevice } from "@/core/hook/useDevice";
import { cn } from "@/core/utils/cn";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "../common/Header";
import MobileSidebar from "./MobileSidebar";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }: PropsWithChildren) => {
    const [hasBackground, setHasBackground] = useState(true);
    const { isMobile: isMobileDevice } = useDevice();

    const pathname = usePathname();

    useEffect(() => {
        if (isMobileDevice) {
            setHasBackground(true);
            return;
        }
        setHasBackground(pathname === "/");
    }, [pathname, isMobileDevice]);

    return (
        <div className="min-h-[100svh] relative z-0 bg-white">
            {/* === background === */}
            <div
                className={cn(
                    "absolute inset-0",
                    hasBackground &&
                        (isMobileDevice
                            ? "bg-gradient-to-b from-[#D3FFF0] to-[#FFEDCF]"
                            : "bg-gradient-to-r from-[#D3FFF0] to-[#FFEDCF]")
                )}
            ></div>

            {/* === header === */}
            <div className="lg:hidden fixed top-5 w-full z-50">
                {/* === header mobile === */}
                <Header />
                {/* <p className="text-gray-600">{log}</p> */}
            </div>

            {/* === content === */}
            <div
                className={`relative z-10 w-full h-full flex flex-col gap-6 p-5 lg:flex-row`}
            >
                {/* === sidebar === */}
                <div className="hidden lg:block lg:w-1/6 h-[calc(100svh-40px)] ">
                    <Sidebar />
                </div>

                {/* === main content === */}
                <div className="lg:w-5/6 w-full h-fit ">{children}</div>
            </div>

            {/* Mobile Sidebar */}
            <MobileSidebar />
            <Toaster />
        </div>
    );
};

export default MainLayout;
