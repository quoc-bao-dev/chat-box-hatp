"use client";
import { useLoginFlow } from "@/core/hook/useLoginFlow";
import { cn } from "@/core/utils/cn";
import LoginModal from "./LoginModal";
import OTPModal from "./OTPModal";
import FirstTimeLoginModal from "./FirstTimeLoginModal";

type LoginButtonProps = {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
    onLoginSuccess?: (credentials: any) => void | Promise<void>;
    onOTPVerify?: (otp: string, phoneNumber: string) => void | Promise<void>;
    onLoginError?: (error: Error) => void;
    onOTPError?: (error: Error) => void;
};

const LoginButton: React.FC<LoginButtonProps> = ({
    className,
    onClick,
    children,
    onLoginSuccess,
    onOTPVerify,
    onLoginError,
    onOTPError,
}) => {
    const {
        isLoginModalOpen,
        isOTPModalOpen,
        isFirstTimeLoginModalOpen,
        phoneNumber,
        key_pass_code,
        openLoginModal,
        closeLoginModal,
        closeOTPModal,
        closeFirstTimeLoginModal,
        handleLoginSuccess,
        handleOTPVerify,
        handleBackToLogin,
        handleFirstTimeLogin,
    } = useLoginFlow({
        onLoginSuccess,
        onOTPVerify,
        onLoginError,
        onOTPError,
    });

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            openLoginModal();
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                className={cn(
                    "relative inline-flex rounded-full p-[1px] cursor-pointer",
                    "bg-[#30E3CA]",
                    "shadow-[0_8px_24px_rgba(30,158,100,0.20)]",
                    "transition-all duration-300 ease-out",
                    "hover:brightness-105 hover:shadow-[0_12px_32px_rgba(30,158,100,0.30)]",
                    className
                )}
            >
                <span
                    className={cn(
                        "inline-flex items-center gap-3 px-1 lg:px-2 py-1.5 lg:py-2 rounded-full",
                        // inner background gradient (green)
                        "bg-[linear-gradient(90deg,#00A76F_50.96%,#A1EBD2_93.27%)]",
                        "shadow-[inset_0_-6px_14px_rgba(0,0,0,0.12)]"
                    )}
                >
                    <span className="text-sm lg:text-[16px] leading-none font-semibold select-none pl-4 lg:pl-4 truncate text-white">
                        {children ?? "Đăng nhập"}
                    </span>

                    {/* === icon === */}
                    <span
                        className={cn(
                            "flex items-center justify-center",
                            "size-[24px] lg:size-[32px] rounded-full",
                            "bg-white",
                            "shadow-[0_6px_20px_rgba(53,194,130,0.35),inset_0_-8px_20px_rgba(0,0,0,0.08)]"
                        )}
                    >
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
                </span>
            </button>

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={closeLoginModal}
                onLogin={handleLoginSuccess}
            />
            {/* <FirstTimeLoginModal
                isOpen={isLoginModalOpen}
                onClose={closeLoginModal}
                // onSubmit={handleLoginSuccess}
            /> */}

            {/* OTP Modal */}
            <OTPModal
                isOpen={isOTPModalOpen}
                onClose={closeOTPModal}
                onVerify={handleOTPVerify}
                onBack={handleBackToLogin}
                onFirstTimeLogin={handleFirstTimeLogin}
                phoneNumber={phoneNumber}
            />

            {/* First Time Login Modal */}
            <FirstTimeLoginModal
                isOpen={isFirstTimeLoginModalOpen}
                onClose={closeFirstTimeLoginModal}
                phoneNumber={phoneNumber}
                key_pass_code={key_pass_code}
            />
        </>
    );
};

export default LoginButton;
