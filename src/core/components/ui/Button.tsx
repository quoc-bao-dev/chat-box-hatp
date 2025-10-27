import { cn } from "@/core/utils/cn";

type ButtonSize = "xs" | "sm" | "md" | "lg";

type ButtonProps = {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
    size?: ButtonSize;
    variant?: "primary" | "secondary" | "outline";
    showIcon?: boolean;
};

const Button: React.FC<ButtonProps> = ({
    className,
    onClick,
    children,
    size = "md",
    variant = "primary",
    showIcon = false,
}) => {
    const sizeClasses = {
        xs: {
            outer: "px-1 py-0.5",
            inner: "px-2 py-0.5",
            text: "text-xs px-2",
            icon: "size-[16px]",
        },
        sm: {
            outer: "px-1 py-1",
            inner: "px-2 py-1",
            text: "text-sm px-3",
            icon: "size-[20px]",
        },
        md: {
            outer: "px-1 py-1.5",
            inner: "px-2 py-1.5",
            text: "text-sm lg:text-base px--",
            icon: "size-[24px] lg:size-[32px]",
        },
        lg: {
            outer: "px-1 py-2",
            inner: "px-2 py-2",
            text: "text-base lg:text-lg px-5",
            icon: "size-[28px] lg:size-[36px]",
        },
    };

    const variantClasses = {
        primary: {
            outer: "bg-[#30E3CA] shadow-[0_8px_24px_rgba(30,158,100,0.20)]",
            inner: "bg-[linear-gradient(90deg,#00A76F_50.96%,#A1EBD2_93.27%)]",
            hover: "hover:brightness-105 hover:shadow-[0_12px_32px_rgba(30,158,100,0.30)]",
        },
        secondary: {
            outer: "bg-gray-200 shadow-sm",
            inner: "bg-gray-50",
            hover: "hover:brightness-105",
        },
        outline: {
            outer: "border-2 border-[#30E3CA] bg-transparent shadow-sm",
            inner: "bg-transparent border-0",
            hover: "hover:bg-[#30E3CA]/10",
        },
    };

    const currentSize = sizeClasses[size];
    const currentVariant = variantClasses[variant];

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "relative inline-flex rounded-full cursor-pointer",
                "transition-all duration-300 ease-out",
                currentVariant.outer,
                currentVariant.hover,
                className
            )}
        >
            <span
                className={cn(
                    "inline-flex items-center gap-2 rounded-full",
                    currentSize.inner,
                    currentVariant.inner,
                    variant === "primary" &&
                        "shadow-[inset_0_-6px_14px_rgba(0,0,0,0.12)]"
                )}
            >
                <span
                    className={cn(
                        "leading-none font-semibold select-none truncate",
                        currentSize.text,
                        variant === "outline" ? "text-[#30E3CA]" : "text-white"
                    )}
                >
                    {children}
                </span>

                {/* === icon === */}
                {showIcon && (
                    <span
                        className={cn(
                            "flex items-center justify-center rounded-full",
                            currentSize.icon,
                            variant === "primary" || variant === "secondary"
                                ? "bg-white"
                                : "bg-[#30E3CA]"
                        )}
                        style={
                            variant === "primary"
                                ? {
                                      boxShadow:
                                          "0 6px 20px rgba(53,194,130,0.35), inset 0 -8px 20px rgba(0,0,0,0.08)",
                                  }
                                : variant === "secondary"
                                ? {
                                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                  }
                                : undefined
                        }
                    >
                        <svg
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={
                                variant === "outline"
                                    ? "text-white"
                                    : "text-[#1E9E64]"
                            }
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
                )}
            </span>
        </button>
    );
};

export default Button;
