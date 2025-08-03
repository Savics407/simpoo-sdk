import ReactDOM from "react-dom/client";
import { SimpooProvider } from "./context/SimpooProvider";
import { InventoryTable } from "./components/widgets/inventory/InventoryTable";
import "./styles/tailwind.css";

const CSS_URL = "https://unpkg.com/@simpoobusiness/sdk/dist/simpoo-sdk.css";

function injectStyles() {
  if (!document.querySelector(`link[href="${CSS_URL}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CSS_URL;
    document.head.appendChild(link);
  }
}

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

const widgetRegistry: Record<string, React.FC<any>> = {
  inventory: InventoryTable,
};
/**
 * Renders the Inventory widget inside a container.
 * @param widgetName - name for the inventory widget.
 * @param selector - CSS selector for the container element.
 * @example
 * SimpooSDK.renderWidget("inventory", "#inventory-widget");
 */

//Render inventory table
export function renderWidget(widgetName: string, selector: string) {
  injectStyles(); // Ensure CSS is present.

  const Component = widgetRegistry[widgetName];
  if (!Component) {
    console.error(`SimpooSDK: Widget "${widgetName}" not found.`);
    return;
  }

  const container = document.querySelector(selector);
  if (!container) throw new Error(`Container "${selector}" not found!`);

  const root = ReactDOM.createRoot(container);
  root.render(
    <SimpooProvider apiKey={sdkConfig.apiKey || ""}>
      <Component />
    </SimpooProvider>
  );
}

// Expose globally
if (typeof window !== "undefined") {
  (window as any).SimpooSDK = { init, renderWidget };
}
