"use client";

type ScrollToBottomButtonProps = {
    show: boolean;
    onClick: () => void;
    className?: string;
};

const ScrollToBottomButton = ({
    show,
    onClick,
    className,
}: ScrollToBottomButtonProps) => {
    if (!show) return null;
    return (
        <button
            type="button"
            onClick={onClick}
            className={
                "sticky left-1/2 bottom-5 -translate-x-1/2 z-20 inline-flex items-center justify-center rounded-full bg-white text-gray-700  border border-gray-200 hover:shadow-[0_10px_28px_rgba(0,0,0,0.1)] hover:bg-gray-50 transition-all duration-200 size-10 " +
                (className || "")
            }
            aria-label="Scroll to bottom"
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
};

export default ScrollToBottomButton;
