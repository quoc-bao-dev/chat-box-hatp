import { create } from "zustand";

type CartItemEffectState = {
    forceClose: boolean | null;
    triggerForceClose: () => void;
    resetForceClose: () => void;
};

export const useCartItemEffect = create<CartItemEffectState>((set) => ({
    forceClose: null,
    triggerForceClose: () => set({ forceClose: true }),
    resetForceClose: () => set({ forceClose: null }),
}));
