import { jsx as _jsx } from "react/jsx-runtime";
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
let sdkConfig = {};
/**
 * Initializes the Simpoo SDK with your configuration.
 * @param config - Object containing API key and other options.
 * @example
 * SimpooSDK.init({ apiKey: "12345" });
 */
//initialize SDK
export function init(config) {
    sdkConfig = config;
}
const widgetRegistry = {
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
export function renderWidget(widgetName, selector) {
    injectStyles(); // Ensure CSS is present.
    const Component = widgetRegistry[widgetName];
    if (!Component) {
        console.error(`SimpooSDK: Widget "${widgetName}" not found.`);
        return;
    }
    const container = document.querySelector(selector);
    if (!container)
        throw new Error(`Container "${selector}" not found!`);
    const root = ReactDOM.createRoot(container);
    root.render(_jsx(SimpooProvider, { apiKey: sdkConfig.apiKey || "", children: _jsx(Component, {}) }));
}
// Expose globally
if (typeof window !== "undefined") {
    window.SimpooSDK = { init, renderWidget };
}
//# sourceMappingURL=embed.js.map