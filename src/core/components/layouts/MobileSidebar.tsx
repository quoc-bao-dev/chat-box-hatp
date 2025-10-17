"use client";

import { useSidebar } from "@/store/sidebarStore";
import { useEffect } from "react";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
    const { isOpen, close } = useSidebar();

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isOpen && !target.closest(".mobile-sidebar-content")) {
                close();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            // Prevent body scroll when sidebar is open
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, close]);

    // Close sidebar on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                close();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, close]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`
                    fixed inset-0 bg-black/50 z-200 transition-opacity duration-300 ease-in-out backdrop-blur-sm
                    ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
                onClick={close}
            />

            {/* Sidebar */}
            <div
                className={`
                    fixed top-0 left-0 h-full w-80 max-w-[85vw] z-200
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div
                    className="mobile-sidebar-content h-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Sidebar />
                </div>
            </div>
        </>
    );
};

export default MobileSidebar;
