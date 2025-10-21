import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: false,
    images: {
        domains: [
            "localhost",
            "192.168.1.200",
            "192.168.1.178",
            "00825ftp.fmrp.vn",
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
} as const;

export default nextConfig;
