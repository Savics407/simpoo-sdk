# Simpoo SDK

Simpoo SDK allows you to embed inventory widgets into **any website** (HTML, PHP, Next.js, WordPress, etc.) with **just a script**.  
No npm installation is required.

---

## 🚀 Quick Start

### Include SDK in Your Website

Add these tags inside your `<head>` or before `</body>`:

```html
<script src="https://unpkg.com/@simpoobusiness/sdk/dist/simpoo-sdk.js"></script>
```

Add a container where you want the inventory widget to appear:

```html
<div id="inventory-widget"></div>
```

Then initialize and render the widget:
Preferrably before the the closing tag `</body> of the page`

```html
<script>
  SimpooSDK.init({ apiKey: "YOUR_API_KEY" });
  SimpooSDK.renderWidget("inventory", "#inventory-widget");
</script>
```

✅ **That's it!** The widget will load with full styling.

---

## 📦 CDN Files

- `simpoo-sdk.js` → Main SDK script (React included).
- `simpoo-sdk.css` → Styles for inventory components.

---

## ⚙️ API Reference

### **SimpooSDK.init(config)**

Initialize the SDK with your configuration.

**Parameters:**

- `config.apiKey` (string) – Your API key.

**Example:**

```js
SimpooSDK.init({ apiKey: "12345" });
```

---

### **SimpooSDK.renderWidget(widget_name, selector)**

Render the inventory widget in a container.

**Parameters:**

- `widget_name` (string) – name for the inventory widget.
- `selector` (string) – CSS selector for the container.

**Example:**

```js
SimpooSDK.renderWidget("inventory", "#inventory-widget");
```

---

## 🔍 Troubleshooting

- **Widget not rendering?**  
  Ensure the container `<div>` exists and the selector matches.

---

## 📄 License

MIT
