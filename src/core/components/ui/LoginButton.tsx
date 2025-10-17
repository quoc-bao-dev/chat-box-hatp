import { cn } from "@/core/utils/cn";
import React from "react";

type LoginButtonProps = {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
};

const LoginButton: React.FC<LoginButtonProps> = ({
    className,
    onClick,
    children,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                // container
                "relative inline-flex items-center gap-5  px-1 lg:px-2 py-1 lg:py-2 rounded-full",
                "bg-[linear-gradient(180deg,#35C282_0%,#1E9E64_100%)]",
                "shadow-[inset_0_-6px_14px_rgba(0,0,0,0.15),0_8px_24px_rgba(30,158,100,0.35)]",
                "text-white",
                className
            )}
        >
            <span className="text-sm lg:text-[16px] leading-none font-semibold select-none pl-4 lg:pl-6 truncate">
                {children ?? "Đăng nhập"}
            </span>
            <span
                className={cn(
                    "flex items-center justify-center",
                    "size-[24px] lg:size-[32px] rounded-full",
                    "bg-white",
                    "shadow-[0_6px_20px_rgba(53,194,130,0.35),inset_0_-8px_20px_rgba(0,0,0,0.08)]"
                )}
            >
                {/* arrow up-right */}
                <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#1E9E64]"
                >
                    <path
                        d="M7 17L17 7M17 7H9M17 7V15"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        </button>
    );
};

export default LoginButton;
