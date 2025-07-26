"use client";

import React, { createContext, useContext } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

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
  return (
    <SDKContext.Provider value={{ apiKey }}>
      <Provider store={store}>{children}</Provider>
    </SDKContext.Provider>
  );
};
