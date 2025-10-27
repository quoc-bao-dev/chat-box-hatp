import { create } from "zustand";

type AuthState = {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
};

type AuthActions = {
    login: () => void;
    logout: () => void;
};

type AuthStore = AuthState & AuthActions;

export const authStore = create<AuthStore>((set) => {
    return {
        isAuthenticated: false,
        setIsAuthenticated: (isAuthenticated: boolean) =>
            set({ isAuthenticated }),
        login: () => set({ isAuthenticated: true }),
        logout: () => set({ isAuthenticated: false }),
    };
});

export const useAuthStore = () => {
    const { isAuthenticated } = authStore();
    return { isAuthenticated };
};
