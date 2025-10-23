import usePaginationStore from "@/store/paginationStore";
import { useEffect, useRef, useState } from "react";

const PaginationTrigger = () => {
    const { enable, hasNextPage, page, loading, setPage } =
        usePaginationStore();
    const triggerRef = useRef<HTMLDivElement>(null);
    const [hasTriggered, setHasTriggered] = useState(false);

    const loadMore = () => {
        if (loading || hasTriggered) return;

        if (hasNextPage) {
            setPage(page + 1);
            setHasTriggered(true);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && enable && !hasTriggered) {
                    // Tăng page và trigger load
                    loadMore();
                } else if (!entry.isIntersecting && hasTriggered) {
                    // Reset khi ra khỏi view
                    setHasTriggered(false);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        return () => {
            if (triggerRef.current) {
                observer.unobserve(triggerRef.current);
            }
        };
    }, [enable, page, setPage, hasTriggered]);

    return (
        <div
            ref={triggerRef}
            className="h-2 w-full flex items-center justify-center"
        >
            {loading && (
                <div className="flex items-center space-x-2">
                    {/* Loading spinner */}
                    <div className="animate-spin rounded-full size-5 border-2 border-gray-300 border-t-blue-500"></div>
                    <span className="text-sm text-gray-500 pl-1">
                        {page === 1
                            ? "Đang tải tin nhắn..."
                            : "Đang tải thêm tin nhắn..."}
                    </span>
                </div>
            )}
        </div>
    );
};

export default PaginationTrigger;
