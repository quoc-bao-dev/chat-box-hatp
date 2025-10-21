"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";
import { queryClient } from "./queryClient";

const QueryProvider = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* React Query DevTools - only show in development */}
            {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    );
};

export default QueryProvider;
