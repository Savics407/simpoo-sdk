import React from "react";
import ReactDOM from "react-dom/client";
import { SimpooProvider } from "./context/SimpooProvider";
import { InventoryTable } from "./components/widgets/inventory/InventoryTable";

let sdkConfig: { apiKey?: string } = {};

//initialize SDK
export function init(config: { apiKey: string }) {
  sdkConfig = config;
}

//Render inventory table
export function renderInventory(containerSelector: string) {
  if (!sdkConfig.apiKey) {
    throw new Error(
      "SimpooSDK.init({ apiKey }) must be called before rendering."
    );
  }
  const container = document.querySelector(containerSelector);
  if (!container)
    throw new Error(`Container "${containerSelector}" not found!`);

  const root = ReactDOM.createRoot(container);
  root.render(
    <SimpooProvider apiKey={sdkConfig.apiKey || ""}>
      <InventoryTable />
    </SimpooProvider>
  );
}

// Expose globally
(window as any).SimpooSDK = { init, renderInventory };
