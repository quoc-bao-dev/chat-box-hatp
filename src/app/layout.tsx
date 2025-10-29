import AppProvider from "@/core/provider/AppProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Giấy Hoàng Anh Hỗ Trợ",
    description:
        "Kênh tư vấn và tra cứu sản phẩm của Giấy Hoàng Anh giúp khách hàng xem giá, mã sản phẩm và hướng dẫn mua hàng một cách nhanh chóng, tiện lợi.",
    icons: {
        icon: "/favicon/logo.png",
    },
    openGraph: {
        images: [
            {
                url: "/thumb/hatp-thumbnail.jpg",
                width: 1200,
                height: 630,
                alt: "Giấy Hoàng Anh Hỗ Trợ",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
            >
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    );
}
