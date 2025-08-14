"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const SDKContext = createContext(null);
export const useSDK = () => {
    const context = useContext(SDKContext);
    if (!context)
        throw new Error("useSDK must be used within SDKProvider");
    return context;
};
export const SimpooProvider = ({ apiKey, children, }) => {
    if (typeof window === "undefined") {
        return null; // SSR-safe
    }
    const [queryClient] = React.useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false, // this stops the reload on tab focus
            },
        },
    }));
    return (_jsx(SDKContext.Provider, { value: { apiKey }, children: _jsx(Provider, { store: store, children: _jsx(QueryClientProvider, { client: queryClient, children: children }) }) }));
};
//# sourceMappingURL=SimpooProvider.js.map