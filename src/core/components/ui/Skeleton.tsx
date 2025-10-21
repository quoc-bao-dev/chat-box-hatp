import { cn } from "@/core/utils/cn";

interface SkeletonProps {
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

const Skeleton = ({ className, children, style, ...props }: SkeletonProps) => {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-md bg-gray-200/30",
                className
            )}
            style={{
                animation: "smooth-pulse 2s ease-in-out infinite",
                ...style,
            }}
            {...props}
        >
            {/* Shimmer effect */}
            <div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                style={{
                    animation: "shimmer 2s ease-in-out infinite",
                    animationDelay: style?.animationDelay || "0s",
                }}
            />
            {children}
        </div>
    );
};

// Skeleton variants for common use cases
const SkeletonCard = ({ className }: { className?: string }) => (
    <div className={cn("p-4 space-y-3", className)}>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-20 w-full" />
    </div>
);

const SkeletonText = ({
    lines = 1,
    className,
}: {
    lines?: number;
    className?: string;
}) => (
    <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
                key={i}
                className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full")}
            />
        ))}
    </div>
);

const SkeletonAvatar = ({
    size = "md",
    className,
}: {
    size?: "sm" | "md" | "lg";
    className?: string;
}) => {
    const sizeClasses = {
        sm: "h-6 w-6",
        md: "h-10 w-10",
        lg: "h-16 w-16",
    };

    return (
        <Skeleton
            className={cn("rounded-full", sizeClasses[size], className)}
        />
    );
};

const SkeletonButton = ({ className }: { className?: string }) => (
    <Skeleton className={cn("h-10 w-24", className)} />
);

// Grid skeleton for card lists
const SkeletonGrid = ({
    columns = 4,
    rows = 1,
    className,
}: {
    columns?: number;
    rows?: number;
    className?: string;
}) => {
    const gridCols = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
    };

    return (
        <div
            className={cn(
                "grid gap-4",
                gridCols[columns as keyof typeof gridCols] || "grid-cols-4",
                className
            )}
        >
            {Array.from({ length: columns * rows }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
};

// Advanced skeleton with wave effect
const SkeletonWave = ({
    className,
    children,
    style,
    ...props
}: SkeletonProps) => {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-md bg-gray-200/20",
                className
            )}
            style={{
                animation: "smooth-pulse 3s ease-in-out infinite",
                ...style,
            }}
            {...props}
        >
            {/* Multiple shimmer layers for wave effect */}
            <div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{
                    animation: "shimmer 3s ease-in-out infinite",
                    animationDelay: "0s",
                }}
            />
            <div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{
                    animation: "shimmer 3s ease-in-out infinite",
                    animationDelay: "0.5s",
                }}
            />
            {children}
        </div>
    );
};

export {
    Skeleton,
    SkeletonAvatar,
    SkeletonButton,
    SkeletonCard,
    SkeletonGrid,
    SkeletonText,
    SkeletonWave,
};
