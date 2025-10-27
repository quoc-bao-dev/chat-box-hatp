"use client";

import { create } from "zustand";

type FollowUpStore = {
    isFollowUp: boolean;
    setIsFollowUp: (isFollowUp: boolean) => void;
};

export const followUpStore = create<FollowUpStore>((set) => {
    return {
        isFollowUp: false,
        setIsFollowUp: (isFollowUp: boolean) => set({ isFollowUp }),
    };
});

export const useFollowUpStore = () => {
    const { isFollowUp, setIsFollowUp } = followUpStore();

    return {
        isFollowUp,
        openFollowUp: () => setIsFollowUp(true),
        closeFollowUp: () => setIsFollowUp(false),
    };
};
