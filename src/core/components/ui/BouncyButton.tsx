"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/core/utils/cn";

type BouncyButtonVariant = "solid" | "outlineGradient" | "outlineSubtle";
type BouncyButtonSize = "sm" | "md" | "lg";

type BouncyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: BouncyButtonVariant;
    fullWidth?: boolean;
    size?: BouncyButtonSize;
};

const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none transition-all duration-200";

// Normalize outer box for all variants; inner span carries padding
const variantClasses: Record<BouncyButtonVariant, string> = {
    solid: "p-[1px] bg-transparent shadow-sm",
    outlineGradient:
        "p-[1px] bg-[linear-gradient(45deg,#FFFFFF99,#37C390,#37C39066)]",
    outlineSubtle:
        "p-[1px] border border-[rgba(55,195,144,0.35)] bg-transparent",
};

const sizeClasses: Record<BouncyButtonSize, string> = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-5 py-3",
    lg: "text-base px-6 py-3.5",
};

const innerOutlineGradientBase =
    "rounded-full bg-white text-gray-900 hover:bg-white/90";
const innerSolidBase =
    "rounded-full bg-[#00A76F] text-white hover:bg-[#00A76F]/80";
const innerSubtleBase = "rounded-full bg-white text-gray-900";
const innerSizeClasses: Record<BouncyButtonSize, string> = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-5 py-3",
    lg: "text-base px-6 py-3.5",
};

const BouncyButton = forwardRef<HTMLButtonElement, BouncyButtonProps>(
    (
        {
            className,
            variant = "solid",
            fullWidth = false,
            size = "md",
            children,
            ...props
        },
        ref
    ) => {
        const innerBase =
            variant === "solid"
                ? innerSolidBase
                : variant === "outlineGradient"
                ? innerOutlineGradientBase
                : innerSubtleBase;

        return (
            <button
                ref={ref}
                className={cn(
                    baseClasses,
                    variantClasses[variant],
                    fullWidth && "w-full",
                    className
                )}
                {...props}
            >
                <span
                    className={cn(
                        innerBase,
                        innerSizeClasses[size],
                        "inline-flex items-center justify-center"
                    )}
                >
                    {children}
                </span>
            </button>
        );
    }
);

BouncyButton.displayName = "BouncyButton";

export default BouncyButton;
