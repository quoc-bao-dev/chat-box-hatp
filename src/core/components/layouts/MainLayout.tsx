"use client";

import { cn } from "@/core/utils/cn";
import { useSidebar } from "@/store/sidebarStore";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import Header from "../common/Header";
import MobileSidebar from "./MobileSidebar";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }: PropsWithChildren) => {
    const [hasBackground, setHasBackground] = useState(true);
    const { setMobile, isMobile } = useSidebar();

    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/") {
            setHasBackground(true);
        } else if (isMobile) {
            setHasBackground(true);
        } else {
            setHasBackground(false);
        }
    }, [pathname]);

    // Detect mobile/desktop and update sidebar store
    useEffect(() => {
        const checkIsMobile = () => {
            setMobile(window.innerWidth < 1024);
        };

        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);

        return () => window.removeEventListener("resize", checkIsMobile);
    }, [setMobile]);
    return (
        <div className="bg-background min-h-screen relative z-0">
            {/* === background === */}
            <div
                className={cn(
                    "absolute inset-0",
                    hasBackground &&
                        "bg-gradient-to-r from-[#D3FFF0] to-[#FFEDCF]"
                )}
            ></div>

            {/* === header === */}
            <div className="lg:hidden fixed top-5 w-full z-50">
                {/* === header mobile === */}
                <Header />
            </div>

            {/* === content === */}
            <div
                className={`relative z-10 w-full h-full flex flex-col gap-6 p-5 lg:flex-row`}
            >
                {/* === sidebar === */}
                <div className="hidden lg:block lg:w-1/6 h-[calc(100vh-40px)] ">
                    <Sidebar />
                </div>

                {/* === main content === */}
                <div className="lg:w-5/6 w-full h-fit ">{children}</div>
            </div>

            {/* Mobile Sidebar */}
            <MobileSidebar />
        </div>
    );
};

export default MainLayout;
