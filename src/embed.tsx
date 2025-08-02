import ReactDOM from "react-dom/client";
import { SimpooProvider } from "./context/SimpooProvider";
import { InventoryTable } from "./components/widgets/inventory/InventoryTable";
import "./styles/tailwind.css";

let sdkConfig: { apiKey?: string } = {};

/**
 * Initializes the Simpoo SDK with your configuration.
 * @param config - Object containing API key and other options.
 * @example
 * SimpooSDK.init({ apiKey: "12345" });
 */
//initialize SDK
export function init(config: { apiKey: string }) {
  sdkConfig = config;
}

/**
 * Renders the Inventory widget inside a container.
 * @param containerSelector - CSS selector for the container element.
 * @example
 * SimpooSDK.renderInventory("#inventory-widget");
 */

//Render inventory table
export function renderInventory(containerSelector: string) {
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
if (typeof window !== "undefined") {
  (window as any).SimpooSDK = { init, renderInventory };
}
