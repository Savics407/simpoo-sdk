"use client";

import React, { createContext, useContext } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface SDKContextProps {
  apiKey: string;
}

const SDKContext = createContext<SDKContextProps | null>(null);

export const useSDK = () => {
  const context = useContext(SDKContext);
  if (!context) throw new Error("useSDK must be used within SDKProvider");
  return context;
};

interface SDKProviderProps {
  apiKey: string;
  children: React.ReactNode;
}

export const SimpooProvider: React.FC<SDKProviderProps> = ({
  apiKey,
  children,
}) => {
  if (typeof window === "undefined") {
    return null; // SSR-safe
  }

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // this stops the reload on tab focus
          },
        },
      })
  );

  return (
    <SDKContext.Provider value={{ apiKey }}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    </SDKContext.Provider>
  );
};
