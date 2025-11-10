"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Toaster } from "react-hot-toast";

export default function ToastPortal() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || typeof document === "undefined") return null;

    return createPortal(
        <Toaster containerStyle={{ zIndex: 2147483647 }} />,
        document.body
    );
}
