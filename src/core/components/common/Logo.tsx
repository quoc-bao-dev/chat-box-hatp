import { _Image } from "@/core/config";
import Image from "next/image";

const Logo = ({
    size = 40,
    className = "",
}: {
    size?: number;
    className?: string;
}) => {
    return (
        <Image
            src={_Image.logo}
            alt="logo"
            width={size}
            height={size}
            className={`object-contain ${className}`}
        />
    );
};

export default Logo;
