import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { envConfig } from "../config";

const TOKEN_KEY = "token_account";
const SP_SESSION_KEY = "sp_session";

// Utility function to get cookie value
const getCookie = (name: string): string | null => {
    if (typeof window === "undefined") return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(";").shift();
        return cookieValue || null;
    }
    return null;
};

// Base URL configuration
const BASE_URL = envConfig.apiUrl || "http://localhost:3000/api";

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Get token from localStorage
        const token =
            typeof window !== "undefined"
                ? localStorage.getItem(TOKEN_KEY)
                : null;

        // Add token to headers if available
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Get session from sessionStorage and add to headers
        const session =
            typeof window !== "undefined"
                ? sessionStorage.getItem(SP_SESSION_KEY)
                : null;

        if (session && config.headers) {
            config.headers["sp_session"] = session;
        }

        // Inject language into request body for write methods (POST/PUT/PATCH/DELETE)
        if (
            config.method &&
            ["post", "put", "patch", "delete"].includes(
                config.method.toLowerCase()
            )
        ) {
            // if (config.data && typeof config.data === "object") {
            //     config.data.language = "vi"; // Default to Vietnamese
            // }
        }

        return config;
    },
    (error: AxiosError) => {
        console.error("❌ Request Error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        // Handle common error cases
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            console.error("❌ Response Error:", {
                status,
                url: error.config?.url,
                data,
            });

            // Handle specific status codes
            switch (status) {
                case 401:
                    // Unauthorized - clear token and redirect to login
                    if (typeof window !== "undefined") {
                        localStorage.removeItem(TOKEN_KEY);
                        // You can add redirect logic here if needed
                    }
                    break;
                case 403:
                    // Forbidden
                    console.warn("Access forbidden");
                    break;
                case 404:
                    // Not found
                    console.warn("Resource not found");
                    break;
                case 500:
                    // Server error
                    console.error("Internal server error");
                    break;
                default:
                    console.error("Unexpected error:", status);
            }
        } else if (error.request) {
            // Network error
            console.error("❌ Network Error:", error.message);
        } else {
            // Other error
            console.error("❌ Error:", error.message);
        }

        return Promise.reject(error);
    }
);

// Token management functions
export const tokenManager = {
    setToken: (token: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(TOKEN_KEY, token);
        }
    },

    getToken: (): string | null => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(TOKEN_KEY);
        }
        return null;
    },

    removeToken: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(TOKEN_KEY);
        }
    },

    clearToken: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(TOKEN_KEY);
        }
    },
};

// Session management functions
export const sessionManager = {
    getSession: (): string | null => {
        return getCookie(SP_SESSION_KEY);
    },

    setSession: (
        session: string,
        options?: {
            expires?: Date;
            path?: string;
            domain?: string;
            secure?: boolean;
            sameSite?: "strict" | "lax" | "none";
        }
    ) => {
        if (typeof window === "undefined") return;

        let cookieString = `${SP_SESSION_KEY}=${session}`;

        if (options?.expires) {
            cookieString += `; expires=${options.expires.toUTCString()}`;
        }

        if (options?.path) {
            cookieString += `; path=${options.path}`;
        }

        if (options?.domain) {
            cookieString += `; domain=${options.domain}`;
        }

        if (options?.secure) {
            cookieString += `; secure`;
        }

        if (options?.sameSite) {
            cookieString += `; samesite=${options.sameSite}`;
        }

        document.cookie = cookieString;
    },

    removeSession: () => {
        if (typeof window === "undefined") return;
        document.cookie = `${SP_SESSION_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    },

    clearSession: () => {
        if (typeof window === "undefined") return;
        document.cookie = `${SP_SESSION_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    },
};

export { axiosInstance };
export default axiosInstance;
