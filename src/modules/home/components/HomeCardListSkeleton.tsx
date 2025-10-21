import { Skeleton } from "@/core/components/ui";

const HomeCardListSkeleton = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-full">
                    <div className="p-4 h-full rounded-[20px] bg-white">
                        {/* Icon skeleton - khớp với size thực tế */}
                        <Skeleton
                            className="size-[36px] lg:size-[48px] rounded-lg"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        />

                        {/* Title skeleton - khớp với spacing và size */}
                        <div className="pt-2">
                            <Skeleton
                                className="h-[18px] lg:h-[24px] w-3/4"
                                style={{
                                    animationDelay: `${index * 0.1 + 0.05}s`,
                                }}
                            />
                        </div>

                        {/* Description skeleton - khớp với spacing và size */}
                        <div className="pt-1">
                            <Skeleton
                                className="h-3 lg:h-4 w-full"
                                style={{
                                    animationDelay: `${index * 0.1 + 0.1}s`,
                                }}
                            />
                            <Skeleton
                                className="h-3 lg:h-4 w-full mt-1"
                                style={{
                                    animationDelay: `${index * 0.1 + 0.1}s`,
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomeCardListSkeleton;
