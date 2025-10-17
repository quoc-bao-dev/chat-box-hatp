"use client";

import { cn } from "@/core/utils/cn";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { _Image } from "@/core/config";
import Image from "next/image";
import { Icon } from "../common";
import { LoginButton } from "../ui";

const MainLayout = ({ children }: PropsWithChildren) => {
    const [hasBackground, setHasBackground] = useState(true);

    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/") {
            setHasBackground(true);
        } else {
            setHasBackground(false);
        }
    }, [pathname]);
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
            <div className="lg:hidden fixed top-5 w-full flex gap-2 justify-between px-4 ">
                {/* icon bar */}
                <div className="">
                    <Icon src={_Image.icon.icon_bar} size={32} alt="icon-bar" />
                </div>

                {/* title */}
                <div className="flex items-center gap-2">
                    <Icon
                        src={_Image.icon.icon_headphone}
                        size={24}
                        alt="icon-headphone"
                    />
                    <p className="text font-semibold text-[#5E5E5E]">
                        Giấy Hoàng Anh hỗ trợ
                    </p>
                </div>

                {/* button login */}
                <div className="">
                    <LoginButton />
                </div>
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
        </div>
    );
};

export default MainLayout;
