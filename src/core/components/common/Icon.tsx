import Image from "next/image";

type IconProps = {
    src: string;
    size: number;
    alt: string;
    className?: string;
};

const Icon = ({ src, size, alt, className }: IconProps) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            className={`object-contain ${className}`}
        />
    );
};

export default Icon;
