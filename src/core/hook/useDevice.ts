import { create } from "zustand";

type DeviceType = "mobile" | "tablet" | "desktop";

type DeviceState = {
    width: number;
    height: number;
    type: DeviceType;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    setDimensions: (w: number, h: number) => void;
};

const detectType = (width: number): DeviceType => {
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
};

export const useDeviceStore = create<DeviceState>((set) => {
    const initialWidth =
        typeof window !== "undefined" ? window.innerWidth : 1024;
    const initialHeight =
        typeof window !== "undefined" ? window.innerHeight : 768;
    const initialType =
        typeof window !== "undefined" ? detectType(initialWidth) : "desktop";

    return {
        width: initialWidth,
        height: initialHeight,
        type: initialType,
        isMobile: initialType === "mobile",
        isTablet: initialType === "tablet",
        isDesktop: initialType === "desktop",
        setDimensions: (w, h) =>
            set(() => {
                const t = detectType(w);
                return {
                    width: w,
                    height: h,
                    type: t,
                    isMobile: t === "mobile",
                    isTablet: t === "tablet",
                    isDesktop: t === "desktop",
                };
            }),
    };
});

export const useDevice = () => useDeviceStore();

export default useDevice;
