import React from "react";

interface TypingIndicatorProps {
    className?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
    className = "",
}) => {
    return (
        <div className={`flex items-center space-x-1 ${className} py-2`}>
            <div className="flex space-x-1">
                <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                ></div>
                <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                ></div>
                <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                ></div>
            </div>
            {/* <span className="text-sm text-gray-900 ml-2">Đang nhập...</span> */}
        </div>
    );
};

export default TypingIndicator;
